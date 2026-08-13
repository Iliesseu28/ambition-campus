"""
Ambition Campus - Guide & Plan d'Action Financement (1 page A4)
Version grand format : Feuille de route retirée, 4 blocs piliers maximisés et remplis.
Structure par répétition : QUI CIBLER • COMMENT ACTIVER • COMBIEN VISER • RÈGLE & FISCALITÉ.
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
MX = 15 * mm  # ~42.52 pt
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
    # 1. HEADER STRATÉGIQUE (Hauteur: 56pt)
    # ================================================================
    hh = 56
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
    c.drawString(MX, hy + 31, "AMBITION CAMPUS  |  PLAN D'ACTION FINANCIER")
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(MX, hy + 15, "OBJECTIF 2026-2027 : DIVERSIFIER LES RESSOURCES & FINANCER 500+ LYCÉENS")

    c.setFillColor(HexColor("#94A3B8"))
    c.setFont("Helvetica", 7.5)
    rx = W - MX
    c.drawRightString(rx, hy + 31, "Document Stratégique Interne")
    c.drawRightString(rx, hy + 15, "Modèle 100 % bénévole  •  1 € = 5,30 €")

    # ================================================================
    # 2. SCHÉMA GLOBAL DES FLUX (Hauteur: 58pt)
    # ================================================================
    y = hy - 10
    box_schema_h = 56
    y_schema = y - box_schema_h
    rr(c, MX, y_schema, CW, box_schema_h, 5, fill=SURFACE, stroke=BORDER, sw=0.8)

    # Titre du bandeau synthèse
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(W / 2, y_schema + box_schema_h - 13, "CARTOGRAPHIE DES 4 PILIERS DE FINANCEMENT (POTENTIEL GLOBAL : 85 000 € - 130 000 €)")

    caps = [
        ("1. FONDS PUBLICS", "Région, Mairies, Cités Éduc.", "25 000 € - 35 000 €", COLOR_PUB),
        ("2. MÉCÉNAT PRIVÉ", "Cabinets jurys & Banques", "30 000 € - 45 000 €", COLOR_PRIV),
        ("3. FONDATIONS", "Bolloré, BNP, TotalEnergies", "20 000 € - 35 000 €", COLOR_FOND),
        ("4. CAGNOTTE & DONS", "LinkedIn, Réseau (35€/jeune)", "10 000 € - 15 000 €", COLOR_DONS),
    ]
    cap_gap = 6
    cap_w = (CW - 16 - 3 * cap_gap) / 4
    cap_h = 31
    cap_y = y_schema + 6

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
    # 3. LES 4 GRANDS BLOCS MAXIMISÉS EN GRILLE 2x2 (Hauteur: 326pt par ligne)
    # ================================================================
    grid_top = y_schema - 10
    col_gap = 10
    col_w = (CW - col_gap) / 2
    row_h = 332  # Hauteur étendue pour remplir tout l'espace
    
    st_text = ParagraphStyle("txt", fontName="Helvetica", fontSize=7.4, leading=9.8, textColor=SLATE)

    piliers = [
        {
            "num": "PILIER 1",
            "title": "FONDS PUBLICS & SUBVENTIONS",
            "accent": COLOR_PUB,
            "col_idx": 0, "row_idx": 0,
            "qui": "• <b>Région Île-de-France :</b> AAP Orientation & Réussite (pôle principal : 445 binômes).<br/>"
                   "• <b>Cités Éducatives / ANCT :</b> Crédits BOP 147 (Politique de la Ville) dans les 36 lycées REP.<br/>"
                   "• <b>Mairies & Métropoles :</b> Paris, Reims, Poitiers, Menton (Adjoints Jeunesse/Éducation).<br/>"
                   "• <b>FDVA (État / DRAJES) :</b> Volet fonctionnement & formation des 75 bénévoles.",
            "comment": "• <b>MesDémarches IDF :</b> Finaliser et déposer le dossier draft préparé (7 000 €).<br/>"
                       "• <b>Plateforme DAUPHIN :</b> Déposer les demandes subventions Cités Éducatives.<br/>"
                       "• <b>Formulaires CERFA mairies :</b> Prises de contact axées sur la création de valeur locale.<br/>"
                       "• <b>Veille active :</b> Exploiter le bot bimensuel de détection des appels à projets.",
            "combien": "• <b>Tickets unitaires :</b> 2 000 € à 10 000 € par guichet et collectivité.<br/>"
                       "• <b>Potentiel cumulé :</b> <b>25 000 € à 35 000 € / an</b>.<br/>"
                       "• <i>Pilotage :</i> Anna Barcelos (dossiers) & Marie-Makalé Gonçalves (mairies).",
            "regle": "• <b>Ancrage territorial :</b> Démontrer l'impact direct sur les lycéens de la commune/région.<br/>"
                     "• <b>Modèle 100 % terrain :</b> L'intégralité des fonds finance les kits, oraux et transports."
        },
        {
            "num": "PILIER 2",
            "title": "MÉCÉNAT PRIVÉ D'ENTREPRISE",
            "accent": COLOR_PRIV,
            "col_idx": 1, "row_idx": 0,
            "qui": "• <b>Partenaires jurys confirmés :</b> PwC, EY, Deloitte, KPMG.<br/>"
                   "• <b>Banques & Assurances :</b> Banque de France, BNP, MAIF, AXA, Société Générale.<br/>"
                   "• <b>PME / ETI régionales :</b> Entreprises de 50 à 500 salariés proches des lycées.<br/>"
                   "• <i>Cibles :</i> Directeurs RSE, Responsables Recrutement/Talents, Délégués Généraux.",
            "comment": "• <b>Upgrade de partenariat :</b> Transformer leur présence bénévole aux oraux blancs en mécénat financier annuel récurrent.<br/>"
                       "• <b>Conventions de parrainage :</b> Proposer de parrainer une promotion (kits, visites).<br/>"
                       "• <b>Contreparties légales :</b> Visibilité marque employeur, masterclass dans leurs locaux, invitations VIP au concours annuel d'éloquence.",
            "combien": "• <b>Tickets unitaires :</b> 5 000 € à 15 000 € par grand groupe (1k€ - 3k€ par PME).<br/>"
                       "• <b>Potentiel cumulé :</b> <b>30 000 € à 45 000 € / an</b>.<br/>"
                       "• <i>Exemple :</i> 4 cabinets d'audit jurys x 10 000 € = 40 000 €.",
            "regle": "• <b>Levier Fiscal (Loi Aillagon - Art. 238 bis CGI) :</b> Déduction de <b>60 %</b> sur l'IS.<br/>"
                     "• <i>Coût net réel :</i> 10 000 € donnés ne coûtent réellement que <b>4 000 €</b> à l'entreprise."
        },
        {
            "num": "PILIER 3",
            "title": "FONDATIONS D'ENTREPRISE",
            "accent": COLOR_FOND,
            "col_idx": 0, "row_idx": 1,
            "qui": "• <b>Fondation Bolloré :</b> Piste chaude prioritaire via recommandation Canal+.<br/>"
                   "• <b>Fondation BNP Paribas :</b> Programme <i>Projet Banlieues</i> (dédié assos en QPV).<br/>"
                   "• <b>Grandes fondations engagées :</b> TotalEnergies, Fondation SNCF, Fondation RATP.<br/>"
                   "• <i>Interlocuteurs :</i> Délégués Généraux & Chargés de projets Éducation / Territoires.",
            "comment": "• <b>Outreach direct & recommandé :</b> Email d'approche de 10 lignes avec fiche A4 en PJ et proposition de call de 15 minutes.<br/>"
                       "• <b>Candidatures AAP thématiques :</b> Dépôt de dossiers centrés sur l'insertion.<br/>"
                       "• <b>Preuves d'impact massues :</b> 21 admis Sciences Po 2026, 17 Sorbonne, 13 prépas prestigieuses, 9,2/10 de note de satisfaction, ROI social 1€=5,30€.",
            "combien": "• <b>Tickets unitaires :</b> 10 000 € à 30 000 € par dotation annuelle.<br/>"
                       "• <b>Potentiel cumulé :</b> <b>20 000 € à 35 000 € / an</b>.<br/>"
                       "• <i>Pérennité :</i> Accords souvent reconductibles sur des cycles de 2 à 3 ans.",
            "regle": "• <b>Règle d'or :</b> Ne jamais déformer l'association. Rester 100 % sur le cœur de métier : égalité des chances, mentorat individuel et éloquence."
        },
        {
            "num": "PILIER 4",
            "title": "CAGNOTTE & DONS PARTICULIERS",
            "accent": COLOR_DONS,
            "col_idx": 1, "row_idx": 1,
            "qui": "• <b>Réseau LinkedIn & Grand Public :</b> Citoyens engagés pour la justice éducative.<br/>"
                   "• <b>Communauté de l'association :</b> Bénévoles, mentors, alumni insérés, familles.<br/>"
                   "• <i>Portage de la campagne :</i> Ilias avec relais de toute l'équipe.",
            "comment": "• <b>Collecte HelloAsso :</b> 0 % de commission, génération automatique des reçus.<br/>"
                       "• <b>Campagne LinkedIn d'impact :</b> Post fondateur avec vidéo courte d'admis (30s) + carrousel infographie des admissions 2026.<br/>"
                       "• <b>Équivalences de dons claires :</b><br/>"
                       "   🔹 <b>15 € :</b> Transport & collation pour 1 lycéen en journée d'orientation.<br/>"
                       "   🔹 <b>35 € :</b> <b>Parcours complet d'1 lycéen pendant toute une année scolaire.</b><br/>"
                       "   🔹 <b>100 € :</b> Préparation complète aux oraux blancs pour 3 lycéens.",
            "combien": "• <b>Tickets moyens :</b> 15 € à 100 € par donateur.<br/>"
                       "• <b>Potentiel cumulé :</b> <b>10 000 € à 15 000 € / campagne</b>.<br/>"
                       "• <i>Avantage :</i> Trésorerie disponible immédiatement sans délai administratif.",
            "regle": "• <b>Levier Fiscal (Art. 200 du CGI) :</b> Déduction d'impôt sur le revenu de <b>66 %</b>.<br/>"
                     "• <i>Argument massue :</i> <b>Un don de 35 € ne coûte que 11,90 € après impôt.</b>"
        },
    ]

    for p in piliers:
        card_x = MX + p["col_idx"] * (col_w + col_gap)
        card_y = grid_top - (p["row_idx"] + 1) * row_h + (0 if p["row_idx"] == 0 else 6)
        
        # Boîte de la carte
        card_h = row_h - 8
        rr(c, card_x, card_y, col_w, card_h, 5, fill=WHITE, stroke=BORDER, sw=0.8)
        
        # Bandeau de titre supérieur
        bandeau_h = 24
        rr(c, card_x, card_y + card_h - bandeau_h, col_w, bandeau_h, 5, fill=p["accent"])
        # Rectifier le bas arrondi du bandeau
        c.setFillColor(p["accent"])
        c.rect(card_x, card_y + card_h - bandeau_h, col_w, 6, fill=1, stroke=0)
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(card_x + 8, card_y + card_h - 15, f"{p['num']} : {p['title']}")
        
        # Contenu structuré QUI / COMMENT / COMBIEN / RÈGLE
        cur_y = card_y + card_h - bandeau_h - 7
        sections_data = [
            ("🎯 QUI CIBLER ?", p["qui"]),
            ("⚙️ COMMENT ACTIVER ?", p["comment"]),
            ("💶 COMBIEN VISER ?", p["combien"]),
            ("⚖️ RÈGLE & FISCALITÉ", p["regle"]),
        ]
        
        for sec_t, sec_c in sections_data:
            # Titre de la puce
            c.setFillColor(p["accent"])
            c.setFont("Helvetica-Bold", 7.5)
            c.drawString(card_x + 8, cur_y, sec_t)
            cur_y -= 8.5
            
            # Texte explicatif
            p_obj = Paragraph(sec_c, st_text)
            pw, ph = p_obj.wrapOn(c, col_w - 16, 95)
            p_obj.drawOn(c, card_x + 8, cur_y - ph + 2)
            cur_y -= ph + 5.5

    # ================================================================
    # 4. FOOTER BAS DE PAGE (Hauteur: 20pt)
    # ================================================================
    fh = 20
    c.setFillColor(NAVY)
    c.rect(0, 0, W, fh, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(0, fh, W, fh)
    
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 6.8)
    c.drawCentredString(W / 2, 7, "AMBITION CAMPUS   |   ambitioncampus@gmail.com   |   06 98 99 62 00   |   ambitioncampus.com")

    c.save()
    print(f"[OK] PDF genere : {os.path.abspath(OUTPUT_PATH)}")


if __name__ == "__main__":
    generate_pdf()
