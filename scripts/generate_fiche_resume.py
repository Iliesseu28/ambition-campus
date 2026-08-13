"""
Ambition Campus - Fiche Resume A4 (1 page)
Design aéré, élégant et parfaitement équilibré sur toute la hauteur A4.
Toutes les données sont 100% vérifiées et sourcées.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
import os

# -- Palette sobre et premium --
NAVY        = HexColor("#0F1E36")
NAVY_LIGHT  = HexColor("#1E293B")
GOLD        = HexColor("#D4AF37")
GOLD_BG     = HexColor("#FAF6EB")
SLATE       = HexColor("#334155")
MUTED       = HexColor("#64748B")
SURFACE     = HexColor("#F8FAFC")
BORDER      = HexColor("#E2E8F0")
BORDER_DARK = HexColor("#CBD5E1")
WHITE       = white

W, H = A4  # 595.27 x 841.89 pt
MX = 18 * mm  # Marge latérale généreuse
CW = W - 2 * MX

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
    """Titre de section aéré avec puce / accent doré."""
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x + 8, y, text.upper())
    
    # Barre verticale dorée devant le titre
    c.setFillColor(GOLD)
    c.rect(x, y - 1, 3, 11, fill=1, stroke=0)
    return y - 10


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    # ================================================================
    # 1. HEADER (Hauteur: 64pt)
    # ================================================================
    hh = 64
    hy = H - hh
    c.setFillColor(NAVY)
    c.rect(0, hy, W, hh, fill=1, stroke=0)
    
    # Filet doré fin
    c.setStrokeColor(GOLD)
    c.setLineWidth(2.5)
    c.line(0, hy, W, hy)

    # Titre et statut
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 21)
    c.drawString(MX, hy + 32, "AMBITION CAMPUS")
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 8.5)
    c.drawString(MX, hy + 16, "Association Loi 1901 / ESS  •  Active depuis 2008  •  100 % bénévole")

    # Coordonnées à droite
    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7.5)
    rx = W - MX
    c.drawRightString(rx, hy + 42, "ambitioncampus@gmail.com")
    c.drawRightString(rx, hy + 29, "06 98 99 62 00")
    c.drawRightString(rx, hy + 16, "ambitioncampus.com")

    # ================================================================
    # 2. PHOTO D'ÉQUIPE (Hauteur: 165pt) - Bien proportionnée et nette
    # ================================================================
    photo_h = 165
    photo_y = hy - photo_h - 12

    # Clip arrondi pour la photo
    c.saveState()
    clip_path = c.beginPath()
    clip_path.roundRect(MX, photo_y, CW, photo_h, 6)
    clip_path.close()
    c.clipPath(clip_path, stroke=0)

    # Ajustement & centrage de l'image (2500x1709)
    img_ratio = 2500 / 1709
    draw_w = CW
    draw_h = draw_w / img_ratio
    img_y = photo_y - (draw_h - photo_h) / 2
    c.drawImage(PHOTO_PATH, MX, img_y, width=draw_w, height=draw_h, preserveAspectRatio=True, mask='auto')
    c.restoreState()

    # Cadre doré discret
    rr(c, MX, photo_y, CW, photo_h, 6, fill=None, stroke=GOLD, sw=1.2)

    # ================================================================
    # 3. DEVISE & MISSION (Hauteur: 58pt)
    # ================================================================
    y = photo_y - 18
    c.setFillColor(NAVY)
    c.setFont("Helvetica-BoldOblique", 10)
    c.drawCentredString(W / 2, y, "« Rendre la pareille, c’est notre identité »")

    y -= 14
    mission_h = 36
    rr(c, MX, y - mission_h, CW, mission_h, 5, fill=SURFACE, stroke=BORDER, sw=0.8)
    
    style_mission = ParagraphStyle(
        "mission", fontName="Helvetica", fontSize=8, leading=11.5,
        textColor=SLATE, alignment=TA_JUSTIFY
    )
    mission_text = (
        "<b>Mission :</b> Lutter contre l’autocensure et promouvoir l’égalité des chances en accompagnant "
        "les jeunes issus de milieux populaires (QPV / REP) vers les filières sélectives du supérieur. "
        "Grâce à notre modèle 100 % bénévole, 100 % des financements vont directement aux actions terrain."
    )
    pm = Paragraph(mission_text, style_mission)
    pm.wrapOn(c, CW - 18, 45)
    pm.drawOn(c, MX + 9, y - mission_h + 6)

    # ================================================================
    # 4. CHIFFRES CLÉS (6 Blocs aérés - Hauteur: 50pt)
    # ================================================================
    y = y - mission_h - 16
    y = section_title(c, MX, y, "Chiffres Clés")

    kpis = [
        ("500+",  "lycéens\naccompagnés/an"),
        ("75",    "bénévoles\nengagés"),
        ("525",   "binômes\nmentors actifs"),
        ("36",    "lycées REP\npartenaires"),
        ("210+",  "oraux blancs\norganisés"),
        ("150+",  "événements\npar an"),
    ]
    gap = 7
    bw = (CW - 5 * gap) / 6
    bh = 48
    by = y - bh - 2

    for i, (num, lab) in enumerate(kpis):
        bx = MX + i * (bw + gap)
        rr(c, bx, by, bw, bh, 5, fill=NAVY)
        
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 15)
        c.drawCentredString(bx + bw / 2, by + bh - 18, num)
        
        c.setFillColor(HexColor("#CBD5E1"))
        c.setFont("Helvetica", 6.2)
        for j, ln in enumerate(lab.split("\n")):
            c.drawCentredString(bx + bw / 2, by + bh - 30 - j * 8, ln)

    # ================================================================
    # 5. DEUX COLONNES AÉRÉES (Actions & Résultats / Implantations)
    # ================================================================
    y = by - 16
    col_gap = 14
    col_w = (CW - col_gap) / 2
    lx = MX
    rx_col = MX + col_w + col_gap

    # -- COLONNE GAUCHE : NOS ACTIONS --
    cy_l = section_title(c, lx, y, "Nos Actions de Terrain")
    
    actions = [
        ("Mentorat individuel", "Accompagnement continu par des étudiants, professionnels et alumni."),
        ("Oraux blancs & concours", "+210 simulations d'entretiens devant des jurys professionnels qualifiés."),
        ("Ateliers & éloquence", "Modules de culture générale, AC Décrypte et concours annuel d'éloquence."),
        ("Immersions pro & visites", "Découverte des institutions (Assemblée, Conseil d'État) et grandes entreprises."),
        ("Plaidoyer & médias", "Sensibilisation citoyenne : documentaire « Mérite sous condition » et podcasts."),
    ]
    
    st_t = ParagraphStyle("at", fontName="Helvetica-Bold", fontSize=7.8, leading=10, textColor=NAVY)
    st_d = ParagraphStyle("ad", fontName="Helvetica", fontSize=7, leading=9.2, textColor=MUTED)

    for title, desc in actions:
        cy_l -= 3
        c.setFillColor(GOLD)
        c.circle(lx + 4, cy_l - 2, 2, fill=1, stroke=0)
        
        pt = Paragraph(title, st_t)
        pt.wrapOn(c, col_w - 14, 20)
        pt.drawOn(c, lx + 11, cy_l - 5)
        
        cy_l -= 11
        pd = Paragraph(desc, st_d)
        pw, ph = pd.wrapOn(c, col_w - 14, 30)
        pd.drawOn(c, lx + 11, cy_l - ph + 2)
        cy_l -= ph + 2

    # -- COLONNE DROITE : RÉSULTATS 2026 & IMPLANTATIONS --
    cy_r = section_title(c, rx_col, y, "Résultats Promotion 2026")
    cy_r -= 4
    
    # Boîte admissions dorée
    res_h = 76
    rr(c, rx_col, cy_r - res_h, col_w, res_h, 5, fill=GOLD_BG, stroke=GOLD, sw=0.8)

    admissions = [
        ("21", "admis à Sciences Po Paris"),
        ("17", "admis à La Sorbonne (Droit, Éco, Gestion, Histoire)"),
        ("13", "en prépas prestigieuses (Henri IV, Saint-Louis, Lakanal)"),
    ]
    ry = cy_r - 16
    for num, lab in admissions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 15)
        c.drawString(rx_col + 10, ry, num)
        
        c.setFillColor(SLATE)
        c.setFont("Helvetica-Bold", 7.2)
        c.drawString(rx_col + 32, ry + 2, lab)
        ry -= 21

    cy_r = cy_r - res_h - 8
    
    # Ratios et stats
    st_c = ParagraphStyle("co", fontName="Helvetica", fontSize=7.2, leading=9.8, textColor=SLATE)
    comp_text = (
        "<b>Autres admissions :</b> ESSEC, Dauphine, Assas, écoles d’ingénieurs.<br/>"
        "<b>Social ROI :</b> 1 € investi = 5,30 € de valeur terrain créée.<br/>"
        "<b>Satisfaction :</b> 9,2 / 10 accordée par les lycéens et mentors."
    )
    pc = Paragraph(comp_text, st_c)
    pw, ph = pc.wrapOn(c, col_w - 4, 50)
    pc.drawOn(c, rx_col + 2, cy_r - ph)
    cy_r -= ph + 10

    # Implantations
    cy_r = section_title(c, rx_col, cy_r, "Implantations Nationales")
    cy_r -= 4
    antennes = [
        "Île-de-France (pôle historique, 445 binômes)",
        "Reims (antenne Grand Est)",
        "Poitiers (antenne Nouvelle-Aquitaine)",
        "Menton (antenne PACA)",
    ]
    for ant in antennes:
        c.setFillColor(GOLD)
        c.circle(rx_col + 4, cy_r + 2, 1.8, fill=1, stroke=0)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 7)
        c.drawString(rx_col + 12, cy_r, ant)
        cy_r -= 10.5

    # ================================================================
    # 6. PARTENAIRES CONFIRMÉS (Hauteur: 32pt)
    # ================================================================
    bottom_y = min(cy_l, cy_r) - 10
    bottom_y = section_title(c, MX, bottom_y, "Partenaires Institutionnels & Entreprises")
    bottom_y -= 4

    part_h = 24
    rr(c, MX, bottom_y - part_h, CW, part_h, 5, fill=SURFACE, stroke=BORDER, sw=0.8)
    
    partners = ["Sciences Po Paris", "PwC", "EY", "Deloitte", "KPMG", "Banque de France", "Assemblée nationale"]
    ptxt = "   •   ".join(partners)
    sp = ParagraphStyle("pp", fontName="Helvetica-Bold", fontSize=7.5, leading=10, textColor=NAVY, alignment=TA_CENTER)
    pp = Paragraph(ptxt, sp)
    pp.wrapOn(c, CW - 16, 22)
    pp.drawOn(c, MX + 8, bottom_y - part_h + 6.5)

    # ================================================================
    # 7. ÉQUIVALENCES DE DONS & IMPACT (Hauteur: 48pt)
    # ================================================================
    bottom_y = bottom_y - part_h - 14
    bottom_y = section_title(c, MX, bottom_y, "Équivalences d'Impact & Dons")
    bottom_y -= 4

    dons = [
        ("15 €", "Transport & collation pour 1 lycéen\nlors d’une journée d’orientation"),
        ("35 €", "Accompagnement complet d’un lycéen\npendant toute une année scolaire"),
        ("100 €", "Matériel pédagogique et préparation\naux oraux blancs pour 3 lycéens"),
    ]
    don_gap = 10
    don_w = (CW - 2 * don_gap) / 3
    don_h = 44
    don_y = bottom_y - don_h

    for i, (amount, desc) in enumerate(dons):
        dx = MX + i * (don_w + don_gap)
        rr(c, dx, don_y, don_w, don_h, 5, fill=WHITE, stroke=GOLD, sw=0.9)
        
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 13)
        c.drawCentredString(dx + don_w / 2, don_y + don_h - 15, amount)
        
        sd = ParagraphStyle("dd", fontName="Helvetica", fontSize=6.5, leading=8.5, textColor=MUTED, alignment=TA_CENTER)
        pd = Paragraph(desc, sd)
        pd.wrapOn(c, don_w - 12, 30)
        pd.drawOn(c, dx + 6, don_y + 4)

    # ================================================================
    # 8. FOOTER (Hauteur: 22pt)
    # ================================================================
    fh = 22
    c.setFillColor(NAVY)
    c.rect(0, 0, W, fh, fill=1, stroke=0)
    
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(0, fh, W, fh)
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 7)
    c.drawCentredString(W / 2, 8, "AMBITION CAMPUS   |   ambitioncampus@gmail.com   |   06 98 99 62 00   |   ambitioncampus.com")

    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
