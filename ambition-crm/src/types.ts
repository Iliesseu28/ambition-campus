export type Priority = 'Tier 1' | 'Tier 2' | 'Tier 3' | string;

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  target: 'all' | 'contact' | 'parent';
}

export interface Contact {
  id: string;
  target_type: 'entreprise' | 'aap';
  target_id: string;
  nom: string;
  poste: string;
  email: string;
  telephone: string;
  linkedin: string;
  statut: 'À contacter' | 'Contacté' | 'Relance 1' | 'Relance 2' | 'Échange en cours' | 'Intéressé' | 'Refus' | 'Inactif' | string;
  notes: string;
  dernier_contact?: string | null;
  prochaine_relance?: string | null;
  custom_values?: Record<string, string>;
}

export interface Entreprise {
  id: string;
  nom: string;
  secteur: string;
  priorite: Priority;
  ticket_estime: string;
  levier_fiscal: string;
  type_approche: string;
  angle_pitch: string;
  statut_global: string;
  site_web: string;
  notes: string;
  created_at: string;
  custom_values?: Record<string, string>;
}

export interface AppelProjet {
  id: string;
  organisme: string;
  groupe_parent: string;
  thematiques: string;
  priorite: Priority;
  ticket_estime: string;
  type_approche: string;
  angle_pitch: string;
  lien_depot: string;
  site_web: string;
  statut_dossier: 'À préparer' | 'En cours de rédaction' | 'Déposé' | 'En instruction' | 'Lauréat / Accord' | 'Refusé' | string;
  deadline?: string | null;
  notes: string;
  created_at: string;
  custom_values?: Record<string, string>;
}

export interface Relance {
  id: string;
  target_type: 'entreprise' | 'aap';
  target_id: string;
  contact_id?: string | null;
  date_relance: string;
  type_canal: 'Email' | 'LinkedIn' | 'Téléphone' | 'Courrier' | 'Visio' | 'Autre';
  message: string;
  prochaine_date?: string | null;
  auteur?: string;
  statut_suite?: string;
}

export type ActiveTab = 'entreprises' | 'aap' | 'analytics';
