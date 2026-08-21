import React, { useState } from 'react';
import { X, Columns, Plus } from 'lucide-react';
import type { CustomField } from '../types';

interface AddColumnModalProps {
  onClose: () => void;
  onAddColumn: (field: CustomField) => void;
}

export const AddColumnModal: React.FC<AddColumnModalProps> = ({ onClose, onAddColumn }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState<CustomField['type']>('text');
  const [target, setTarget] = useState<CustomField['target']>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    const newField: CustomField = {
      id: `col_${Date.now()}_${label.trim().toLowerCase().replace(/\s+/g, '_')}`,
      label: label.trim(),
      type,
      target,
    };

    onAddColumn(newField);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-blue-100 text-blue-700">
              <Columns className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Ajouter une nouvelle colonne</h2>
              <p className="text-[11px] text-slate-500">Personnalisation du tableau</p>
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
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Intitulé de la colonne *</label>
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex: Ville du siège, Budget alloué, Remarques RH..."
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Type de données</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="text">Texte libre</option>
                <option value="number">Montant / Numérique</option>
                <option value="date">Date</option>
                <option value="select">Statut / Sélecteur</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Application</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">Toutes les lignes</option>
                <option value="contact">Contacts uniquement</option>
                <option value="parent">Organisation uniquement</option>
              </select>
            </div>
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
              <span>Créer la colonne</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
