import { supabase } from './supabase';
import type { CRMData } from './storage';

export async function syncWithSupabase(data: CRMData): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Sync Entreprises
    if (data.entreprises && data.entreprises.length > 0) {
      const rows = data.entreprises.map((e) => ({
        id: String(e.id),
        nom: String(e.nom || ''),
        secteur: String(e.secteur || ''),
        priorite: String(e.priorite || ''),
        ticket_estime: String(e.ticket_estime || ''),
        levier_fiscal: String(e.levier_fiscal || ''),
        type_approche: String(e.type_approche || ''),
        angle_pitch: String(e.angle_pitch || ''),
        statut_global: String(e.statut_global || 'À contacter'),
        site_web: String(e.site_web || ''),
        notes: String(e.notes || ''),
      }));

      const { error: entError } = await supabase.from('ac_entreprises').upsert(rows, { onConflict: 'id' });
      if (entError) throw entError;
    }

    // 2. Sync AAP / Fondations
    if (data.appels_projets && data.appels_projets.length > 0) {
      const rows = data.appels_projets.map((a) => ({
        id: String(a.id),
        organisme: String(a.organisme || ''),
        groupe_parent: String(a.groupe_parent || ''),
        thematiques: String(a.thematiques || ''),
        priorite: String(a.priorite || ''),
        ticket_estime: String(a.ticket_estime || ''),
        type_approche: String(a.type_approche || ''),
        angle_pitch: String(a.angle_pitch || ''),
        lien_depot: String(a.lien_depot || ''),
        site_web: String(a.site_web || ''),
        statut_dossier: String(a.statut_dossier || 'À préparer'),
        notes: String(a.notes || ''),
      }));

      const { error: aapError } = await supabase.from('ac_appels_projets').upsert(rows, { onConflict: 'id' });
      if (aapError) throw aapError;
    }

    // 3. Sync Contacts
    if (data.contacts && data.contacts.length > 0) {
      const rows = data.contacts.map((c) => ({
        id: String(c.id),
        target_type: String(c.target_type || 'entreprise'),
        target_id: String(c.target_id || ''),
        nom: String(c.nom || ''),
        poste: String(c.poste || ''),
        email: String(c.email || ''),
        telephone: String(c.telephone || ''),
        linkedin: String(c.linkedin || ''),
        statut: String(c.statut || 'À contacter'),
        notes: String(c.notes || ''),
        dernier_contact: c.dernier_contact || null,
        prochaine_relance: c.prochaine_relance || null,
      }));

      const { error: cntError } = await supabase.from('ac_contacts').upsert(rows, { onConflict: 'id' });
      if (cntError) throw cntError;
    }

    // 4. Sync Relances
    if (data.relances && data.relances.length > 0) {
      const rows = data.relances.map((r) => ({
        id: String(r.id),
        target_type: String(r.target_type || 'entreprise'),
        target_id: String(r.target_id || ''),
        contact_id: r.contact_id ? String(r.contact_id) : null,
        date_relance: r.date_relance || new Date().toISOString().split('T')[0],
        type_canal: String(r.type_canal || 'Email'),
        message: String(r.message || ''),
        prochaine_date: r.prochaine_date || null,
        auteur: String(r.auteur || 'Équipe Ambition Campus'),
        statut_suite: r.statut_suite ? String(r.statut_suite) : null,
      }));

      const { error: relError } = await supabase.from('ac_relances').upsert(rows, { onConflict: 'id' });
      if (relError) throw relError;
    }

    // 5. Sync Feedbacks / Retours site
    if (data.feedbacks && data.feedbacks.length > 0) {
      const rows = data.feedbacks.map((f) => ({
        id: String(f.id),
        auteur_nom: String(f.auteur_nom || 'Anonyme'),
        auteur_email: f.auteur_email ? String(f.auteur_email) : null,
        page_concernee: String(f.page_concernee || 'Général'),
        type_retour: String(f.type_retour || 'Amélioration / Idée'),
        message: String(f.message || ''),
        image_url: f.image_url ? String(f.image_url) : null,
        statut: String(f.statut || 'À traiter'),
        reponse_admin: f.reponse_admin ? String(f.reponse_admin) : null,
        created_at: f.created_at || new Date().toISOString(),
      }));

      const { error: fbkError } = await supabase.from('ac_retours_site').upsert(rows, { onConflict: 'id' });
      if (fbkError) {
        console.warn('Note: ac_retours_site sync error (table may not exist yet):', fbkError);
      }
    }

    return {
      success: true,
      message: `Synchronisation automatique réussie avec Supabase (${data.entreprises.length} entreprises, ${data.appels_projets.length} fondations, ${data.contacts.length} contacts, ${data.feedbacks.length} retours enregistrés)`,
    };
  } catch (err: any) {
    console.error('Supabase sync error:', err);
    return {
      success: false,
      message: `Erreur Supabase: ${err.message || 'Impossible de synchroniser'}`,
    };
  }
}
