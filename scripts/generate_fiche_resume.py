"""
Ambition Campus — Fiche Résumé A4 (1 page)
Toutes les données proviennent du document source.
Design professionnel, plein cadre, sans espace vide.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
import os

# ── Palette ──
NAVY       = HexColor("#14213D")
GOLD       = HexColor("#C9A84C")
GOLD_LIGHT = HexColor("#F8F1DD")
SLATE      = HexColor("#334155")
MUTED      = HexColor("#64748B")
SURFACE    = HexColor("#F1F5F9")
BORDER     = HexColor("#CBD5E1")
WHITE      = white

W, H = A4
MX = 16 * mm  # marge horizontale
CW = W - 2 * MX  # largeur utile

OUTPUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "docs")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "fiche-resume-association.pdf")


def rr(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    """Rectangle arrondi."""
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
    """Titre de section avec filet doré."""
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(x, y, text.upper())
    tw = c.stringWidth(text.upper(), "Helvetica-Bold", 9.5)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.8)
    c.line(x, y - 3, x + tw + 4, y - 3)
    return y - 6


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    # ════════════════════════════════════════════════════════
    # HEADER — bandeau pleine largeur
    # ════════════════════════════════════════════════════════
    hh = 62
    hy = H - hh
    c.setFillColor(NAVY)
    c.rect(0, hy, W, hh, fill=1, stroke=0)

    # filet doré bas
    c.setStrokeColor(GOLD)
    c.setLineWidth(2.5)
    c.line(0, hy, W, hy)

    # Nom
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(MX, hy + 28, "AMBITION CAMPUS")

    # Sous-titre
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 8.5)
    c.drawString(MX, hy + 12, "Association loi 1901 / ESS  |  Active depuis 2008  |  100 % benevole")

    # Contact droite
    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7.5)
    rx = W - MX
    c.drawRightString(rx, hy + 40, "ambitioncampus@gmail.com")
    c.drawRightString(rx, hy + 28, "06 98 99 62 00")
    c.drawRightString(rx, hy + 16, "ambitioncampus.com")

    # ════════════════════════════════════════════════════════
    # DEVISE
    # ════════════════════════════════════════════════════════
    y = hy - 16
    c.setFillColor(SLATE)
    c.setFont("Helvetica-BoldOblique", 9.5)
    c.drawCentredString(W / 2, y, "\xab Rendre la pareille, c\u2019est notre identite \xbb")

    # ════════════════════════════════════════════════════════
    # MISSION — bloc pleine largeur
    # ════════════════════════════════════════════════════════
    y -= 18
    mission_h = 34
    rr(c, MX, y - mission_h, CW, mission_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)
    sm = ParagraphStyle("m", fontName="Helvetica", fontSize=8, leading=11,
                        textColor=SLATE, alignment=TA_JUSTIFY)
    mt = (
        "<b>Mission :</b> Lutter contre l\u2019autocensure et promouvoir l\u2019egalite des chances "
        "en accompagnant les jeunes issus de milieux populaires (QPV / REP) vers les filieres "
        "selectives du superieur. Chaque euro verse va directement aux actions terrain."
    )
    p = Paragraph(mt, sm)
    p.wrapOn(c, CW - 14, 50)
    p.drawOn(c, MX + 7, y - mission_h + 6)

    # ════════════════════════════════════════════════════════
    # CHIFFRES CLES — 6 KPI
    # ════════════════════════════════════════════════════════
    y = y - mission_h - 14
    y = section_head(c, MX, y, "Chiffres cles")

    kpis = [
        ("500+",    "lyceens\naccompagnes / an"),
        ("75",      "benevoles\nengages"),
        ("525",     "binomes\nmentors actifs"),
        ("36",      "lycees REP\nconventionnes"),
        ("210+",    "oraux blancs\norganises"),
        ("150+",    "evenements\npar an"),
    ]

    gap = 5
    bw = (CW - 5 * gap) / 6
    bh = 46
    y -= 4
    by = y - bh

    for i, (num, lab) in enumerate(kpis):
        bx = MX + i * (bw + gap)
        rr(c, bx, by, bw, bh, 4, fill=NAVY)
        # Chiffre
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 15)
        c.drawCentredString(bx + bw / 2, by + bh - 18, num)
        # Label
        c.setFillColor(HexColor("#CBD5E1"))
        c.setFont("Helvetica", 6)
        lines = lab.split("\n")
        for j, ln in enumerate(lines):
            c.drawCentredString(bx + bw / 2, by + bh - 29 - j * 7.5, ln)

    # ════════════════════════════════════════════════════════
    # DEUX COLONNES — Actions | Resultats
    # ════════════════════════════════════════════════════════
    y = by - 14
    col_gap = 12
    col_w = (CW - col_gap) / 2
    lx = MX
    rx_col = MX + col_w + col_gap

    # ── COL GAUCHE : ACTIONS ──
    cy_l = section_head(c, lx, y, "Nos actions")

    actions = [
        ("Mentorat individuel",
         "Accompagnement personnalise par des mentors (etudiants, professionnels, alumni) tout au long de l\u2019annee scolaire."),
        ("Oraux blancs & preparation concours",
         "Simulations d\u2019entretiens d\u2019admission pour les filieres selectives (Sciences Po, CPGE, etc.) devant des jurys de professionnels."),
        ("Ateliers d\u2019eloquence",
         "Modules culture generale, decryptage de l\u2019actualite (AC Decrypte), eloquence (Ethos / Pathos / Logos) et concours annuel."),
        ("Immersions professionnelles",
         "Visites d\u2019institutions et d\u2019entreprises : Assemblee nationale, Conseil d\u2019Etat, Station F, Google, tribunaux."),
        ("Plaidoyer & Media",
         "Documentaire \xab Merite sous condition \xbb, podcast Radio Ambition Campus."),
    ]

    st_t = ParagraphStyle("at", fontName="Helvetica-Bold", fontSize=7.5, leading=9.5, textColor=NAVY)
    st_d = ParagraphStyle("ad", fontName="Helvetica", fontSize=6.8, leading=9, textColor=MUTED)

    for title, desc in actions:
        cy_l -= 5
        # bullet doré
        c.setFillColor(GOLD)
        c.circle(lx + 3, cy_l - 1, 2, fill=1, stroke=0)
        # titre
        pt = Paragraph(title, st_t)
        pt.wrapOn(c, col_w - 14, 20)
        pt.drawOn(c, lx + 10, cy_l - 5)
        cy_l -= 10
        # desc
        pd = Paragraph(desc, st_d)
        pw, ph = pd.wrapOn(c, col_w - 14, 40)
        pd.drawOn(c, lx + 10, cy_l - ph + 2)
        cy_l -= ph

    # ── COL DROITE : RESULTATS 2026 ──
    cy_r = section_head(c, rx_col, y, "Resultats promotion 2026")

    # Encart admissions
    cy_r -= 6
    res_h = 80
    rr(c, rx_col, cy_r - res_h, col_w, res_h, 5, fill=GOLD_LIGHT, stroke=GOLD, sw=0.8)

    admissions = [
        ("21",  "admis a Sciences Po Paris"),
        ("17",  "admis a La Sorbonne (Droit, Eco, Gestion, Histoire)"),
        ("13",  "en prepas prestigieuses (Henri IV, Saint-Louis, Lakanal)"),
    ]

    ry = cy_r - 15
    for num, lab in admissions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(rx_col + 8, ry, num)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 7.2)
        c.drawString(rx_col + 32, ry + 2, lab)
        ry -= 22

    cy_r = cy_r - res_h - 6

    # Complements
    st_c = ParagraphStyle("co", fontName="Helvetica", fontSize=7, leading=9.5, textColor=SLATE)
    comp = (
        "<b>Autres admissions :</b> ESSEC, Dauphine, Assas, ecoles d\u2019ingenieurs, BTS/BUT.<br/>"
        "<b>Note de satisfaction :</b> 9,2 / 10 (lyceens et mentors).<br/>"
        "<b>Cout par lyceen :</b> 35 \u20ac / an (100 % terrain).<br/>"
        "<b>Ratio d\u2019impact :</b> 1 \u20ac investi = 5,30 \u20ac de valeur d\u2019accompagnement."
    )
    pc = Paragraph(comp, st_c)
    pw, ph = pc.wrapOn(c, col_w - 4, 60)
    pc.drawOn(c, rx_col + 2, cy_r - ph)
    cy_r -= ph + 10

    # Implantations
    cy_r = section_head(c, rx_col, cy_r, "Implantations")
    cy_r -= 6
    antennes = [
        "Paris (pole historique, Ile-de-France : 445 binomes)",
        "Reims (antenne Grand Est)",
        "Poitiers (antenne Nouvelle-Aquitaine)",
        "Menton (antenne PACA)",
    ]
    for ant in antennes:
        c.setFillColor(GOLD)
        c.circle(rx_col + 3, cy_r + 2, 1.5, fill=1, stroke=0)
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 7)
        c.drawString(rx_col + 10, cy_r, ant)
        cy_r -= 11

    # ════════════════════════════════════════════════════════
    # PARTENAIRES CONFIRMES
    # ════════════════════════════════════════════════════════
    bottom_y = min(cy_l, cy_r) - 10
    bottom_y = section_head(c, MX, bottom_y, "Partenaires confirmes")

    bottom_y -= 4
    part_h = 26
    rr(c, MX, bottom_y - part_h, CW, part_h, 4, fill=SURFACE, stroke=BORDER, sw=0.6)

    # Uniquement les partenaires cités comme tels dans le document source
    partners = ["Sciences Po Paris", "PwC", "EY", "Deloitte", "KPMG", "Banque de France", "Assemblee nationale"]
    ptxt = "   \u2022   ".join(partners)
    sp = ParagraphStyle("pp", fontName="Helvetica", fontSize=7.5, leading=10, textColor=SLATE, alignment=TA_CENTER)
    pp = Paragraph(ptxt, sp)
    pp.wrapOn(c, CW - 16, 24)
    pp.drawOn(c, MX + 8, bottom_y - part_h + 6)

    # ════════════════════════════════════════════════════════
    # EQUIVALENCES DE DONS
    # ════════════════════════════════════════════════════════
    bottom_y = bottom_y - part_h - 12
    bottom_y = section_head(c, MX, bottom_y, "Equivalences de dons")

    bottom_y -= 6
    dons = [
        ("15 \u20ac", "Transport & collation pour 1 lyceen lors d\u2019une journee d\u2019orientation"),
        ("35 \u20ac", "Accompagnement complet d\u20191 lyceen pendant toute une annee scolaire"),
        ("100 \u20ac", "Materiel pedagogique et preparation aux oraux pour 3 lyceens"),
    ]

    don_gap = 8
    don_w = (CW - 2 * don_gap) / 3
    don_h = 44
    don_y = bottom_y - don_h

    for i, (amount, desc) in enumerate(dons):
        dx = MX + i * (don_w + don_gap)
        rr(c, dx, don_y, don_w, don_h, 4, fill=WHITE, stroke=GOLD, sw=0.8)
        # Montant
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 13)
        c.drawCentredString(dx + don_w / 2, don_y + don_h - 15, amount)
        # Desc
        sd = ParagraphStyle("dd", fontName="Helvetica", fontSize=6.5, leading=8.2, textColor=MUTED, alignment=TA_CENTER)
        pd = Paragraph(desc, sd)
        pd.wrapOn(c, don_w - 10, 30)
        pd.drawOn(c, dx + 5, don_y + 3)

    # ════════════════════════════════════════════════════════
    # FOOTER
    # ════════════════════════════════════════════════════════
    fh = 22
    c.setFillColor(NAVY)
    c.rect(0, 0, W, fh, fill=1, stroke=0)
    # filet doré haut
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(0, fh, W, fh)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 7)
    c.drawCentredString(W / 2, 8,
        "AMBITION CAMPUS   |   ambitioncampus@gmail.com   |   06 98 99 62 00   |   ambitioncampus.com")

    # ── Sauvegarde ──
    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
