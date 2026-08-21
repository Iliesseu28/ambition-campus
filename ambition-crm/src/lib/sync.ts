import { supabase } from './supabase';
import type { CRMData } from './storage';

export async function syncWithSupabase(data: CRMData): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Sync Entreprises
    if (data.entreprises && data.entreprises.length > 0) {
      const rows = data.entreprises.map((e) => ({
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
      }));

      const { error: entError } = await supabase.from('ac_entreprises').upsert(rows, { onConflict: 'id' });
      if (entError) throw entError;
    }

    // 2. Sync AAP / Fondations
    if (data.appels_projets && data.appels_projets.length > 0) {
      const rows = data.appels_projets.map((a) => ({
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
      }));

      const { error: aapError } = await supabase.from('ac_appels_projets').upsert(rows, { onConflict: 'id' });
      if (aapError) throw aapError;
    }

    // 3. Sync Contacts
    if (data.contacts && data.contacts.length > 0) {
      const rows = data.contacts.map((c) => ({
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
      }));

      const { error: cntError } = await supabase.from('ac_contacts').upsert(rows, { onConflict: 'id' });
      if (cntError) throw cntError;
    }

    // 4. Sync Relances
    if (data.relances && data.relances.length > 0) {
      const rows = data.relances.map((r) => ({
        id: r.id,
        target_type: r.target_type,
        target_id: r.target_id,
        contact_id: r.contact_id || null,
        date_relance: r.date_relance,
        type_canal: r.type_canal,
        message: r.message,
        prochaine_date: r.prochaine_date || null,
        auteur: r.auteur || 'Équipe Ambition Campus',
        statut_suite: r.statut_suite,
      }));

      const { error: relError } = await supabase.from('ac_relances').upsert(rows, { onConflict: 'id' });
      if (relError) throw relError;
    }

    // 5. Sync Feedbacks / Retours site
    if (data.feedbacks && data.feedbacks.length > 0) {
      const rows = data.feedbacks.map((f) => ({
        id: f.id,
        auteur_nom: f.auteur_nom,
        auteur_email: f.auteur_email || null,
        page_concernee: f.page_concernee || 'Général',
        type_retour: f.type_retour,
        message: f.message,
        image_url: f.image_url || null,
        statut: f.statut,
        reponse_admin: f.reponse_admin || null,
        created_at: f.created_at,
      }));

      const { error: fbkError } = await supabase.from('ac_retours_site').upsert(rows, { onConflict: 'id' });
      if (fbkError) {
        console.warn('Note: ac_retours_site sync error (table may not exist yet):', fbkError);
      }
    }

    return {
      success: true,
      message: `Synchronisation réussie avec Supabase (${data.entreprises.length} entreprises, ${data.appels_projets.length} fondations, ${data.contacts.length} contacts, ${data.feedbacks.length} retours synchronisés)`,
    };
  } catch (err: any) {
    console.error('Supabase sync error:', err);
    return {
      success: false,
      message: `Erreur Supabase: ${err.message || 'Impossible de synchroniser'}`,
    };
  }
}
