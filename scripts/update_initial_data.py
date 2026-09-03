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

    # Récupérer les contacts AAP
    aap_contacts = []
    # Vérifier si on peut charger les contacts AAP existants
    try:
        import subprocess
        git_show = subprocess.check_output(
            ["git", "show", "HEAD:ambition-crm/src/initialData.json"],
            cwd=SCRIPT_DIR,
            text=True,
            encoding="utf-8"
        )
        old_data = json.loads(git_show)
        aap_contacts = [c for c in old_data.get("contacts", []) if c.get("target_type") == "aap"]
    except Exception as e:
        print(f"Note : extraction git contacts AAP ({e})")
        aap_contacts = [c for c in data.get("contacts", []) if c.get("target_type") == "aap"]

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

            new_enterprise_contacts.append({
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
            })

    data["entreprises"] = new_entreprises
    data["contacts"] = new_enterprise_contacts + aap_contacts

    with open(INITIAL_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"[OK] initialData.json mis a jour avec succès :")
    print(f"  • {len(new_entreprises)} entreprises")
    print(f"  • {len(new_enterprise_contacts)} contacts entreprises OSINT")
    print(f"  • {len(aap_contacts)} contacts AAP / fondations")
    print(f"  • Total contacts dans le CRM : {len(data['contacts'])}")


if __name__ == "__main__":
    update_crm_initial_data()
