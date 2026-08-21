-- ============================================================================
-- AMBITION CAMPUS — SCHEMA SUPABASE (Isolated with prefix ac_)
-- Types TEXT et colonnes élargies pour éviter toute troncation
-- ============================================================================

-- 1. Table des Entreprises & Partenaires Privés (Pilier 2)
CREATE TABLE IF NOT EXISTS public.ac_entreprises (
    id VARCHAR(100) PRIMARY KEY,
    nom TEXT NOT NULL,
    secteur TEXT,
    priorite TEXT,
    ticket_estime TEXT,
    levier_fiscal TEXT,
    type_approche TEXT,
    angle_pitch TEXT,
    statut_global TEXT DEFAULT 'À contacter',
    site_web TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Si la table existe déjà, on élargit toutes les colonnes
ALTER TABLE public.ac_entreprises ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE public.ac_entreprises ALTER COLUMN nom TYPE TEXT;
ALTER TABLE public.ac_entreprises ALTER COLUMN secteur TYPE TEXT;
ALTER TABLE public.ac_entreprises ALTER COLUMN priorite TYPE TEXT;
ALTER TABLE public.ac_entreprises ALTER COLUMN ticket_estime TYPE TEXT;
ALTER TABLE public.ac_entreprises ALTER COLUMN statut_global TYPE TEXT;
ALTER TABLE public.ac_entreprises ALTER COLUMN site_web TYPE TEXT;

-- 2. Table des Appels à Projets & Fondations (Pilier 3)
CREATE TABLE IF NOT EXISTS public.ac_appels_projets (
    id VARCHAR(100) PRIMARY KEY,
    organisme TEXT NOT NULL,
    groupe_parent TEXT,
    thematiques TEXT,
    priorite TEXT,
    ticket_estime TEXT,
    type_approche TEXT,
    angle_pitch TEXT,
    lien_depot TEXT,
    site_web TEXT,
    statut_dossier TEXT DEFAULT 'À préparer',
    deadline DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ac_appels_projets ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE public.ac_appels_projets ALTER COLUMN organisme TYPE TEXT;
ALTER TABLE public.ac_appels_projets ALTER COLUMN groupe_parent TYPE TEXT;
ALTER TABLE public.ac_appels_projets ALTER COLUMN priorite TYPE TEXT;
ALTER TABLE public.ac_appels_projets ALTER COLUMN ticket_estime TYPE TEXT;
ALTER TABLE public.ac_appels_projets ALTER COLUMN statut_dossier TYPE TEXT;
ALTER TABLE public.ac_appels_projets ALTER COLUMN site_web TYPE TEXT;

-- 3. Table des Contacts Référents Multiples
CREATE TABLE IF NOT EXISTS public.ac_contacts (
    id VARCHAR(100) PRIMARY KEY,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    nom TEXT NOT NULL,
    poste TEXT,
    email TEXT,
    telephone TEXT,
    linkedin TEXT,
    statut TEXT DEFAULT 'À contacter',
    notes TEXT,
    dernier_contact DATE,
    prochaine_relance DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ac_contacts ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE public.ac_contacts ALTER COLUMN target_type TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN target_id TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN nom TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN poste TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN email TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN telephone TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN linkedin TYPE TEXT;
ALTER TABLE public.ac_contacts ALTER COLUMN statut TYPE TEXT;

-- 4. Table de l'Historique des Relances & Échanges
CREATE TABLE IF NOT EXISTS public.ac_relances (
    id VARCHAR(100) PRIMARY KEY,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    contact_id TEXT,
    date_relance DATE DEFAULT CURRENT_DATE,
    type_canal TEXT DEFAULT 'Email',
    message TEXT NOT NULL,
    prochaine_date DATE,
    auteur TEXT DEFAULT 'Équipe Ambition Campus',
    statut_suite TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ac_relances ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE public.ac_relances ALTER COLUMN target_type TYPE TEXT;
ALTER TABLE public.ac_relances ALTER COLUMN target_id TYPE TEXT;
ALTER TABLE public.ac_relances ALTER COLUMN contact_id TYPE TEXT;
ALTER TABLE public.ac_relances ALTER COLUMN type_canal TYPE TEXT;
ALTER TABLE public.ac_relances ALTER COLUMN auteur TYPE TEXT;
ALTER TABLE public.ac_relances ALTER COLUMN statut_suite TYPE TEXT;

-- 5. Table des Retours Site & Suggestions Utilisateurs (Section 4)
CREATE TABLE IF NOT EXISTS public.ac_retours_site (
    id VARCHAR(100) PRIMARY KEY,
    auteur_nom TEXT NOT NULL,
    auteur_email TEXT,
    page_concernee TEXT DEFAULT 'Général',
    type_retour TEXT DEFAULT 'Amélioration / Idée',
    message TEXT NOT NULL,
    image_url TEXT,
    statut TEXT DEFAULT 'À traiter',
    reponse_admin TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ac_retours_site ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE public.ac_retours_site ALTER COLUMN auteur_nom TYPE TEXT;
ALTER TABLE public.ac_retours_site ALTER COLUMN auteur_email TYPE TEXT;
ALTER TABLE public.ac_retours_site ALTER COLUMN page_concernee TYPE TEXT;
ALTER TABLE public.ac_retours_site ALTER COLUMN type_retour TYPE TEXT;
ALTER TABLE public.ac_retours_site ALTER COLUMN statut TYPE TEXT;

-- Enable RLS
ALTER TABLE public.ac_entreprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_appels_projets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_relances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_retours_site ENABLE ROW LEVEL SECURITY;

-- Policies for public/authenticated access
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ac_entreprises_all') THEN
        CREATE POLICY "ac_entreprises_all" ON public.ac_entreprises FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ac_appels_projets_all') THEN
        CREATE POLICY "ac_appels_projets_all" ON public.ac_appels_projets FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ac_contacts_all') THEN
        CREATE POLICY "ac_contacts_all" ON public.ac_contacts FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ac_relances_all') THEN
        CREATE POLICY "ac_relances_all" ON public.ac_relances FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ac_retours_site_all') THEN
        CREATE POLICY "ac_retours_site_all" ON public.ac_retours_site FOR ALL USING (true) WITH CHECK (true);
    END IF;
END
$$;
