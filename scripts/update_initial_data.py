"""
Ambition Campus — Synchronisation & Mise à jour d'initialData.json (CRM)
Met à jour le fichier ambition-crm/src/initialData.json avec les 48 entreprises Master et leurs contacts OSINT qualifiés.
"""

import json
import os
from enrich_entreprises import MASTER_ENTREPRISES

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INITIAL_DATA_PATH = os.path.join(SCRIPT_DIR, "..", "ambition-crm", "src", "initialData.json")


def update_crm_initial_data():
    if not os.path.exists(INITIAL_DATA_PATH):
        print(f"Erreur : {INITIAL_DATA_PATH} introuvable.")
        return

    # Charger le fichier actuel ou depuis git pour récupérer les contacts AAP
    with open(INITIAL_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Contacts AAP / fondations : on part TOUJOURS du fichier courant (il porte le suivi à jour).
    # Le repli sur git ne sert que si le fichier n'en contient aucun.
    aap_contacts = [c for c in data.get("contacts", []) if c.get("target_type") == "aap"]
    if not aap_contacts:
        try:
            import subprocess
            git_show = subprocess.check_output(
                ["git", "show", "HEAD:ambition-crm/src/initialData.json"],
                cwd=SCRIPT_DIR,
                text=True,
                encoding="utf-8"
            )
            aap_contacts = [c for c in json.loads(git_show).get("contacts", []) if c.get("target_type") == "aap"]
        except Exception as e:
            print(f"Note : extraction git contacts AAP ({e})")

    # Index de l'état de suivi existant (statuts, dates, notes, relances) : il ne doit JAMAIS être écrasé
    old_contacts = {c["id"]: c for c in data.get("contacts", []) if c.get("target_type") != "aap"}
    old_entreprises = {e["id"]: e for e in data.get("entreprises", [])}
    SUIVI = ("statut", "notes", "dernier_contact", "prochaine_relance", "telephone")

    # 1. Mise à jour des 48 entreprises
    new_entreprises = []
    new_enterprise_contacts = []

    for ent in MASTER_ENTREPRISES:
        eid = ent["ID"]
        name = ent["Nom_Entreprise"]
        secteur = ent["Secteur_Activite"]
        prio = ent["Priorite"]
        ticket = ent["Ticket_Moyen_Estime"]
        levier = ent["Levier_Fiscal_60pct"]
        approche = ent["Type_Approche"]
        pitch = ent["Angle_Pitch_Ambition_Campus"]
        statut = ent["Statut_Prospection"]
        site = ent["Site_Web"]
        notes = ent["Notes_Action"]

        old_ent = old_entreprises.get(eid, {})
        if old_ent.get("statut_global") and old_ent["statut_global"] != statut:
            print(f"  - {eid} : statut_global conservé « {old_ent['statut_global']} » (master : « {statut} »)")
            statut = old_ent["statut_global"]

        new_entreprises.append({
            "id": eid,
            "nom": name,
            "secteur": secteur,
            "priorite": prio,
            "ticket_estime": ticket,
            "levier_fiscal": levier,
            "type_approche": approche,
            "angle_pitch": pitch,
            "statut_global": statut,
            "site_web": site,
            "notes": notes,
            "created_at": "2026-08-21T12:00:00Z"
        })

        # Contacts décortiqués
        raw_contact = ent["Nom_Contact"]
        raw_poste = ent["Poste_Contact"]
        raw_email = ent["Email_Contact"]
        raw_linkedin = ent["LinkedIn_Contact"]

        contacts_names = [c.strip() for c in raw_contact.split(" / ")]
        contacts_postes = [p.strip() for p in raw_poste.split(" / ")]
        contacts_emails = [e.strip() for e in raw_email.split(" / ")]
        contacts_linkedin = [l.strip() for l in raw_linkedin.split(" / ")]

        for i, c_name in enumerate(contacts_names):
            c_poste = contacts_postes[i] if i < len(contacts_postes) else (contacts_postes[0] if contacts_postes else "Direction RSE & Mécénat")
            c_email = contacts_emails[i] if i < len(contacts_emails) else contacts_emails[0]
            cid = f"CNT-{eid}-{i+1}"

            old_c = old_contacts.pop(cid, {})
            if old_c.get("email") and old_c["email"] != c_email:
                print(f"  - {cid} : email du master « {c_email} » (CRM : « {old_c['email']} ») — vérifier lequel est bon")

            contact = {
                "id": cid,
                "target_type": "entreprise",
                "target_id": eid,
                "nom": c_name,
                "poste": c_poste,
                "email": c_email,
                "telephone": "",
                "linkedin": contacts_linkedin[i] if i < len(contacts_linkedin) else "",
                "statut": "À contacter",
                "notes": f"Contact qualifié OSINT pour {name}",
                "dernier_contact": None,
                "prochaine_relance": None
            }
            # On garde l'état de suivi du CRM (statut, notes enrichies Hunter/envois, dates)
            for champ in SUIVI:
                if old_c.get(champ):
                    contact[champ] = old_c[champ]
            new_enterprise_contacts.append(contact)

    # Contacts ajoutés à la main dans le CRM (nouveaux interlocuteurs, transferts) : à conserver
    contacts_ajoutes = list(old_contacts.values())

    data["entreprises"] = new_entreprises
    data["contacts"] = new_enterprise_contacts + contacts_ajoutes + aap_contacts
    data.setdefault("relances", [])

    with open(INITIAL_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"[OK] initialData.json mis a jour avec succès :")
    print(f"  • {len(new_entreprises)} entreprises")
    print(f"  • {len(new_enterprise_contacts)} contacts entreprises OSINT")
    print(f"  • {len(contacts_ajoutes)} contacts ajoutés dans le CRM (conservés)")
    print(f"  • {len(aap_contacts)} contacts AAP / fondations")
    print(f"  • {len(data.get('relances', []))} relances conservées")
    print(f"  • Total contacts dans le CRM : {len(data['contacts'])}")


if __name__ == "__main__":
    update_crm_initial_data()
