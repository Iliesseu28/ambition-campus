import React, { useState } from 'react';
import { X, Building2, Plus, FileText } from 'lucide-react';
import type { Entreprise, AppelProjet } from '../types';

interface AddOrganisationModalProps {
  type: 'entreprise' | 'aap';
  onClose: () => void;
  onAddEntreprise: (ent: Entreprise) => void;
  onAddAAP: (aap: AppelProjet) => void;
}

export const AddOrganisationModal: React.FC<AddOrganisationModalProps> = ({
  type,
  onClose,
  onAddEntreprise,
  onAddAAP,
}) => {
  const [nom, setNom] = useState('');
  const [secteurOrParent, setSecteurOrParent] = useState('');
  const [priorite, setPriorite] = useState('Tier 2');
  const [ticket, setTicket] = useState('5 000 € - 15 000 €');
  const [siteWeb, setSiteWeb] = useState('');
  const [pitch, setPitch] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    if (type === 'entreprise') {
      const newEnt: Entreprise = {
        id: `ENT-${Date.now().toString().slice(-4)}`,
        nom: nom.trim(),
        secteur: secteurOrParent.trim() || 'Conseil & Services',
        priorite,
        ticket_estime: ticket.trim(),
        levier_fiscal: `Don ${ticket.split('-')[0].trim() || '10 000 €'} = Coût net réduit (Art. 238 bis CGI)`,
        type_approche: 'Mécénat financier & Compétences',
        angle_pitch: pitch.trim() || 'Soutien aux 500+ lycéens REP d\'Ambition Campus',
        statut_global: 'À contacter',
        site_web: siteWeb.trim(),
        notes: notes.trim(),
        created_at: new Date().toISOString(),
      };
      onAddEntreprise(newEnt);
    } else {
      const newAAP: AppelProjet = {
        id: `FOND-${Date.now().toString().slice(-4)}`,
        organisme: nom.trim(),
        groupe_parent: secteurOrParent.trim() || nom.trim(),
        thematiques: 'Égalité des chances, Éducation, QPV',
        priorite,
        ticket_estime: ticket.trim(),
        type_approche: 'Candidature AAP & Soutien Institutionnel',
        angle_pitch: pitch.trim() || 'Accompagnement d\'excellence vers les filières sélectives',
        lien_depot: 'Contact direct / Appel à projet',
        site_web: siteWeb.trim(),
        statut_dossier: 'À préparer',
        deadline: null,
        notes: notes.trim(),
        created_at: new Date().toISOString(),
      };
      onAddAAP(newAAP);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-blue-100 text-blue-700">
              {type === 'entreprise' ? <Building2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {type === 'entreprise' ? 'Ajouter une Entreprise' : 'Ajouter une Fondation / AAP'}
              </h2>
              <p className="text-[11px] text-slate-500">Nouvel organisme partenaire</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {type === 'entreprise' ? "Nom de l'entreprise *" : "Nom de la Fondation / AAP *"}
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder={type === 'entreprise' ? 'Ex: Société Générale, Capgemini...' : 'Ex: Fondation TotalEnergies...'}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {type === 'entreprise' ? "Secteur d'activité" : "Groupe Parent"}
              </label>
              <input
                type="text"
                value={secteurOrParent}
                onChange={(e) => setSecteurOrParent(e.target.value)}
                placeholder={type === 'entreprise' ? 'Ex: Banque, Conseil, Tech...' : 'Ex: Groupe BPCE, Bouygues...'}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Niveau de Priorité</label>
              <select
                value={priorite}
                onChange={(e) => setPriorite(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Tier 1">Tier 1 - Prioritaire / Piste Chaude</option>
                <option value="Tier 2">Tier 2 - Grand Donateur</option>
                <option value="Tier 3">Tier 3 - Standard / PME</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ticket Estimé / Visé</label>
              <input
                type="text"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                placeholder="Ex: 10 000 € - 20 000 €"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Site Web officiel</label>
              <input
                type="url"
                value={siteWeb}
                onChange={(e) => setSiteWeb(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Angle de pitch / Synergie</label>
            <textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Argumentaire ou partenariat envisagé..."
              rows={2}
              className="w-full bg-white border border-slate-300 rounded-md p-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 font-medium transition cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer l'organisme</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
