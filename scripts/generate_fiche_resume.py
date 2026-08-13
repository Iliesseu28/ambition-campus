"""
Ambition Campus — Générateur de Fiche Résumé A4 (1 page)
Génère un PDF professionnel résumant l'association sur une feuille A4.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import Paragraph, Frame, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ── Couleurs ──
NAVY      = HexColor("#1B2A4A")
GOLD      = HexColor("#C8A951")
LIGHT_BG  = HexColor("#F5F6FA")
DARK_TEXT  = HexColor("#222831")
MEDIUM     = HexColor("#4A5568")
ACCENT_BLUE = HexColor("#2563EB")
LIGHT_GOLD = HexColor("#FBF5E4")
WHITE      = white
BORDER     = HexColor("#E2E8F0")

WIDTH, HEIGHT = A4  # 595.27 x 841.89 points

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "docs")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "fiche-resume-association.pdf")


def draw_rounded_rect(c, x, y, w, h, r, fill_color=None, stroke_color=None, stroke_width=0.5):
    """Dessine un rectangle arrondi."""
    c.saveState()
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        c.setStrokeColor(fill_color if fill_color else WHITE)
    c.roundRect(x, y, w, h, r, fill=1 if fill_color else 0, stroke=1 if stroke_color else 0)
    c.restoreState()


def generate_pdf():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)

    margin_x = 18 * mm
    content_w = WIDTH - 2 * margin_x

    # ════════════════════════════════════════════════════
    # HEADER — Bandeau NAVY en haut
    # ════════════════════════════════════════════════════
    header_h = 72
    header_y = HEIGHT - header_h
    c.setFillColor(NAVY)
    c.rect(0, header_y, WIDTH, header_h, fill=1, stroke=0)

    # Titre
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(margin_x, header_y + 40, "AMBITION CAMPUS")

    # Sous-titre
    c.setFont("Helvetica", 9)
    c.setFillColor(GOLD)
    c.drawString(margin_x, header_y + 22, "Association loi 1901 / ESS  •  Fondée en 2008  •  100% bénévole")

    # Contact à droite
    c.setFillColor(HexColor("#A0AEC0"))
    c.setFont("Helvetica", 7.5)
    c.drawRightString(WIDTH - margin_x, header_y + 46, "ambitioncampus@gmail.com")
    c.drawRightString(WIDTH - margin_x, header_y + 34, "06 98 99 62 00")
    c.drawRightString(WIDTH - margin_x, header_y + 22, "ambitioncampus.com")

    # Ligne dorée sous le header
    c.setStrokeColor(GOLD)
    c.setLineWidth(2.5)
    c.line(0, header_y, WIDTH, header_y)

    # ════════════════════════════════════════════════════
    # BASELINE TAGLINE
    # ════════════════════════════════════════════════════
    y = header_y - 28
    c.setFillColor(NAVY)
    c.setFont("Helvetica-BoldOblique", 10.5)
    tagline = "« Rendre la pareille, c'est notre identité »"
    c.drawCentredString(WIDTH / 2, y, tagline)

    # ════════════════════════════════════════════════════
    # MISSION
    # ════════════════════════════════════════════════════
    y -= 22
    draw_rounded_rect(c, margin_x, y - 40, content_w, 42, 4, fill_color=LIGHT_BG, stroke_color=BORDER)
    style_mission = ParagraphStyle(
        "mission", fontName="Helvetica", fontSize=8.3, leading=11.5,
        textColor=DARK_TEXT, alignment=TA_JUSTIFY
    )
    mission_text = (
        "<b>Mission :</b> Lutter contre l'autocensure et promouvoir l'égalité des chances en accompagnant "
        "les jeunes issus de milieux populaires (QPV / REP) vers les filières sélectives du supérieur. "
        "Chaque euro versé va directement aux actions terrain — transports, kits pédagogiques, accès à la culture."
    )
    p = Paragraph(mission_text, style_mission)
    p.wrapOn(c, content_w - 12, 50)
    p.drawOn(c, margin_x + 6, y - 36)

    # ════════════════════════════════════════════════════
    # CHIFFRES CLÉS — 5 KPI boxes
    # ════════════════════════════════════════════════════
    y -= 62
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin_x, y, "CHIFFRES CLÉS")

    y -= 8
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(margin_x, y, margin_x + 52, y)

    kpis = [
        ("500+",  "lycéens\naccompagnés/an"),
        ("75",    "bénévoles\nengagés"),
        ("36",    "lycées REP\nconventionnés"),
        ("4",     "implantations\nnationales"),
        ("5,30€", "de valeur par\n1€ investi"),
    ]

    y -= 6
    box_w = (content_w - 4 * 6) / 5
    box_h = 48
    box_y = y - box_h

    for i, (num, label) in enumerate(kpis):
        bx = margin_x + i * (box_w + 6)
        draw_rounded_rect(c, bx, box_y, box_w, box_h, 4, fill_color=NAVY)

        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 16)
        c.drawCentredString(bx + box_w / 2, box_y + box_h - 19, num)

        c.setFillColor(HexColor("#CBD5E0"))
        c.setFont("Helvetica", 6.5)
        lines = label.split("\n")
        for j, line in enumerate(lines):
            c.drawCentredString(bx + box_w / 2, box_y + box_h - 31 - j * 8, line)

    # ════════════════════════════════════════════════════
    # DEUX COLONNES — Actions & Résultats 2026
    # ════════════════════════════════════════════════════
    y = box_y - 18
    col_gap = 10
    col_w = (content_w - col_gap) / 2

    # ── Colonne gauche : NOS ACTIONS ──
    col_left_x = margin_x
    cy = y

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(col_left_x, cy, "NOS ACTIONS")
    cy -= 8
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(col_left_x, cy, col_left_x + 42, cy)
    cy -= 4

    actions = [
        ("Mentorat individuel", "525 binômes actifs, accompagnement personnalisé tout au long de l'année scolaire"),
        ("Oraux blancs", "+210 simulations d'entretiens devant des jurys de professionnels (PwC, EY, Deloitte, KPMG)"),
        ("Ateliers d'éloquence", "Modules Ethos/Pathos/Logos, concours annuel, culture générale et AC Décrypte"),
        ("Immersions pro", "Google, Station F, Assemblée nationale, Conseil d'État, Banque de France, tribunaux"),
        ("Plaidoyer & Média", "Documentaire « Mérite sous condition », podcast Radio Ambition Campus"),
    ]

    style_title = ParagraphStyle("at", fontName="Helvetica-Bold", fontSize=7.5, leading=9, textColor=NAVY)
    style_desc = ParagraphStyle("ad", fontName="Helvetica", fontSize=7, leading=9, textColor=MEDIUM)

    for title, desc in actions:
        cy -= 3
        # Bullet
        c.setFillColor(GOLD)
        c.circle(col_left_x + 3, cy - 2, 2, fill=1, stroke=0)

        pt = Paragraph(title, style_title)
        pt.wrapOn(c, col_w - 14, 20)
        pt.drawOn(c, col_left_x + 10, cy - 5)

        pd = Paragraph(desc, style_desc)
        pw, ph = pd.wrapOn(c, col_w - 14, 30)
        cy -= 10
        pd.drawOn(c, col_left_x + 10, cy - ph + 4)
        cy -= ph - 2

    # ── Colonne droite : RÉSULTATS 2026 ──
    col_right_x = margin_x + col_w + col_gap
    cy2 = y

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(col_right_x, cy2, "RÉSULTATS 2026")
    cy2 -= 8
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(col_right_x, cy2, col_right_x + 52, cy2)
    cy2 -= 4

    # Box résultats admissions
    results_box_h = 74
    cy2 -= 4
    draw_rounded_rect(c, col_right_x, cy2 - results_box_h, col_w, results_box_h, 4, fill_color=LIGHT_GOLD, stroke_color=GOLD, stroke_width=0.7)

    admissions = [
        ("21", "admis à Sciences Po Paris"),
        ("17", "admis à La Sorbonne"),
        ("13", "en prépas prestigieuses (Henri IV, Saint-Louis, Lakanal)"),
    ]

    ry = cy2 - 14
    for num, label in admissions:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(col_right_x + 8, ry, num)

        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica", 7)
        c.drawString(col_right_x + 30, ry + 2, label)
        ry -= 20

    cy2 = cy2 - results_box_h - 8

    # Autres admissions
    style_other = ParagraphStyle("ot", fontName="Helvetica", fontSize=7, leading=9.5, textColor=MEDIUM)
    other_text = (
        "<b>+ Admissions :</b> ESSEC, Dauphine, Assas, écoles d'ingénieurs, BTS/BUT.<br/>"
        "<b>Note satisfaction :</b> 9,2/10 par les lycéens et mentors.<br/>"
        "<b>Coût par lycéen :</b> 35€/an (100% terrain)."
    )
    po = Paragraph(other_text, style_other)
    pw, ph = po.wrapOn(c, col_w - 4, 60)
    po.drawOn(c, col_right_x + 2, cy2 - ph)
    cy2 -= ph + 6

    # ── Antennes ──
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(col_right_x, cy2, "IMPLANTATIONS")
    cy2 -= 12

    antennes = ["Paris (pôle historique)", "Reims", "Poitiers", "Menton"]
    c.setFont("Helvetica", 7)
    for ant in antennes:
        c.setFillColor(GOLD)
        c.circle(col_right_x + 3, cy2 + 2, 1.5, fill=1, stroke=0)
        c.setFillColor(DARK_TEXT)
        c.drawString(col_right_x + 10, cy2, ant)
        cy2 -= 11

    # ════════════════════════════════════════════════════
    # PARTENAIRES & SOUTIENS
    # ════════════════════════════════════════════════════
    bottom_section_y = min(cy, cy2) - 14

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin_x, bottom_section_y, "PARTENAIRES & SOUTIENS")
    bottom_section_y -= 8
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(margin_x, bottom_section_y, margin_x + 74, bottom_section_y)
    bottom_section_y -= 4

    partners_box_h = 30
    draw_rounded_rect(c, margin_x, bottom_section_y - partners_box_h, content_w, partners_box_h, 4, fill_color=LIGHT_BG, stroke_color=BORDER)

    partners = [
        "Sciences Po Paris", "PwC", "EY", "Deloitte", "KPMG",
        "Banque de France", "Assemblée nationale", "Google", "Station F"
    ]
    partner_text = "  •  ".join(partners)
    style_partners = ParagraphStyle("par", fontName="Helvetica", fontSize=7.5, leading=10, textColor=DARK_TEXT, alignment=TA_CENTER)
    pp = Paragraph(partner_text, style_partners)
    pp.wrapOn(c, content_w - 16, 30)
    pp.drawOn(c, margin_x + 8, bottom_section_y - partners_box_h + 8)

    # ════════════════════════════════════════════════════
    # LEVIERS DE FINANCEMENT
    # ════════════════════════════════════════════════════
    bottom_section_y -= partners_box_h + 14

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin_x, bottom_section_y, "LEVIERS DE FINANCEMENT")
    bottom_section_y -= 8
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(margin_x, bottom_section_y, margin_x + 74, bottom_section_y)
    bottom_section_y -= 6

    leviers = [
        ("Mécénat privé", "PME/ETI (2-10K€) et grands groupes/fondations (10-50K€). Déduction fiscale 60%."),
        ("Subventions publiques", "Régions, départements, mairies, Cités Éducatives, FDVA, crédits BOP 147."),
        ("Taxe d'apprentissage", "Collecte auprès des entreprises pour financer les actions d'orientation."),
        ("Cagnotte participative", "Campagne grand public : 35€ = 1 lycéen accompagné pendant 1 an."),
    ]

    levier_w = (content_w - 3 * 6) / 4
    levier_h = 52
    levier_y = bottom_section_y - levier_h

    for i, (title, desc) in enumerate(leviers):
        lx = margin_x + i * (levier_w + 6)
        draw_rounded_rect(c, lx, levier_y, levier_w, levier_h, 4, fill_color=WHITE, stroke_color=BORDER, stroke_width=0.7)

        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawString(lx + 5, levier_y + levier_h - 12, title)

        style_lev = ParagraphStyle("lev", fontName="Helvetica", fontSize=6.5, leading=8.5, textColor=MEDIUM)
        pl = Paragraph(desc, style_lev)
        pl.wrapOn(c, levier_w - 10, 40)
        pl.drawOn(c, lx + 5, levier_y + 4)

    # ════════════════════════════════════════════════════
    # FOOTER
    # ════════════════════════════════════════════════════
    footer_h = 24
    c.setFillColor(NAVY)
    c.rect(0, 0, WIDTH, footer_h, fill=1, stroke=0)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawCentredString(WIDTH / 2, 10, "AMBITION CAMPUS  •  ambitioncampus@gmail.com  •  06 98 99 62 00  •  ambitioncampus.com")

    # ── Fin ──
    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
