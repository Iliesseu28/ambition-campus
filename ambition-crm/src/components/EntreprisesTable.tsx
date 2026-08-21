import React, { useState } from 'react';
import type { Entreprise, Contact, Relance } from '../types';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Link2, 
  ExternalLink, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal,
  MessageSquare,
  Send,
  Filter,
  ArrowUpDown,
  Hash,
  Briefcase,
  Layers
} from 'lucide-react';

interface EntreprisesTableProps {
  entreprises: Entreprise[];
  contacts: Contact[];
  relances: Relance[];
  onOpenRelance: (contact: Contact, entreprise: Entreprise) => void;
  onOpenAddContact: (entreprise: Entreprise) => void;
  onUpdateContactStatut: (contactId: string, statut: string) => void;
  onUpdateEntrepriseStatut?: (entrepriseId: string, statut: string) => void;
}

export const EntreprisesTable: React.FC<EntreprisesTableProps> = ({
  entreprises,
  contacts,
  onOpenRelance,
  onOpenAddContact,
  onUpdateContactStatut,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState<string>('all');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [expandedEntreprises, setExpandedEntreprises] = useState<Record<string, boolean>>({});

  // Colonnes configurables
  const [visibleColumns, setVisibleColumns] = useState({
    secteur: true,
    priorite: true,
    ticket: true,
    levierFiscal: true,
    pitch: true,
  });

  const [showColMenu, setShowColMenu] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedEntreprises((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const secteurs = Array.from(new Set(entreprises.map((e) => e.secteur).filter(Boolean)));

  const filteredEntreprises = entreprises.filter((e) => {
    const matchSearch =
      e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.secteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacts.some(
        (c) =>
          c.target_id === e.id &&
          (c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    const matchSecteur = selectedSecteur === 'all' || e.secteur === selectedSecteur;
    const matchPriorite = selectedPriorite === 'all' || e.priorite.includes(selectedPriorite);

    return matchSearch && matchSecteur && matchPriorite;
  });

  // Airtable status badge styling
  const getStatutBadgeStyle = (statut: string) => {
    if (statut.includes('Intéressé') || statut.includes('RDV')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
    if (statut.includes('Contacté')) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    if (statut.includes('Relance 1')) {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    if (statut.includes('Relance 2')) {
      return 'bg-orange-100 text-orange-800 border-orange-300';
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
        
        {/* Left Toolbar Controls */}
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
                    checked={visibleColumns.secteur}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, secteur: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Secteur d'activité</span>
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
                  <span>Ticket Estimé</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.levierFiscal}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, levierFiscal: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Levier Fiscal (60%)</span>
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

          {/* Filter Secteur */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSecteur}
              onChange={(e) => setSelectedSecteur(e.target.value)}
              className="bg-transparent border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Tous les secteurs ({secteurs.length})</option>
              {secteurs.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Filter Priorite */}
          <select
            value={selectedPriorite}
            onChange={(e) => setSelectedPriorite(e.target.value)}
            className="bg-transparent border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Toutes priorités</option>
            <option value="Tier 1">Tier 1 - Prioritaire</option>
            <option value="Tier 2">Tier 2 - Grand Donateur</option>
            <option value="Tier 3">Tier 3 - Standard</option>
          </select>
        </div>

        {/* Right Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher dans la vue..."
            className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 w-64 transition"
          />
        </div>
      </div>

      {/* Airtable Grid View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-normal">
          {/* Header row */}
          <thead>
            <tr className="bg-[#F8F9FA] border-b border-slate-200 text-slate-600 font-semibold select-none">
              <th className="py-2.5 px-3 w-10 text-center border-r border-slate-200 text-slate-400">
                #
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[200px]">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Entreprise & Mécène</span>
                </div>
              </th>
              {visibleColumns.secteur && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Secteur d'activité</span>
                  </div>
                </th>
              )}
              {visibleColumns.priorite && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">
                  <span>Priorité</span>
                </th>
              )}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[160px]">
                <span>Personnes de contact</span>
              </th>
              {visibleColumns.ticket && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">
                  <span>Ticket Estimé</span>
                </th>
              )}
              {visibleColumns.levierFiscal && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[180px]">
                  <span>Levier Fiscal (60%)</span>
                </th>
              )}
              {visibleColumns.pitch && (
                <th className="py-2.5 px-3 border-r border-slate-200 min-w-[220px]">
                  <span>Angle de Pitch</span>
                </th>
              )}
              <th className="py-2.5 px-3 text-right">
                <span>Actions</span>
              </th>
            </tr>
          </thead>

          {/* Body Rows */}
          <tbody className="divide-y divide-slate-200">
            {filteredEntreprises.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              filteredEntreprises.map((ent, idx) => {
                const entContacts = contacts.filter((c) => c.target_id === ent.id);
                const isExpanded = expandedEntreprises[ent.id] ?? true;

                return (
                  <React.Fragment key={ent.id}>
                    {/* Primary Parent Row */}
                    <tr className="hover:bg-slate-50/80 transition-colors bg-white group">
                      {/* Row Index & Toggle */}
                      <td className="py-2 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[11px]">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => toggleExpand(ent.id)}
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

                      {/* Nom Entreprise */}
                      <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate">{ent.nom}</span>
                          {ent.site_web && (
                            <a
                              href={ent.site_web}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-blue-600"
                              title="Site officiel"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Secteur */}
                      {visibleColumns.secteur && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-700">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                            {ent.secteur}
                          </span>
                        </td>
                      )}

                      {/* Priorite */}
                      {visibleColumns.priorite && (
                        <td className="py-2 px-3 border-r border-slate-200">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            ent.priorite.includes('Tier 1')
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : ent.priorite.includes('Tier 2')
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {ent.priorite}
                          </span>
                        </td>
                      )}

                      {/* Contacts Badge & Add button */}
                      <td className="py-2 px-3 border-r border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-slate-700">
                            {entContacts.length} contact{entContacts.length > 1 ? 's' : ''}
                          </span>
                          <button
                            onClick={() => onOpenAddContact(ent)}
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
                          {ent.ticket_estime}
                        </td>
                      )}

                      {/* Levier Fiscal */}
                      {visibleColumns.levierFiscal && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-600 text-[11px] max-w-xs truncate" title={ent.levier_fiscal}>
                          {ent.levier_fiscal}
                        </td>
                      )}

                      {/* Angle Pitch */}
                      {visibleColumns.pitch && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-700 text-[11px] max-w-sm">
                          <p className="line-clamp-1" title={ent.angle_pitch}>
                            {ent.angle_pitch}
                          </p>
                        </td>
                      )}

                      {/* Actions */}
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => onOpenAddContact(ent)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium transition cursor-pointer"
                        >
                          + Contact
                        </button>
                      </td>
                    </tr>

                    {/* Sub-Rows (Airtable Nested Grouping for Contacts) */}
                    {isExpanded && entContacts.map((contact, cIdx) => (
                      <tr key={contact.id} className="bg-[#F8F9FA]/60 hover:bg-blue-50/40 transition-colors border-l-4 border-l-blue-400">
                        {/* Sub Row Index */}
                        <td className="py-1.5 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[10px]">
                          {idx + 1}.{cIdx + 1}
                        </td>

                        {/* Nom du contact */}
                        <td className="py-1.5 px-3 border-r border-slate-200 pl-6">
                          <div className="flex items-center gap-1.5 font-medium text-slate-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            <span>{contact.nom}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block ml-3">{contact.poste}</span>
                        </td>

                        {/* Coordonnées (Email / Tel / LinkedIn) */}
                        <td colSpan={2} className="py-1.5 px-3 border-r border-slate-200">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px]">
                            {contact.email && (
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1 text-slate-600 hover:text-blue-600"
                              >
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{contact.email}</span>
                              </a>
                            )}
                            {contact.telephone && (
                              <a
                                href={`tel:${contact.telephone}`}
                                className="flex items-center gap-1 text-slate-600 hover:text-blue-600"
                              >
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span>{contact.telephone}</span>
                              </a>
                            )}
                            {contact.linkedin && (
                              <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:underline"
                              >
                                <Link2 className="w-3 h-3" />
                                <span>LinkedIn</span>
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Statut Dropdown (Airtable pill style) */}
                        <td className="py-1.5 px-3 border-r border-slate-200">
                          <select
                            value={contact.statut}
                            onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(contact.statut)}`}
                          >
                            <option value="À contacter">🟡 À contacter</option>
                            <option value="Contacté">🔵 Contacté (J0)</option>
                            <option value="Relance 1">🟠 Relance 1 (J+7)</option>
                            <option value="Relance 2">🔴 Relance 2 (J+15)</option>
                            <option value="Échange en cours">💬 Échange en cours</option>
                            <option value="Intéressé / RDV">🟢 Intéressé / RDV</option>
                            <option value="Refus / Standby">⚪ Refus / Standby</option>
                          </select>
                        </td>

                        {/* Dates Relances */}
                        <td colSpan={2} className="py-1.5 px-3 border-r border-slate-200 text-slate-600 text-[11px]">
                          {contact.prochaine_relance ? (
                            <span className="flex items-center gap-1 text-amber-700 font-medium">
                              <Calendar className="w-3 h-3" /> Prochaine relance : {contact.prochaine_relance}
                            </span>
                          ) : contact.dernier_contact ? (
                            <span>Dernier échange : {contact.dernier_contact}</span>
                          ) : (
                            <span className="text-slate-400">Aucun échange consigné</span>
                          )}
                        </td>

                        {/* Actions Contact */}
                        <td colSpan={2} className="py-1.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenRelance(contact, ent)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Relancer / Notes</span>
                            </button>

                            <button
                              onClick={() => {
                                alert(`🚀 [n8n Automation Ready] Déclenchement du webhook n8n pour ${contact.nom} (${ent.nom})`);
                              }}
                              className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-emerald-600 border border-slate-200 transition cursor-pointer"
                              title="Déclencher automatisation n8n"
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
