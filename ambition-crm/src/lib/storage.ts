import { Entreprise, AppelProjet, Contact, Relance } from '../types';
import initialData from '../initialData.json';

const STORAGE_KEY = 'ambition_campus_crm_data_v1';

export interface CRMData {
  entreprises: Entreprise[];
  appels_projets: AppelProjet[];
  contacts: Contact[];
  relances: Relance[];
}

export function loadData(): CRMData {
  const local = localStorage.getItem(STORAGE_KEY);
  if (!local) {
    saveData(initialData as CRMData);
    return initialData as CRMData;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    console.error('Error parsing local data, falling back to initial data', e);
    return initialData as CRMData;
  }
}

export function saveData(data: CRMData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetToDefault(): CRMData {
  saveData(initialData as CRMData);
  return initialData as CRMData;
}
