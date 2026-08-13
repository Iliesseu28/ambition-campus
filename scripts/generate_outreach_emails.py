"""
Ambition Campus — Générateur Master d'Emails de Prospection pour les Fondations (55 Fondations)
Génère pour chaque fondation les 3 variantes A/B/C personnalisées avec la signature d'Ilias Khafague.
"""

import os
import re
import pandas as pd

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(SCRIPT_DIR, "..", "prospection", "fondations", "fondations_database.csv")
OUT_DIR = os.path.join(SCRIPT_DIR, "..", "prospection", "fondations", "emails_generes")

SIGNATURE = """Ilias Khafague
Pôle Partenariats & Financements — Ambition Campus
📧 ambitioncampus@gmail.com | 📞 06 98 99 62 00
🌐 Site web : https://ambitioncampus.com
🔗 LinkedIn : https://www.linkedin.com/company/ambition-campus/posts/?feedView=all"""


def generate_all_foundation_emails():
    os.makedirs(OUT_DIR, exist_ok=True)
    if not os.path.exists(CSV_PATH):
        print(f"Erreur : fichier {CSV_PATH} introuvable.")
        return

    df = pd.read_csv(CSV_PATH, sep=";", encoding="utf-8-sig")
    print(f"Génération des emails pour {len(df)} fondations...")

    for idx, row in df.iterrows():
        fid = str(row.get("ID", f"FOND-{idx+1}"))
        name = str(row.get("Nom_Fondation", "Fondation"))
        parent = str(row.get("Groupe_Parent", "Groupe"))
        contact = str(row.get("Nom_Contact", "Madame, Monsieur"))
        poste = str(row.get("Poste_Contact", "Direction du Mécénat"))
        email = str(row.get("Email_Contact", "contact@fondation.org"))
        site = str(row.get("Site_Web", ""))
        aap = str(row.get("Lien_Depot_AAP", ""))
        pitch = str(row.get("Angle_Pitch_Ambition_Campus", ""))
        ticket = str(row.get("Ticket_Moyen_Estime", "15 000 € - 30 000 €"))
        prio = str(row.get("Priorite", "Tier 2"))

        # Formule de salutation polie
        if "Direction" in contact or "Équipe" in contact or "Collège" in contact or "Responsable" in contact:
            salutation = "Bonjour Madame, Monsieur,"
        else:
            salutation = f"Bonjour {contact},"

        content = f"""================================================================================
🏛️ DOSSIER PROSPECTION FONDATION : {name} ({fid})
Groupe : {parent} | Priorité : {prio}
Contact : {contact} ({poste})
Email cible : {email}
Site Web : {site} | Plateforme AAP : {aap}
Dotation estimée : {ticket}
================================================================================

--------------------------------------------------------------------------------
📧 OPTION 1 : VARIANTE A (Angle Chiffres Clés, Mesure d'Impact & ROI Social)
--------------------------------------------------------------------------------
Objet : [Impact 2026] 1 € investi = 5,30 € d'impact direct / Ambition Campus
Objet alternatif : 500+ lycéens propulsés vers l'excellence : les chiffres 2026 d'Ambition Campus

{salutation}

Depuis 17 ans, notre association Ambition Campus (Loi 1901 / ESS, 100 % bénévole) prouve qu'un accompagnement méthodique brise le plafond de verre des lycéens issus de milieux populaires (QPV / 36 lycées REP).

Voici le bilan chiffré de notre promotion 2026 :
📊 500+ lycéens accompagnés par 525 binômes de mentorat actifs.
🎓 21 admis à Sciences Po Paris, 17 à La Sorbonne, 13 en classes préparatoires d'élite (Henri IV, Saint-Louis, Lakanal).
💡 Social ROI certifié : 1 € investi = 5,30 € de valeur d'accompagnement terrain (coût net : 35 € / an par jeune).
⭐ Note de satisfaction : 9,2 / 10 mesurée auprès des lycéens et des 75 mentors.

Pourquoi notre projet résonne avec la {name} :
{pitch}

Nous recherchons de nouveaux mécènes pour financer le déploiement de notre promotion 2026-2027. Vous trouverez ci-joint notre fiche synthétique A4 résumant notre modèle et nos résultats.

Seriez-vous disponible pour un court échange téléphonique de 15 minutes la semaine prochaine (ex: mardi ou jeudi matin) ?

Bien cordialement,

{SIGNATURE}


--------------------------------------------------------------------------------
📧 OPTION 2 : VARIANTE B (Angle Preuve Sociale & Cercle des Partenaires)
--------------------------------------------------------------------------------
Objet : PwC, Deloitte, Banque de France : rejoindre les partenaires d'Ambition Campus
Objet alternatif : [Candidature Mécénat] Soutenir la promotion 2026-2027 d'Ambition Campus

{salutation}

Des institutions comme PwC, EY, Deloitte, KPMG ou la Banque de France collaborent déjà activement avec Ambition Campus en mobilisant leurs collaborateurs pour nos simulations d'oraux blancs.

Depuis 17 ans, notre association 100 % bénévole accompagne chaque année plus de 500 lycéens issus de 36 lycées partenaires (Paris/IDF, Reims, Poitiers, Menton) vers les filières sélectives du supérieur.

En 2026, cette mobilisation conjointe a permis des résultats historiques :
• 21 lycéens admis à Sciences Po Paris, 17 à La Sorbonne, 13 en prépas d'élite.
• Plus de 210 oraux blancs et jurys d'admission organisés sur l'année.
• 100 % de transparence : zéro frais administratif, l'intégralité des dons finance directement les actions terrain des jeunes.

Nous souhaitons aujourd'hui élargir notre cercle de mécènes et vous proposer d'associer la {name} au parrainage de notre promotion 2026-2027.

Vous trouverez en pièce jointe notre document de présentation A4.

Auriez-vous 15 minutes la semaine prochaine pour un premier échange d'introduction ?

Bien cordialement,

{SIGNATURE}


--------------------------------------------------------------------------------
📧 OPTION 3 : VARIANTE C (Angle Émancipation, Éloquence & Marque Employeur)
--------------------------------------------------------------------------------
Objet : [Égalité des chances] Briser l'autocensure des lycéens de quartiers avec Ambition Campus
Objet alternatif : [Diversité & Talents] Parrainez la promo 2026-2027 d'Ambition Campus

{salutation}

L'autocensure reste aujourd'hui le premier obstacle qui prive la jeunesse des quartiers populaires de l'accès aux filières d'excellence et aux carrières de cadres et dirigeants.

Depuis 2008, Ambition Campus forme plus de 500 lycéens par an aux codes de l'excellence académique et professionnelle à travers :
🎤 Des modules intensifs d'art oratoire et d'éloquence (méthode Ethos / Pathos / Logos).
💼 Des immersions professionnelles et découvertes des métiers d'excellence.
🎯 Un accompagnement individuel par 75 mentors engagés.

Les résultats 2026 :
• 21 admis à Sciences Po Paris, 17 à La Sorbonne (Droit/Éco), 13 en classes prépas prestigieuses.
• Une note de satisfaction de 9,2 / 10 par les élèves et leurs mentors.
• Coût net par élève : seulement 35 € / an grâce à notre structure 100 % bénévole.

En soutenant Ambition Campus, la {name} finance l'émancipation concrète de ces jeunes tout en valorisant vos engagements sociétaux et territoriaux.

Vous trouverez ci-joint notre plaquette synthétique A4.

Seriez-vous disponible pour un court échange de 15 minutes la semaine prochaine afin d'en discuter ?

Bien cordialement,

{SIGNATURE}
"""
        clean_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', name)[:35]
        file_path = os.path.join(OUT_DIR, f"{fid}_{clean_name}.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

    print(f"[OK] 55 fichiers d'emails complets (Variantes A, B, C) generes dans : {OUT_DIR}")


if __name__ == "__main__":
    generate_all_foundation_emails()
