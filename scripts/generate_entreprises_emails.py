"""
Ambition Campus — Générateur Master d'Emails de Prospection pour les Entreprises (48 Entreprises)
Génère pour chaque entreprise les 3 variantes A/B/C personnalisées avec la signature d'Ilias Khafague.
"""

import os
import re
import pandas as pd

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(SCRIPT_DIR, "..", "prospection", "entreprises", "entreprises_database.csv")
OUT_DIR = os.path.join(SCRIPT_DIR, "..", "prospection", "entreprises", "emails_generes")

SIGNATURE = """Ilias Khafague
Pôle Partenariats & Financements — Ambition Campus
📧 ambitioncampus@gmail.com | 📞 06 98 99 62 00
🌐 Site web : https://ambitioncampus.com
🔗 LinkedIn : https://www.linkedin.com/company/ambition-campus/posts/?feedView=all"""


def generate_all_enterprise_emails():
    os.makedirs(OUT_DIR, exist_ok=True)
    if not os.path.exists(CSV_PATH):
        print(f"Erreur : fichier {CSV_PATH} introuvable.")
        return

    df = pd.read_csv(CSV_PATH, sep=";", encoding="utf-8-sig")
    print(f"Génération des emails pour {len(df)} entreprises...")

    for idx, row in df.iterrows():
        eid = str(row.get("ID", f"ENT-{idx+1}"))
        name = str(row.get("Nom_Entreprise", "Entreprise"))
        secteur = str(row.get("Secteur_Activite", "Secteur Privé"))
        contact = str(row.get("Nom_Contact", "Madame, Monsieur"))
        poste = str(row.get("Poste_Contact", "Direction RSE & Mécénat"))
        email = str(row.get("Email_Contact", "rse@entreprise.com"))
        site = str(row.get("Site_Web", ""))
        pitch = str(row.get("Angle_Pitch_Ambition_Campus", ""))
        ticket = str(row.get("Ticket_Moyen_Estime", "10 000 € - 20 000 €"))
        prio = str(row.get("Priorite", "Tier 2"))
        fiscal = str(row.get("Levier_Fiscal_60pct", "Déduction 60% IS (Art. 238 bis CGI)"))

        # Formule de salutation polie
        if "Direction" in contact or "Équipe" in contact or "Pôle" in contact or "Responsable" in contact:
            salutation = "Bonjour Madame, Monsieur,"
        else:
            salutation = f"Bonjour {contact},"

        content = f"""================================================================================
🏢 DOSSIER PROSPECTION ENTREPRISE : {name} ({eid})
Secteur : {secteur} | Priorité : {prio}
Contact : {contact} ({poste})
Email cible : {email}
Site Web : {site}
Ticket estimé : {ticket} | Fiscalité : {fiscal}
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

Pourquoi ce partenariat avec {name} fait sens :
{pitch}

Levier fiscal (Art. 238 bis CGI) : 60 % de déduction sur l'impôt sur les sociétés (un soutien de 10 000 € ne vous revient qu'à 4 000 € net).

Vous trouverez ci-joint notre fiche synthétique A4 résumant nos résultats et nos besoins de financement.

Seriez-vous disponible pour un court échange téléphonique de 15 minutes la semaine prochaine (ex: mardi ou jeudi matin) ?

Bien cordialement,

{SIGNATURE}


--------------------------------------------------------------------------------
📧 OPTION 2 : VARIANTE B (Angle Preuve Sociale & Cercle des Partenaires)
--------------------------------------------------------------------------------
Objet : PwC, Deloitte, Banque de France : rejoindre les mécènes d'Ambition Campus
Objet alternatif : [Mécénat 2026-2027] Devenir Mécène Partenaire Officiel d'Ambition Campus

{salutation}

Des institutions comme PwC, EY, Deloitte, KPMG ou la Banque de France collaborent déjà activement avec Ambition Campus en mobilisant leurs collaborateurs pour nos simulations d'oraux blancs.

Depuis 17 ans, notre association 100 % bénévole accompagne chaque année plus de 500 lycéens issus de 36 lycées partenaires (Paris/IDF, Reims, Poitiers, Menton) vers les filières sélectives du supérieur.

En 2026, cette mobilisation conjointe a permis des résultats historiques :
• 21 lycéens admis à Sciences Po Paris, 17 à La Sorbonne, 13 en prépas d'élite.
• Plus de 210 oraux blancs et jurys d'admission organisés sur l'année.
• 100 % de transparence : zéro frais administratif, l'intégralité des dons finance directement les actions terrain des jeunes.

Nous souhaitons aujourd'hui élargir notre cercle de partenaires et vous proposer d'associer {name} au parrainage officiel de notre promotion 2026-2027 (convention annuelle, visibilité RSE, jurys VIP et déduction fiscale de 60 % sur l'IS).

Vous trouverez en pièce jointe notre document de présentation A4.

Auriez-vous 15 minutes la semaine prochaine pour un premier échange d'introduction ?

Bien cordialement,

{SIGNATURE}


--------------------------------------------------------------------------------
📧 OPTION 3 : VARIANTE C (Angle Talents, Éloquence & Marque Employeur)
--------------------------------------------------------------------------------
Objet : [Diversité & Talents] Ouvrir vos métiers aux lycéens d'excellence avec Ambition Campus
Objet alternatif : Briser l'autocensure : parrainez la promo 2026-2027 d'Ambition Campus

{salutation}

L'autocensure reste aujourd'hui le premier obstacle qui prive les grandes entreprises de profils brillants issus des quartiers populaires.

Depuis 2008, Ambition Campus forme plus de 500 lycéens par an aux codes de l'excellence académique et professionnelle à travers :
🎤 Des modules intensifs d'art oratoire et d'éloquence (méthode Ethos / Pathos / Logos).
💼 Des immersions professionnelles et découvertes des métiers de cadre et dirigeant.
🎯 Un accompagnement individuel par 75 mentors engagés.

Les résultats 2026 :
• 21 admis à Sciences Po Paris, 17 à La Sorbonne (Droit/Éco), 13 en classes prépas d'élite.
• Une note de satisfaction de 9,2 / 10 par les élèves et leurs mentors.
• Coût net par élève : seulement 35 € / an grâce à notre modèle 100 % bénévole.

En soutenant Ambition Campus (déduction IS de 60 % via l'Art. 238 bis CGI), vous financez l'ascension sociale de ces jeunes tout en valorisant vos engagements RSE et votre marque employeur auprès de futurs talents.

Vous trouverez ci-joint notre plaquette synthétique A4.

Seriez-vous disponible pour un court échange de 15 minutes la semaine prochaine afin d'en discuter ?

Bien cordialement,

{SIGNATURE}
"""
        clean_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', name)[:35]
        file_path = os.path.join(OUT_DIR, f"{eid}_{clean_name}.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

    print(f"[OK] 48 fichiers d'emails complets (Variantes A, B, C) generes dans : {OUT_DIR}")


if __name__ == "__main__":
    generate_all_enterprise_emails()
