"""
Ambition Campus — Générateur Automatique d'Emails de Prospection Mécénat
Permet de générer en un clic des emails d'approche personnalisés pour n'importe quelle fondation de la base.
"""

import os
import pandas as pd

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(SCRIPT_DIR, "..", "prospection", "fondations", "fondations_database.csv")
OUT_DIR = os.path.join(SCRIPT_DIR, "..", "prospection", "fondations", "emails_generes")


def generate_emails():
    os.makedirs(OUT_DIR, exist_ok=True)
    if not os.path.exists(CSV_PATH):
        print(f"Erreur : base introuvable à {CSV_PATH}")
        return

    df = pd.read_csv(CSV_PATH, sep=";", encoding="utf-8-sig")
    print(f"Chargement de {len(df)} fondations...")

    for idx, row in df.iterrows():
        fid = row["ID"]
        name = row["Nom_Fondation"]
        contact = row["Nom_Contact"]
        poste = row["Poste_Contact"]
        email = row["Email_Contact"]
        theme = row["Thematiques_Cibles"]
        pitch = row["Angle_Pitch_Ambition_Campus"]
        ticket = row["Ticket_Moyen_Estime"]
        prio = row["Priorite"]

        email_content = f"""================================================================================
FICHE CONTACT : {name} ({fid})
Priorité : {prio}
Destinataire : {contact} ({poste})
Email cible : {email}
Ticket estimé : {ticket}
================================================================================

OBJET : [Partenariat Égalité des Chances] Soutenir l'ambition de 500+ lycéens avec Ambition Campus

Bonjour {contact},

Je me permets de vous contacter au nom de l'association Ambition Campus (Loi 1901 / ESS, active depuis 17 ans).

Au vu des engagements de la {name} en faveur de l'égalité des chances et de la jeunesse, nous serions ravis d'échanger sur une potentielle synergie pour l'année scolaire 2026-2027.

Ambition Campus accompagne chaque année plus de 500 lycéens issus de quartiers populaires (QPV / 36 lycées REP) vers les filières sélectives de l'enseignement supérieur (Sciences Po, CPGE, La Sorbonne, Dauphine, écoles d'ingénieurs).

Nos indicateurs clés 2026 :
• Résultats d'admissions : 21 admis à Sciences Po Paris, 17 à La Sorbonne, 13 en classes préparatoires prestigieuses (Henri IV, Saint-Louis, Lakanal).
• Modèle 100 % bénévole : 1 € investi = 5,30 € de valeur d'accompagnement direct sur le terrain (coût net : 35 € / lycéen par an).
• Mécanisme fiscal (Art. 238 bis CGI) : 60 % de déduction d'impôt sur les sociétés (un mécénat de 10 000 € revient à 4 000 € net).

Spécificité du partenariat proposé :
{pitch}

Vous trouverez en pièce jointe notre fiche de présentation synthétique A4.

Seriez-vous disponible pour un court échange de 15 minutes la semaine prochaine afin d'aborder une collaboration ?

Bien cordialement,

L'Équipe Partenariats & Financements
Ambition Campus
📧 ambitioncampus@gmail.com | 📞 06 98 99 62 00 | 🌐 ambitioncampus.com
"""
        filename = f"{fid}_{name.replace(' ', '_').replace('/', '_')[:30]}.txt"
        file_path = os.path.join(OUT_DIR, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(email_content)

    print(f"[OK] {len(df)} emails personnalises generes dans : {OUT_DIR}")


if __name__ == "__main__":
    generate_emails()
