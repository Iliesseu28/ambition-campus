import { Entreprise, AppelProjet, Contact, Relance, CustomField, Feedback } from '../types';
import initialData from '../initialData.json';

const STORAGE_KEY = 'ambition_campus_crm_data_v3';

export interface CRMData {
  entreprises: Entreprise[];
  appels_projets: AppelProjet[];
  contacts: Contact[];
  relances: Relance[];
  custom_fields?: CustomField[];
  feedbacks: Feedback[];
}

const defaultFeedbacks: Feedback[] = [
  {
    id: 'FBK-001',
    auteur_nom: 'Sarah Benali',
    auteur_email: 'sarah.benali@ambitioncampus.fr',
    page_concernee: 'Page Accueil & Présentation',
    type_retour: 'Amélioration / Idée',
    message: 'Ajouter un compteur dynamique du nombre de lycéens accompagnés (actuellement plus de 500 lycéens) pour renforcer la crédibilité auprès des mécènes dès leur arrivée sur la page.',
    image_url: null,
    statut: 'En cours',
    reponse_admin: 'Validé en réunion. Intégration prévue dans le header de présentation.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'FBK-002',
    auteur_nom: 'Marc Dubois',
    auteur_email: 'm.dubois@education-prioritaire.org',
    page_concernee: 'Section Témoignages',
    type_retour: 'Contenu / Texte',
    message: 'Mettre à jour les citations des alumni 2024-2025 admis à Sciences Po Paris et Dauphine pour inclure leurs photos de promotion.',
    image_url: null,
    statut: 'Traité / Validé',
    reponse_admin: 'Photos récupérées et intégrées.',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'FBK-003',
    auteur_nom: 'Alexandre V.',
    auteur_email: 'alex.v@ambitioncampus.fr',
    page_concernee: 'Formulaire de contact partenaires',
    type_retour: 'Bug / Dysfonctionnement',
    message: 'Vérifier la réception des notifications par mail lorsqu\'une fondation remplit la demande de conventionnement.',
    image_url: null,
    statut: 'À traiter',
    reponse_admin: '',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

export function loadData(): CRMData {
  const local = localStorage.getItem(STORAGE_KEY);
  if (!local) {
    const dataWithFields: CRMData = {
      ...(initialData as any),
      custom_fields: [],
      feedbacks: defaultFeedbacks,
    };
    saveData(dataWithFields);
    return dataWithFields;
  }
  try {
    const parsed = JSON.parse(local);
    if (!parsed.custom_fields) {
      parsed.custom_fields = [];
    }
    if (!parsed.feedbacks || parsed.feedbacks.length === 0) {
      parsed.feedbacks = defaultFeedbacks;
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing local data, falling back to initial data', e);
    const dataWithFields: CRMData = {
      ...(initialData as any),
      custom_fields: [],
      feedbacks: defaultFeedbacks,
    };
    return dataWithFields;
  }
}

export function saveData(data: CRMData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetToDefault(): CRMData {
  const dataWithFields: CRMData = {
    ...(initialData as any),
    custom_fields: [],
    feedbacks: defaultFeedbacks,
  };
  saveData(dataWithFields);
  return dataWithFields;
}
