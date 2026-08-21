import React, { useState } from 'react';
import { X, MessageSquareDiff, Plus, Upload, Image, Check, AlertCircle } from 'lucide-react';
import type { Feedback } from '../types';
import { supabase } from '../lib/supabase';
import { sendTelegramFeedbackNotification } from '../lib/telegram';

interface AddFeedbackModalProps {
  onClose: () => void;
  onAddFeedback: (feedback: Feedback) => void;
}

export const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({ onClose, onAddFeedback }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [page, setPage] = useState('Page d\'accueil');
  const [type, setType] = useState<Feedback['type_retour']>('Amélioration / Idée');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrlDirect, setImageUrlDirect] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setUploadStatus('Téléversement...');

    let finalImageUrl = imageUrlDirect.trim() || null;

    // Si un fichier image a été sélectionné, on tente l'upload Supabase Storage
    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `feedback_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `retours/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('ambition-campus-assets')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.warn('Storage upload note:', uploadError.message);
          // Si le bucket n'est pas encore créé, on stocke la prévisualisation base64 pour affichage immédiat
          finalImageUrl = imagePreview;
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('ambition-campus-assets')
            .getPublicUrl(filePath);
          finalImageUrl = publicUrlData.publicUrl;
        }
      } catch (err) {
        console.warn('Fallback preview storage');
        finalImageUrl = imagePreview;
      }
    }

    const todayStr = new Date().toISOString();
    const newFeedback: Feedback = {
      id: `FBK-${Date.now().toString().slice(-4)}`,
      auteur_nom: nom.trim(),
      auteur_email: email.trim() || undefined,
      page_concernee: page.trim(),
      type_retour: type,
      message: message.trim(),
      image_url: finalImageUrl,
      statut: 'À traiter',
      reponse_admin: '',
      created_at: todayStr,
    };

    // 1. Ajouter au state local & Supabase
    onAddFeedback(newFeedback);

    // 2. Notification Telegram en arrière-plan
    setUploadStatus('Notification Telegram...');
    try {
      await sendTelegramFeedbackNotification({
        id: newFeedback.id,
        auteur: newFeedback.auteur_nom,
        email: newFeedback.auteur_email,
        page: newFeedback.page_concernee,
        type: newFeedback.type_retour,
        message: newFeedback.message,
        imageUrl: finalImageUrl,
        date: new Date().toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      });
    } catch (tErr) {
      console.warn('Telegram notification err:', tErr);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <MessageSquareDiff className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Soumettre un retour ou une suggestion</h2>
              <p className="text-xs text-slate-500">Transmis directement à l'équipe avec notification Telegram</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Votre nom / prénom *</label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Ilias, Sarah, Membre asso..."
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Adresse email (optionnel)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@ambitioncampus.fr"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Page ou section concernée</label>
              <input
                type="text"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                placeholder="Ex: Page d'accueil, Tableau CRM, Plaquette..."
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Type de retour</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Amélioration / Idée">Amélioration / Idée</option>
                <option value="Bug / Dysfonctionnement">Bug / Dysfonctionnement</option>
                <option value="Design / Ergonomie">Design / Ergonomie</option>
                <option value="Contenu / Texte">Contenu / Texte</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description détaillée du retour *</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Expliquez ce qui doit être modifié, ajusté ou ajouté..."
              className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-slate-900 focus:outline-none focus:border-blue-500 font-sans leading-relaxed"
            />
          </div>

          {/* Jointure d'image / capture */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Joindre une capture d'écran / image (optionnel)</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 hover:bg-slate-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="feedback-image-upload"
              />
              <label htmlFor="feedback-image-upload" className="cursor-pointer flex flex-col items-center gap-1.5">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="font-semibold text-blue-600 hover:underline text-xs">
                  {imageFile ? imageFile.name : "Cliquez pour sélectionner une image (PNG, JPG, WebP)"}
                </span>
                <span className="text-[10px] text-slate-400">Stockage sécurisé sur Supabase Storage</span>
              </label>
            </div>

            {imagePreview && (
              <div className="mt-2 relative inline-block border border-slate-200 rounded-lg overflow-hidden max-h-36">
                <img src={imagePreview} alt="Aperçu" className="h-32 object-contain bg-slate-900/5" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/70 text-white hover:bg-slate-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 font-medium transition cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-md font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le retour & Notifier Telegram'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
