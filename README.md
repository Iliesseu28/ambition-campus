# Ambition Campus — Plateforme de Levée de Fonds & Partenariats

**Lutter contre l'autocensure. Promouvoir l'égalité des chances.**

Association Loi 1901 / ESS active depuis 2008, 100 % bénévole, accompagnant plus de 500 lycéens de milieux populaires (QPV / 36 lycées REP) vers les filières sélectives de l'enseignement supérieur (Sciences Po Paris, CPGE, La Sorbonne, Assas, Dauphine, écoles d'ingénieurs).

---

## 📁 Architecture Complète du Projet

```text
ambition-campus/
├── README.md
├── assets/
│   ├── photo_equipe.png                      # Photo d'équipe originale
│   └── photo_equipe_cropped.png              # Photo recadrée optimisée pour A4
├── docs/
│   ├── pdf-presentation-ambition-campus.pdf  # PDF de présentation A4 (Externe / Financeurs)
│   └── guide-financement-association.pdf     # Plan d'action financier A4 (Interne / 4 Piliers)
├── prospection/
│   ├── fondations/                           # PILIER 3 : FONDATIONS D'ENTREPRISE
│   │   ├── RAPPORT_FONDATIONS_STRATEGIE.md   # Playbook & Stratégie des 26 fondations cibles
│   │   ├── fondations_database.csv           # Base CSV (Import immédiat Google Sheets)
│   │   ├── fondations_database.xlsx          # Tableau de bord Excel stylisé avec filtres
│   │   └── emails_generes/                   # 26 emails de prospection personnalisés prêts à l'envoi
│   └── entreprises/                          # PILIER 2 : MÉCÉNAT PRIVÉ D'ENTREPRISE
│       ├── RAPPORT_ENTREPRISES_MECENAT.md    # Playbook & Stratégie des 26 entreprises cibles
│       ├── entreprises_database.csv          # Base CSV Mécénat (Import immédiat Google Sheets)
│       ├── entreprises_database.xlsx         # Tableau de bord Excel stylisé avec filtres sectoriels
│       └── emails_generes/                   # 26 emails de prospection personnalisés prêts à l'envoi
└── scripts/
    ├── generate_fiche_resume.py              # Générateur du PDF de présentation A4
    ├── generate_plan_financement.py          # Générateur du Guide Financement A4
    ├── enrich_foundations.py                 # Générateur/Export de la base de données fondations
    ├── generate_outreach_emails.py           # Générateur automatique des emails fondations
    ├── enrich_entreprises.py                 # Générateur/Export de la base de données entreprises
    └── generate_entreprises_emails.py        # Générateur automatique des emails entreprises
```

---

## 📊 Chiffres Clés de l'Impact 2026

- **500+** lycéens accompagnés par an
- **75** bénévoles et mentors engagés
- **525** binômes de mentorat actifs
- **36** lycées REP conventionnés sur 4 régions (Île-de-France, Grand Est, Nouvelle-Aquitaine, PACA)
- **21** admis à Sciences Po Paris, **17** à La Sorbonne, **13** en prépas d'élite (Henri IV, Saint-Louis, Lakanal)
- **1 € investi = 5,30 €** de valeur d'accompagnement direct sur le terrain (Coût net : 35 € / lycéen par an)
- **Note de satisfaction** : 9,2 / 10 par les jeunes et les mentors

---

## 🏛️ Les 4 Piliers de Financement

1. **Pilier 1 — Fonds Publics & Subventions** (Région IDF 7k€, Mairies, Cités Éducatives DAUPHIN BOP 147, FDVA).
2. **Pilier 2 — Mécénat Privé d'Entreprise** (PwC, EY, Deloitte, KPMG, Mazars, Banque de France, Gide, Google - Déduction 60% IS).
3. **Pilier 3 — Fondations d'Entreprise** (Fondation Bolloré via Canal+, BNP Projet Banlieues, TotalEnergies, etc.).
4. **Pilier 4 — Cagnotte & Dons Particuliers** (Campagne HelloAsso LinkedIn, formule 35€ = 1 lycéen / an, Déduction 66% IR).

---

## 🔗 Liens Utiles

- **Site officiel** : [ambitioncampus.com](https://ambitioncampus.squarespace.com)
- **Contact** : ambitioncampus@gmail.com | 06 98 99 62 00
- **Dépôt GitHub** : [github.com/Iliesseu28/ambition-campus](https://github.com/Iliesseu28/ambition-campus)
