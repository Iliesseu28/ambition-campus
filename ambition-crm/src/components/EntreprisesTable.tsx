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
  DollarSign
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
  onUpdateContactValue?: (contactId: string, field: string, value: string) => void;
  onUpdateEntrepriseValue?: (entrepriseId: string, field: string, value: string) => void;
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
  onUpdateContactValue,
  onUpdateEntrepriseValue,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState<string>('all');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [expandedEntreprises, setExpandedEntreprises] = useState<Record<string, boolean>>({});

  // Configuration des colonnes
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
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden font-sans">
      
      {/* Airtable Toolbar */}
      <div className="px-4 py-2 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        {/* Left Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* + Nouvelle Entreprise */}
          <button
            onClick={onOpenAddOrganisation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold bg-[#2D7FF9] hover:bg-blue-600 text-white shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouvelle entreprise</span>
          </button>

          {/* + Ajouter une colonne */}
          <button
            onClick={onOpenAddColumn}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 text-slate-700 font-medium transition border border-slate-200 cursor-pointer"
            title="Ajouter un champ personnalisé"
          >
            <Columns className="w-3.5 h-3.5 text-slate-500" />
            <span>+ Colonne</span>
          </button>

          {/* Champs visibles */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 text-slate-700 font-medium transition border border-slate-200 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Champs ({Object.values(visibleCols).filter(Boolean).length})</span>
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
                  relance_action: 'Bouton Relance / Historique',
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

          {/* Filtre Secteur */}
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

          {/* Filtre Priorite */}
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

        {/* Right Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher dans toutes les colonnes..."
            className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 w-64 transition"
          />
        </div>
      </div>

      {/* Airtable Grid Table (Strict Alignment) */}
      <div className="overflow-x-auto max-h-[75vh]">
        <table className="w-full text-left text-xs border-collapse font-normal table-fixed">
          
          {/* Table Header with Fixed Widths */}
          <thead className="sticky top-0 z-20 bg-[#F8F9FA] shadow-xs">
            <tr className="border-b border-slate-200 text-slate-600 font-semibold select-none">
              
              {/* # Index */}
              <th className="w-12 py-2.5 px-2 text-center border-r border-slate-200 text-slate-400 bg-[#F8F9FA]">
                #
              </th>

              {/* Organisation */}
              {visibleCols.organisation && (
                <th className="w-56 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Entreprise & Mécène</span>
                  </div>
                </th>
              )}

              {/* Secteur */}
              {visibleCols.secteur && (
                <th className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Secteur d'activité</span>
                  </div>
                </th>
              )}

              {/* Priorité */}
              {visibleCols.priorite && (
                <th className="w-32 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Priorité</span>
                </th>
              )}

              {/* Nom Contact */}
              {visibleCols.contact_nom && (
                <th className="w-48 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Personne de Contact</span>
                  </div>
                </th>
              )}

              {/* Poste / Titre */}
              {visibleCols.contact_poste && (
                <th className="w-48 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>Poste / Rôle</span>
                </th>
              )}

              {/* Email Séparé */}
              {visibleCols.contact_email && (
                <th className="w-56 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Direct</span>
                  </div>
                </th>
              )}

              {/* Téléphone Séparé */}
              {visibleCols.contact_phone && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Téléphone</span>
                  </div>
                </th>
              )}

              {/* LinkedIn Séparé */}
              {visibleCols.contact_linkedin && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profil LinkedIn</span>
                  </div>
                </th>
              )}

              {/* Statut Contact */}
              {visibleCols.statut && (
                <th className="w-40 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span>Statut de Prospection</span>
                  </div>
                </th>
              )}

              {/* Ticket Estimé */}
              {visibleCols.ticket && (
                <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ticket Estimé</span>
                  </div>
                </th>
              )}

              {/* Custom Dynamic Columns */}
              {customFields.map((cf) => (
                <th key={cf.id} className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                  <span>{cf.label}</span>
                </th>
              ))}

              {/* Action Relance */}
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
                      
                      {/* Index + Toggle */}
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
                      {visibleCols.organisation && (
                        <td className="py-2 px-3 border-r border-slate-200 font-bold text-slate-900 truncate">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="truncate" title={ent.nom}>{ent.nom}</span>
                            {ent.site_web && (
                              <a
                                href={ent.site_web}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-blue-600 shrink-0"
                                title="Site web"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>
                      )}

                      {/* Secteur */}
                      {visibleCols.secteur && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-700 truncate">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] truncate block" title={ent.secteur}>
                            {ent.secteur}
                          </span>
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

                      {/* Empty Contact Columns for Parent Row (Summary) */}
                      {visibleCols.contact_nom && (
                        <td className="py-2 px-3 border-r border-slate-200 text-slate-500 italic text-[11px]">
                          {entContacts.length} contact{entContacts.length > 1 ? 's' : ''} associé{entContacts.length > 1 ? 's' : ''}
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
                        <td className="py-2 px-3 border-r border-slate-200">
                          <span className="text-[11px] font-semibold text-slate-700">
                            {ent.statut_global}
                          </span>
                        </td>
                      )}

                      {/* Ticket Estimé */}
                      {visibleCols.ticket && (
                        <td className="py-2 px-3 border-r border-slate-200 font-bold text-emerald-700 truncate">
                          {ent.ticket_estime}
                        </td>
                      )}

                      {/* Custom Fields Parent */}
                      {customFields.map((cf) => (
                        <td key={cf.id} className="py-2 px-3 border-r border-slate-200 text-slate-600">
                          {ent.custom_values?.[cf.id] || '-'}
                        </td>
                      ))}

                      {/* Add Contact Action */}
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
                      <tr key={contact.id} className="bg-[#F8F9FA]/70 hover:bg-blue-50/40 transition-colors border-l-4 border-l-[#2D7FF9]">
                        
                        {/* Sub Row Index */}
                        <td className="py-1.5 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[10px]">
                          {idx + 1}.{cIdx + 1}
                        </td>

                        {/* Organisation Name Repetition (Indented) */}
                        {visibleCols.organisation && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 pl-6 text-[11px] truncate">
                            ↳ <span className="text-slate-600">{ent.nom}</span>
                          </td>
                        )}

                        {/* Secteur */}
                        {visibleCols.secteur && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[11px] truncate">
                            {ent.secteur}
                          </td>
                        )}

                        {/* Priorite */}
                        {visibleCols.priorite && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-400 text-[10px]">
                            {ent.priorite}
                          </td>
                        )}

                        {/* Contact Nom */}
                        {visibleCols.contact_nom && (
                          <td className="py-1.5 px-3 border-r border-slate-200 font-semibold text-slate-900 truncate">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                              <span className="truncate" title={contact.nom}>{contact.nom}</span>
                            </div>
                          </td>
                        )}

                        {/* Contact Poste */}
                        {visibleCols.contact_poste && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-600 text-[11px] truncate" title={contact.poste}>
                            {contact.poste || '-'}
                          </td>
                        )}

                        {/* Contact Email */}
                        {visibleCols.contact_email && (
                          <td className="py-1.5 px-3 border-r border-slate-200 truncate">
                            {contact.email ? (
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 truncate"
                                title={contact.email}
                              >
                                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{contact.email}</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        )}

                        {/* Contact Téléphone */}
                        {visibleCols.contact_phone && (
                          <td className="py-1.5 px-3 border-r border-slate-200 truncate">
                            {contact.telephone ? (
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

                        {/* Contact LinkedIn */}
                        {visibleCols.contact_linkedin && (
                          <td className="py-1.5 px-3 border-r border-slate-200 truncate">
                            {contact.linkedin ? (
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

                        {/* Statut Contact (Airtable Pill) */}
                        {visibleCols.statut && (
                          <td className="py-1.5 px-3 border-r border-slate-200">
                            <select
                              value={contact.statut}
                              onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadgeStyle(contact.statut)}`}
                            >
                              <option value="À contacter">🟡 À contacter</option>
                              <option value="Contacté">🔵 Contacté (J0)</option>
                              <option value="Relance 1">🟠 Relance 1 (J+7)</option>
                              <option value="Relance 2">🔴 Relance 2 (J+15)</option>
                              <option value="Échange en cours">💬 Échange</option>
                              <option value="Intéressé / RDV">🟢 Intéressé</option>
                              <option value="Refus / Standby">⚪ Refus</option>
                            </select>
                          </td>
                        )}

                        {/* Ticket estimé */}
                        {visibleCols.ticket && (
                          <td className="py-1.5 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                            {ent.ticket_estime}
                          </td>
                        )}

                        {/* Custom Fields Contact */}
                        {customFields.map((cf) => (
                          <td key={cf.id} className="py-1.5 px-3 border-r border-slate-200 text-slate-700">
                            {contact.custom_values?.[cf.id] || '-'}
                          </td>
                        ))}

                        {/* Relance & Send Actions */}
                        {visibleCols.relance_action && (
                          <td className="py-1.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onOpenRelance(contact, ent)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer text-[10px]"
                                title="Ouvrir la fiche de relance"
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
