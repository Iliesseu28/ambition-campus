-- ============================================================================
-- AMBITION CAMPUS — SCHEMA SUPABASE (Isolated with prefix ac_)
-- ============================================================================

-- 1. Table des Entreprises & Partenaires Privés (Pilier 2)
CREATE TABLE IF NOT EXISTS public.ac_entreprises (
    id VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    secteur VARCHAR(255),
    priorite VARCHAR(100),
    ticket_estime VARCHAR(100),
    levier_fiscal TEXT,
    type_approche TEXT,
    angle_pitch TEXT,
    statut_global VARCHAR(100) DEFAULT 'À contacter',
    site_web VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des Appels à Projets & Fondations (Pilier 3)
CREATE TABLE IF NOT EXISTS public.ac_appels_projets (
    id VARCHAR(50) PRIMARY KEY,
    organisme VARCHAR(255) NOT NULL,
    groupe_parent VARCHAR(255),
    thematiques TEXT,
    priorite VARCHAR(100),
    ticket_estime VARCHAR(100),
    type_approche TEXT,
    angle_pitch TEXT,
    lien_depot TEXT,
    site_web VARCHAR(500),
    statut_dossier VARCHAR(100) DEFAULT 'À préparer',
    deadline DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table des Contacts Référents Multiples (Rattachés aux Entreprises OU aux Fondations)
CREATE TABLE IF NOT EXISTS public.ac_contacts (
    id VARCHAR(50) PRIMARY KEY,
    target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('entreprise', 'aap')),
    target_id VARCHAR(50) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    poste VARCHAR(255),
    email VARCHAR(255),
    telephone VARCHAR(100),
    linkedin VARCHAR(500),
    statut VARCHAR(100) DEFAULT 'À contacter',
    notes TEXT,
    dernier_contact DATE,
    prochaine_relance DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table de l'Historique des Relances & Échanges
CREATE TABLE IF NOT EXISTS public.ac_relances (
    id VARCHAR(50) PRIMARY KEY,
    target_type VARCHAR(50) NOT NULL,
    target_id VARCHAR(50) NOT NULL,
    contact_id VARCHAR(50) REFERENCES public.ac_contacts(id) ON DELETE SET NULL,
    date_relance DATE DEFAULT CURRENT_DATE,
    type_canal VARCHAR(100) DEFAULT 'Email',
    message TEXT NOT NULL,
    prochaine_date DATE,
    auteur VARCHAR(255) DEFAULT 'Équipe Ambition Campus',
    statut_suite VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.ac_entreprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_appels_projets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_relances ENABLE ROW LEVEL SECURITY;

-- Policies for public/authenticated access
CREATE POLICY "ac_entreprises_all" ON public.ac_entreprises FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "ac_appels_projets_all" ON public.ac_appels_projets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "ac_contacts_all" ON public.ac_contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "ac_relances_all" ON public.ac_relances FOR ALL USING (true) WITH CHECK (true);

