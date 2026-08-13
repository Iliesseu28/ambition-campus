"""
Ambition Campus - Guide & Plan d'Action Financement (1 page A4)
Document stratégique interne pour fédérer toute l'équipe sur la levée de fonds.
Structure par répétition : QUI • COMMENT • COMBIEN • FISCALITÉ / RÈGLE.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
import os
import pypdf

# -- Couleurs charte --
NAVY        = HexColor("#0F1E36")
GOLD        = HexColor("#C9A84C")
GOLD_LIGHT  = HexColor("#FDFBF4")
BORDER_GOLD = HexColor("#D4B76A")
SLATE       = HexColor("#1E293B")
MUTED       = HexColor("#475569")
SURFACE     = HexColor("#F8FAFC")
BORDER      = HexColor("#CBD5E1")
WHITE       = white

# Accentuation par pilier
COLOR_PUB   = HexColor("#1E40AF")  # Bleu institutionnel
COLOR_PRIV  = HexColor("#047857")  # Vert mécénat
COLOR_FOND  = HexColor("#B45309")  # Ambre fondations
COLOR_DONS  = HexColor("#7C3AED")  # Violet communauté

W, H = A4  # 595.27 x 841.89 pt
MX = 15 * mm  # Marge latérale
CW = W - 2 * MX  # ~510.23 pt

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR  = os.path.join(SCRIPT_DIR, "..", "docs")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "guide-financement-association.pdf")


def rr(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    """Dessine un rectangle arrondi."""
    c.saveState()
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill else 0, stroke=1 if stroke else 0)
    c.restoreState()


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    # ================================================================
    # 1. HEADER STRATÉGIQUE (Hauteur: 54pt)
    # ================================================================
    hh = 54
    hy = H - hh
    c.setFillColor(NAVY)
    c.rect(0, hy, W, hh, fill=1, stroke=0)
    
    # Filet doré
    c.setStrokeColor(GOLD)
    c.setLineWidth(2.2)
    c.line(0, hy, W, hy)

    # Titres
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(MX, hy + 30, "AMBITION CAMPUS  |  PLAN D'ACTION FINANCIER")
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(MX, hy + 14, "OBJECTIF 2026-2027 : DIVERSIFIER LES RESSOURCES & FINANCER 500+ LYCÉENS")

    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7.5)
    rx = W - MX
    c.drawRightString(rx, hy + 30, "Document Stratégique Interne")
    c.drawRightString(rx, hy + 14, "Modèle 100 % bénévole  •  1 € = 5,30 €")

    # ================================================================
    # 2. SCHÉMA GLOBAL & CHIFFRES CIBLES (Hauteur: 64pt)
    # ================================================================
    y = hy - 12
    box_schema_h = 58
    y_schema = y - box_schema_h
    rr(c, MX, y_schema, CW, box_schema_h, 5, fill=SURFACE, stroke=BORDER, sw=0.8)

    # Titre du bandeau synthèse
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(W / 2, y_schema + box_schema_h - 13, "CARTOGRAPHIE DES 4 PILIERS DE REVENUS")

    # 4 mini-capsules de flux
    caps = [
        ("1. FONDS PUBLICS", "Région, Mairies, Cités Éduc.", "25 000 € - 35 000 €", COLOR_PUB),
        ("2. MÉCÉNAT PRIVÉ", "Cabinets jurys & Banques", "30 000 € - 45 000 €", COLOR_PRIV),
        ("3. FONDATIONS", "Bolloré, BNP, TotalEnergies", "20 000 € - 35 000 €", COLOR_FOND),
        ("4. CAGNOTTE & DONS", "LinkedIn, Réseau (35€/jeune)", "10 000 € - 15 000 €", COLOR_DONS),
    ]
    cap_gap = 6
    cap_w = (CW - 16 - 3 * cap_gap) / 4
    cap_h = 32
    cap_y = y_schema + 7

    for i, (title, subtitle, amount, col) in enumerate(caps):
        cx = MX + 8 + i * (cap_w + cap_gap)
        rr(c, cx, cap_y, cap_w, cap_h, 4, fill=WHITE, stroke=col, sw=1.0)
        
        c.setFillColor(col)
        c.setFont("Helvetica-Bold", 6.8)
        c.drawCentredString(cx + cap_w / 2, cap_y + cap_h - 9, title)
        
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 5.5)
        c.drawCentredString(cx + cap_w / 2, cap_y + cap_h - 18, subtitle)
        
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 7.2)
        c.drawCentredString(cx + cap_w / 2, cap_y + 4, amount)

    # ================================================================
    # 3. LES 4 PILIERS DÉTAILLÉS EN GRILLE 2x2 (Hauteur: 540pt)
    # ================================================================
    grid_top = y_schema - 10
    col_gap = 10
    col_w = (CW - col_gap) / 2
    row_h = 280  # Hauteur par carte
    
    # Styles pour paragraphes
    st_label = ParagraphStyle("lbl", fontName="Helvetica-Bold", fontSize=7.2, leading=9.0, textColor=NAVY)
    st_text  = ParagraphStyle("txt", fontName="Helvetica", fontSize=6.7, leading=8.6, textColor=SLATE)
    st_rule  = ParagraphStyle("rul", fontName="Helvetica-Bold", fontSize=6.5, leading=8.2, textColor=MUTED)

    piliers = [
        {
            "num": "PILIER 1",
            "title": "FONDS PUBLICS & SUBVENTIONS",
            "accent": COLOR_PUB,
            "col_idx": 0, "row_idx": 0,
            "qui": "<b>Région Île-de-France</b> (AAP Orientation), <b>Mairies</b> (Paris, Reims, Poitiers, Menton), <b>Cités Éducatives / ANCT</b> (Crédits BOP 147 dans les 36 lycées REP), <b>FDVA</b> (État).",
            "comment": "<b>Dépôts dématérialisés</b> sur les portails officiels : <i>MesDémarches IDF</i> (dossier 7k€ à finaliser), <i>DAUPHIN</i> (Cités Éducatives), et formulaires <i>CERFA</i> mairies. Entrer par la création de valeur pour les jeunes locaux.",
            "combien": "<b>Tickets :</b> 2 000 € à 10 000 € par guichet.<br/><b>Potentiel cumulé :</b> <b>25 000 € à 35 000 €</b>.<br/><i>Action Anna & Marie-Makalé : calendrier et suivi AAP.</i>",
            "regle": "<b>Règle d'or :</b> Justifier l'ancrage local (nombre de lycéens de la ville accompagnés) et l'affectation directe aux actions de terrain."
        },
        {
            "num": "PILIER 2",
            "title": "MÉCÉNAT PRIVÉ D'ENTREPRISE",
            "accent": COLOR_PRIV,
            "col_idx": 1, "row_idx": 0,
            "qui": "<b>Partenaires déjà jurys :</b> PwC, EY, Deloitte, KPMG, <b>Banque de France</b> + PME/ETI implantées près des lycées.<br/><i>Cibles :</i> Directeurs RSE, DRH & Fondations.",
            "comment": "<b>Upgrade de partenariat :</b> Transformer leur présence bénévole aux oraux blancs en <i>Mécénat Financier récurrent</i>. Proposer des conventions annuelles de parrainage de promotions avec visites de locaux.",
            "combien": "<b>Tickets :</b> 5 000 € à 15 000 € / entreprise.<br/><b>Potentiel cumulé :</b> <b>30 000 € à 45 000 €</b>.<br/><i>(Ex : 4 cabinets jurys x 10 000 € = 40 000 €).</i>",
            "regle": "<b>Levier Fiscal (Art. 238 bis CGI) :</b> Déduction fiscale de <b>60 %</b> sur l'IS. Un don de 10 000 € ne coûte réellement que <b>4 000 €</b> à l'entreprise."
        },
        {
            "num": "PILIER 3",
            "title": "FONDATIONS D'ENTREPRISE",
            "accent": COLOR_FOND,
            "col_idx": 0, "row_idx": 1,
            "qui": "<b>Fondation Bolloré</b> (Piste chaude via recommandation Canal+), <b>Fondation BNP Paribas</b> (Projet Banlieues), <b>TotalEnergies, SNCF, RATP, Société Générale</b>.<br/><i>Cibles :</i> Délégués Généraux.",
            "comment": "<b>Cold Outreach ciblé + Veille bot :</b> Pitch direct de 10 lignes avec fiche A4 en PJ ou candidature aux appels à projets. Mettre en avant le <i>Social ROI</i> (1€=5,30€) et les 21 admis Sciences Po 2026.",
            "combien": "<b>Tickets :</b> 10 000 € à 30 000 € / an.<br/><b>Potentiel cumulé :</b> <b>20 000 € à 35 000 €</b>.<br/><i>Conventions souvent renouvelables sur 2 à 3 ans.</i>",
            "regle": "<b>Règle d'or :</b> Ne jamais déformer l'association : rester 100 % sur le cœur de métier (mentorat, éloquence, égalité des chances)."
        },
        {
            "num": "PILIER 4",
            "title": "CAGNOTTE & DONS PARTICULIERS",
            "accent": COLOR_DONS,
            "col_idx": 1, "row_idx": 1,
            "qui": "<b>Grand Public & Réseau :</b> Communauté LinkedIn, mentors, alumni, parents d'élèves, entourage et citoyens engagés.<br/><i>Porteur de campagne :</i> Ilias & toute l'équipe.",
            "comment": "<b>Campagne HelloAsso + LinkedIn :</b> Posts réguliers avec vidéo courte d'admis + carrousel infographie. Formule d'impact : <b>35 € = 1 an d'accompagnement pour 1 lycéen</b> (15€ transport, 100€ oraux pour 3).",
            "combien": "<b>Tickets :</b> 15 € à 100 € par donateur.<br/><b>Potentiel cumulé :</b> <b>10 000 € à 15 000 €</b>.<br/><i>Cash disponible immédiatement sans délai administratif.</i>",
            "regle": "<b>Levier Fiscal (Art. 200 CGI) :</b> Déduction d'impôt sur le revenu de <b>66 %</b>. Un don de 35 € ne coûte réellement que <b>11,90 €</b> au donateur."
        },
    ]

    for p in piliers:
        card_x = MX + p["col_idx"] * (col_w + col_gap)
        card_y = grid_top - (p["row_idx"] + 1) * row_h + (0 if p["row_idx"] == 0 else 6)
        
        # Boîte de la carte
        rr(c, card_x, card_y, col_w, row_h - 10, 5, fill=WHITE, stroke=BORDER, sw=0.8)
        
        # Bandeau de titre supérieur
        bandeau_h = 24
        rr(c, card_x, card_y + row_h - 10 - bandeau_h, col_w, bandeau_h, 5, fill=p["accent"])
        # Rectifier le bas arrondi du bandeau
        c.setFillColor(p["accent"])
        c.rect(card_x, card_y + row_h - 10 - bandeau_h, col_w, 6, fill=1, stroke=0)
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(card_x + 8, card_y + row_h - 10 - 15, f"{p['num']} : {p['title']}")
        
        # Contenu structuré QUI / COMMENT / COMBIEN / RÈGLE
        cur_y = card_y + row_h - 10 - bandeau_h - 8
        sections_data = [
            ("🎯 QUI CIBLER ?", p["qui"]),
            ("⚙️ COMMENT ACTIVER ?", p["comment"]),
            ("💶 COMBIEN VISER ?", p["combien"]),
            ("⚖️ RÈGLE & FISCALITÉ", p["regle"]),
        ]
        
        for sec_t, sec_c in sections_data:
            # Titre de la puce
            c.setFillColor(p["accent"])
            c.setFont("Helvetica-Bold", 7.0)
            c.drawString(card_x + 8, cur_y, sec_t)
            cur_y -= 8
            
            # Texte explicatif
            p_obj = Paragraph(sec_c, st_text)
            pw, ph = p_obj.wrapOn(c, col_w - 16, 80)
            p_obj.drawOn(c, card_x + 8, cur_y - ph + 2)
            cur_y -= ph + 5

    # ================================================================
    # 4. FEUILLE DE ROUTE & CHECKLIST ÉQUIPE (Hauteur: 72pt)
    # ================================================================
    y_footer_box = 30
    footer_box_h = 74
    rr(c, MX, y_footer_box, CW, footer_box_h, 5, fill=GOLD_LIGHT, stroke=BORDER_GOLD, sw=0.9)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(MX + 10, y_footer_box + footer_box_h - 14, "FEUILLE DE ROUTE OPÉRATIONNELLE DU COLLECTIF")

    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(MX + 10, y_footer_box + footer_box_h - 18, MX + 230, y_footer_box + footer_box_h - 18)

    actions_checklist = [
        "1. [ ] <b>Anna :</b> Finaliser et déposer le dossier Région IDF (7 000 €) + veille bimensuelle sur l'outil AAP.",
        "2. [ ] <b>Marie-Makalé :</b> Lancer les prises de contact Mairies (Paris, Reims, Poitiers, Menton) avec le PDF de présentation.",
        "3. [ ] <b>Pôle Partenariats :</b> Envoyer l'email d'accroche Bolloré (recommandation Canal+) & convention mécénat aux 4 cabinets jurys.",
        "4. [ ] <b>Ilias :</b> Lancer la cagnotte HelloAsso avec le post d'impact LinkedIn (vidéo admis + 35 € = 1 jeune).",
    ]
    
    st_act = ParagraphStyle("act", fontName="Helvetica", fontSize=6.8, leading=9.2, textColor=SLATE)
    
    act_y = y_footer_box + footer_box_h - 26
    for act in actions_checklist:
        p_act = Paragraph(act, st_act)
        pw, ph = p_act.wrapOn(c, CW - 20, 20)
        p_act.drawOn(c, MX + 10, act_y - ph + 2)
        act_y -= ph + 2.5

    # ================================================================
    # 5. FOOTER BAS DE PAGE (Hauteur: 18pt)
    # ================================================================
    fh = 18
    c.setFillColor(NAVY)
    c.rect(0, 0, W, fh, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(0, fh, W, fh)
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawCentredString(W / 2, 6, "AMBITION CAMPUS   |   ambitioncampus@gmail.com   |   06 98 99 62 00   |   ambitioncampus.com")

    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
