"""
Ambition Campus - Fiche Resume A4 (1 page)
Toutes les donnees proviennent du document source.
Design professionnel, plein cadre, avec photo d'equipe.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
import os

# -- Palette --
NAVY       = HexColor("#14213D")
GOLD       = HexColor("#C9A84C")
GOLD_LIGHT = HexColor("#F8F1DD")
SLATE      = HexColor("#334155")
MUTED      = HexColor("#64748B")
SURFACE    = HexColor("#F1F5F9")
BORDER     = HexColor("#CBD5E1")
WHITE      = white

W, H = A4
MX = 16 * mm
CW = W - 2 * MX

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
ASSET_DIR   = os.path.join(SCRIPT_DIR, "..", "assets")
OUTPUT_DIR  = os.path.join(SCRIPT_DIR, "..", "docs")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "fiche-resume-association.pdf")
PHOTO_PATH  = os.path.join(ASSET_DIR, "photo_equipe.png")


def rr(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    c.saveState()
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    else:
        c.setStrokeColor(fill or WHITE)
    c.roundRect(x, y, w, h, r, fill=1 if fill else 0, stroke=1 if stroke else 0)
    c.restoreState()


def section_head(c, x, y, text):
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x, y, text.upper())
    tw = c.stringWidth(text.upper(), "Helvetica-Bold", 9)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.8)
    c.line(x, y - 3, x + tw + 4, y - 3)
    return y - 5


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    # ================================================================
    # HEADER
    # ================================================================
    hh = 58
    hy = H - hh
    c.setFillColor(NAVY)
    c.rect(0, hy, W, hh, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(2.5)
    c.line(0, hy, W, hy)

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MX, hy + 26, "AMBITION CAMPUS")
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 8)
    c.drawString(MX, hy + 11, "Association loi 1901 / ESS  |  Active depuis 2008  |  100 % benevole")

    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7)
    rx = W - MX
    c.drawRightString(rx, hy + 38, "ambitioncampus@gmail.com")
    c.drawRightString(rx, hy + 27, "06 98 99 62 00")
    c.drawRightString(rx, hy + 16, "ambitioncampus.com")

    # ================================================================
    # PHOTO D'EQUIPE - pleine largeur sous le header
    # ================================================================
    y = hy
    photo_h = 120  # hauteur de la bande photo
    photo_y = y - photo_h

    # Image source : 2500 x 1709 (ratio ~1.46)
    img_ratio = 2500 / 1709
    # On dessine sur toute la largeur du contenu
    img_draw_w = CW
    img_draw_h = img_draw_w / img_ratio

    # Si l'image est plus haute que la bande, on la recadre visuellement
    # en la centrant verticalement via clipping
    if img_draw_h > photo_h:
        # Clip pour ne montrer que la partie centrale
        c.saveState()
        clip_path = c.beginPath()
        # Rectangle arrondi en bas pour le clip
        clip_path.roundRect(MX, photo_y, CW, photo_h, 6)
        clip_path.close()
        c.clipPath(clip_path, stroke=0)
        # Centrer l'image verticalement dans le clip
        img_y = photo_y - (img_draw_h - photo_h) / 2
        c.drawImage(PHOTO_PATH, MX, img_y, width=img_draw_w, height=img_draw_h,
                     preserveAspectRatio=True, mask='auto')
        c.restoreState()
    else:
        c.drawImage(PHOTO_PATH, MX, photo_y, width=img_draw_w, height=photo_h,
                     preserveAspectRatio=True, mask='auto')

    # Bordure arrondie par-dessus
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.roundRect(MX, photo_y, CW, photo_h, 6, fill=0, stroke=1)
    c.restoreState()

    # ================================================================
    # DEVISE
    # ================================================================
    y = photo_y - 14
    c.setFillColor(SLATE)
    c.setFont("Helvetica-BoldOblique", 9.5)
    c.drawCentredString(W / 2, y, "\xab Rendre la pareille, c\u2019est notre identite \xbb")

    # ================================================================
    # MISSION
    # ================================================================
    y -= 14
    mission_h = 30
    rr(c, MX, y - mission_h, CW, mission_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)
    sm = ParagraphStyle("m", fontName="Helvetica", fontSize=7.5, leading=10,
                        textColor=SLATE, alignment=TA_JUSTIFY)
    mt = (
        "<b>Mission :</b> Lutter contre l\u2019autocensure et promouvoir l\u2019egalite des chances "
        "en accompagnant les jeunes issus de milieux populaires (QPV / REP) vers les filieres "
        "selectives du superieur. Chaque euro verse va directement aux actions terrain."
    )
    p = Paragraph(mt, sm)
    p.wrapOn(c, CW - 14, 50)
    p.drawOn(c, MX + 7, y - mission_h + 5)

    # ================================================================
    # CHIFFRES CLES
    # ================================================================
    y = y - mission_h - 10
    y = section_head(c, MX, y, "Chiffres cles")

    kpis = [
        ("500+",  "lyceens\naccompagnes / an"),
        ("75",    "benevoles\nengages"),
        ("525",   "binomes\nmentors actifs"),
        ("36",    "lycees REP\nconventionnes"),
        ("210+",  "oraux blancs\norganises"),
        ("150+",  "evenements\npar an"),
    ]
    gap = 5
    bw = (CW - 5 * gap) / 6
    bh = 42
    y -= 4
    by = y - bh
    for i, (num, lab) in enumerate(kpis):
        bx = MX + i * (bw + gap)
        rr(c, bx, by, bw, bh, 4, fill=NAVY)
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 14)
        c.drawCentredString(bx + bw / 2, by + bh - 16, num)
        c.setFillColor(HexColor("#CBD5E1"))
        c.setFont("Helvetica", 5.8)
        for j, ln in enumerate(lab.split("\n")):
            c.drawCentredString(bx + bw / 2, by + bh - 27 - j * 7, ln)

    # ================================================================
    # DEUX COLONNES
    # ================================================================
    y = by - 10
    col_gap = 12
    col_w = (CW - col_gap) / 2
    lx = MX
    rx_col = MX + col_w + col_gap

    # -- GAUCHE : ACTIONS --
    cy_l = section_head(c, lx, y, "Nos actions")
    actions = [
        ("Mentorat individuel",
         "Accompagnement personnalise par des mentors (etudiants, professionnels, alumni) tout au long de l\u2019annee."),
        ("Oraux blancs",
         "Simulations d\u2019entretiens d\u2019admission pour Sciences Po, CPGE, etc. devant des jurys professionnels."),
        ("Ateliers d\u2019eloquence",
         "Culture generale, AC Decrypte, modules Ethos/Pathos/Logos et concours annuel d\u2019eloquence."),
        ("Immersions professionnelles",
         "Visites : Assemblee nationale, Conseil d\u2019Etat, Station F, Google, tribunaux, masterclass."),
        ("Plaidoyer & Media",
         "Documentaire \xab Merite sous condition \xbb, podcast Radio Ambition Campus."),
    ]
    st_t = ParagraphStyle("at", fontName="Helvetica-Bold", fontSize=7, leading=9, textColor=NAVY)
    st_d = ParagraphStyle("ad", fontName="Helvetica", fontSize=6.5, leading=8.5, textColor=MUTED)

    for title, desc in actions:
        cy_l -= 4
        c.setFillColor(GOLD)
        c.circle(lx + 3, cy_l - 1, 1.8, fill=1, stroke=0)
        pt = Paragraph(title, st_t)
        pt.wrapOn(c, col_w - 12, 20)
        pt.drawOn(c, lx + 10, cy_l - 4)
        cy_l -= 9
        pd = Paragraph(desc, st_d)
        pw, ph = pd.wrapOn(c, col_w - 12, 35)
        pd.drawOn(c, lx + 10, cy_l - ph + 2)
        cy_l -= ph - 1

    # -- DROITE : RESULTATS 2026 --
    cy_r = section_head(c, rx_col, y, "Resultats promotion 2026")

    cy_r -= 5
    res_h = 68
    rr(c, rx_col, cy_r - res_h, col_w, res_h, 5, fill=GOLD_LIGHT, stroke=GOLD, sw=0.8)

    admissions = [
        ("21", "admis a Sciences Po Paris"),
        ("17", "admis a La Sorbonne (Droit, Eco, Gestion, Histoire)"),
        ("13", "en prepas prestigieuses (Henri IV, Saint-Louis, Lakanal)"),
    ]
    ry = cy_r - 12
    for num, lab in admissions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(rx_col + 8, ry, num)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 6.8)
        c.drawString(rx_col + 28, ry + 2, lab)
        ry -= 19

    cy_r = cy_r - res_h - 5
    st_c = ParagraphStyle("co", fontName="Helvetica", fontSize=6.5, leading=8.8, textColor=SLATE)
    comp = (
        "<b>Autres :</b> ESSEC, Dauphine, Assas, ecoles d\u2019ingenieurs, BTS/BUT.<br/>"
        "<b>Satisfaction :</b> 9,2 / 10 (lyceens et mentors).<br/>"
        "<b>Cout / lyceen :</b> 35 \u20ac / an (100 % terrain).<br/>"
        "<b>Impact :</b> 1 \u20ac investi = 5,30 \u20ac de valeur d\u2019accompagnement."
    )
    pc = Paragraph(comp, st_c)
    pw, ph = pc.wrapOn(c, col_w - 4, 50)
    pc.drawOn(c, rx_col + 2, cy_r - ph)
    cy_r -= ph + 8

    # Implantations
    cy_r = section_head(c, rx_col, cy_r, "Implantations")
    cy_r -= 5
    antennes = [
        "Paris (pole historique, 445 binomes en IdF)",
        "Reims (antenne Grand Est)",
        "Poitiers (antenne Nouvelle-Aquitaine)",
        "Menton (antenne PACA)",
    ]
    for ant in antennes:
        c.setFillColor(GOLD)
        c.circle(rx_col + 3, cy_r + 2, 1.5, fill=1, stroke=0)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 6.5)
        c.drawString(rx_col + 10, cy_r, ant)
        cy_r -= 10

    # ================================================================
    # PARTENAIRES CONFIRMES
    # ================================================================
    bottom_y = min(cy_l, cy_r) - 8
    bottom_y = section_head(c, MX, bottom_y, "Partenaires confirmes")
    bottom_y -= 4
    part_h = 22
    rr(c, MX, bottom_y - part_h, CW, part_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)
    partners = ["Sciences Po Paris", "PwC", "EY", "Deloitte", "KPMG",
                "Banque de France", "Assemblee nationale"]
    ptxt = "   \u2022   ".join(partners)
    sp = ParagraphStyle("pp", fontName="Helvetica", fontSize=7, leading=9, textColor=SLATE, alignment=TA_CENTER)
    pp = Paragraph(ptxt, sp)
    pp.wrapOn(c, CW - 16, 22)
    pp.drawOn(c, MX + 8, bottom_y - part_h + 5)

    # ================================================================
    # EQUIVALENCES DE DONS
    # ================================================================
    bottom_y = bottom_y - part_h - 10
    bottom_y = section_head(c, MX, bottom_y, "Equivalences de dons")
    bottom_y -= 5

    dons = [
        ("15 \u20ac", "Transport & collation pour\n1 lyceen, 1 journee d\u2019orientation"),
        ("35 \u20ac", "Accompagnement complet\nd\u20191 lyceen pendant 1 annee scolaire"),
        ("100 \u20ac", "Materiel pedagogique et\noraux pour 3 lyceens"),
    ]
    don_gap = 8
    don_w = (CW - 2 * don_gap) / 3
    don_h = 40
    don_y = bottom_y - don_h

    for i, (amount, desc) in enumerate(dons):
        dx = MX + i * (don_w + don_gap)
        rr(c, dx, don_y, don_w, don_h, 4, fill=WHITE, stroke=GOLD, sw=0.8)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 12)
        c.drawCentredString(dx + don_w / 2, don_y + don_h - 14, amount)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 6)
        lines = desc.split("\n")
        for j, ln in enumerate(lines):
            c.drawCentredString(dx + don_w / 2, don_y + don_h - 25 - j * 7.5, ln)

    # ================================================================
    # FOOTER
    # ================================================================
    fh = 20
    c.setFillColor(NAVY)
    c.rect(0, 0, W, fh, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(0, fh, W, fh)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawCentredString(W / 2, 7,
        "AMBITION CAMPUS   |   ambitioncampus@gmail.com   |   06 98 99 62 00   |   ambitioncampus.com")

    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
