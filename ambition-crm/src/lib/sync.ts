import { supabase } from './supabase';
import { CRMData } from './storage';

export async function syncWithSupabase(localData: CRMData): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Check if tables are reachable on Supabase
    const { data: testEnt, error: testErr } = await supabase.from('ac_entreprises').select('id').limit(1);

    if (testErr) {
      // Table doesn't exist yet or connection issue
      return {
        success: false,
        message: `Tables Supabase non initialisées (${testErr.message}). Exécutez le script SQL 'supabase_migration_ambition_campus.sql' dans votre SQL Editor Supabase.`,
      };
    }

    // 2. Upsert Entreprises
    if (localData.entreprises.length > 0) {
      await supabase.from('ac_entreprises').upsert(
        localData.entreprises.map((e) => ({
          id: e.id,
          nom: e.nom,
          secteur: e.secteur,
          priorite: e.priorite,
          ticket_estime: e.ticket_estime,
          levier_fiscal: e.levier_fiscal,
          type_approche: e.type_approche,
          angle_pitch: e.angle_pitch,
          statut_global: e.statut_global,
          site_web: e.site_web,
          notes: e.notes,
        }))
      );
    }

    // 3. Upsert Appels Projets
    if (localData.appels_projets.length > 0) {
      await supabase.from('ac_appels_projets').upsert(
        localData.appels_projets.map((a) => ({
          id: a.id,
          organisme: a.organisme,
          groupe_parent: a.groupe_parent,
          thematiques: a.thematiques,
          priorite: a.priorite,
          ticket_estime: a.ticket_estime,
          type_approche: a.type_approche,
          angle_pitch: a.angle_pitch,
          lien_depot: a.lien_depot,
          site_web: a.site_web,
          statut_dossier: a.statut_dossier,
          notes: a.notes,
        }))
      );
    }

    // 4. Upsert Contacts
    if (localData.contacts.length > 0) {
      await supabase.from('ac_contacts').upsert(
        localData.contacts.map((c) => ({
          id: c.id,
          target_type: c.target_type,
          target_id: c.target_id,
          nom: c.nom,
          poste: c.poste,
          email: c.email,
          telephone: c.telephone,
          linkedin: c.linkedin,
          statut: c.statut,
          notes: c.notes,
          dernier_contact: c.dernier_contact || null,
          prochaine_relance: c.prochaine_relance || null,
        }))
      );
    }

    return {
      success: true,
      message: `Synchronisation réussie avec Supabase (${localData.entreprises.length} entreprises, ${localData.appels_projets.length} fondations, ${localData.contacts.length} contacts).`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Erreur lors de la synchronisation Supabase.',
    };
  }
}
