import React, { useState } from 'react';
import type { Contact } from '../types';
import { X, UserPlus, Mail, Phone, Link2, Briefcase } from 'lucide-react';

interface AddContactModalProps {
  targetType: 'entreprise' | 'aap';
  targetId: string;
  entityName: string;
  onClose: () => void;
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  targetType,
  targetId,
  entityName,
  onClose,
  onAddContact,
}) => {
  const [nom, setNom] = useState('');
  const [poste, setPoste] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    onAddContact({
      target_type: targetType,
      target_id: targetId,
      nom: nom.trim(),
      poste: poste.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      linkedin: linkedin.trim(),
      statut: 'À contacter',
      notes: notes.trim(),
      dernier_contact: null,
      prochaine_relance: null,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-blue-100 text-blue-700">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Nouveau Contact</h2>
              <p className="text-xs text-slate-500">Rattaché à : <span className="font-semibold text-slate-800">{entityName}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Nom complet *</label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Sophie Martin"
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Poste / Rôle</label>
            <div className="relative">
              <Briefcase className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
                placeholder="Ex: Directrice RSE / Mécénat"
                className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@organisation.com"
                  className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Téléphone</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="06 00 00 00 00"
                  className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Profil LinkedIn</label>
            <div className="relative">
              <Link2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/in/..."
                className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Notes / Contexte</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Commentaires, recommandation interne..."
              rows={2}
              className="w-full bg-white border border-slate-200 rounded-md p-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
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
              className="px-4 py-1.5 rounded font-semibold bg-[#2D7FF9] hover:bg-blue-600 text-white shadow-xs transition cursor-pointer"
            >
              Ajouter le contact
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
