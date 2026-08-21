# Ambition Campus — Plateforme de Levée de Fonds, Partenariats & CRM 2026-2027

> **Lutter contre l'autocensure. Promouvoir l'égalité des chances.**  
> Association Loi 1901 / ESS active depuis 2008, 100 % bénévole, accompagnant plus de **500 lycéens de milieux populaires (QPV / 36 lycées REP)** vers les filières sélectives de l'enseignement supérieur (Sciences Po Paris, CPGE, La Sorbonne, Assas, Dauphine, écoles d'ingénieurs).

---

## 🌐 Liens de Déploiement & Outils en Direct

- **Application Web & CRM officiel** : **[https://ambition-campus-crm.vercel.app](https://ambition-campus-crm.vercel.app)**
- **Site vitrine officiel** : [ambitioncampus.com](https://ambitioncampus.squarespace.com)
- **Base de données Cloud** : Supabase PostgreSQL (Projet Dreamal mutualisé, tables isolées `ac_*`)
- **Dépôt GitHub** : [github.com/Iliesseu28/ambition-campus](https://github.com/Iliesseu28/ambition-campus)
- **Contact officiel** : `ambitioncampus@gmail.com` | `06 98 99 62 00`

---

## 📁 Architecture Organisée du Projet

```text
ambition-campus/
├── README.md                                 # Documentation générale & guide d'utilisation
├── supabase_migration_ambition_campus.sql     # Script SQL Supabase complet (Tables, RLS, Storage)
│
├── ambition-crm/                             # APPLICATION WEB CRM (React + TypeScript + Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx                    # Barre de navigation principale & compteurs
│   │   │   ├── EntreprisesTable.tsx          # Vue Tableur Entreprises & multi-contacts (Pilier 2)
│   │   │   ├── AppelsProjetsTable.tsx        # Vue Tableur Fondations & AAP (Pilier 3)
│   │   │   ├── AnalyticsView.tsx             # Tableau de bord KPIs & jauges financières
│   │   │   ├── FeedbacksTable.tsx            # Vue Retours Site & suivi des statuts (Section 4)
│   │   │   ├── RelanceModal.tsx              # Tiroir d'échanges & générateur IA de message
│   │   │   ├── AddContactModal.tsx           # Formulaire d'ajout rapide de contact
│   │   │   ├── AddOrganisationModal.tsx      # Formulaire d'ajout d'une nouvelle entreprise/fondation
│   │   │   ├── AddColumnModal.tsx            # Création dynamique de colonnes personnalisées
│   │   │   ├── AddFeedbackModal.tsx          # Formulaire retour avec upload d'images
│   │   │   └── TemplatesModal.tsx            # Modèles officiels de prospection Email & LinkedIn
│   │   ├── lib/
│   │   │   ├── storage.ts                    # Persistance locale (LocalStorage) & auto-sync
│   │   │   ├── supabase.ts                   # Client Supabase Cloud
│   │   │   ├── sync.ts                       # Moteur de synchronisation bidirectionnel
│   │   │   └── telegram.ts                   # Notifications instantanées Telegram
│   │   ├── types.ts                          # Définitions TypeScript strictes
│   │   ├── initialData.json                  # Ingestion des 103 partenaires qualifiés
│   │   ├── App.tsx                           # Composant racine avec auto-save debounced
│   │   └── index.css                         # Styles Tableur Airtable
│   └── package.json
│
├── assets/                                   # Ressources graphiques et médias
│   ├── photo_equipe.png                      # Photo d'équipe originale
│   └── photo_equipe_cropped.png              # Photo recadrée optimisée pour documents A4
│
├── docs/                                     # Plaquettes & Documents officiels 1 page A4
│   ├── bilan-strategique-equipe-ambition-campus.pdf # Bilan Interne 1 page A4 (Équipe)
│   ├── pdf-presentation-ambition-campus.pdf  # Présentation 1 page A4 (Financeurs / Partenaires)
│   └── guide-financement-association.pdf     # Plan d'action financier 1 page A4 (4 Piliers)
│
├── prospection/                              # Bases de données & Templates de prospection
│   ├── entreprises/                          # PILIER 2 : 48 ENTREPRISES QUALIFIÉES
│   │   ├── RAPPORT_ENTREPRISES_MECENAT.md    # Playbook & Stratégie des 48 entreprises
│   │   ├── entreprises_database.csv          # Master CSV Entreprises (Import direct)
│   │   ├── entreprises_database.xlsx         # Master Excel Entreprises stylisé avec filtres
│   │   └── emails_generes/                   # 48 dossiers d'emails personnalisés (A/B/C testing)
│   └── fondations/                           # PILIER 3 : 55 FONDATIONS QUALIFIÉES
│       ├── RAPPORT_FONDATIONS_STRATEGIE.md   # Playbook & Cartographie des 55 fondations
│       ├── fondations_database.csv           # Master CSV Fondations (Import direct)
│       ├── fondations_database.xlsx          # Master Excel Fondations stylisé avec filtres
│       └── emails_generes/                   # 55 dossiers d'emails personnalisés (A/B/C testing)
│
└── scripts/                                  # Scripts d'automatisation et de génération PDF
    ├── generate_bilan_equipe.py              # Générateur du PDF Bilan Stratégique
    ├── generate_fiche_resume.py              # Générateur du PDF de présentation
    ├── generate_plan_financement.py          # Générateur du Guide Financement
    ├── enrich_foundations.py                 # Fusion/Export Master 55 Fondations
    ├── generate_outreach_emails.py           # Génération des emails fondations
    ├── enrich_entreprises.py                 # Fusion/Export Master 48 Entreprises
    └── generate_entreprises_emails.py        # Génération des emails entreprises
```

---

## 📊 Chiffres Clés de l'Impact 2026

- **500+** lycéens accompagnés par an
- **75** bénévoles et mentors engagés
- **525** binômes de mentorat actifs
- **36** lycées REP conventionnés sur 4 régions (Île-de-France, Grand Est, Nouvelle-Aquitaine, PACA)
- **21** admis à Sciences Po Paris, **17** à La Sorbonne, **13** en prépas d'élite (Henri IV, Saint-Louis, Lakanal)
- **1 € investi = 5,30 €** de valeur d'accompagnement direct sur le terrain (Coût net : 35 € / lycéen par an)
- **Note de satisfaction** : 9,2 / 10 mesurée auprès des jeunes et des mentors

---

## 🏛️ Les 4 Piliers de Financement & Potentiel

1. **Pilier 1 — Fonds Publics & Subventions** (Région IDF 7k€, Mairies, Cités Éducatives DAUPHIN BOP 147, FDVA).
2. **Pilier 2 — Mécénat Privé d'Entreprise** (48 entreprises qualifiées : Big 4, banques, cabinets d'avocats, tech, CAC 40 - Déduction 60% IS via Art. 238 bis CGI).
3. **Pilier 3 — Fondations d'Entreprise** (55 fondations qualifiées : Canal+/Bolloré, BNP, SocGen, TotalEnergies, VINCI, etc.).
4. **Pilier 4 — Cagnotte & Dons Particuliers** (Campagne HelloAsso LinkedIn, formule 35€ = 1 lycéen / an, Déduction 66% IR).

---

## 🚀 Fonctionnalités Clés du CRM

1. **Grille Tableur Style Airtable** : Alignement strict des colonnes, navigation par onglets larges et lisibles.
2. **Gestion Multi-Contacts** : Rattachement de plusieurs personnes de contact sous chaque entreprise ou fondation.
3. **Édition Directe (Inline)** : Modification de n'importe quelle case par simple **double-clic**.
4. **Ajout Dynamique** : Boutons d'ajout de nouvelles entreprises/fondations, contacts et colonnes personnalisées.
5. **Auto-Sync Temps Réel** : Sauvegarde locale instantanée et synchronisation automatique avec Supabase Cloud.
6. **Section Retours & Alertes Telegram** : Signalement de bugs et suggestions avec upload de captures d'écran et notifications Telegram directes.
7. **Guide & Templates Intégrés** : Modèles d'emails et messages LinkedIn prêts à copier en un clic.
