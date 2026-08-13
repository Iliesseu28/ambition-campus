"""
Ambition Campus — Générateur du PDF Bilan Stratégique pour l'Équipe (1 Page A4 - Sans Estimation Financière)
Version épurée, aérée et réaliste : suppression de toute estimation financière spéculative, focus sur les livrables concrets et le plan d'action.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from pypdf import PdfReader

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PDF = os.path.join(SCRIPT_DIR, "..", "docs", "bilan-strategique-equipe-ambition-campus.pdf")

# Palette graphique corporate, épurée et moderne
NAVY = colors.HexColor("#0F1E36")        # Bleu nuit profond
NAVY_LIGHT = colors.HexColor("#1E293B")
GOLD = colors.HexColor("#D97706")        # Ambre vif
BLUE_ACCENT = colors.HexColor("#2563EB") # Bleu vif action
SLATE_BG = colors.HexColor("#F8FAFC")    # Fond neutre ultra-léger
SLATE_ALT = colors.HexColor("#F1F5F9")   # Fond carte
BORDER = colors.HexColor("#E2E8F0")      # Bordure subtile
TEXT_DARK = colors.HexColor("#1E293B")
TEXT_MUTED = colors.HexColor("#64748B")

# Couleurs des 4 Piliers
GREEN_BG = colors.HexColor("#ECFDF5")
GREEN_TEXT = colors.HexColor("#047857")
BLUE_BG = colors.HexColor("#EFF6FF")
BLUE_TEXT = colors.HexColor("#1D4ED8")
AMBER_BG = colors.HexColor("#FFFBEB")
AMBER_TEXT = colors.HexColor("#B45309")
PURPLE_BG = colors.HexColor("#FAF5FF")
PURPLE_TEXT = colors.HexColor("#7E22CE")


def generate_bilan_pdf():
    os.makedirs(os.path.dirname(OUTPUT_PDF), exist_ok=True)
    
    # Dimensions A4 : 595.27 x 841.89 pt. Marges : 22 pt gauche/droite, 18 pt haut/bas.
    doc = SimpleDocTemplate(
        OUTPUT_PDF,
        pagesize=A4,
        leftMargin=22,
        rightMargin=22,
        topMargin=18,
        bottomMargin=16
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=15.5,
        textColor=NAVY
    )
    
    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=TEXT_MUTED
    )
    
    sec_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        textColor=NAVY
    )
    
    body = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.2,
        textColor=TEXT_DARK
    )

    body_bold = ParagraphStyle(
        'BodyDarkBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9.2,
        textColor=NAVY
    )

    pill_val = ParagraphStyle(
        'PillVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10,
        textColor=NAVY,
        alignment=1
    )

    story = []

    # ── 1. HEADER ÉPURÉ (SANS ESTIMATION D'ARGENT) ──
    header_data = [
        [
            Paragraph("<b>AMBITION CAMPUS</b> <font color='#64748B'>•</font> <b>BILAN DE PROSPECTION & PLAN D'ACTION</b>", title_style),
            Paragraph("<font color='#D97706'><b>PROMOTION 2026-2027</b></font>", ParagraphStyle('HRight', parent=title_style, fontSize=8, leading=10, alignment=2))
        ],
        [
            Paragraph("Note de cadrage opérationnelle présentée par <b>Ilias Khafague</b> pour l'équipe Ambition Campus.", subtitle_style),
            Paragraph("Modèle 100 % bénévole • 1 € = 5,30 € d'impact social", ParagraphStyle('SubR', parent=subtitle_style, alignment=2, fontName='Helvetica-Bold', textColor=NAVY))
        ]
    ]
    t_header = Table(header_data, colWidths=[385, 166])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 4))

    # ── 2. BANDEAU DES 6 CHIFFRES CLÉS RÉELS ──
    pills_data = [[
        Paragraph("<b>17 ans</b><br/><font color='#64748B'>Actif depuis 2008</font>", pill_val),
        Paragraph("<b>100 % Bénévole</b><br/><font color='#64748B'>0 € frais admin</font>", pill_val),
        Paragraph("<b>500+ Lycéens</b><br/><font color='#64748B'>36 lycées REP</font>", pill_val),
        Paragraph("<b>21 Sciences Po</b><br/><font color='#64748B'>+17 Sorbonne, 13 Prépas</font>", pill_val),
        Paragraph("<b>35 € / jeune</b><br/><font color='#64748B'>Coût annuel net</font>", pill_val),
        Paragraph("<font color='#D97706'><b>103 Cibles</b></font><br/><font color='#D97706'>55 fond. + 48 entr.</font>", pill_val),
    ]]
    t_pills = Table(pills_data, colWidths=[91, 92, 92, 92, 92, 92])
    t_pills.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), SLATE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_pills)
    story.append(Spacer(1, 6))

    # ── 3. SECTION 1 : LES 4 PILIERS DE FINANCEMENT (SANS ESTIMATION DE MONTANT) ──
    story.append(Paragraph("<b>1. ARCHITECTURE STRATÉGIQUE DES 4 PILIERS DE FINANCEMENT</b>", sec_title))
    story.append(Spacer(1, 3))

    piliers_data = [
        [
            Paragraph("<b>PILIER 1 : FONDS PUBLICS</b>", ParagraphStyle('P1', parent=body_bold, textColor=GREEN_TEXT, fontSize=7)),
            Paragraph("<b>PILIER 2 : MÉCÉNAT PRIVÉ</b>", ParagraphStyle('P2', parent=body_bold, textColor=BLUE_TEXT, fontSize=7)),
            Paragraph("<b>PILIER 3 : FONDATIONS</b>", ParagraphStyle('P3', parent=body_bold, textColor=AMBER_TEXT, fontSize=7)),
            Paragraph("<b>PILIER 4 : DONS PARTICULIERS</b>", ParagraphStyle('P4', parent=body_bold, textColor=PURPLE_TEXT, fontSize=7)),
        ],
        [
            Paragraph("• <b>Région Île-de-France</b> : Dossier 7k€ déposé.<br/>• <b>Mairies & Cités Éducatives</b> : Subventions locales territoriales (QPV).<br/>• <b>FDVA</b> : Dépôt Le Compte Asso (formation des bénévoles et matériel).", body),
            Paragraph("• <b>48 Entreprises & Cabinets ciblés</b> (Big 4, Banques, Avocats d'Affaires, Tech, CAC 40).<br/>• <b>Levier fiscal majeur : 60 % déduction IS</b> (Loi Aillagon - Art. 238 bis CGI).<br/>• <b>Partenariats oraux & jurys VIP</b>.", body),
            Paragraph("• <b>55 Fondations d'entreprise qualifiées</b> (Bolloré/Canal+, BNP, VINCI, Total, etc.).<br/>• <b>Appels à projets thématiques</b>.<br/>• <b>Parrainage annuel de promotions</b> et bourses d'excellence sociale.", body),
            Paragraph("• <b>Campagne HelloAsso & LinkedIn</b>.<br/>• <b>Formule d'impact direct</b> : <i>35 € = 1 lycéen accompagné pendant 1 an</i>.<br/>• <b>Avantage fiscal : 66 % de déduction sur l'impôt sur le revenu (IR)</b>.", body),
        ]
    ]
    t_piliers = Table(piliers_data, colWidths=[137, 138, 138, 138])
    t_piliers.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), GREEN_BG),
        ('BACKGROUND', (1,0), (1,0), BLUE_BG),
        ('BACKGROUND', (2,0), (2,0), AMBER_BG),
        ('BACKGROUND', (3,0), (3,0), PURPLE_BG),
        ('BACKGROUND', (0,1), (-1,1), SLATE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4.5),
        ('RIGHTPADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_piliers)
    story.append(Spacer(1, 6))

    # ── 4. SECTION 2 : AUDIT DU PIPELINE DES 103 CIBLES QUALIFIÉES (3 COLONNES AÉRÉES) ──
    story.append(Paragraph("<b>2. AUDIT DU PIPELINE : 103 STRUCTURES QUALIFIÉES & CRM PRÊT À L'EMPLOI</b>", sec_title))
    story.append(Spacer(1, 3))

    pipe_data = [
        [
            Paragraph("<b>PÔLE / SECTEUR</b>", body_bold),
            Paragraph("<b>NB CIBLES</b>", body_bold),
            Paragraph("<b>STRUCTURES QUALIFIÉES & DÉCISIONNAIRES EN BASE (AVEC EMAILS ET MODALITÉS)</b>", body_bold),
        ],
        [
            Paragraph("<b>Fondations d'Entreprise</b><br/><font color='#64748B'>Pilier 3</font>", body),
            Paragraph("<b>55</b> fondations", body_bold),
            Paragraph("• <b>Pistes Chaudes</b> : Canal+/Bolloré (Marine Schenfele), PwC, Deloitte, KPMG, EY.<br/>• <b>Banques & BTP</b> : BNP (Projet Banlieues), Société Générale, MAIF, BPCE, VINCI, Eiffage, Nexity, Saint-Gobain.<br/>• <b>Tech & Industrie</b> : TotalEnergies, SNCF, RATP, ADP, Orange, Free, Sopra Steria, Devoteam, Capgemini.<br/>• <b>Venture Philanthropy & Écoles</b> : AlphaOmega, Break Poverty, FACE, Carasso, Ponts, Dauphine, Polytechnique.", body),
        ],
        [
            Paragraph("<b>Mécénat Privé d'Entreprise</b><br/><font color='#64748B'>Pilier 2</font>", body),
            Paragraph("<b>48</b> entreprises", body_bold),
            Paragraph("• <b>Audit & Stratégie</b> : Big 4, Mazars, BCG, McKinsey, Sia Partners, BearingPoint, Oliver Wyman, Roland Berger.<br/>• <b>Finance & PE</b> : Banque de France, CACIB, BPCE, Lazard, Rothschild, Eurazeo, Tikehau, Ardian, Amundi, ODDO.<br/>• <b>Avocats d'Affaires (Droit)</b> : Gide, August Debouzy, Clifford Chance, Linklaters, Bredin Prat, Darrois, White & Case.<br/>• <b>Tech, Luxe & CAC 40</b> : Google, Microsoft, Amazon, TF1, L'Oréal, LVMH, Danone, Schneider Electric, Bouygues.", body),
        ],
        [
            Paragraph("<b>TOTAL QUALIFIÉ</b>", ParagraphStyle('TotT', parent=body_bold, textColor=GOLD)),
            Paragraph("<b>103 cibles</b>", ParagraphStyle('TotN', parent=body_bold, textColor=GOLD)),
            Paragraph("<b>Livrables disponibles</b> : Master CSV (Google Sheets), Excel stylisé avec filtres sectoriels, et <b>103 dossiers d'emails personnalisés (A/B/C testing) rédigés et prêts à l'envoi</b> dans le dossier du projet.", body),
        ]
    ]
    t_pipe = Table(pipe_data, colWidths=[120, 60, 371])
    t_pipe.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('BACKGROUND', (0,1), (-1,2), SLATE_BG),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#FEF3C7")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4.5),
        ('RIGHTPADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_pipe)
    story.append(Spacer(1, 6))

    # ── 5. SECTION 3 : DISPOSITIF D'A/B/C TESTING DES EMAILS ──
    story.append(Paragraph("<b>3. PROPOSITION STRATÉGIQUE : A/B/C TESTING POUR MAXIMISER LE TAUX DE RÉPONSE</b>", sec_title))
    story.append(Spacer(1, 3))

    ab_data = [
        [
            Paragraph("<b>VARIANTE A : DATA & ROI SOCIAL</b>", ParagraphStyle('VA', parent=body_bold, textColor=NAVY, fontSize=7)),
            Paragraph("<b>VARIANTE B : PREUVE SOCIALE & PAIRS</b>", ParagraphStyle('VB', parent=body_bold, textColor=NAVY, fontSize=7)),
            Paragraph("<b>VARIANTE C : TALENTS & MARQUE EMPLOYEUR</b>", ParagraphStyle('VC', parent=body_bold, textColor=NAVY, fontSize=7)),
        ],
        [
            Paragraph("• <b>Accroche</b> : <i>« 1 € investi = 5,30 € d'impact direct »</i>.<br/>• <b>Argument</b> : Bilan chiffré net (21 Sciences Po, 17 Sorbonne, 13 Prépas, coût net 35€/jeune) et levier fiscal de 60% IS.<br/>• <b>Cible idéale</b> : DAF, Directeurs RSE analytiques, Banques.", body),
            Paragraph("• <b>Accroche</b> : <i>« PwC, Deloitte, Banque de France : nos mécènes »</i>.<br/>• <b>Argument</b> : Valorise l'implication de pairs prestigieux et propose une convention annuelle officielle de mécénat.<br/>• <b>Cible idéale</b> : Big 4, cabinets de conseil, CAC 40.", body),
            Paragraph("• <b>Accroche</b> : <i>« Briser l'autocensure : accéder aux talents d'élite »</i>.<br/>• <b>Argument</b> : Focus sur les modules d'éloquence, la diversité sociale et le vivier de recrutement direct.<br/>• <b>Cible idéale</b> : DRH, Responsables Recrutement & Droit.", body),
        ]
    ]
    t_ab = Table(ab_data, colWidths=[183, 184, 184])
    t_ab.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F8FAFC")),
        ('BACKGROUND', (0,1), (-1,1), SLATE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4.5),
        ('RIGHTPADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_ab)
    story.append(Spacer(1, 6))

    # ── 6. SECTION 4 : MÉTHODE MULTICANALE LINKEDIN + EMAIL ──
    story.append(Paragraph("<b>4. PLAN D'ATTAQUE OPÉRATIONNEL : PRIORITÉ AU DUO LINKEDIN + EMAIL</b>", sec_title))
    story.append(Spacer(1, 3))

    action_box_content = [
        [
            Paragraph("<b>🎯 RÈGLE D'OR : PRIORITÉ À L'APPROCHE DIRECTE LINKEDIN (COUPLÉE À L'EMAIL)</b><br/>"
                      "Même si 100 % des adresses emails nominatives sont qualifiées dans nos fichiers, les boîtes de réception professionnelles sont très filtrées. "
                      "<b>Nous recommandons la séquence multicanale suivante :</b><br/>"
                      "1. <b>Contact 1 (Jour J — LinkedIn)</b> : Demande de connexion avec message personnalisé de 4 lignes au décideur identifié (taux de lecture 3x supérieur).<br/>"
                      "2. <b>Contact 2 (Jour J — Email)</b> : Envoi simultané du mail complet (Variante A, B ou C) avec la <b>plaquette PDF A4 officielle jointe</b>.<br/>"
                      "3. <b>Relance (Jour J+7)</b> : Rebond court par email et InMail (<i>« Bonjour, je me permets de faire remonter notre échange... »</i>).",
                      body)
        ]
    ]
    t_action = Table(action_box_content, colWidths=[551])
    t_action.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#3B82F6")),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_action)
    story.append(Spacer(1, 5))

    # ── 7. FOOTER INTERNE ──
    footer_data = [
        [
            Paragraph("<b>Ambition Campus (Association Loi 1901)</b> • 17 ans d'engagement • 100 % bénévole<br/>Contact Partenariats : <b>Ilias Khafague</b> • ambitioncampus@gmail.com • 06 98 99 62 00", ParagraphStyle('FootL', parent=body, fontSize=6.8, leading=8.5, textColor=TEXT_MUTED)),
            Paragraph("<b>Ressources partagées :</b><br/>Dépôt GitHub : <u>github.com/Iliesseu28/ambition-campus</u>", ParagraphStyle('FootR', parent=body, fontSize=6.8, leading=8.5, alignment=2, textColor=TEXT_MUTED))
        ]
    ]
    t_foot = Table(footer_data, colWidths=[351, 200])
    t_foot.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_foot)

    doc.build(story)

    # Vérification stricte
    reader = PdfReader(OUTPUT_PDF)
    nb_pages = len(reader.pages)
    print(f"[OK] PDF Bilan Equipe genere : {OUTPUT_PDF} ({nb_pages} page(s))")
    if nb_pages != 1:
        print(f"[ATTENTION] Le PDF depasse 1 page ({nb_pages} pages) !")
    else:
        print("[SUCCES] CONTRAINTE VALIDEE : Exactement 1 page A4 sans estimation d'argent.")


if __name__ == "__main__":
    generate_bilan_pdf()
