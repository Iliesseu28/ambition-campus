"""
Ambition Campus - Fiche Resume A4 (1 page)
Design professionnel, aéré et élégant.
- Image d'équipe affichée ENTIÈREMENT sans aucun rognage en bas.
- Page A4 remplie de haut en bas sans vide blanc inutile.
- 100% des données sourcées et vérifiées.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
import os
import pypdf

# -- Palette sobre et élégante --
NAVY        = HexColor("#0F1E36")
GOLD        = HexColor("#C9A84C")
GOLD_BG     = HexColor("#FAF6EB")
SLATE       = HexColor("#334155")
MUTED       = HexColor("#64748B")
SURFACE     = HexColor("#F8FAFC")
BORDER      = HexColor("#E2E8F0")
WHITE       = white

W, H = A4  # 595.27 x 841.89 pt
MX = 16 * mm  # ~45.35 pt
CW = W - 2 * MX  # ~504.57 pt

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
ASSET_DIR   = os.path.join(SCRIPT_DIR, "..", "assets")
OUTPUT_DIR  = os.path.join(SCRIPT_DIR, "..", "docs")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "fiche-resume-association.pdf")
PHOTO_PATH  = os.path.join(ASSET_DIR, "photo_equipe.png")


def rr(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    """Dessine un rectangle à coins arrondis."""
    c.saveState()
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill else 0, stroke=1 if stroke else 0)
    c.restoreState()


def section_title(c, x, y, text):
    """Titre de section avec repère vertical doré."""
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(x + 7, y, text.upper())
    
    c.setFillColor(GOLD)
    c.rect(x, y - 1, 2.5, 9.5, fill=1, stroke=0)
    return y - 8


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    # ================================================================
    # 1. HEADER (Hauteur: 52pt)
    # ================================================================
    hh = 52
    hy = H - hh
    c.setFillColor(NAVY)
    c.rect(0, hy, W, hh, fill=1, stroke=0)
    
    # Filet doré
    c.setStrokeColor(GOLD)
    c.setLineWidth(2.2)
    c.line(0, hy, W, hy)

    # Titre et informations
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(MX, hy + 26, "AMBITION CAMPUS")
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 8)
    c.drawString(MX, hy + 12, "Association Loi 1901 / ESS  •  Active depuis 2008  •  100 % bénévole")

    # Coordonnées
    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7.2)
    rx = W - MX
    c.drawRightString(rx, hy + 35, "ambitioncampus@gmail.com")
    c.drawRightString(rx, hy + 24, "06 98 99 62 00")
    c.drawRightString(rx, hy + 13, "ambitioncampus.com")

    # ================================================================
    # 2. PHOTO D'ÉQUIPE (IMAGE COMPLÈTE - AUCUN ROGNAGE EN BAS)
    # ================================================================
    # Ratio d'aspect exact de la photo source (2500 x 1709)
    img_ratio = 2500 / 1709  # ~1.4628
    
    # On affiche la photo sur la largeur du contenu
    photo_w = CW
    photo_h = photo_w / img_ratio  # ~344.9 pt (Photo affichée à 100% de son ratio)
    photo_y = hy - photo_h - 7

    # Dessin de l'image intégrale avec coins arrondis
    c.saveState()
    clip_path = c.beginPath()
    clip_path.roundRect(MX, photo_y, photo_w, photo_h, 5)
    clip_path.close()
    c.clipPath(clip_path, stroke=0)
    c.drawImage(PHOTO_PATH, MX, photo_y, width=photo_w, height=photo_h, preserveAspectRatio=True, mask='auto')
    c.restoreState()

    # Fine bordure dorée de finition
    rr(c, MX, photo_y, photo_w, photo_h, 5, fill=None, stroke=GOLD, sw=1.0)

    # ================================================================
    # 3. DEVISE & MISSION
    # ================================================================
    y = photo_y - 12
    c.setFillColor(NAVY)
    c.setFont("Helvetica-BoldOblique", 8.8)
    c.drawCentredString(W / 2, y, "« Rendre la pareille, c’est notre identité »")

    y -= 10
    mission_h = 28
    rr(c, MX, y - mission_h, CW, mission_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)
    
    style_mission = ParagraphStyle(
        "mission", fontName="Helvetica", fontSize=7.2, leading=9.8,
        textColor=SLATE, alignment=TA_JUSTIFY
    )
    mission_text = (
        "<b>Mission :</b> Lutter contre l’autocensure et promouvoir l’égalité des chances en accompagnant "
        "les jeunes issus de milieux populaires (QPV / REP) vers les filières sélectives du supérieur. "
        "Modèle 100 % bénévole : chaque euro versé finance directement les actions terrain des lycéens."
    )
    pm = Paragraph(mission_text, style_mission)
    pm.wrapOn(c, CW - 16, 35)
    pm.drawOn(c, MX + 8, y - mission_h + 4)

    # ================================================================
    # 4. CHIFFRES CLÉS (6 Blocs équilibrés)
    # ================================================================
    y = y - mission_h - 9
    y = section_title(c, MX, y, "Chiffres Clés")

    kpis = [
        ("500+",  "lycéens\naccompagnés/an"),
        ("75",    "bénévoles\nengagés"),
        ("525",   "binômes\nmentors actifs"),
        ("36",    "lycées REP\npartenaires"),
        ("210+",  "oraux blancs\norganisés"),
        ("150+",  "événements\npar an"),
    ]
    gap = 5
    bw = (CW - 5 * gap) / 6
    bh = 38
    by = y - bh - 1

    for i, (num, lab) in enumerate(kpis):
        bx = MX + i * (bw + gap)
        rr(c, bx, by, bw, bh, 4, fill=NAVY)
        
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 13)
        c.drawCentredString(bx + bw / 2, by + bh - 14, num)
        
        c.setFillColor(HexColor("#CBD5E1"))
        c.setFont("Helvetica", 5.5)
        for j, ln in enumerate(lab.split("\n")):
            c.drawCentredString(bx + bw / 2, by + bh - 24 - j * 6.8, ln)

    # ================================================================
    # 5. DEUX COLONNES (Actions vs Résultats & Implantations)
    # ================================================================
    y = by - 9
    col_gap = 10
    col_w = (CW - col_gap) / 2
    lx = MX
    rx_col = MX + col_w + col_gap

    # -- COLONNE GAUCHE : NOS ACTIONS --
    cy_l = section_title(c, lx, y, "Nos Actions de Terrain")
    
    actions = [
        ("Mentorat individuel", "Accompagnement continu par étudiants, professionnels et alumni."),
        ("Oraux blancs & concours", "+210 simulations d'entretiens devant des jurys qualifiés (PwC, EY...)."),
        ("Ateliers d'éloquence", "Modules de culture générale, AC Décrypte et concours d'éloquence."),
        ("Immersions professionnelles", "Visites des institutions (Assemblée, Conseil d'État) et entreprises."),
        ("Plaidoyer & médias", "Documentaire « Mérite sous condition » et podcasts thématiques."),
    ]
    
    st_t = ParagraphStyle("at", fontName="Helvetica-Bold", fontSize=6.8, leading=8.5, textColor=NAVY)
    st_d = ParagraphStyle("ad", fontName="Helvetica", fontSize=6.0, leading=7.8, textColor=MUTED)

    for title, desc in actions:
        cy_l -= 3
        c.setFillColor(GOLD)
        c.circle(lx + 3, cy_l - 1.5, 1.5, fill=1, stroke=0)
        
        pt = Paragraph(title, st_t)
        pt.wrapOn(c, col_w - 12, 18)
        pt.drawOn(c, lx + 9, cy_l - 4)
        
        cy_l -= 8
        pd = Paragraph(desc, st_d)
        pw, ph = pd.wrapOn(c, col_w - 12, 25)
        pd.drawOn(c, lx + 9, cy_l - ph + 2)
        cy_l -= ph + 1

    # -- COLONNE DROITE : RÉSULTATS 2026 & IMPLANTATIONS --
    cy_r = section_title(c, rx_col, y, "Résultats Promotion 2026")
    cy_r -= 3
    
    # Boîte admissions
    res_h = 58
    rr(c, rx_col, cy_r - res_h, col_w, res_h, 4, fill=GOLD_BG, stroke=GOLD, sw=0.7)

    admissions = [
        ("21", "admis à Sciences Po Paris"),
        ("17", "admis à La Sorbonne (Droit, Éco, Gestion, Histoire)"),
        ("13", "en prépas prestigieuses (Henri IV, Saint-Louis, Lakanal)"),
    ]
    ry = cy_r - 12
    for num, lab in admissions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(rx_col + 8, ry, num)
        
        c.setFillColor(SLATE)
        c.setFont("Helvetica-Bold", 6.2)
        c.drawString(rx_col + 26, ry + 1.5, lab)
        ry -= 16

    cy_r = cy_r - res_h - 5
    
    # Ratios et stats clés
    st_c = ParagraphStyle("co", fontName="Helvetica", fontSize=6.2, leading=8.0, textColor=SLATE)
    comp_text = (
        "<b>Autres admissions :</b> ESSEC, Dauphine, Assas, écoles d’ingénieurs.<br/>"
        "<b>Social ROI :</b> 1 € investi = 5,30 € de valeur d'accompagnement direct.<br/>"
        "<b>Satisfaction :</b> 9,2 / 10 accordée par les lycéens et mentors."
    )
    pc = Paragraph(comp_text, st_c)
    pw, ph = pc.wrapOn(c, col_w - 4, 40)
    pc.drawOn(c, rx_col + 2, cy_r - ph)
    cy_r -= ph + 6

    # Implantations
    cy_r = section_title(c, rx_col, cy_r, "Implantations Nationales")
    cy_r -= 3
    antennes = [
        "Île-de-France (pôle historique, 445 binômes)",
        "Reims (antenne Grand Est)",
        "Poitiers (antenne Nouvelle-Aquitaine)",
        "Menton (antenne PACA)",
    ]
    for ant in antennes:
        c.setFillColor(GOLD)
        c.circle(rx_col + 3, cy_r + 2, 1.5, fill=1, stroke=0)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 6.2)
        c.drawString(rx_col + 10, cy_r, ant)
        cy_r -= 8.5

    # ================================================================
    # 6. PARTENAIRES CONFIRMÉS
    # ================================================================
    bottom_y = min(cy_l, cy_r) - 7
    bottom_y = section_title(c, MX, bottom_y, "Partenaires Institutionnels & Entreprises")
    bottom_y -= 3

    part_h = 18
    rr(c, MX, bottom_y - part_h, CW, part_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)
    
    partners = ["Sciences Po Paris", "PwC", "EY", "Deloitte", "KPMG", "Banque de France", "Assemblée nationale"]
    ptxt = "   •   ".join(partners)
    sp = ParagraphStyle("pp", fontName="Helvetica-Bold", fontSize=6.8, leading=8.5, textColor=NAVY, alignment=TA_CENTER)
    pp = Paragraph(ptxt, sp)
    pp.wrapOn(c, CW - 12, 18)
    pp.drawOn(c, MX + 6, bottom_y - part_h + 5)

    # ================================================================
    # 7. ÉQUIVALENCES DE DONS & IMPACT
    # ================================================================
    bottom_y = bottom_y - part_h - 7
    bottom_y = section_title(c, MX, bottom_y, "Équivalences d'Impact & Dons")
    bottom_y -= 3

    dons = [
        ("15 €", "Transport & collation pour 1 lycéen\nlors d’une journée d’orientation"),
        ("35 €", "Accompagnement complet d’un lycéen\npendant toute une année scolaire"),
        ("100 €", "Matériel pédagogique et préparation\naux oraux blancs pour 3 lycéens"),
    ]
    don_gap = 7
    don_w = (CW - 2 * don_gap) / 3
    don_h = 32
    don_y = bottom_y - don_h

    for i, (amount, desc) in enumerate(dons):
        dx = MX + i * (don_w + don_gap)
        rr(c, dx, don_y, don_w, don_h, 4, fill=WHITE, stroke=GOLD, sw=0.7)
        
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawCentredString(dx + don_w / 2, don_y + don_h - 11, amount)
        
        sd = ParagraphStyle("dd", fontName="Helvetica", fontSize=5.6, leading=7.2, textColor=MUTED, alignment=TA_CENTER)
        pd = Paragraph(desc, sd)
        pd.wrapOn(c, don_w - 8, 25)
        pd.drawOn(c, dx + 4, don_y + 3)

    # ================================================================
    # 8. FOOTER
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
