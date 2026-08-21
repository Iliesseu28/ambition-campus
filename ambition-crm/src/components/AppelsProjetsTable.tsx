import React, { useState } from 'react';
import type { AppelProjet, Contact, Relance } from '../types';
import { 
  Search, 
  Plus, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal,
  MessageSquare,
  Send,
  Filter,
  Layers,
  FileText
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
  onOpenRelance,
  onOpenAddContact,
  onUpdateContactStatut,
  onUpdateAAPStatut,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [expandedAAPs, setExpandedAAPs] = useState<Record<string, boolean>>({});

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

  const getStatutBadgeStyle = (statut: string) => {
    if (statut.includes('Lauréat') || statut.includes('Accord')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
    if (statut.includes('Déposé')) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    if (statut.includes('En cours') || statut.includes('rédaction')) {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    if (statut.includes('En instruction')) {
      return 'bg-purple-100 text-purple-800 border-purple-300';
    }
    if (statut.includes('Refus')) {
      return 'bg-slate-100 text-slate-600 border-slate-300';
    }
    return 'bg-slate-100 text-slate-700 border-slate-300';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Airtable Toolbar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2">
          {/* Hide/Show Fields */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 text-slate-700 font-medium transition border border-transparent hover:border-slate-200 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Champs ({Object.values(visibleColumns).filter(Boolean).length + 3})</span>
            </button>

            {showColMenu && (
              <div className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-lg p-2 shadow-lg z-30 space-y-1">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Colonnes visibles
                </div>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.parent}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, parent: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Groupe Parent</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.thematiques}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, thematiques: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Thématiques</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.priorite}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, priorite: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Priorité</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.ticket}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, ticket: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Ticket Visé</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.lienDepot}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, lienDepot: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Guichet de dépôt</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.pitch}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, pitch: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Angle de Pitch</span>
                </label>
              </div>
            )}
          </div>

          {/* Filter Priorite */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedPriorite}
              onChange={(e) => setSelectedPriorite(e.target.value)}
              className="bg-transparent border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Toutes priorités</option>
              <option value="Tier 1">Tier 1 - Piste Chaude</option>
              <option value="Tier 2">Tier 2 - Grand Donateur</option>
              <option value="Tier 3">Tier 3 - Standard</option>
            </select>
          </div>

          {/* Filter Statut Dossier */}
          <select
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
            className="bg-transparent border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Tous les statuts de dossier</option>
            <option value="À préparer">À préparer</option>
            <option value="En cours de rédaction">En cours de rédaction</option>
            <option value="Déposé">Dossier déposé</option>
            <option value="En instruction">En instruction</option>
            <option value="Lauréat / Accord">Lauréat / Accord</option>
          </select>
        </div>

        {/* Right Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une fondation, thématique..."
            className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 w-64 transition"
          />
        </div>
      </div>

      {/* Airtable Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8F9FA] border-b border-slate-200 text-slate-600 font-semibold select-none">
              <th className="py-2.5 px-3 w-10 text-center border-r border-slate-200 text-slate-400">#</th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[200px]">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fondation & Organisme</span>
                </div>
              </th>
              {visibleColumns.parent && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px]">
                  <span>Groupe Parent</span>
                </th>
              )}
              {visibleColumns.thematiques && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[200px]">
                  <span>Thématiques Clés</span>
                </th>
              )}
              {visibleColumns.priorite && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">
                  <span>Priorité</span>
                </th>
              )}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[160px]">
                <span>Contacts Référents</span>
              </th>
              {visibleColumns.ticket && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">
                  <span>Ticket Visé</span>
                </th>
              )}
              {visibleColumns.lienDepot && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[180px]">
                  <span>Guichet de dépôt</span>
                </th>
              )}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[160px]">
                <span>Statut Dossier</span>
              </th>
              <th className="py-2.5 px-3 text-right">
                <span>Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredAAPs.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  Aucun appel à projet ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              filteredAAPs.map((aap, idx) => {
                const aapContacts = contacts.filter((c) => c.target_id === aap.id);
                const isExpanded = expandedAAPs[aap.id] ?? true;

                return (
                  <React.Fragment key={aap.id}>
                    {/* Primary Row Fondation */}
                    <tr className="hover:bg-slate-50/80 transition-colors bg-white group">
                      <td className="py-2 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[11px]">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => toggleExpand(aap.id)}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>
                          <span>{idx + 1}</span>
                        </div>
                      </td>

                      {/* Nom Fondation */}
                      <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate">{aap.organisme}</span>
                          {aap.site_web && (
                            <a
                              href={aap.site_web}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-blue-600"
                              title="Site web"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Parent */}
                      {visibleColumns.parent && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-600 text-[11px]">
                          {aap.groupe_parent || '-'}
                        </td>
                      )}

                      {/* Thematiques */}
                      {visibleColumns.thematiques && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-700 text-[11px] max-w-xs">
                          <span className="line-clamp-1" title={aap.thematiques}>
                            {aap.thematiques}
                          </span>
                        </td>
                      )}

                      {/* Priorite */}
                      {visibleColumns.priorite && (
                        <td className="py-2 px-3 border-r border-slate-200">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            aap.priorite.includes('Tier 1')
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : aap.priorite.includes('Tier 2')
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {aap.priorite}
                          </span>
                        </td>
                      )}

                      {/* Contacts count & Add */}
                      <td className="py-2 px-3 border-r border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-slate-700">
                            {aapContacts.length} contact{aapContacts.length > 1 ? 's' : ''}
                          </span>
                          <button
                            onClick={() => onOpenAddContact(aap)}
                            className="p-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition text-[10px] flex items-center gap-0.5 cursor-pointer"
                            title="Ajouter un contact"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Ajouter</span>
                          </button>
                        </div>
                      </td>

                      {/* Ticket */}
                      {visibleColumns.ticket && (
                        <td className="py-2 px-3 border-r border-slate-200 font-semibold text-emerald-700">
                          {aap.ticket_estime}
                        </td>
                      )}

                      {/* Lien Depot */}
                      {visibleColumns.lienDepot && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-600 text-[11px] max-w-xs truncate" title={aap.lien_depot}>
                          {aap.lien_depot || 'Contact direct'}
                        </td>
                      )}

                      {/* Statut Dossier Pill */}
                      <td className="py-2 px-3 border-r border-slate-200">
                        <select
                          value={aap.statut_dossier}
                          onChange={(e) => onUpdateAAPStatut(aap.id, e.target.value)}
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(aap.statut_dossier)}`}
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
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => onOpenAddContact(aap)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium transition cursor-pointer"
                        >
                          + Contact
                        </button>
                      </td>
                    </tr>

                    {/* Sub-Rows Contacts Fondation */}
                    {isExpanded && aapContacts.map((contact, cIdx) => (
                      <tr key={contact.id} className="bg-[#F8F9FA]/60 hover:bg-blue-50/40 transition-colors border-l-4 border-l-blue-400">
                        <td className="py-1.5 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[10px]">
                          {idx + 1}.{cIdx + 1}
                        </td>

                        <td className="py-1.5 px-3 border-r border-slate-200 pl-6">
                          <div className="flex items-center gap-1.5 font-medium text-slate-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            <span>{contact.nom}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block ml-3">{contact.poste}</span>
                        </td>

                        <td colSpan={3} className="py-1.5 px-3 border-r border-slate-200 text-[11px]">
                          {contact.email ? (
                            <a
                              href={`mailto:${contact.email}`}
                              className="flex items-center gap-1 text-slate-600 hover:text-blue-600"
                            >
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{contact.email}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400">Email non renseigné</span>
                          )}
                        </td>

                        <td className="py-1.5 px-3 border-r border-slate-200">
                          <select
                            value={contact.statut}
                            onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(contact.statut)}`}
                          >
                            <option value="À contacter">🟡 À contacter</option>
                            <option value="Contacté">🔵 Contacté (J0)</option>
                            <option value="Relance 1">🟠 Relance 1</option>
                            <option value="Relance 2">🔴 Relance 2</option>
                            <option value="Échange en cours">💬 Échange</option>
                            <option value="Intéressé / RDV">🟢 Intéressé</option>
                            <option value="Refus / Standby">⚪ Refus</option>
                          </select>
                        </td>

                        <td colSpan={2} className="py-1.5 px-3 border-r border-slate-200 text-slate-600 text-[11px]">
                          {contact.dernier_contact ? (
                            <span>Dernier échange : {contact.dernier_contact}</span>
                          ) : (
                            <span className="text-slate-400">Aucun échange consigné</span>
                          )}
                        </td>

                        <td colSpan={2} className="py-1.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenRelance(contact, aap)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Relancer / Notes</span>
                            </button>

                            <button
                              onClick={() => {
                                alert(`🚀 [n8n Automation Ready] Déclenchement du webhook n8n pour ${contact.nom} (${aap.organisme})`);
                              }}
                              className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-emerald-600 border border-slate-200 transition cursor-pointer"
                            >
                              <Send className="w-3 h-3" />
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
  );
};
