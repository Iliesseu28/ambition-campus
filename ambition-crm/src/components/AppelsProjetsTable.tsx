import React, { useState } from 'react';
import type { AppelProjet, Contact, Relance, CustomField } from '../types';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Link2, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal,
  MessageSquare,
  Send,
  Filter,
  Columns,
  FileText,
  User,
  Activity,
  DollarSign
} from 'lucide-react';

interface AppelsProjetsTableProps {
  appelsProjets: AppelProjet[];
  contacts: Contact[];
  relances: Relance[];
  customFields?: CustomField[];
  onOpenRelance: (contact: Contact, aap: AppelProjet) => void;
  onOpenAddContact: (aap: AppelProjet) => void;
  onOpenAddOrganisation: () => void;
  onOpenAddColumn: () => void;
  onUpdateContactStatut: (contactId: string, statut: string) => void;
  onUpdateAAPStatut: (aapId: string, statut: string) => void;
  onCellEdit: (type: 'aap' | 'contact', id: string, field: string, value: string) => void;
}

export const AppelsProjetsTable: React.FC<AppelsProjetsTableProps> = ({
  appelsProjets,
  contacts,
  customFields = [],
  onOpenRelance,
  onOpenAddContact,
  onOpenAddOrganisation,
  onOpenAddColumn,
  onUpdateContactStatut,
  onUpdateAAPStatut,
  onCellEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [expandedAAPs, setExpandedAAPs] = useState<Record<string, boolean>>({});

  const [editingCell, setEditingCell] = useState<{
    type: 'aap' | 'contact';
    id: string;
    field: string;
    value: string;
  } | null>(null);

  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>({
    organisme: true,
    parent: true,
    thematiques: true,
    priorite: true,
    contact_nom: true,
    contact_poste: true,
    contact_email: true,
    contact_phone: true,
    statut_dossier: true,
    statut_contact: true,
    ticket: true,
    lien_depot: true,
    relance_action: true,
  });

  const [showColMenu, setShowColMenu] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedAAPs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStartEdit = (type: 'aap' | 'contact', id: string, field: string, currentValue: string) => {
    setEditingCell({
      type,
      id,
      field,
      value: currentValue || '',
    });
  };

  const handleCommitEdit = () => {
    if (!editingCell) return;
    onCellEdit(editingCell.type, editingCell.id, editingCell.field, editingCell.value);
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommitEdit();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
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
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.telephone.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    const matchPriorite = selectedPriorite === 'all' || aap.priorite.includes(selectedPriorite);
    const matchStatut = selectedStatut === 'all' || aap.statut_dossier === selectedStatut;

    return matchSearch && matchPriorite && matchStatut;
  });

  const getStatutBadgeStyle = (statut: string) => {
    if (statut.includes('Lauréat') || statut.includes('Accord') || statut.includes('Intéressé')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
    if (statut.includes('Déposé') || statut.includes('Contacté')) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    if (statut.includes('En cours') || statut.includes('rédaction') || statut.includes('Relance 1')) {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    if (statut.includes('En instruction') || statut.includes('Relance 2')) {
      return 'bg-purple-100 text-purple-800 border-purple-300';
    }
    if (statut.includes('Refus')) {
      return 'bg-slate-100 text-slate-600 border-slate-300';
    }
    return 'bg-slate-100 text-slate-700 border-slate-300';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden font-sans relative">
      
      {/* Airtable Toolbar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddOrganisation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouvelle fondation</span>
          </button>

          <button
            onClick={onOpenAddColumn}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 text-slate-700 font-medium transition border border-slate-200 cursor-pointer"
          >
            <Columns className="w-3.5 h-3.5 text-slate-500" />
            <span>+ Colonne</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 text-slate-700 font-medium transition border border-slate-200 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Colonnes ({Object.values(visibleCols).filter(Boolean).length})</span>
            </button>

            {showColMenu && (
              <div className="absolute left-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-lg p-2 shadow-xl z-30 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Afficher / Masquer Colonnes
                </div>
                {Object.entries({
                  organisme: 'Fondation & Organisme',
                  parent: 'Groupe Parent',
                  thematiques: 'Thématiques clés',
                  priorite: 'Priorité',
                  contact_nom: 'Nom du contact',
                  contact_poste: 'Poste / Titre',
                  contact_email: 'Email direct',
                  contact_phone: 'Téléphone',
                  statut_dossier: 'Statut du dossier AAP',
                  statut_contact: 'Statut du contact',
                  ticket: 'Ticket Visé',
                  lien_depot: 'Guichet de dépôt',
                  relance_action: 'Bouton Relance / Actions',
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer text-slate-700 text-[11px]">
                    <input
                      type="checkbox"
                      checked={visibleCols[key] ?? true}
                      onChange={(e) => setVisibleCols({ ...visibleCols, [key]: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-slate-50">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedPriorite}
              onChange={(e) => setSelectedPriorite(e.target.value)}
              className="bg-transparent text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Priorité: Toutes</option>
              <option value="Tier 1">Tier 1 - Piste Chaude</option>
              <option value="Tier 2">Tier 2 - Grand Donateur</option>
              <option value="Tier 3">Tier 3 - Standard</option>
            </select>
          </div>

          <select
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
            className="border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Statut dossier: Tous</option>
            <option value="À préparer">À préparer</option>
            <option value="En cours de rédaction">En cours de rédaction</option>
            <option value="Déposé">Dossier déposé</option>
            <option value="En instruction">En instruction</option>
            <option value="Lauréat / Accord">Lauréat / Accord</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 italic hidden md:inline">
            Double-cliquez sur une cellule pour modifier
          </span>
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
      </div>

      {/* Airtable Grid Table */}
      <div className="overflow-x-auto max-h-[75vh]">
        <table className="w-full text-left text-xs border-collapse font-normal table-fixed">
          
          <thead className="sticky top-0 z-20 bg-[#F8F9FA] shadow-xs">
            <tr className="border-b border-slate-200 text-slate-600 font-semibold select-none">
              
              <th className="w-12 py-2.5 px-2 text-center border-r border-slate-200 text-slate-400 bg-[#F8F9FA]">
                #
              </th>

              {visibleCols.organisme && (
                <th className="w-56 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Fondation & Organisme</span>
                  </div>
                </th>
              )}

              {visibleCols.parent && (
                <th className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Groupe Parent</span>
                </th>
              )}

              {visibleCols.thematiques && (
                <th className="w-56 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Thématiques Clés</span>
                </th>
              )}

              {visibleCols.priorite && (
                <th className="w-32 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Priorité</span>
                </th>
              )}

              {visibleCols.contact_nom && (
                <th className="w-48 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Contact Référent</span>
                  </div>
                </th>
              )}

              {visibleCols.contact_poste && (
                <th className="w-48 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Poste / Rôle</span>
                </th>
              )}

              {visibleCols.contact_email && (
                <th className="w-56 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Direct</span>
                  </div>
                </th>
              )}

              {visibleCols.contact_phone && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Téléphone</span>
                  </div>
                </th>
              )}

              {visibleCols.statut_dossier && (
                <th className="w-40 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span>Statut Dossier</span>
                  </div>
                </th>
              )}

              {visibleCols.statut_contact && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Statut Contact</span>
                </th>
              )}

              {visibleCols.ticket && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ticket Visé</span>
                  </div>
                </th>
              )}

              {visibleCols.lien_depot && (
                <th className="w-48 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Guichet de Dépôt</span>
                </th>
              )}

              {customFields.map((cf) => (
                <th key={cf.id} className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>{cf.label}</span>
                </th>
              ))}

              {visibleCols.relance_action && (
                <th className="w-48 py-2.5 px-3 text-right bg-[#F8F9FA]">
                  <span>Actions & Relance</span>
                </th>
              )}

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredAAPs.length === 0 ? (
              <tr>
                <td colSpan={14} className="py-12 text-center text-slate-400">
                  Aucun appel à projet ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              filteredAAPs.map((aap, idx) => {
                const aapContacts = contacts.filter((c) => c.target_id === aap.id);
                const isExpanded = expandedAAPs[aap.id] ?? true;

                return (
                  <React.Fragment key={aap.id}>
                    
                    <tr className="hover:bg-slate-50/80 transition-colors bg-white font-medium">
                      
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

                      {/* Organisme Editable */}
                      {visibleCols.organisme && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 font-bold text-slate-900 truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('aap', aap.id, 'organisme', aap.organisme)}
                          title="Double-cliquer pour modifier"
                        >
                          {editingCell?.type === 'aap' && editingCell?.id === aap.id && editingCell?.field === 'organisme' ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={handleCommitEdit}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                            />
                          ) : (
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="truncate">{aap.organisme}</span>
                              {aap.site_web && (
                                <a
                                  href={aap.site_web}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-slate-400 hover:text-blue-600 shrink-0"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          )}
                        </td>
                      )}

                      {/* Groupe Parent Editable */}
                      {visibleCols.parent && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 text-slate-600 text-[11px] truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('aap', aap.id, 'groupe_parent', aap.groupe_parent)}
                        >
                          {editingCell?.type === 'aap' && editingCell?.id === aap.id && editingCell?.field === 'groupe_parent' ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={handleCommitEdit}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                            />
                          ) : (
                            <span>{aap.groupe_parent || '-'}</span>
                          )}
                        </td>
                      )}

                      {/* Thematiques Editable */}
                      {visibleCols.thematiques && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 text-slate-700 text-[11px] truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('aap', aap.id, 'thematiques', aap.thematiques)}
                        >
                          {editingCell?.type === 'aap' && editingCell?.id === aap.id && editingCell?.field === 'thematiques' ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={handleCommitEdit}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                            />
                          ) : (
                            <span title={aap.thematiques}>{aap.thematiques}</span>
                          )}
                        </td>
                      )}

                      {/* Priorite */}
                      {visibleCols.priorite && (
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

                      {/* Contacts Summary */}
                      {visibleCols.contact_nom && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-500 italic text-[11px]">
                          {aapContacts.length} contact{aapContacts.length > 1 ? 's' : ''} associé{aapContacts.length > 1 ? 's' : ''}
                        </td>
                      )}

                      {visibleCols.contact_poste && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-400">-</td>
                      )}

                      {visibleCols.contact_email && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-400">-</td>
                      )}

                      {visibleCols.contact_phone && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-400">-</td>
                      )}

                      {/* Statut Dossier */}
                      {visibleCols.statut_dossier && (
                        <td className="py-2 px-3 border-r border-slate-200">
                          <select
                            value={aap.statut_dossier}
                            onChange={(e) => onUpdateAAPStatut(aap.id, e.target.value)}
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(aap.statut_dossier)}`}
                          >
                            <option value="À préparer">À préparer</option>
                            <option value="En cours de rédaction">En rédaction</option>
                            <option value="Déposé">Déposé</option>
                            <option value="En instruction">En instruction</option>
                            <option value="Lauréat / Accord">Lauréat / Accord</option>
                            <option value="Refusé">Refusé</option>
                          </select>
                        </td>
                      )}

                      {visibleCols.statut_contact && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-400">-</td>
                      )}

                      {/* Ticket Visé Editable */}
                      {visibleCols.ticket && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 font-bold text-emerald-700 truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('aap', aap.id, 'ticket_estime', aap.ticket_estime)}
                        >
                          {editingCell?.type === 'aap' && editingCell?.id === aap.id && editingCell?.field === 'ticket_estime' ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={handleCommitEdit}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                            />
                          ) : (
                            <span>{aap.ticket_estime}</span>
                          )}
                        </td>
                      )}

                      {/* Guichet Dépôt Editable */}
                      {visibleCols.lien_depot && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 text-slate-600 text-[11px] truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('aap', aap.id, 'lien_depot', aap.lien_depot)}
                        >
                          {editingCell?.type === 'aap' && editingCell?.id === aap.id && editingCell?.field === 'lien_depot' ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={handleCommitEdit}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                            />
                          ) : (
                            <span title={aap.lien_depot}>{aap.lien_depot || 'Contact direct'}</span>
                          )}
                        </td>
                      )}

                      {customFields.map((cf) => (
                        <td 
                          key={cf.id} 
                          className="py-2 px-3 border-r border-slate-200 text-slate-600 hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('aap', aap.id, cf.id, aap.custom_values?.[cf.id] || '')}
                        >
                          {editingCell?.type === 'aap' && editingCell?.id === aap.id && editingCell?.field === cf.id ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={handleCommitEdit}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                            />
                          ) : (
                            <span>{aap.custom_values?.[cf.id] || '-'}</span>
                          )}
                        </td>
                      ))}

                      {visibleCols.relance_action && (
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => onOpenAddContact(aap)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer text-[11px]"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Ajouter contact</span>
                          </button>
                        </td>
                      )}

                    </tr>

                    {/* Sub-Rows Contacts Fondation */}
                    {isExpanded && aapContacts.map((contact, cIdx) => (
                      <tr key={contact.id} className="bg-[#F8F9FA]/70 hover:bg-blue-50/40 transition-colors border-l-4 border-l-blue-600">
                        
                        <td className="py-1.5 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[10px]">
                          {idx + 1}.{cIdx + 1}
                        </td>

                        {visibleCols.organisme && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 pl-6 text-[11px] truncate">
                            ↳ <span className="text-slate-600">{aap.organisme}</span>
                          </td>
                        )}

                        {visibleCols.parent && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[11px] truncate">
                            {aap.groupe_parent || '-'}
                          </td>
                        )}

                        {visibleCols.thematiques && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[11px] truncate">
                            -
                          </td>
                        )}

                        {visibleCols.priorite && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[10px]">
                            {aap.priorite}
                          </td>
                        )}

                        {/* Nom Contact Editable */}
                        {visibleCols.contact_nom && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 font-semibold text-slate-900 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'nom', contact.nom)}
                          >
                            {editingCell?.type === 'contact' && editingCell?.id === contact.id && editingCell?.field === 'nom' ? (
                              <input
                                type="text"
                                value={editingCell.value}
                                onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                                onBlur={handleCommitEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                              />
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                                <span className="truncate">{contact.nom}</span>
                              </div>
                            )}
                          </td>
                        )}

                        {/* Poste Editable */}
                        {visibleCols.contact_poste && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 text-slate-600 text-[11px] truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'poste', contact.poste)}
                          >
                            {editingCell?.type === 'contact' && editingCell?.id === contact.id && editingCell?.field === 'poste' ? (
                              <input
                                type="text"
                                value={editingCell.value}
                                onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                                onBlur={handleCommitEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                              />
                            ) : (
                              <span className="truncate block">{contact.poste || '-'}</span>
                            )}
                          </td>
                        )}

                        {/* Email Editable */}
                        {visibleCols.contact_email && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'email', contact.email)}
                          >
                            {editingCell?.type === 'contact' && editingCell?.id === contact.id && editingCell?.field === 'email' ? (
                              <input
                                type="email"
                                value={editingCell.value}
                                onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                                onBlur={handleCommitEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                              />
                            ) : contact.email ? (
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 truncate"
                              >
                                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{contact.email}</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        )}

                        {/* Phone Editable */}
                        {visibleCols.contact_phone && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'telephone', contact.telephone)}
                          >
                            {editingCell?.type === 'contact' && editingCell?.id === contact.id && editingCell?.field === 'telephone' ? (
                              <input
                                type="tel"
                                value={editingCell.value}
                                onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                                onBlur={handleCommitEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                              />
                            ) : contact.telephone ? (
                              <a
                                href={`tel:${contact.telephone}`}
                                className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 truncate"
                              >
                                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{contact.telephone}</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        )}

                        {visibleCols.statut_dossier && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[10px]">
                            {aap.statut_dossier}
                          </td>
                        )}

                        {visibleCols.statut_contact && (
                          <td className="py-1.5 px-3 border-r border-slate-200">
                            <select
                              value={contact.statut}
                              onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(contact.statut)}`}
                            >
                              <option value="À contacter">À contacter</option>
                              <option value="Contacté">Contacté (J0)</option>
                              <option value="Relance 1">Relance 1</option>
                              <option value="Relance 2">Relance 2</option>
                              <option value="Échange en cours">Échange</option>
                              <option value="Intéressé / RDV">Intéressé</option>
                              <option value="Refus / Standby">Refus</option>
                            </select>
                          </td>
                        )}

                        {visibleCols.ticket && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                            {aap.ticket_estime}
                          </td>
                        )}

                        {visibleCols.lien_depot && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[11px]">
                            -
                          </td>
                        )}

                        {customFields.map((cf) => (
                          <td 
                            key={cf.id} 
                            className="py-1.5 px-3 border-r border-slate-200 text-slate-700 hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, cf.id, contact.custom_values?.[cf.id] || '')}
                          >
                            {editingCell?.type === 'contact' && editingCell?.id === contact.id && editingCell?.field === cf.id ? (
                              <input
                                type="text"
                                value={editingCell.value}
                                onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                                onBlur={handleCommitEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                              />
                            ) : (
                              <span>{contact.custom_values?.[cf.id] || '-'}</span>
                            )}
                          </td>
                        ))}

                        {visibleCols.relance_action && (
                          <td className="py-1.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onOpenRelance(contact, aap)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer text-[10px]"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>Relancer</span>
                              </button>

                              <button
                                onClick={() => {
                                  alert(`🚀 [n8n Automation Ready] Envoi déclenché pour ${contact.nom} (${aap.organisme})`);
                                }}
                                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-emerald-600 border border-slate-200 transition cursor-pointer"
                              >
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        )}

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
