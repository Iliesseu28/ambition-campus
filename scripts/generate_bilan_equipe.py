"""
Ambition Campus — Générateur du PDF Bilan Stratégique pour l'Équipe (1 Page A4)
Document interne de synthèse récapitulant l'impact, les 4 piliers, les 103 cibles qualifiées, l'A/B testing et la stratégie multicanale LinkedIn + Email.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from pypdf import PdfReader

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PDF = os.path.join(SCRIPT_DIR, "..", "docs", "bilan-strategique-equipe-ambition-campus.pdf")

# Palette graphique corporate & élégante
NAVY = colors.HexColor("#0F1E36")      # Bleu nuit institutionnel
GOLD = colors.HexColor("#D97706")      # Ambre/Or impact
ACCENT = colors.HexColor("#1E3A8A")    # Bleu royal
SLATE_BG = colors.HexColor("#F8FAFC")  # Fond carte clair
BORDER_COLOR = colors.HexColor("#E2E8F0") # Gris bordure
TEXT_DARK = colors.HexColor("#1E293B")
TEXT_MUTED = colors.HexColor("#64748B")
GREEN_BG = colors.HexColor("#ECFDF5")
GREEN_TEXT = colors.HexColor("#065F46")
BLUE_BG = colors.HexColor("#EFF6FF")
BLUE_TEXT = colors.HexColor("#1E40AF")
AMBER_BG = colors.HexColor("#FFFBEB")
AMBER_TEXT = colors.HexColor("#92400E")
PURPLE_BG = colors.HexColor("#FAF5FF")
PURPLE_TEXT = colors.HexColor("#6B21A8")


def generate_bilan_pdf():
    os.makedirs(os.path.dirname(OUTPUT_PDF), exist_ok=True)
    doc = SimpleDocTemplate(
        OUTPUT_PDF,
        pagesize=A4,
        leftMargin=24,
        rightMargin=24,
        topMargin=20,
        bottomMargin=18
    )

    styles = getSampleStyleSheet()
    
    # Définition des styles ultra-calibrés
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=17,
        textColor=NAVY,
        alignment=0
    )
    
    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=10.5,
        textColor=TEXT_MUTED
    )
    
    sec_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11.5,
        textColor=NAVY
    )
    
    body = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=TEXT_DARK
    )

    body_bold = ParagraphStyle(
        'BodyDarkBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=NAVY
    )

    pill_text = ParagraphStyle(
        'PillText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9,
        textColor=NAVY,
        alignment=1
    )

    story = []

    # ── HEADER ──
    header_data = [
        [
            Paragraph("<b>AMBITION CAMPUS — BILAN DE PROSPECTION & STRATÉGIE DE FINANCEMENT</b>", title_style),
            Paragraph("<b>NOTE DE CADRAGE INTERNE</b><br/><font color='#D97706'><b>Promotion 2026-2027</b></font>", ParagraphStyle('HRight', parent=title_style, fontSize=8.5, leading=10.5, alignment=2))
        ],
        [
            Paragraph("Document de synthèse opérationnel préparé par <b>Ilias Khafague</b> pour l'équipe Ambition Campus.", subtitle_style),
            Paragraph("Objectif : <b>Diversification des ressources & levée de 60k€ - 120k€</b>", ParagraphStyle('SubR', parent=subtitle_style, alignment=2, fontName='Helvetica-Bold', textColor=NAVY))
        ]
    ]
    t_header = Table(header_data, colWidths=[370, 177])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 4))

    # ── BANDEAU CHIFFRES CLÉS ──
    pills_data = [[
        Paragraph("<b>17 ans d'expérience</b><br/><font color='#64748B'>Fondée en 2008</font>", pill_text),
        Paragraph("<b>100 % Bénévole</b><br/><font color='#64748B'>0 € de frais admin</font>", pill_text),
        Paragraph("<b>500+ Lycéens / an</b><br/><font color='#64748B'>36 lycées REP</font>", pill_text),
        Paragraph("<b>21 Admis Sciences Po</b><br/><font color='#64748B'>+17 Sorbonne, 13 Prépas</font>", pill_text),
        Paragraph("<b>Social ROI : 1 € = 5,30 €</b><br/><font color='#64748B'>Coût net : 35 € / jeune</font>", pill_text),
        Paragraph("<b>103 Cibles Qualifiées</b><br/><font color='#D97706'>55 fond. + 48 entr.</font>", pill_text),
    ]]
    t_pills = Table(pills_data, colWidths=[91, 91, 91, 91, 91, 92])
    t_pills.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), SLATE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_pills)
    story.append(Spacer(1, 6))

    # ── SECTION 1 : STRATÉGIE DES 4 PILIERS DE FINANCEMENT ──
    story.append(Paragraph("<b>1. ARCHITECTURE STRATÉGIQUE DES 4 PILIERS DE FINANCEMENT</b>", sec_title))
    story.append(Spacer(1, 3))

    piliers_data = [
        [
            Paragraph("<b>PILIER 1 : FONDS PUBLICS</b>", ParagraphStyle('P1', parent=body_bold, textColor=GREEN_TEXT)),
            Paragraph("<b>PILIER 2 : MÉCÉNAT PRIVÉ</b>", ParagraphStyle('P2', parent=body_bold, textColor=BLUE_TEXT)),
            Paragraph("<b>PILIER 3 : FONDATIONS</b>", ParagraphStyle('P3', parent=body_bold, textColor=AMBER_TEXT)),
            Paragraph("<b>PILIER 4 : DONS PARTICULIERS</b>", ParagraphStyle('P4', parent=body_bold, textColor=PURPLE_TEXT)),
        ],
        [
            Paragraph("• <b>Région Île-de-France</b> : Dossier 7k€ déposé.<br/>• <b>Mairies & Cités Éducatives</b> : Subventions territoriales QPV.<br/>• <b>FDVA</b> : Dépôts annuels Le Compte Asso.<br/><b>Ticket visé : 5k€ - 15k€ / dossier</b>", body),
            Paragraph("• <b>Grandes Entreprises & Cabinets</b> : Audit, Conseil, Banques, Droit, CAC 40.<br/>• <b>Levier Fiscal majeur</b> : <b>60 % déduction IS</b> (Loi Aillagon).<br/>• <b>Soutien direct & jurys VIP</b>.<br/><b>Ticket visé : 10k€ - 30k€ / mécène</b>", body),
            Paragraph("• <b>Fondations d'Entreprise</b> : Appels à projets et fondations abritées.<br/>• <b>Bolloré, BNP, VINCI, Total, etc.</b><br/>• <b>Parrainage de promotions</b>.<br/><b>Ticket visé : 15k€ - 40k€ / fondation</b>", body),
            Paragraph("• <b>Campagne HelloAsso / LinkedIn</b>.<br/>• <b>Formule impact</b> : <i>35 € = 1 lycéen accompagné pendant 1 an</i>.<br/>• <b>Déduction fiscale 66 % IR</b>.<br/><b>Objectif : 10k€ - 20k€ / an</b>", body),
        ]
    ]
    t_piliers = Table(piliers_data, colWidths=[136, 137, 137, 137])
    t_piliers.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), GREEN_BG),
        ('BACKGROUND', (1,0), (1,0), BLUE_BG),
        ('BACKGROUND', (2,0), (2,0), AMBER_BG),
        ('BACKGROUND', (3,0), (3,0), PURPLE_BG),
        ('BACKGROUND', (0,1), (-1,1), SLATE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_piliers)
    story.append(Spacer(1, 6))

    # ── SECTION 2 : AUDIT DU PIPELINE DES 103 CIBLES QUALIFIÉES ──
    story.append(Paragraph("<b>2. AUDIT DU PIPELINE : 103 STRUCTURES QUALIFIÉES & CRM PRÊT À L'EMPLOI</b>", sec_title))
    story.append(Spacer(1, 3))

    pipe_data = [
        [
            Paragraph("<b>PÔLE / SECTEUR</b>", body_bold),
            Paragraph("<b>NB CIBLES</b>", body_bold),
            Paragraph("<b>STRUCTURES MAJEURES QUALIFIÉES (AVEC DÉCISIONNAIRES & EMAILS)</b>", body_bold),
            Paragraph("<b>POTENTIEL ESTIMÉ</b>", body_bold),
        ],
        [
            Paragraph("<b>Fondations d'Entreprise</b><br/>(Pilier 3)", body),
            Paragraph("<b>55</b> fondations", body_bold),
            Paragraph("<b>Pistes Chaudes</b> : Canal+/Bolloré (Marine Schenfele), PwC, Deloitte, KPMG, EY.<br/><b>Banques & BTP</b> : BNP (Projet Banlieues), Société Générale, MAIF, BPCE, VINCI, Eiffage.<br/><b>Industrie & Tech</b> : TotalEnergies, SNCF, RATP, ADP, Orange, Free, Sopra Steria, Devoteam.<br/><b>Venture Philanthropy</b> : AlphaOmega, Break Poverty, FACE, Carasso, Dauphine, Polytechnique.", body),
            Paragraph("<b>150 000 € à<br/>250 000 €</b>", ParagraphStyle('Pot1', parent=body_bold, textColor=NAVY)),
        ],
        [
            Paragraph("<b>Mécénat Privé d'Entreprise</b><br/>(Pilier 2)", body),
            Paragraph("<b>48</b> entreprises", body_bold),
            Paragraph("<b>Audit & Stratégie</b> : Big 4, Mazars, BCG, McKinsey, Sia Partners, BearingPoint, Oliver Wyman.<br/><b>Finance & Gestion</b> : Banque de France, CACIB, BPCE, Lazard, Rothschild, Eurazeo, Tikehau, Ardian.<br/><b>Avocats d'Affaires (Droit)</b> : Gide, August Debouzy, Clifford Chance, Linklaters, Bredin Prat.<br/><b>Tech, Luxe & CAC 40</b> : Google, Microsoft, Amazon, TF1, L'Oréal, LVMH, Danone, Schneider.", body),
            Paragraph("<b>180 000 € à<br/>300 000 €</b>", ParagraphStyle('Pot2', parent=body_bold, textColor=NAVY)),
        ],
        [
            Paragraph("<b>TOTAL QUALIFIÉ</b>", ParagraphStyle('TotT', parent=body_bold, textColor=GOLD)),
            Paragraph("<b>103 cibles</b>", ParagraphStyle('TotN', parent=body_bold, textColor=GOLD)),
            Paragraph("<b>Livrables disponibles</b> : Base Master CSV (import Google Sheets), Excel stylisé avec filtres sectoriels, et <b>103 dossiers d'emails personnalisés prêts à l'envoi</b> dans le dépôt.", body),
            Paragraph("<b>330 000 € à<br/>550 000 €</b>", ParagraphStyle('TotP', parent=body_bold, textColor=GOLD)),
        ]
    ]
    t_pipe = Table(pipe_data, colWidths=[110, 57, 290, 90])
    t_pipe.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E2E8F0")),
        ('BACKGROUND', (0,1), (-1,2), SLATE_BG),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#FEF3C7")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_pipe)
    story.append(Spacer(1, 6))

    # ── SECTION 3 : DISPOSITIF A/B/C TESTING SUR LES EMAILS ──
    story.append(Paragraph("<b>3. PROPOSITION STRATÉGIQUE : A/B/C TESTING POUR MAXIMISER LE TAUX DE RÉPONSE</b>", sec_title))
    story.append(Spacer(1, 3))

    ab_data = [
        [
            Paragraph("<b>VARIANTE A : DATA & ROI SOCIAL</b>", ParagraphStyle('VA', parent=body_bold, textColor=NAVY)),
            Paragraph("<b>VARIANTE B : PREUVE SOCIALE & PAIRS</b>", ParagraphStyle('VB', parent=body_bold, textColor=NAVY)),
            Paragraph("<b>VARIANTE C : TALENTS & MARQUE EMPLOYEUR</b>", ParagraphStyle('VC', parent=body_bold, textColor=NAVY)),
        ],
        [
            Paragraph("• <b>Accroche</b> : <i>« 1 € investi = 5,30 € d'impact direct »</i>.<br/>• <b>Contenu</b> : Bilan chiffré net (21 Sciences Po, 17 Sorbonne, 13 Prépas, coût net 35€/jeune) et levier fiscal de 60% IS.<br/>• <b>Cible clé</b> : DAF, Directeurs RSE analytiques, Banques.", body),
            Paragraph("• <b>Accroche</b> : <i>« PwC, Deloitte, Banque de France : rejoindre nos mécènes »</i>.<br/>• <b>Contenu</b> : Valorise l'implication de pairs prestigieux déjà jurys et propose une convention officielle de mécénat.<br/>• <b>Cible clé</b> : Big 4, cabinets de conseil, CAC 40.", body),
            Paragraph("• <b>Accroche</b> : <i>« Briser l'autocensure : accéder aux talents d'excellence »</i>.<br/>• <b>Contenu</b> : Focus sur les modules d'art oratoire (éloquence), la diversité et le vivier de recrutement.<br/>• <b>Cible clé</b> : DRH, Responsables Recrutement & Droit.", body),
        ]
    ]
    t_ab = Table(ab_data, colWidths=[182, 182, 183])
    t_ab.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('BACKGROUND', (0,1), (-1,1), SLATE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_ab)
    story.append(Spacer(1, 6))

    # ── SECTION 4 : MÉTHODE D'APPROCHE OPÉRATIONNELLE : LINKEDIN + EMAIL ──
    story.append(Paragraph("<b>4. PLAN D'ATTAQUE OPÉRATIONNEL : L'APPROCHE DUO LINKEDIN + EMAIL</b>", sec_title))
    story.append(Spacer(1, 3))

    action_box_content = [
        [
            Paragraph("<b>🎯 RÈGLE D'OR : PRIORITÉ À L'APPROCHE DIRECTE LINKEDIN (COUPLÉE À L'EMAIL)</b><br/>"
                      "Même si 100 % des adresses emails sont documentées dans nos fichiers, les boîtes de réception des directeurs RSE et DRH sont saturées. "
                      "<b>Nous recommandons d'activer la stratégie multicanale suivante :</b><br/>"
                      "1. <b>Contact 1 (Jour J - LinkedIn)</b> : Demande de connexion avec message personnalisé de 4 lignes au décideur identifié (taux d'acceptation et de lecture 3x supérieur).<br/>"
                      "2. <b>Contact 2 (Jour J - Email)</b> : Envoi simultané du mail complet (Variante A, B ou C selon la cible) avec la <b>plaquette PDF A4 jointe</b>.<br/>"
                      "3. <b>Relance automatique (Jour J+7)</b> : Rebond court par email et InMail (<i>« Bonjour, je me permets de faire remonter notre échange concernant la rentrée 2026... »</i>).",
                      body)
        ]
    ]
    t_action = Table(action_box_content, colWidths=[547])
    t_action.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#3B82F6")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_action)
    story.append(Spacer(1, 6))

    # ── FOOTER INTERNE ──
    footer_data = [
        [
            Paragraph("<b>Ambition Campus (Association Loi 1901)</b> • 17 ans d'engagement • 100 % bénévole<br/>Contact Partenariats : <b>Ilias Khafague</b> • ambitioncampus@gmail.com • 06 98 99 62 00", ParagraphStyle('FootL', parent=body, fontSize=7, leading=8.5, textColor=TEXT_MUTED)),
            Paragraph("<b>Ressources d'équipe partagées :</b><br/>Dépôt GitHub : <u>github.com/Iliesseu28/ambition-campus</u>", ParagraphStyle('FootR', parent=body, fontSize=7, leading=8.5, alignment=2, textColor=TEXT_MUTED))
        ]
    ]
    t_foot = Table(footer_data, colWidths=[347, 200])
    t_foot.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_foot)

    doc.build(story)

    # Vérification stricte de la contrainte 1 page
    reader = PdfReader(OUTPUT_PDF)
    nb_pages = len(reader.pages)
    print(f"[OK] PDF Bilan Equipe genere : {OUTPUT_PDF} ({nb_pages} page(s))")
    if nb_pages != 1:
        print(f"[ATTENTION] Le PDF depasse 1 page ({nb_pages} pages) !")
    else:
        print("[SUCCES] CONTRAINTE VALIDEE : Exactement 1 page A4.")


if __name__ == "__main__":
    generate_bilan_pdf()
