import React, { useState } from 'react';
import type { Entreprise, Contact, Relance } from '../types';
import { 
  Building2, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Link2, 
  ExternalLink, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal,
  MessageSquare,
  Send
} from 'lucide-react';

interface EntreprisesTableProps {
  entreprises: Entreprise[];
  contacts: Contact[];
  relances: Relance[];
  onOpenRelance: (contact: Contact, entreprise: Entreprise) => void;
  onOpenAddContact: (entreprise: Entreprise) => void;
  onUpdateContactStatut: (contactId: string, statut: string) => void;
  onUpdateEntrepriseStatut: (entrepriseId: string, statut: string) => void;
}

export const EntreprisesTable: React.FC<EntreprisesTableProps> = ({
  entreprises,
  contacts,
  relances,
  onOpenRelance,
  onOpenAddContact,
  onUpdateContactStatut,
  onUpdateEntrepriseStatut,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState<string>('all');
  const [selectedPriorite, setSelectedPriorite] = useState<string>('all');
  const [expandedEntreprises, setExpandedEntreprises] = useState<Record<string, boolean>>({});

  // Colonnes visibles configurables
  const [visibleColumns, setVisibleColumns] = useState({
    secteur: true,
    priorite: true,
    ticket: true,
    levierFiscal: true,
    statut: true,
    pitch: true,
  });

  const [showColMenu, setShowColMenu] = useState(false);

  // Toggle expansion
  const toggleExpand = (id: string) => {
    setExpandedEntreprises((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Secteurs uniques pour filtre
  const secteurs = Array.from(new Set(entreprises.map((e) => e.secteur).filter(Boolean)));

  // Filtrage
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

  return (
    <div className="space-y-4">
      {/* Barre d'actions & Filtres */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
        
        {/* Recherche */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une entreprise, un contact, un email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Filtres Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSecteur}
            onChange={(e) => setSelectedSecteur(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Tous les secteurs ({secteurs.length})</option>
            {secteurs.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedPriorite}
            onChange={(e) => setSelectedPriorite(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Toutes priorités</option>
            <option value="Tier 1">Tier 1 - Prioritaire</option>
            <option value="Tier 2">Tier 2 - Grand Donateur</option>
            <option value="Tier 3">Tier 3 - Standard</option>
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
                    checked={visibleColumns.secteur}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, secteur: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Secteur d'activité</span>
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
                    checked={visibleColumns.levierFiscal}
                    onChange={(e) => setVisibleColumns({ ...visibleColumns, levierFiscal: e.target.checked })}
                    className="rounded border-slate-700 text-amber-500"
                  />
                  <span>Levier Fiscal (60%)</span>
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

      {/* Table & Rows */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4">Entreprise & Mécène</th>
                {visibleColumns.secteur && <th className="py-3 px-4">Secteur</th>}
                {visibleColumns.priorite && <th className="py-3 px-4">Priorité</th>}
                <th className="py-3 px-4">Contacts Référents ({contacts.length})</th>
                {visibleColumns.ticket && <th className="py-3 px-4">Ticket Estimé</th>}
                {visibleColumns.levierFiscal && <th className="py-3 px-4">Levier Fiscal</th>}
                {visibleColumns.pitch && <th className="py-3 px-4">Angle de Pitch</th>}
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60">
              {filteredEntreprises.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    Aucune entreprise ne correspond aux critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredEntreprises.map((ent) => {
                  const entContacts = contacts.filter((c) => c.target_id === ent.id);
                  const isExpanded = expandedEntreprises[ent.id] ?? true; // Default expanded for convenience

                  return (
                    <React.Fragment key={ent.id}>
                      {/* Parent Row : L'Entreprise */}
                      <tr className="hover:bg-slate-800/30 transition-colors group bg-slate-900/40">
                        {/* Toggle Collapse */}
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => toggleExpand(ent.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-amber-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                        </td>

                        {/* Nom Entreprise */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-amber-400 transition">
                              {ent.nom}
                            </span>
                            {ent.site_web && (
                              <a
                                href={ent.site_web}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 hover:text-amber-400 transition"
                                title="Ouvrir le site officiel"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{ent.id}</span>
                        </td>

                        {/* Secteur */}
                        {visibleColumns.secteur && (
                          <td className="py-3 px-4 text-slate-300">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[11px]">
                              {ent.secteur}
                            </span>
                          </td>
                        )}

                        {/* Priorité */}
                        {visibleColumns.priorite && (
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              ent.priorite.includes('Tier 1')
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : ent.priorite.includes('Tier 2')
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {ent.priorite}
                            </span>
                          </td>
                        )}

                        {/* Résumé des contacts */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-200">
                              {entContacts.length} contact{entContacts.length > 1 ? 's' : ''}
                            </span>
                            <button
                              onClick={() => onOpenAddContact(ent)}
                              className="p-1 rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition text-[10px] flex items-center gap-1"
                              title="Ajouter une personne de contact pour cette entreprise"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Ajouter</span>
                            </button>
                          </div>
                        </td>

                        {/* Ticket */}
                        {visibleColumns.ticket && (
                          <td className="py-3 px-4 font-semibold text-emerald-400">
                            {ent.ticket_estime}
                          </td>
                        )}

                        {/* Levier fiscal */}
                        {visibleColumns.levierFiscal && (
                          <td className="py-3 px-4 text-slate-400 text-[11px] max-w-xs truncate" title={ent.levier_fiscal}>
                            {ent.levier_fiscal}
                          </td>
                        )}

                        {/* Angle Pitch */}
                        {visibleColumns.pitch && (
                          <td className="py-3 px-4 text-slate-300 text-[11px] max-w-sm">
                            <p className="line-clamp-2" title={ent.angle_pitch}>
                              {ent.angle_pitch}
                            </p>
                          </td>
                        )}

                        {/* Actions globales */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onOpenAddContact(ent)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                          >
                            + Nouveau contact
                          </button>
                        </td>
                      </tr>

                      {/* Sub-Rows : Chaque contact de l'entreprise */}
                      {isExpanded && entContacts.map((contact) => (
                        <tr key={contact.id} className="bg-slate-950/40 hover:bg-slate-950/80 transition-colors border-l-2 border-l-amber-500/40">
                          <td></td>
                          
                          {/* Indentation et Nom Contact */}
                          <td className="py-2.5 px-4 pl-8">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                              <span className="font-semibold text-slate-100">{contact.nom}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 ml-3.5 block">{contact.poste}</span>
                          </td>

                          {/* Email & Téléphone & LinkedIn */}
                          <td colSpan={2} className="py-2.5 px-4">
                            <div className="space-y-1">
                              {contact.email && (
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-[11px] transition"
                                >
                                  <Mail className="w-3 h-3 text-slate-500" />
                                  <span>{contact.email}</span>
                                </a>
                              )}
                              {contact.telephone && (
                                <a
                                  href={`tel:${contact.telephone}`}
                                  className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-[11px] transition"
                                >
                                  <Phone className="w-3 h-3 text-slate-500" />
                                  <span>{contact.telephone}</span>
                                </a>
                              )}
                              {contact.linkedin && (
                                <a
                                  href={contact.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-[11px] transition"
                                >
                                  <Link2 className="w-3 h-3" />
                                  <span>Profil LinkedIn</span>
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Statut individuel de ce contact */}
                          <td className="py-2.5 px-4">
                            <select
                              value={contact.statut}
                              onChange={(e) => onUpdateContactStatut(contact.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500"
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

                          {/* Dernier contact & Prochaine relance */}
                          <td colSpan={2} className="py-2.5 px-4 text-[11px] text-slate-400">
                            {contact.prochaine_relance ? (
                              <span className="flex items-center gap-1 text-amber-400 font-medium">
                                <Calendar className="w-3 h-3" /> Prochaine relance : {contact.prochaine_relance}
                              </span>
                            ) : contact.dernier_contact ? (
                              <span>Dernier échange : {contact.dernier_contact}</span>
                            ) : (
                              <span className="text-slate-600">Aucune relance effectuée</span>
                            )}
                          </td>

                          {/* Actions sur ce contact */}
                          <td colSpan={2} className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => onOpenRelance(contact, ent)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition shadow-sm"
                                title="Enregistrer une relance ou générer le pitch"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Relancer / Historique</span>
                              </button>

                              <button
                                onClick={() => {
                                  alert(`🚀 [n8n Automation Ready] Déclenchement du webhook n8n pour ${contact.nom} (${ent.nom})`);
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
