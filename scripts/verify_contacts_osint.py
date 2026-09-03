"""
Ambition Campus — Vérification OSINT des contacts entreprises
================================================================
Vérifie, pour chaque contact de MASTER_ENTREPRISES (enrich_entreprises.py) :
  1. le profil LinkedIn réel et le poste actuel  → Firecrawl search (Google, site:linkedin.com/in)
  2. les décideurs RSE / mécénat / fondation 2026 → Perplexity (mode pro, ~/.perplexity-mcp/research.py)
  3. la plausibilité du format d'email           → Firecrawl search "@domaine" (exemples publics)

Aucun scraping de linkedin.com : on lit uniquement les résultats de moteur de recherche.
Les emails ne sont PAS vérifiés en SMTP (il faut Hunter / Dropcontact / Reoon pour ça).

Usage :
  python scripts/verify_contacts_osint.py firecrawl    # ~135 recherches Firecrawl
  python scripts/verify_contacts_osint.py perplexity   # 48 questions Perplexity (4 s d'écart, usage modéré)
  python scripts/verify_contacts_osint.py report       # fusionne -> CSV + rapport Markdown
  python scripts/verify_contacts_osint.py apply        # réinjecte les LinkedIn confirmés dans enrich_entreprises.py
Options : --force (refait les appels déjà en cache), --only ENT-01,ENT-02
Cache brut : $OSINT_RAW_DIR (défaut prospection/entreprises/verification/raw, gitignoré)
"""

import csv
import json
import os
import re
import subprocess
import sys
import time
import unicodedata
from datetime import date
from urllib.parse import unquote, urlparse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from enrich_entreprises import MASTER_ENTREPRISES  # noqa: E402

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)
except Exception:
    pass

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(SCRIPT_DIR, "..", "prospection", "entreprises")
RAW_DIR = os.environ.get("OSINT_RAW_DIR") or os.path.join(OUT_DIR, "verification", "raw")
TODAY = date.today().isoformat()
CSV_OUT = os.path.join(OUT_DIR, f"verification_contacts_{TODAY}.csv")
MD_OUT = os.path.join(OUT_DIR, f"RAPPORT_VERIFICATION_CONTACTS_{TODAY}.md")

FIRECRAWL_JS = os.path.expandvars(r"%APPDATA%\npm\node_modules\firecrawl-cli\dist\index.js")
PPLX_PY = os.path.expanduser(r"~\.perplexity-mcp\venv\Scripts\python.exe")
PPLX_RESEARCH = os.path.expanduser(r"~\.perplexity-mcp\research.py")
PPLX_DELAY = 4  # secondes entre deux questions (CGU Perplexity : usage modéré)

ENTITY_WORDS = ("direction", "mission", "comite", "service", "pole", "equipe", "fondation", "fonds", "departement", "cellule")
PARTICLES = {"de", "du", "la", "le", "les", "von", "van", "d", "der", "den", "di", "da"}
STOP_TOKENS = {"et", "de", "du", "la", "le", "les", "and", "the", "co", "group", "groupe", "france", "paris"}
GENERIC_HINTS = ("contact", "info", "rse", "press", "communication", "mecenat", "fondation", "probono", "esg",
                 "recrut", "career", "job", "attractivite", "dpo", "privacy", "media", "solidar", "hello", "bonjour", "csr")


# ----------------------------------------------------------------------------- utilitaires
def strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", strip_accents(s or "").lower()).strip()


def split_multi(s: str):
    return [x.strip() for x in (s or "").split(" / ") if x.strip()]


def is_person(name: str) -> bool:
    n = norm(name)
    return len(n.split()) >= 2 and not any(w in n for w in ENTITY_WORDS)


def company_keyword(nom: str) -> str:
    k = re.sub(r"\(.*?\)", "", nom).split(" / ")[0].split(",")[0]
    k = re.sub(r"\b(France|Paris|SAS|SA|Groupe|et Maghreb|Fr[èe]res)\b", "", k, flags=re.I)
    return re.sub(r"\s+", " ", k).strip(" -&/")


def company_tokens(nom: str):
    toks = [t for t in re.split(r"[^a-z0-9]+", norm(company_keyword(nom))) if t]
    return [t for t in toks if t not in STOP_TOKENS and len(t) >= 2]


def last_name_tokens(name: str):
    parts = [p for p in re.split(r"[\s\-]+", norm(name)) if p]
    tail = parts[1:] if len(parts) > 1 else parts
    return [p for p in tail if p not in PARTICLES and len(p) >= 3] or [p for p in tail if p]


def email_format(local: str) -> str:
    l = local.lower()
    if any(h in l for h in GENERIC_HINTS):
        return "generique"
    if "." in l:
        a, b = l.split(".", 1)
        if len(a) == 1:
            return "p.nom"
        if len(b) == 1:
            return "prenom.n"
        return "prenom.nom"
    if "_" in l:
        return "prenom_nom"
    if "-" in l:
        return "prenom-nom"
    return "pnom/prenomnom"


def load_json(path):
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None  # fichier tronqué (processus interrompu) : sera refait


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def parse_args():
    args = sys.argv[1:]
    phase = args[0] if args else "report"
    force = "--force" in args
    only = None
    if "--only" in args:
        only = set(args[args.index("--only") + 1].split(","))
    return phase, force, only


# ----------------------------------------------------------------------------- appels externes
FC_DELAY = 6          # secondes entre deux recherches (limite de débit Firecrawl : 429 au-delà de ~15/min)
FC_RETRY_WAIT = 45    # attente après un 429 avant nouvel essai
FC_MAX_RETRY = 4


def fc_search(query: str, limit: int = 3):
    cmd = ["node", FIRECRAWL_JS, "search", query, "--limit", str(limit), "--country", "FR", "--no-highlights", "--json"]
    last = {"error": "aucun essai"}
    for attempt in range(FC_MAX_RETRY + 1):
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=120)
            out = (r.stdout or "").strip()
            try:
                last = json.loads(out[out.index("{"):])
            except Exception:
                last = {"error": ((r.stderr or "") + out)[:500]}
        except subprocess.TimeoutExpired:
            last = {"error": "timeout"}
        err = str(last.get("error") or "") if isinstance(last, dict) else ""
        transient = any(k in err for k in ("429", "ENOTFOUND", "ECONN", "ETIMEDOUT", "timeout", "socket hang up", "EAI_AGAIN", "502", "503"))
        if not transient:
            time.sleep(FC_DELAY)
            return last
        print(f"[FC] erreur passagère ({err.strip()[:60]}), attente {FC_RETRY_WAIT}s puis essai {attempt + 2}/{FC_MAX_RETRY + 1}", flush=True)
        time.sleep(FC_RETRY_WAIT)
    return last


def fc_has_error(res) -> bool:
    return isinstance(res, dict) and bool(res.get("error"))


PPLX_MAX_RETRY = 3
PPLX_RETRY_WAIT = 30  # secondes (erreurs réseau/DNS passagères)


def pplx_ask(question: str, out_path: str):
    cmd = [PPLX_PY, PPLX_RESEARCH, question, "--mode", "pro", "--out", out_path]
    info = "aucun essai"
    for attempt in range(PPLX_MAX_RETRY + 1):
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=180)
            info = (r.stdout or "").strip().splitlines()[0] if (r.stdout or "").strip() else (r.stderr or "")[-200:]
        except subprocess.TimeoutExpired:
            info = "timeout"
        if load_json(out_path):
            return info
        print(f"[PPLX] échec ({info[:80]}), attente {PPLX_RETRY_WAIT}s puis essai {attempt + 2}/{PPLX_MAX_RETRY + 1}", flush=True)
        time.sleep(PPLX_RETRY_WAIT)
    return info


# ----------------------------------------------------------------------------- phases
def phase_firecrawl(force, only):
    domains = {}
    for ent in MASTER_ENTREPRISES:
        if only and ent["ID"] not in only:
            continue
        for em in split_multi(ent["Email_Contact"]):
            if "@" in em:
                domains.setdefault(em.split("@", 1)[1].lower(), ent["ID"])
        path = os.path.join(RAW_DIR, f"fc_{ent['ID']}.json")
        cached = load_json(path) if os.path.exists(path) else None
        if cached and not force and not any(fc_has_error(c.get("result")) for c in cached.get("contacts", [])):
            continue
        kw = company_keyword(ent["Nom_Entreprise"])
        res = {"id": ent["ID"], "entreprise": ent["Nom_Entreprise"], "keyword": kw, "date": TODAY, "contacts": []}
        for name in split_multi(ent["Nom_Contact"]):
            if not is_person(name):
                res["contacts"].append({"name": name, "skipped": "entité (pas une personne)"})
                continue
            q = f'"{name}" {kw} site:linkedin.com/in'
            j = fc_search(q, limit=3)
            n = len((j.get("data") or {}).get("web") or []) if isinstance(j, dict) else 0
            print(f"[FC] {ent['ID']} {name}: {n} résultat(s)" + (f" ERREUR {j.get('error')}" if isinstance(j, dict) and j.get('error') else ""))
            res["contacts"].append({"name": name, "query": q, "result": j})
        save_json(path, res)
    for dom in sorted(domains):
        path = os.path.join(RAW_DIR, f"dom_{dom}.json")
        cached = load_json(path) if os.path.exists(path) else None
        if cached and not force and not fc_has_error(cached.get("result")):
            continue
        j = fc_search(f'"@{dom}"', limit=5)
        print(f"[FC] domaine {dom}: " + ("ERREUR " + str(j.get("error")) if isinstance(j, dict) and j.get("error") else "ok"))
        save_json(path, {"domain": dom, "date": TODAY, "result": j})
    print("[FC] terminé")


def phase_perplexity(force, only):
    for ent in MASTER_ENTREPRISES:
        if only and ent["ID"] not in only:
            continue
        path = os.path.join(RAW_DIR, f"pplx_{ent['ID']}.json")
        if os.path.exists(path) and not force:
            continue
        names = split_multi(ent["Nom_Contact"])
        postes = split_multi(ent["Poste_Contact"])
        pairs = "; ".join(f"{n} ({postes[i] if i < len(postes) else postes[0] if postes else 'poste inconnu'})" for i, n in enumerate(names))
        q = (f"Chez {ent['Nom_Entreprise']} (France), en septembre 2026 : les personnes suivantes occupent-elles toujours ce poste : {pairs} ? "
             f"Pour chacune, réponds 'confirmé', 'poste différent' ou 'introuvable', avec le poste exact actuel et une source. "
             f"Si l'une a quitté ce poste, indique qui l'occupe aujourd'hui. Réponds de façon factuelle et compacte, sans proposer d'aide supplémentaire.")
        os.makedirs(RAW_DIR, exist_ok=True)
        info = pplx_ask(q, path)
        print(f"[PPLX] {ent['ID']} {ent['Nom_Entreprise']}: {info}")
        time.sleep(PPLX_DELAY)
    print("[PPLX] terminé")


# ----------------------------------------------------------------------------- analyse
def parse_li_title(title: str):
    t = re.sub(r"\s*[|\-–]\s*LinkedIn.*$", "", title or "", flags=re.I)
    parts = [p.strip() for p in re.split(r"\s+[-–|]\s+", t) if p.strip()]
    name = parts[0] if parts else ""
    poste = parts[1] if len(parts) >= 3 else (parts[1] if len(parts) == 2 else "")
    company = parts[2] if len(parts) >= 3 else ""
    return name, poste, company


def canonical_li(url: str) -> str:
    try:
        p = urlparse(url)
        m = re.search(r"/in/([^/?#]+)", p.path)
        if not m:
            return url
        return "https://www.linkedin.com/in/" + m.group(1).rstrip("/")
    except Exception:
        return url


def li_slug(url: str) -> str:
    m = re.search(r"/in/([^/?#]+)", url or "")
    return unquote(m.group(1)).rstrip("/").lower() if m else ""


def pplx_verdict(answer: str, ln_tokens):
    """Extrait le verdict Perplexity pour un contact : confirmé / poste différent / introuvable / indéterminé."""
    if not answer:
        return "aucune réponse", ""
    a = answer.replace("\r", "")
    segs = [x.strip() for x in re.split(r"\n+|(?<=[.;])\s+(?=[-•*A-ZÀ-Ý])", a) if x.strip()]
    hits = [x for x in segs if any(t in norm(x) for t in ln_tokens)]
    if not hits:
        return "non mentionné", ""
    seg = re.sub(r"\s+", " ", " ".join(hits))[:300]
    n = norm(seg)
    if re.search(r"a quitt|n'est plus|n est plus|remplac|ne figure plus|n'occupe plus|n occupe plus", n):
        return "poste différent", seg  # signal fort de changement
    pos = {}
    for label, pat in (("poste différent", r"poste diff|different|ancien(ne)? "),
                       ("introuvable", r"introuvable|non trouv|pas trouv|aucune source|pas de source|non confirm|impossible de confirmer|pas de preuve"),
                       ("confirmé", r"confirm")):
        m = re.search(pat, n)
        if m:
            pos[label] = m.start()
    v = min(pos, key=pos.get) if pos else "indéterminé"  # le premier verdict énoncé l'emporte
    return v, seg


def analyse_contact(ent, idx, name, fc_entry, pplx_answer, dom_formats):
    ln_tokens = last_name_tokens(name)
    first_name = norm(name).split()[0] if norm(name) else ""
    co_tokens = company_tokens(ent["Nom_Entreprise"])
    base_li = ent["LinkedIn_Contact"]
    base_slug = li_slug(base_li)
    base_li_for_contact = base_li if idx == 0 or any(t in base_slug for t in ln_tokens) else ""

    found_url = found_title = found_poste = found_company = ""
    confidence = "aucune"
    web = []
    if fc_entry and not fc_entry.get("skipped"):
        j = fc_entry.get("result") or {}
        web = (j.get("data") or {}).get("web") or []
    for w in web:
        if "linkedin.com/in/" not in (w.get("url") or ""):
            continue
        blob = norm((w.get("title") or "") + " " + (w.get("description") or ""))
        tnorm = norm(w.get("title") or "")
        if not any(t in tnorm for t in ln_tokens):
            continue
        if first_name and first_name not in tnorm:
            continue  # prénom obligatoire : évite les homonymes de famille (ex. Stanislas vs Jean-Michel Darrois)
        found_url = canonical_li(w["url"])
        found_title = w.get("title") or ""
        _, found_poste, found_company = parse_li_title(found_title)
        confidence = "haute" if any(t in blob for t in co_tokens) else "moyenne"
        break

    if fc_entry and fc_entry.get("skipped"):
        slug_status = "entité"
    elif not found_url:
        slug_status = "introuvable"
    elif base_li_for_contact and li_slug(found_url) == base_slug:
        slug_status = "identique"
    elif base_li_for_contact:
        slug_status = "différent"
    else:
        slug_status = "absent dans la base"

    verdict, detail = pplx_verdict(pplx_answer, ln_tokens)

    emails = split_multi(ent["Email_Contact"])
    email = emails[idx] if idx < len(emails) else (emails[0] if emails else "")
    local, _, domain = email.partition("@")
    fmt = email_format(local) if email else ""
    observed = dom_formats.get(domain.lower(), {})
    obs_str = ", ".join(f"{k}×{v}" for k, v in sorted(observed.items(), key=lambda x: -x[1]))
    if not email:
        email_verdict = "aucun email"
    elif fmt == "generique":
        email_verdict = "générique : vérifier sur le site"
    elif not observed:
        email_verdict = "format non déterminable (aucun exemple public)"
    elif fmt in observed:
        email_verdict = "format cohérent avec le domaine (non vérifié SMTP)"
    else:
        email_verdict = "format DOUTEUX : différent des exemples publics"

    if slug_status == "entité":
        action = "Entité générique : identifier une personne"
    elif slug_status == "introuvable" and verdict == "introuvable":
        action = "PERSONNE NON RETROUVÉE : identité ou poste probablement faux"
    elif slug_status == "introuvable" and verdict == "confirmé":
        action = "LinkedIn introuvable (Google) mais poste confirmé par Perplexity : chercher à la main"
    elif slug_status == "introuvable":
        action = "LinkedIn introuvable : vérifier à la main"
    elif slug_status in ("différent", "absent dans la base") and confidence == "haute":
        action = "Remplacer l'URL LinkedIn"
    elif slug_status in ("différent", "absent dans la base"):
        action = "URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)"
    else:
        action = "LinkedIn OK"
    if verdict == "poste différent":
        action += " · POSTE À METTRE À JOUR (Perplexity)"
    elif found_poste and confidence == "haute" and norm(found_poste)[:12] not in norm(ent["Poste_Contact"]) and not found_poste.endswith("..."):
        action += " · poste LinkedIn différent de la base"

    return {
        "ID": ent["ID"], "Entreprise": ent["Nom_Entreprise"], "Contact": name,
        "Poste_base": (split_multi(ent["Poste_Contact"]) + [""] * 3)[idx],
        "LinkedIn_base": base_li_for_contact, "LinkedIn_trouve": found_url,
        "Titre_LinkedIn_trouve": found_title, "Poste_LinkedIn": found_poste, "Entreprise_LinkedIn": found_company,
        "Confiance": confidence, "Statut_slug": slug_status,
        "Perplexity_verdict": verdict, "Perplexity_detail": detail,
        "Email_base": email, "Format_email": fmt, "Formats_observes_domaine": obs_str,
        "Verdict_email": email_verdict, "Action": action,
    }


def domain_formats():
    out = {}
    if not os.path.isdir(RAW_DIR):
        return out
    for fn in os.listdir(RAW_DIR):
        if not fn.startswith("dom_"):
            continue
        j = load_json(os.path.join(RAW_DIR, fn)) or {}
        dom = j.get("domain", "")
        web = ((j.get("result") or {}).get("data") or {}).get("web") or []
        counts = {}
        for w in web:
            text = (w.get("title") or "") + " " + (w.get("description") or "")
            for m in re.finditer(r"([A-Za-z0-9._%+\-]+)@" + re.escape(dom), text, flags=re.I):
                f = email_format(m.group(1))
                if f != "generique":
                    counts[f] = counts.get(f, 0) + 1
        out[dom] = counts
    return out


def phase_report(force, only):
    dom_formats = domain_formats()
    rows, per_company = [], []
    for ent in MASTER_ENTREPRISES:
        if only and ent["ID"] not in only:
            continue
        fc = load_json(os.path.join(RAW_DIR, f"fc_{ent['ID']}.json")) or {}
        pp = load_json(os.path.join(RAW_DIR, f"pplx_{ent['ID']}.json")) or {}
        answer = pp.get("answer") or ""
        sources = [w.get("url") for w in (pp.get("web_results") or []) if isinstance(w, dict) and w.get("url")]
        fc_by_name = {c.get("name"): c for c in fc.get("contacts", [])}
        names = split_multi(ent["Nom_Contact"])
        ent_rows = [analyse_contact(ent, i, n, fc_by_name.get(n), answer, dom_formats) for i, n in enumerate(names)]
        rows.extend(ent_rows)
        per_company.append((ent, ent_rows, answer, sources))

    os.makedirs(OUT_DIR, exist_ok=True)
    cols = list(rows[0].keys()) if rows else []
    with open(CSV_OUT, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, delimiter=";")
        w.writeheader()
        w.writerows(rows)

    total = len(rows)
    persons = [r for r in rows if r["Statut_slug"] != "entité"]
    c_ident = sum(1 for r in persons if r["Statut_slug"] == "identique")
    c_diff = sum(1 for r in persons if r["Statut_slug"] in ("différent", "absent dans la base"))
    c_missing = sum(1 for r in persons if r["Statut_slug"] == "introuvable")
    c_pplx = sum(1 for r in persons if r["Perplexity_verdict"] == "confirmé")
    c_pplx_diff = sum(1 for r in persons if r["Perplexity_verdict"] == "poste différent")
    c_pplx_miss = sum(1 for r in persons if r["Perplexity_verdict"] == "introuvable")
    e_generic = sum(1 for r in rows if r["Verdict_email"].startswith("générique"))
    e_ok = sum(1 for r in rows if r["Verdict_email"].startswith("format cohérent"))
    e_doubt = sum(1 for r in rows if r["Verdict_email"].startswith("format DOUTEUX"))
    e_unk = sum(1 for r in rows if r["Verdict_email"].startswith("format non"))

    md = [f"# Rapport de vérification OSINT des contacts entreprises — {TODAY}", "",
          "Sources : Firecrawl search (résultats Google `site:linkedin.com/in`, aucun scraping de LinkedIn) et Perplexity (mode pro). "
          "Les emails sont évalués sur leur **format** uniquement : aucune vérification SMTP (nécessite Hunter / Dropcontact / Reoon).", "",
          "## Synthèse", "",
          "| Indicateur | Valeur |", "|---|---|",
          f"| Contacts analysés | {total} (dont {total - len(persons)} entités génériques) |",
          f"| LinkedIn identique à la base | {c_ident} |",
          f"| LinkedIn trouvé mais **différent** de la base | {c_diff} |",
          f"| Personne **introuvable** sur LinkedIn (Google) | {c_missing} |",
          f"| Poste **confirmé** par Perplexity | {c_pplx} / {len(persons)} |",
          f"| Poste **différent** selon Perplexity | {c_pplx_diff} |",
          f"| Personne **introuvable** selon Perplexity | {c_pplx_miss} |",
          f"| Emails génériques (contact@, rse@…) | {e_generic} |",
          f"| Emails au format cohérent avec le domaine | {e_ok} |",
          f"| Emails au format douteux | {e_doubt} |",
          f"| Emails au format non déterminable | {e_unk} |", "",
          "## Détail par entreprise", ""]
    for ent, ent_rows, answer, sources in per_company:
        md.append(f"### {ent['ID']} — {ent['Nom_Entreprise']}")
        md.append("")
        md.append("| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |")
        md.append("|---|---|---|---|---|---|---|---|---|---|")
        for r in ent_rows:
            li = f"[{li_slug(r['LinkedIn_trouve'])}]({r['LinkedIn_trouve']})" if r["LinkedIn_trouve"] else "—"
            md.append(f"| {r['Contact']} | {r['Poste_base']} | {li} | {r['Titre_LinkedIn_trouve'].replace('|', '/')} | {r['Confiance']} | {r['Statut_slug']} | {r['Perplexity_verdict']} | {r['Email_base']} | {r['Verdict_email']} | **{r['Action']}** |")
        md.append("")
        if answer:
            snippet = re.sub(r"\s+", " ", answer)[:900]
            md.append(f"**Perplexity (2026) :** {snippet}{'…' if len(answer) > 900 else ''}")
            if sources:
                md.append("")
                md.append("Sources Perplexity : " + " · ".join(f"[{i+1}]({u})" for i, u in enumerate(sources[:6])))
        else:
            md.append("**Perplexity :** pas de réponse enregistrée.")
        md.append("")
    with open(MD_OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(md))
    print(f"[REPORT] {total} contacts -> {CSV_OUT}")
    print(f"[REPORT] rapport -> {MD_OUT}")
    print(f"[REPORT] LinkedIn identiques {c_ident} | différents {c_diff} | introuvables {c_missing} | Perplexity : confirmés {c_pplx}, postes différents {c_pplx_diff}, introuvables {c_pplx_miss} / {len(persons)}")
    print(f"[REPORT] emails génériques {e_generic} | cohérents {e_ok} | douteux {e_doubt} | indéterminés {e_unk}")


# ----------------------------------------------------------------------------- application des corrections
def phase_apply(force, only):
    """Réinjecte les URLs LinkedIn confirmées (confiance haute) dans enrich_entreprises.py,
    une URL par contact séparée par " / " (même convention que Nom_Contact / Email_Contact).
    Les postes et emails ne sont PAS modifiés automatiquement (décision humaine, cf. rapport)."""
    if not os.path.exists(CSV_OUT):
        print(f"[APPLY] rapport absent : {CSV_OUT} (lancer la phase report d'abord)")
        return
    with open(CSV_OUT, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f, delimiter=";"))
    by_id = {}
    for r in rows:
        by_id.setdefault(r["ID"], []).append(r)
    src_path = os.path.join(SCRIPT_DIR, "enrich_entreprises.py")
    with open(src_path, "r", encoding="utf-8") as f:
        src = f.read()
    changed, details = 0, []
    for ent in MASTER_ENTREPRISES:
        if only and ent["ID"] not in only:
            continue
        rs = by_id.get(ent["ID"])
        if not rs:
            continue
        urls = []
        for r in rs:
            if r["Confiance"] == "haute" and r["LinkedIn_trouve"]:
                urls.append(r["LinkedIn_trouve"])
            elif r["LinkedIn_base"]:
                urls.append(r["LinkedIn_base"])
            else:
                urls.append("")
        while urls and not urls[-1]:
            urls.pop()
        new_val = " / ".join(urls)
        if not new_val or new_val == ent["LinkedIn_Contact"]:
            continue
        block_re = re.compile(r'("ID":\s*"' + re.escape(ent["ID"]) + r'".*?"LinkedIn_Contact":\s*")([^"]*)(")', re.S)
        m = block_re.search(src)
        if not m:
            print(f"[APPLY] {ent['ID']} : bloc LinkedIn_Contact introuvable, ignoré")
            continue
        src = src[:m.start(2)] + new_val + src[m.end(2):]
        changed += 1
        details.append(f"{ent['ID']} {ent['Nom_Entreprise']}: {ent['LinkedIn_Contact']} -> {new_val}")
    with open(src_path, "w", encoding="utf-8") as f:
        f.write(src)
    for d in details:
        print("[APPLY] " + d)
    print(f"[APPLY] {changed} entreprise(s) mise(s) à jour dans enrich_entreprises.py")
    print("[APPLY] Relancer ensuite : python scripts/enrich_entreprises.py && python scripts/update_initial_data.py")


if __name__ == "__main__":
    phase, force, only = parse_args()
    {"firecrawl": phase_firecrawl, "perplexity": phase_perplexity, "report": phase_report, "apply": phase_apply}[phase](force, only)
