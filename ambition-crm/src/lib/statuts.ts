// Vocabulaire unique des statuts de prospection (contacts entreprises + AAP).
// Colonne 1 du CRM = ce statut, colonne 2 = la date à laquelle il a été posé
// (champ `dernier_contact` du contact).

export interface StatutDef {
  /** Valeur stockée en base et dans localStorage. */
  value: string;
  /** Libellé court affiché dans le menu déroulant. */
  label: string;
  /** Classes Tailwind du badge. */
  style: string;
  /** Étape du tunnel : 0 = pas encore touché, 4 = signé. */
  etape: number;
}

export const STATUTS_CONTACT: StatutDef[] = [
  { value: 'À contacter', label: 'À contacter', etape: 0, style: 'bg-slate-100 text-slate-700 border-slate-300' },
  { value: 'Brouillon prêt', label: 'Brouillon prêt', etape: 1, style: 'bg-violet-100 text-violet-800 border-violet-300' },
  { value: 'Mail 1 envoyé', label: 'Mail 1 envoyé', etape: 1, style: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'Mail 2 envoyé', label: 'Mail 2 envoyé (relance 1)', etape: 1, style: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'Mail 3 envoyé', label: 'Mail 3 envoyé (relance 2)', etape: 1, style: 'bg-orange-100 text-orange-800 border-orange-300' },
  { value: 'Relance téléphone', label: 'Relance téléphone', etape: 1, style: 'bg-orange-100 text-orange-800 border-orange-300' },
  { value: 'Réponse reçue', label: 'Réponse reçue', etape: 2, style: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  { value: 'Échange en cours', label: 'Échange en cours', etape: 2, style: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { value: 'RDV planifié', label: 'RDV planifié', etape: 3, style: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { value: 'Proposition envoyée', label: 'Proposition envoyée', etape: 3, style: 'bg-teal-100 text-teal-800 border-teal-300' },
  { value: 'Partenariat signé', label: 'Partenariat signé', etape: 4, style: 'bg-green-600 text-white border-green-700' },
  { value: 'Sans réponse', label: 'Sans réponse', etape: 2, style: 'bg-slate-100 text-slate-500 border-slate-300' },
  { value: 'Refus', label: 'Refus', etape: 2, style: 'bg-rose-100 text-rose-800 border-rose-300' },
  { value: 'Email invalide', label: 'Email invalide / parti', etape: 0, style: 'bg-slate-200 text-slate-500 border-slate-400' },
];

/** Anciens libellés → nouveau vocabulaire (migration transparente au chargement). */
export const MIGRATION_STATUTS: Record<string, string> = {
  'Contacté': 'Mail 1 envoyé',
  'Contacté (J0)': 'Mail 1 envoyé',
  'Relance 1': 'Mail 2 envoyé',
  'Relance 1 (J+7)': 'Mail 2 envoyé',
  'Relance 2': 'Mail 3 envoyé',
  'Relance 2 (J+15)': 'Mail 3 envoyé',
  'Intéressé': 'RDV planifié',
  'Intéressé / RDV': 'RDV planifié',
  'Refus / Standby': 'Refus',
  'Inactif': 'Sans réponse',
  'Email invalide / contact parti': 'Email invalide',
};

export function migrerStatut(statut?: string | null): string {
  const s = (statut || '').trim();
  if (!s) return 'À contacter';
  return MIGRATION_STATUTS[s] || s;
}

export function getStatutDef(statut?: string | null): StatutDef | undefined {
  const s = migrerStatut(statut);
  return STATUTS_CONTACT.find((d) => d.value === s);
}

export function getStatutBadgeStyle(statut?: string | null): string {
  return getStatutDef(statut)?.style || 'bg-slate-100 text-slate-700 border-slate-300';
}

/** Statuts qui signifient « on a déjà écrit / parlé à cette personne ». */
export function estContacte(statut?: string | null): boolean {
  const def = getStatutDef(statut);
  return !!def && def.etape >= 1 && def.value !== 'Brouillon prêt';
}

/** Statuts « chauds » : la personne a manifesté un intérêt. */
export function estChaud(statut?: string | null): boolean {
  const def = getStatutDef(statut);
  return !!def && def.etape >= 3;
}

/** Date du jour au format ISO court (YYYY-MM-DD), utilisée pour horodater un changement de statut. */
export function aujourdhui(): string {
  return new Date().toISOString().split('T')[0];
}

/** Affichage court d'une date de statut : « 08/09/2026 » ou « — ». */
export function formatDateStatut(date?: string | null): string {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('fr-FR');
}
