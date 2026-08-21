import React, { useState } from 'react';
import type { Entreprise, Contact, Relance, CustomField } from '../types';
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
  Briefcase,
  Layers,
  User,
  Activity,
  DollarSign,
  Edit2
} from 'lucide-react';

interface EntreprisesTableProps {
  entreprises: Entreprise[];
  contacts: Contact[];
  relances: Relance[];
  customFields?: CustomField[];
  onOpenRelance: (contact: Contact, entreprise: Entreprise) => void;
  onOpenAddContact: (entreprise: Entreprise) => void;
  onOpenAddOrganisation: () => void;
  onOpenAddColumn: () => void;
  onUpdateContactStatut: (contactId: string, statut: string) => void;
  onCellEdit: (type: 'entreprise' | 'contact', id: string, field: string, value: string) => void;
}

export const EntreprisesTable: React.FC<EntreprisesTableProps> = ({
  entreprises,
  contacts,
  customFields = [],
  onOpenRelance,
  onOpenAddContact,
  onOpenAddOrganisation,
  onOpenAddColumn,
  onUpdateContactStatut,
  onCellEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState<string>('all');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [expandedEntreprises, setExpandedEntreprises] = useState<Record<string, boolean>>({});

  // Editing Cell State (Double-click inline edit)
  const [editingCell, setEditingCell] = useState<{
    type: 'entreprise' | 'contact';
    id: string;
    field: string;
    value: string;
  } | null>(null);

  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>({
    organisation: true,
    secteur: true,
    priorite: true,
    contact_nom: true,
    contact_poste: true,
    contact_email: true,
    contact_phone: true,
    contact_linkedin: true,
    statut: true,
    ticket: true,
    relance_action: true,
  });

  const [showColMenu, setShowColMenu] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedEntreprises((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStartEdit = (type: 'entreprise' | 'contact', id: string, field: string, currentValue: string) => {
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

  const secteurs = Array.from(new Set(entreprises.map((e) => e.secteur).filter(Boolean)));

  const filteredEntreprises = entreprises.filter((e) => {
    const matchSearch =
      e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.secteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacts.some(
        (c) =>
          c.target_id === e.id &&
          (c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.telephone.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    const matchSecteur = selectedSecteur === 'all' || e.secteur === selectedSecteur;
    const matchPriorite = selectedPriorite === 'all' || e.priorite.includes(selectedPriorite);

    return matchSearch && matchSecteur && matchPriorite;
  });

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
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden font-sans relative">
      
      {/* Airtable Toolbar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        {/* Left Action Buttons */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={onOpenAddOrganisation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouvelle entreprise</span>
          </button>

          <button
            onClick={onOpenAddColumn}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 text-slate-700 font-medium transition border border-slate-200 cursor-pointer"
            title="Ajouter un champ personnalisé"
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
                  organisation: 'Organisation',
                  secteur: 'Secteur d\'activité',
                  priorite: 'Priorité',
                  contact_nom: 'Nom du contact',
                  contact_poste: 'Poste / Titre',
                  contact_email: 'Email direct',
                  contact_phone: 'Téléphone',
                  contact_linkedin: 'Profil LinkedIn',
                  statut: 'Statut du contact',
                  ticket: 'Ticket Estimé',
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
              value={selectedSecteur}
              onChange={(e) => setSelectedSecteur(e.target.value)}
              className="bg-transparent text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Secteur: Tous ({secteurs.length})</option>
              {secteurs.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <select
            value={selectedPriorite}
            onChange={(e) => setSelectedPriorite(e.target.value)}
            className="border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Priorité: Toutes</option>
            <option value="Tier 1">Tier 1 - Prioritaire</option>
            <option value="Tier 2">Tier 2 - Grand Donateur</option>
            <option value="Tier 3">Tier 3 - Standard</option>
          </select>
        </div>

        {/* Right Search Input & Hint */}
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

      {/* Airtable Grid Table (Strict Alignment) */}
      <div className="overflow-x-auto max-h-[75vh]">
        <table className="w-full text-left text-xs border-collapse font-normal table-fixed">
          
          {/* Table Header with Fixed Widths */}
          <thead className="sticky top-0 z-20 bg-[#F8F9FA] shadow-xs">
            <tr className="border-b border-slate-200 text-slate-600 font-semibold select-none">
              
              <th className="w-12 py-2.5 px-2 text-center border-r border-slate-200 text-slate-400 bg-[#F8F9FA]">
                #
              </th>

              {visibleCols.organisation && (
                <th className="w-56 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Entreprise & Mécène</span>
                  </div>
                </th>
              )}

              {visibleCols.secteur && (
                <th className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Secteur d'activité</span>
                  </div>
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
                    <span>Personne de Contact</span>
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

              {visibleCols.contact_linkedin && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profil LinkedIn</span>
                  </div>
                </th>
              )}

              {visibleCols.statut && (
                <th className="w-40 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span>Statut de Prospection</span>
                  </div>
                </th>
              )}

              {visibleCols.ticket && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ticket Estimé</span>
                  </div>
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

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200">
            {filteredEntreprises.length === 0 ? (
              <tr>
                <td colSpan={14} className="py-12 text-center text-slate-400">
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              filteredEntreprises.map((ent, idx) => {
                const entContacts = contacts.filter((c) => c.target_id === ent.id);
                const isExpanded = expandedEntreprises[ent.id] ?? true;

                return (
                  <React.Fragment key={ent.id}>
                    
                    {/* Primary Organisation Row */}
                    <tr className="hover:bg-slate-50/80 transition-colors bg-white font-medium">
                      
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

                      {/* Nom Entreprise Editable */}
                      {visibleCols.organisation && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 font-bold text-slate-900 truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('entreprise', ent.id, 'nom', ent.nom)}
                          title="Double-cliquer pour modifier"
                        >
                          {editingCell?.type === 'entreprise' && editingCell?.id === ent.id && editingCell?.field === 'nom' ? (
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
                              <span className="truncate">{ent.nom}</span>
                              {ent.site_web && (
                                <a
                                  href={ent.site_web}
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

                      {/* Secteur Editable */}
                      {visibleCols.secteur && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 text-slate-700 truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('entreprise', ent.id, 'secteur', ent.secteur)}
                          title="Double-cliquer pour modifier"
                        >
                          {editingCell?.type === 'entreprise' && editingCell?.id === ent.id && editingCell?.field === 'secteur' ? (
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
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] truncate block">
                              {ent.secteur}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Priorite */}
                      {visibleCols.priorite && (
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

                      {/* Summary Contacts */}
                      {visibleCols.contact_nom && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-500 italic text-[11px]">
                          {entContacts.length} contact{entContacts.length > 1 ? 's' : ''}
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

                      {visibleCols.contact_linkedin && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-400">-</td>
                      )}

                      {/* Statut Global */}
                      {visibleCols.statut && (
                        <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-700 text-[11px]">
                          {ent.statut_global}
                        </td>
                      )}

                      {/* Ticket Estimé Editable */}
                      {visibleCols.ticket && (
                        <td 
                          className="py-2 px-3 border-r border-slate-200 font-bold text-emerald-700 truncate hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('entreprise', ent.id, 'ticket_estime', ent.ticket_estime)}
                          title="Double-cliquer pour modifier le montant"
                        >
                          {editingCell?.type === 'entreprise' && editingCell?.id === ent.id && editingCell?.field === 'ticket_estime' ? (
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
                            <span>{ent.ticket_estime}</span>
                          )}
                        </td>
                      )}

                      {/* Custom Fields Parent */}
                      {customFields.map((cf) => (
                        <td 
                          key={cf.id} 
                          className="py-2 px-3 border-r border-slate-200 text-slate-600 hover:bg-blue-50/50 cursor-pointer"
                          onDoubleClick={() => handleStartEdit('entreprise', ent.id, cf.id, ent.custom_values?.[cf.id] || '')}
                        >
                          {editingCell?.type === 'entreprise' && editingCell?.id === ent.id && editingCell?.field === cf.id ? (
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
                            <span>{ent.custom_values?.[cf.id] || '-'}</span>
                          )}
                        </td>
                      ))}

                      {/* Action */}
                      {visibleCols.relance_action && (
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => onOpenAddContact(ent)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer text-[11px]"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Ajouter contact</span>
                          </button>
                        </td>
                      )}

                    </tr>

                    {/* Sub-Rows : Chaque Contact dans les mêmes colonnes exactes */}
                    {isExpanded && entContacts.map((contact, cIdx) => (
                      <tr key={contact.id} className="bg-[#F8F9FA]/70 hover:bg-blue-50/40 transition-colors border-l-4 border-l-blue-600">
                        
                        <td className="py-1.5 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[10px]">
                          {idx + 1}.{cIdx + 1}
                        </td>

                        {visibleCols.organisation && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 pl-6 text-[11px] truncate">
                            ↳ <span className="text-slate-600">{ent.nom}</span>
                          </td>
                        )}

                        {visibleCols.secteur && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[11px] truncate">
                            {ent.secteur}
                          </td>
                        )}

                        {visibleCols.priorite && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[10px]">
                            {ent.priorite}
                          </td>
                        )}

                        {/* Contact Nom Editable */}
                        {visibleCols.contact_nom && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 font-semibold text-slate-900 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'nom', contact.nom)}
                            title="Double-cliquer pour modifier"
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

                        {/* Contact Poste Editable */}
                        {visibleCols.contact_poste && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 text-slate-600 text-[11px] truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'poste', contact.poste)}
                            title="Double-cliquer pour modifier"
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

                        {/* Contact Email Editable */}
                        {visibleCols.contact_email && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'email', contact.email)}
                            title="Double-cliquer pour modifier"
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

                        {/* Contact Phone Editable */}
                        {visibleCols.contact_phone && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'telephone', contact.telephone)}
                            title="Double-cliquer pour modifier"
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

                        {/* Contact LinkedIn Editable */}
                        {visibleCols.contact_linkedin && (
                          <td 
                            className="py-1.5 px-3 border-r border-slate-200 truncate hover:bg-blue-50/60 cursor-pointer"
                            onDoubleClick={() => handleStartEdit('contact', contact.id, 'linkedin', contact.linkedin)}
                            title="Double-cliquer pour modifier le lien"
                          >
                            {editingCell?.type === 'contact' && editingCell?.id === contact.id && editingCell?.field === 'linkedin' ? (
                              <input
                                type="url"
                                value={editingCell.value}
                                onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                                onBlur={handleCommitEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full bg-white border border-blue-500 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none"
                              />
                            ) : contact.linkedin ? (
                              <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                              >
                                <Link2 className="w-3 h-3 shrink-0" />
                                <span>LinkedIn</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        )}

                        {/* Statut Contact */}
                        {visibleCols.statut && (
                          <td className="py-1.5 px-3 border-r border-slate-200">
                            <select
                              value={contact.statut}
                              onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(contact.statut)}`}
                            >
                              <option value="À contacter">À contacter</option>
                              <option value="Contacté">Contacté (J0)</option>
                              <option value="Relance 1">Relance 1 (J+7)</option>
                              <option value="Relance 2">Relance 2 (J+15)</option>
                              <option value="Échange en cours">Échange</option>
                              <option value="Intéressé / RDV">Intéressé</option>
                              <option value="Refus / Standby">Refus</option>
                            </select>
                          </td>
                        )}

                        {/* Ticket */}
                        {visibleCols.ticket && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                            {ent.ticket_estime}
                          </td>
                        )}

                        {/* Custom Fields Contact */}
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

                        {/* Actions */}
                        {visibleCols.relance_action && (
                          <td className="py-1.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onOpenRelance(contact, ent)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer text-[10px]"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>Relancer</span>
                              </button>

                              <button
                                onClick={() => {
                                  alert(`🚀 [n8n Automation Ready] Envoi déclenché pour ${contact.nom} (${ent.nom})`);
                                }}
                                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-emerald-600 border border-slate-200 transition cursor-pointer"
                                title="Déclencher webhook n8n"
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
