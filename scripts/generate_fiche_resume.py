"""
Ambition Campus - Fiche Resume A4 (1 page)
Design professionnel, très aéré, sans superposition.
- Photo d'équipe recadrée en haut (espace vide sans visages supprimé).
- Chaque section possède sa zone dédiée avec marges et respirations généreuses.
- 100% des données sourcées et vérifiées.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from PIL import Image
import os
import pypdf

# -- Palette élégante et contrastée --
NAVY        = HexColor("#0F1E36")
GOLD        = HexColor("#C9A84C")
GOLD_BG     = HexColor("#FBF8EE")
SLATE       = HexColor("#2D3748")
MUTED       = HexColor("#5A6A85")
SURFACE     = HexColor("#F7F9FC")
BORDER      = HexColor("#E2E8F0")
BORDER_GOLD = HexColor("#DFC88A")
WHITE       = white

W, H = A4  # 595.27 x 841.89 pt
MX = 16 * mm  # ~45.35 pt
CW = W - 2 * MX  # ~504.57 pt

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
ASSET_DIR   = os.path.join(SCRIPT_DIR, "..", "assets")
OUTPUT_DIR  = os.path.join(SCRIPT_DIR, "..", "docs")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "fiche-resume-association.pdf")
PHOTO_ORIG  = os.path.join(ASSET_DIR, "photo_equipe.png")
PHOTO_CROP  = os.path.join(ASSET_DIR, "photo_equipe_cropped.png")


def prepare_cropped_photo():
    """Recadre le haut de l'image (plafond sans visages) pour maximiser l'espace."""
    if os.path.exists(PHOTO_ORIG):
        img = Image.open(PHOTO_ORIG)
        w, h = img.size
        top_crop = int(h * 0.20)  # coupe le haut vide
        cropped = img.crop((0, top_crop, w, h))
        cropped.save(PHOTO_CROP)
        return PHOTO_CROP
    return PHOTO_ORIG


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
    """Titre de section net avec repère vertical doré."""
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x + 8, y, text.upper())
    
    c.setFillColor(GOLD)
    c.rect(x, y - 1, 3, 10, fill=1, stroke=0)
    return y - 10


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    photo_file = prepare_cropped_photo()
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    # ================================================================
    # 1. HEADER (Hauteur: 54pt)
    # ================================================================
    hh = 54
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
    c.drawString(MX, hy + 28, "AMBITION CAMPUS")
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 8)
    c.drawString(MX, hy + 13, "Association Loi 1901 / ESS  •  Active depuis 2008  •  100 % bénévole")

    # Coordonnées
    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7.2)
    rx = W - MX
    c.drawRightString(rx, hy + 37, "ambitioncampus@gmail.com")
    c.drawRightString(rx, hy + 25, "06 98 99 62 00")
    c.drawRightString(rx, hy + 13, "ambitioncampus.com")

    # ================================================================
    # 2. PHOTO D'ÉQUIPE (Recadrée en haut, humains 100% visibles)
    # ================================================================
    # Taille cropped : 2500 x 1368 (ratio 1.827)
    img_ratio = 2500 / 1368
    photo_w = CW
    photo_h = photo_w / img_ratio  # ~276 pt
    photo_y = hy - photo_h - 10

    c.saveState()
    clip_path = c.beginPath()
    clip_path.roundRect(MX, photo_y, photo_w, photo_h, 6)
    clip_path.close()
    c.clipPath(clip_path, stroke=0)
    c.drawImage(photo_file, MX, photo_y, width=photo_w, height=photo_h, preserveAspectRatio=True, mask='auto')
    c.restoreState()

    # Fine bordure dorée
    rr(c, MX, photo_y, photo_w, photo_h, 6, fill=None, stroke=GOLD, sw=1.1)

    # ================================================================
    # 3. DEVISE & MISSION
    # ================================================================
    y = photo_y - 14
    c.setFillColor(NAVY)
    c.setFont("Helvetica-BoldOblique", 9.5)
    c.drawCentredString(W / 2, y, "« Rendre la pareille, c’est notre identité »")

    y -= 12
    mission_h = 32
    rr(c, MX, y - mission_h, CW, mission_h, 4, fill=SURFACE, stroke=BORDER, sw=0.7)
    
    style_mission = ParagraphStyle(
        "mission", fontName="Helvetica", fontSize=7.6, leading=10.5,
        textColor=SLATE, alignment=TA_JUSTIFY
    )
    mission_text = (
        "<b>Mission :</b> Lutter contre l’autocensure et promouvoir l’égalité des chances en accompagnant "
        "les jeunes issus de milieux populaires (QPV / REP) vers les filières sélectives du supérieur. "
        "Modèle 100 % bénévole : chaque euro versé finance directement les actions terrain des lycéens."
    )
    pm = Paragraph(mission_text, style_mission)
    pm.wrapOn(c, CW - 18, 40)
    pm.drawOn(c, MX + 9, y - mission_h + 5)

    # ================================================================
    # 4. CHIFFRES CLÉS (6 Blocs aérés)
    # ================================================================
    y = y - mission_h - 12
    y = section_title(c, MX, y, "Chiffres Clés")

    kpis = [
        ("500+",  "lycéens\naccompagnés/an"),
        ("75",    "bénévoles\nengagés"),
        ("525",   "binômes\nmentors actifs"),
        ("36",    "lycées REP\npartenaires"),
        ("210+",  "oraux blancs\norganisés"),
        ("150+",  "événements\npar an"),
    ]
    gap = 6
    bw = (CW - 5 * gap) / 6
    bh = 42
    by = y - bh - 2

    for i, (num, lab) in enumerate(kpis):
        bx = MX + i * (bw + gap)
        rr(c, bx, by, bw, bh, 4, fill=NAVY)
        
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 14)
        c.drawCentredString(bx + bw / 2, by + bh - 16, num)
        
        c.setFillColor(HexColor("#CBD5E1"))
        c.setFont("Helvetica", 5.8)
        for j, ln in enumerate(lab.split("\n")):
            c.drawCentredString(bx + bw / 2, by + bh - 27 - j * 7.5, ln)

    # ================================================================
    # 5. DEUX COLONNES (Actions vs Résultats & Implantations)
    # ================================================================
    y = by - 14
    col_gap = 14
    col_w = (CW - col_gap) / 2
    lx = MX
    rx_col = MX + col_w + col_gap

    # -- COLONNE GAUCHE : NOS ACTIONS --
    cy_l = section_title(c, lx, y, "Nos Actions de Terrain")
    cy_l -= 2
    
    actions = [
        ("Mentorat individuel", "Accompagnement continu par étudiants, professionnels et alumni."),
        ("Oraux blancs & concours", "+210 simulations d'entretiens devant des jurys qualifiés (PwC, EY...)."),
        ("Ateliers d'éloquence", "Modules de culture générale, AC Décrypte et concours d'éloquence."),
        ("Immersions professionnelles", "Visites des institutions (Assemblée, Conseil d'État) et entreprises."),
        ("Plaidoyer & médias", "Sensibilisation citoyenne : documentaire « Mérite sous condition » et podcasts."),
    ]
    
    st_t = ParagraphStyle("at", fontName="Helvetica-Bold", fontSize=7.2, leading=9.2, textColor=NAVY)
    st_d = ParagraphStyle("ad", fontName="Helvetica", fontSize=6.5, leading=8.5, textColor=MUTED)

    for title, desc in actions:
        c.setFillColor(GOLD)
        c.circle(lx + 4, cy_l - 2, 1.8, fill=1, stroke=0)
        
        pt = Paragraph(title, st_t)
        pt.wrapOn(c, col_w - 14, 20)
        pt.drawOn(c, lx + 11, cy_l - 5)
        
        cy_l -= 10
        pd = Paragraph(desc, st_d)
        pw, ph = pd.wrapOn(c, col_w - 14, 30)
        pd.drawOn(c, lx + 11, cy_l - ph + 2)
        cy_l -= ph + 5

    # -- COLONNE DROITE : RÉSULTATS 2026 & IMPLANTATIONS --
    cy_r = section_title(c, rx_col, y, "Résultats Promotion 2026")
    cy_r -= 4
    
    # 1. Boîte admissions dorée (très nette)
    res_h = 64
    rr(c, rx_col, cy_r - res_h, col_w, res_h, 4, fill=GOLD_BG, stroke=BORDER_GOLD, sw=0.8)

    admissions = [
        ("21", "admis à Sciences Po Paris"),
        ("17", "admis à La Sorbonne (Droit, Éco, Gestion, Histoire)"),
        ("13", "en prépas prestigieuses (Henri IV, Saint-Louis, Lakanal)"),
    ]
    ry = cy_r - 14
    for num, lab in admissions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 13.5)
        c.drawString(rx_col + 10, ry, num)
        
        c.setFillColor(SLATE)
        c.setFont("Helvetica-Bold", 6.6)
        c.drawString(rx_col + 30, ry + 2, lab)
        ry -= 18

    cy_r = cy_r - res_h - 6
    
    # 2. Boîte Ratios & Impact (clairement séparée, sans aucune superposition)
    box_other_h = 28
    rr(c, rx_col, cy_r - box_other_h, col_w, box_other_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)
    
    st_c = ParagraphStyle("co", fontName="Helvetica", fontSize=6.5, leading=8.5, textColor=SLATE)
    comp_text = (
        "<b>Autres admissions :</b> ESSEC, Dauphine, Assas, écoles d’ingénieurs.<br/>"
        "<b>Social ROI :</b> 1 € investi = 5,30 € d'accompagnement  •  <b>Note :</b> 9,2/10"
    )
    pc = Paragraph(comp_text, st_c)
    pw, ph = pc.wrapOn(c, col_w - 12, 30)
    pc.drawOn(c, rx_col + 6, cy_r - box_other_h + 5)
    
    cy_r = cy_r - box_other_h - 10

    # 3. Implantations
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
        c.setFont("Helvetica", 6.5)
        c.drawString(rx_col + 12, cy_r, ant)
        cy_r -= 9.5

    # ================================================================
    # 6. PARTENAIRES CONFIRMÉS
    # ================================================================
    bottom_y = min(cy_l, cy_r) - 10
    bottom_y = section_title(c, MX, bottom_y, "Partenaires Institutionnels & Entreprises")
    bottom_y -= 4

    part_h = 22
    rr(c, MX, bottom_y - part_h, CW, part_h, 4, fill=SURFACE, stroke=BORDER, sw=0.7)
    
    partners = ["Sciences Po Paris", "PwC", "EY", "Deloitte", "KPMG", "Banque de France", "Assemblée nationale"]
    ptxt = "   •   ".join(partners)
    sp = ParagraphStyle("pp", fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=NAVY, alignment=TA_CENTER)
    pp = Paragraph(ptxt, sp)
    pp.wrapOn(c, CW - 14, 20)
    pp.drawOn(c, MX + 7, bottom_y - part_h + 6)

    # ================================================================
    # 7. ÉQUIVALENCES DE DONS & IMPACT
    # ================================================================
    bottom_y = bottom_y - part_h - 10
    bottom_y = section_title(c, MX, bottom_y, "Équivalences d'Impact & Dons")
    bottom_y -= 4

    dons = [
        ("15 €", "Transport & collation pour 1 lycéen\nlors d’une journée d’orientation"),
        ("35 €", "Accompagnement complet d’un lycéen\npendant toute une année scolaire"),
        ("100 €", "Matériel pédagogique et préparation\naux oraux blancs pour 3 lycéens"),
    ]
    don_gap = 8
    don_w = (CW - 2 * don_gap) / 3
    don_h = 38
    don_y = bottom_y - don_h

    for i, (amount, desc) in enumerate(dons):
        dx = MX + i * (don_w + don_gap)
        rr(c, dx, don_y, don_w, don_h, 4, fill=WHITE, stroke=GOLD, sw=0.8)
        
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 12)
        c.drawCentredString(dx + don_w / 2, don_y + don_h - 13, amount)
        
        sd = ParagraphStyle("dd", fontName="Helvetica", fontSize=6.0, leading=7.8, textColor=MUTED, alignment=TA_CENTER)
        pd = Paragraph(desc, sd)
        pd.wrapOn(c, don_w - 10, 25)
        pd.drawOn(c, dx + 5, don_y + 3.5)

    # ================================================================
    # 8. FOOTER
    # ================================================================
    fh = 20
    c.setFillColor(NAVY)
    c.rect(0, 0, W, fh, fill=1, stroke=0)
    
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.4)
    c.line(0, fh, W, fh)
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 6.8)
    c.drawCentredString(W / 2, 7, "AMBITION CAMPUS   |   ambitioncampus@gmail.com   |   06 98 99 62 00   |   ambitioncampus.com")

    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
