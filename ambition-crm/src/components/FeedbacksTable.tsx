import React, { useState } from 'react';
import type { Feedback } from '../types';
import { 
  Search, 
  Plus, 
  MessageSquareDiff, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  User, 
  Image as ImageIcon,
  MessageSquare,
  Send
} from 'lucide-react';
import { sendTelegramFeedbackNotification } from '../lib/telegram';

interface FeedbacksTableProps {
  feedbacks: Feedback[];
  onOpenAddFeedback: () => void;
  onUpdateFeedbackStatut: (id: string, statut: Feedback['statut']) => void;
  onUpdateFeedbackReponse?: (id: string, reponse: string) => void;
  onCellEdit: (type: 'feedback', id: string, field: string, value: string) => void;
}

export const FeedbacksTable: React.FC<FeedbacksTableProps> = ({
  feedbacks,
  onOpenAddFeedback,
  onUpdateFeedbackStatut,
  onCellEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  // Inline editing cell
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
    value: string;
  } | null>(null);

  const handleStartEdit = (id: string, field: string, currentValue: string) => {
    setEditingCell({
      id,
      field,
      value: currentValue || '',
    });
  };

  const handleCommitEdit = () => {
    if (!editingCell) return;
    onCellEdit('feedback', editingCell.id, editingCell.field, editingCell.value);
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommitEdit();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const filteredFeedbacks = feedbacks.filter((f) => {
    const matchSearch =
      f.auteur_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.auteur_email && f.auteur_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      f.page_concernee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatut = selectedStatut === 'all' || f.statut === selectedStatut;
    const matchType = selectedType === 'all' || f.type_retour === selectedType;

    return matchSearch && matchStatut && matchType;
  });

  const getStatutBadge = (statut: Feedback['statut']) => {
    switch (statut) {
      case 'Traité / Validé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'En cours':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'À traiter':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Rejeté':
        return 'bg-slate-100 text-slate-600 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getTypeBadge = (type: Feedback['type_retour']) => {
    switch (type) {
      case 'Bug / Dysfonctionnement':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Amélioration / Idée':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Design / Ergonomie':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Contenu / Texte':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden font-sans relative">
      
      {/* Airtable Toolbar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        <div className="flex items-center gap-2">
          
          <button
            onClick={onOpenAddFeedback}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau retour / suggestion</span>
          </button>

          <div className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-slate-50">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="bg-transparent text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="À traiter">À traiter</option>
              <option value="En cours">En cours</option>
              <option value="Traité / Validé">Traité / Validé</option>
              <option value="Rejeté">Rejeté</option>
            </select>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Tous les types de retours</option>
            <option value="Amélioration / Idée">Amélioration / Idée</option>
            <option value="Bug / Dysfonctionnement">Bug / Dysfonctionnement</option>
            <option value="Design / Ergonomie">Design / Ergonomie</option>
            <option value="Contenu / Texte">Contenu / Texte</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 italic hidden md:inline">
            Double-cliquez pour modifier le statut ou la réponse
          </span>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un retour..."
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
              <th className="w-12 py-2.5 px-2 text-center border-r border-slate-200 text-slate-400 bg-[#F8F9FA]">#</th>
              <th className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Auteur du retour</span>
                </div>
              </th>
              <th className="w-40 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">Page / Section</th>
              <th className="w-44 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">Type de retour</th>
              <th className="w-96 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">Détail & Description</th>
              <th className="w-28 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA] text-center">Capture / Image</th>
              <th className="w-36 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">Statut Traitement</th>
              <th className="w-64 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">Notes & Réponses Admin</th>
              <th className="w-32 py-2.5 px-3 border-r border-slate-200 bg-[#F8F9FA]">Date</th>
              <th className="w-24 py-2.5 px-3 text-right bg-[#F8F9FA]">Alerte</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  Aucun retour utilisateur ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((fbk, idx) => (
                <tr key={fbk.id} className="hover:bg-slate-50/80 transition-colors bg-white font-medium">
                  
                  {/* Index */}
                  <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-400 font-mono text-[11px]">
                    {idx + 1}
                  </td>

                  {/* Auteur */}
                  <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-slate-900 truncate">
                    <div>{fbk.auteur_nom}</div>
                    {fbk.auteur_email && (
                      <span className="text-[10px] text-slate-400 font-normal block truncate">
                        {fbk.auteur_email}
                      </span>
                    )}
                  </td>

                  {/* Page concernée */}
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-700 truncate" title={fbk.page_concernee}>
                    {fbk.page_concernee}
                  </td>

                  {/* Type */}
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getTypeBadge(fbk.type_retour)}`}>
                      {fbk.type_retour}
                    </span>
                  </td>

                  {/* Message */}
                  <td 
                    className="py-2.5 px-3 border-r border-slate-200 text-slate-700 leading-relaxed hover:bg-blue-50/40 cursor-pointer"
                    onDoubleClick={() => handleStartEdit(fbk.id, 'message', fbk.message)}
                    title="Double-cliquer pour modifier le texte"
                  >
                    {editingCell?.id === fbk.id && editingCell?.field === 'message' ? (
                      <textarea
                        value={editingCell.value}
                        onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                        onBlur={handleCommitEdit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        rows={2}
                        className="w-full bg-white border border-blue-500 rounded p-1 text-xs text-slate-900 outline-none"
                      />
                    ) : (
                      <p className="line-clamp-2" title={fbk.message}>{fbk.message}</p>
                    )}
                  </td>

                  {/* Image / Capture jointe */}
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center">
                    {fbk.image_url ? (
                      <button
                        onClick={() => setSelectedImageModal(fbk.image_url || null)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-semibold transition cursor-pointer"
                        title="Voir la capture"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Voir</span>
                      </button>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>

                  {/* Statut Traitement (Pill) */}
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <select
                      value={fbk.statut}
                      onChange={(e) => onUpdateFeedbackStatut(fbk.id, e.target.value as any)}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatutBadge(fbk.statut)}`}
                    >
                      <option value="À traiter">À traiter</option>
                      <option value="En cours">En cours</option>
                      <option value="Traité / Validé">Traité / Validé</option>
                      <option value="Rejeté">Rejeté</option>
                    </select>
                  </td>

                  {/* Réponse Admin */}
                  <td 
                    className="py-2.5 px-3 border-r border-slate-200 text-slate-600 truncate hover:bg-blue-50/40 cursor-pointer"
                    onDoubleClick={() => handleStartEdit(fbk.id, 'reponse_admin', fbk.reponse_admin || '')}
                    title="Double-cliquer pour noter une réponse"
                  >
                    {editingCell?.id === fbk.id && editingCell?.field === 'reponse_admin' ? (
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
                      <span className={fbk.reponse_admin ? 'text-slate-800' : 'text-slate-400 italic'}>
                        {fbk.reponse_admin || 'Aucune note...'}
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                    {new Date(fbk.created_at).toLocaleDateString('fr-FR')}
                  </td>

                  {/* Telegram Resend Button */}
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={async () => {
                        const res = await sendTelegramFeedbackNotification({
                          id: fbk.id,
                          auteur: fbk.auteur_nom,
                          email: fbk.auteur_email,
                          page: fbk.page_concernee,
                          type: fbk.type_retour,
                          message: fbk.message,
                          imageUrl: fbk.image_url,
                          date: new Date(fbk.created_at).toLocaleDateString('fr-FR'),
                        });
                        if (res.success) {
                          alert('Notification Telegram renvoyée avec succès !');
                        } else {
                          alert(`Erreur d'envoi Telegram : ${res.error}`);
                        }
                      }}
                      className="p-1 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-200 transition cursor-pointer"
                      title="Renvoyer l'alerte sur Telegram"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Image Preview Modal */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-3xl max-h-[90vh] shadow-2xl flex flex-col">
            <div className="px-4 py-2.5 border-b border-slate-200 flex justify-between items-center bg-[#F8F9FA]">
              <span className="font-bold text-xs text-slate-800">Capture d'écran associée</span>
              <button
                onClick={() => setSelectedImageModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-900/5">
              <img src={selectedImageModal} alt="Capture" className="max-h-[70vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
