import { Entreprise, AppelProjet, Contact, Relance, CustomField } from '../types';
import initialData from '../initialData.json';

const STORAGE_KEY = 'ambition_campus_crm_data_v2';

export interface CRMData {
  entreprises: Entreprise[];
  appels_projets: AppelProjet[];
  contacts: Contact[];
  relances: Relance[];
  custom_fields?: CustomField[];
}

export function loadData(): CRMData {
  const local = localStorage.getItem(STORAGE_KEY);
  if (!local) {
    const dataWithFields: CRMData = {
      ...(initialData as CRMData),
      custom_fields: [],
    };
    saveData(dataWithFields);
    return dataWithFields;
  }
  try {
    const parsed = JSON.parse(local);
    if (!parsed.custom_fields) {
      parsed.custom_fields = [];
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing local data, falling back to initial data', e);
    const dataWithFields: CRMData = {
      ...(initialData as CRMData),
      custom_fields: [],
    };
    return dataWithFields;
  }
}

export function saveData(data: CRMData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetToDefault(): CRMData {
  const dataWithFields: CRMData = {
    ...(initialData as CRMData),
    custom_fields: [],
  };
  saveData(dataWithFields);
  return dataWithFields;
}
