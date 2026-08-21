import React, { useState } from 'react';
import { AppelProjet, Contact, Relance } from '../types';
import { 
  FileText, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  ExternalLink, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal,
  MessageSquare,
  Send,
  AlertCircle
} from 'lucide-react';

interface AppelsProjetsTableProps {
  appelsProjets: AppelProjet[];
  contacts: Contact[];
  relances: Relance[];
  onOpenRelance: (contact: Contact, aap: AppelProjet) => void;
  onOpenAddContact: (aap: AppelProjet) => void;
  onUpdateContactStatut: (contactId: string, statut: string) => void;
  onUpdateAAPStatut: (aapId: string, statut: string) => void;
}

export const AppelsProjetsTable: React.FC<AppelsProjetsTableProps> = ({
  appelsProjets,
  contacts,
  relances,
  onOpenRelance,
  onOpenAddContact,
  onUpdateContactStatut,
  onUpdateAAPStatut,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [expandedAAPs, setExpandedAAPs] = useState<Record<string, boolean>>({});

  // Colonnes visibles configurables
  const [visibleColumns, setVisibleColumns] = useState({
    parent: true,
    thematiques: true,
    priorite: true,
    ticket: true,
    lienDepot: true,
    pitch: true,
  });

  const [showColMenu, setShowColMenu] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedAAPs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtrage
  const filteredAAPs = appelsProjets.filter((aap) => {
    const matchSearch =
      aap.organisme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aap.groupe_parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aap.thematiques.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacts.some(
        (c) =>
          c.target_id === aap.id &&
          (c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    const matchPriorite = selectedPriorite === 'all' || aap.priorite.includes(selectedPriorite);
    const matchStatut = selectedStatut === 'all' || aap.statut_dossier === selectedStatut;

    return matchSearch && matchPriorite && matchStatut;
  });

  return (
    <div className="space-y-4">
      {/* Filtres & Recherche */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
        
        {/* Recherche */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une fondation, thématique, contact..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Filtres Dropdowns */}
        <div className="flex items-center gap-2">
          <select
            value={selectedPriorite}
            onChange={(e) => setSelectedPriorite(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Toutes priorités</option>
            <option value="Tier 1">Tier 1 - Piste Chaude</option>
            <option value="Tier 2">Tier 2 - Grand Donateur</option>
            <option value="Tier 3">Tier 3 - Standard</option>
          </select>

          <select
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Tous les statuts de dossier</option>
            <option value="À préparer">À préparer</option>
            <option value="À contacter en priorité (Email prêt)">À contacter en priorité</option>
            <option value="En cours de rédaction">En cours de rédaction</option>
            <option value="Déposé">Dossier déposé</option>
            <option value="Lauréat / Accord">Lauréat / Accord</option>
          </select>

          {/* Menu Colonnes */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Colonnes</span>
            </button>

            {showColMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-xl z-30 space-y-1 text-xs">
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.parent}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, parent: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Groupe Parent</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.thematiques}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, thematiques: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Thématiques</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.priorite}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, priorite: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Priorité</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.ticket}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, ticket: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Ticket Estimé</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.lienDepot}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, lienDepot: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Lien de dépôt AAP</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.pitch}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, pitch: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Angle de Pitch</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Fondations / Appels à projets */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4">Fondation & Organisme</th>
                {visibleColumns.parent && <th className="py-3 px-4">Groupe Parent</th>}
                {visibleColumns.thematiques && <th className="py-3 px-4">Thématiques Clés</th>}
                {visibleColumns.priorite && <th className="py-3 px-4">Priorité</th>}
                <th className="py-3 px-4">Contacts Référents</th>
                {visibleColumns.ticket && <th className="py-3 px-4">Ticket Visé</th>}
                {visibleColumns.lienDepot && <th className="py-3 px-4">Guichet & Dépôt</th>}
                <th className="py-3 px-4">Statut Dossier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {filteredAAPs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    Aucun appel à projet ne correspond aux critères.
                  </td>
                </tr>
              ) : (
                filteredAAPs.map((aap) => {
                  const aapContacts = contacts.filter((c) => c.target_id === aap.id);
                  const isExpanded = expandedAAPs[aap.id] ?? true;

                  return (
                    <React.Fragment key={aap.id}>
                      {/* Ligne Fondation Parent */}
                      <tr className="hover:bg-slate-800/30 transition-colors group bg-slate-900/40">
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => toggleExpand(aap.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-amber-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                        </td>

                        {/* Nom Fondation */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-amber-400 transition">
                              {aap.organisme}
                            </span>
                            {aap.site_web && (
                              <a
                                href={aap.site_web}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 hover:text-amber-400 transition"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{aap.id}</span>
                        </td>

                        {/* Groupe Parent */}
                        {visibleColumns.parent && (
                          <td className="py-3 px-4 text-slate-300 text-[11px]">
                            {aap.groupe_parent || '-'}
                          </td>
                        )}

                        {/* Thématiques */}
                        {visibleColumns.thematiques && (
                          <td className="py-3 px-4 text-slate-300 max-w-xs">
                            <span className="line-clamp-2 text-[11px]" title={aap.thematiques}>
                              {aap.thematiques}
                            </span>
                          </td>
                        )}

                        {/* Priorité */}
                        {visibleColumns.priorite && (
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              aap.priorite.includes('Tier 1')
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : aap.priorite.includes('Tier 2')
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {aap.priorite}
                            </span>
                          </td>
                        )}

                        {/* Contacts Référents */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-200">
                              {aapContacts.length} contact{aapContacts.length > 1 ? 's' : ''}
                            </span>
                            <button
                              onClick={() => onOpenAddContact(aap)}
                              className="p-1 rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition text-[10px] flex items-center gap-1"
                              title="Ajouter un contact référent à cette fondation"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Ajouter</span>
                            </button>
                          </div>
                        </td>

                        {/* Ticket */}
                        {visibleColumns.ticket && (
                          <td className="py-3 px-4 font-semibold text-emerald-400">
                            {aap.ticket_estime}
                          </td>
                        )}

                        {/* Lien Dépôt AAP */}
                        {visibleColumns.lienDepot && (
                          <td className="py-3 px-4 text-[11px] max-w-xs truncate">
                            {aap.lien_depot ? (
                              <span className="text-slate-400" title={aap.lien_depot}>
                                {aap.lien_depot}
                              </span>
                            ) : (
                              <span className="text-slate-600">Contact direct</span>
                            )}
                          </td>
                        )}

                        {/* Statut Dossier */}
                        <td className="py-3 px-4">
                          <select
                            value={aap.statut_dossier}
                            onChange={(e) => onUpdateAAPStatut(aap.id, e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="À préparer">🟡 À préparer</option>
                            <option value="En cours de rédaction">🟠 En rédaction</option>
                            <option value="Déposé">🔵 Déposé</option>
                            <option value="En instruction">🟣 En instruction</option>
                            <option value="Lauréat / Accord">🟢 Lauréat / Accord</option>
                            <option value="Refusé">⚪ Refusé</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onOpenAddContact(aap)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                          >
                            + Nouveau contact
                          </button>
                        </td>
                      </tr>

                      {/* Sous-lignes : Contacts de la fondation */}
                      {isExpanded && aapContacts.map((contact) => (
                        <tr key={contact.id} className="bg-slate-950/40 hover:bg-slate-950/80 transition-colors border-l-2 border-l-amber-500/40">
                          <td></td>
                          
                          <td className="py-2.5 px-4 pl-8">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                              <span className="font-semibold text-slate-100">{contact.nom}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 ml-3.5 block">{contact.poste}</span>
                          </td>

                          <td colSpan={3} className="py-2.5 px-4">
                            {contact.email && (
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-[11px] transition"
                              >
                                <Mail className="w-3 h-3 text-slate-500" />
                                <span>{contact.email}</span>
                              </a>
                            )}
                          </td>

                          <td className="py-2.5 px-4">
                            <select
                              value={contact.statut}
                              onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500"
                            >
                              <option value="À contacter">🟡 À contacter</option>
                              <option value="Contacté">🔵 Contacté (J0)</option>
                              <option value="Relance 1">🟠 Relance 1</option>
                              <option value="Relance 2">🔴 Relance 2</option>
                              <option value="Échange en cours">💬 Échange en cours</option>
                              <option value="Intéressé / RDV">🟢 Intéressé</option>
                              <option value="Refus / Standby">⚪ Refus</option>
                            </select>
                          </td>

                          <td colSpan={2} className="py-2.5 px-4 text-[11px] text-slate-400">
                            {contact.dernier_contact ? (
                              <span>Dernier échange : {contact.dernier_contact}</span>
                            ) : (
                              <span className="text-slate-600">Aucun échange consigné</span>
                            )}
                          </td>

                          <td colSpan={2} className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => onOpenRelance(contact, aap)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition shadow-sm"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Relancer / Historique</span>
                              </button>

                              <button
                                onClick={() => {
                                  alert(`🚀 [n8n Automation Ready] Déclenchement du webhook n8n pour ${contact.nom} (${aap.organisme})`);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-slate-800 transition"
                                title="Déclencher automatisation n8n (génération & envoi)"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
