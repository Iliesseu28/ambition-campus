import React, { useState } from 'react';
import { Contact, Relance } from '../types';
import { X, Send, Calendar, Clock, MessageSquare, Plus, Sparkles, Check } from 'lucide-react';

interface RelanceModalProps {
  contact: Contact;
  entityName: string;
  pitchAngle?: string;
  relances: Relance[];
  onClose: () => void;
  onAddRelance: (relance: Omit<Relance, 'id'>) => void;
  onUpdateContactStatut: (contactId: string, statut: string, dateContact: string) => void;
}

export const RelanceModal: React.FC<RelanceModalProps> = ({
  contact,
  entityName,
  pitchAngle,
  relances,
  onClose,
  onAddRelance,
  onUpdateContactStatut,
}) => {
  const [canal, setCanal] = useState<Relance['type_canal']>('Email');
  const [message, setMessage] = useState('');
  const [prochaineDate, setProchaineDate] = useState('');
  const [nouveauStatut, setNouveauStatut] = useState(contact.statut);
  const [copied, setCopied] = useState(false);

  const contactRelances = relances.filter(
    (r) => r.contact_id === contact.id || (r.target_id === contact.target_id && !r.contact_id)
  );

  const handleGeneratePitch = () => {
    const generated = `Bonjour ${contact.nom},\n\nJe me permets de vous contacter au sujet d'Ambition Campus, association loi 1901 accompagnant plus de 500 lycéens issus de 36 lycées REP vers les filières d'excellence (Sciences Po Paris, CPGE, La Sorbonne).\n\n${pitchAngle ? `Concernant ${entityName} : ${pitchAngle}\n\n` : ''}Seriez-vous disponible pour un court échange de 15 minutes la semaine prochaine afin d'échanger sur les modalités de partenariat pour la promotion 2026-2027 ?\n\nBien cordialement,\nL'équipe Ambition Campus\nambitioncampus@gmail.com | 06 98 99 62 00`;
    setMessage(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];

    onAddRelance({
      target_type: contact.target_type,
      target_id: contact.target_id,
      contact_id: contact.id,
      date_relance: todayStr,
      type_canal: canal,
      message,
      prochaine_date: prochaineDate || null,
      auteur: 'Équipe Ambition Campus',
      statut_suite: nouveauStatut,
    });

    onUpdateContactStatut(contact.id, nouveauStatut, todayStr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{contact.nom}</h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                {contact.poste || 'Référent'}
              </span>
            </div>
            <p className="text-xs text-amber-400 font-medium">
              🏢 {entityName} · <span className="text-slate-400">{contact.email || 'Email non renseigné'}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Historique des relances */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Historique des échanges ({contactRelances.length})
            </h3>
            {contactRelances.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center">
                <p className="text-xs text-slate-500">Aucun échange ou relance enregistré pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {contactRelances.map((r) => (
                  <div key={r.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-semibold">
                          {r.type_canal}
                        </span>
                        <span className="text-slate-300 font-medium">{r.date_relance}</span>
                      </div>
                      {r.prochaine_date && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" /> Prochaine : {r.prochaine_date}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 whitespace-pre-line bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                      {r.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulaire Nouvelle Relance */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                Enregistrer un nouvel échange / relance
              </h3>
              
              <button
                type="button"
                onClick={handleGeneratePitch}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Générer proposition IA</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Canal utilisé</label>
                <select
                  value={canal}
                  onChange={(e) => setCanal(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Email">📧 Email</option>
                  <option value="LinkedIn">💼 LinkedIn</option>
                  <option value="Téléphone">📞 Téléphone</option>
                  <option value="Visio">💻 Visio / Rendez-vous</option>
                  <option value="Courrier">✉️ Courrier officiel</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Nouveau statut du contact</label>
                <select
                  value={nouveauStatut}
                  onChange={(e) => setNouveauStatut(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="À contacter">🟡 À contacter</option>
                  <option value="Contacté">🔵 Contacté (J0)</option>
                  <option value="Relance 1">🟠 Relance 1 (J+7)</option>
                  <option value="Relance 2">🔴 Relance 2 (J+15)</option>
                  <option value="Échange en cours">💬 Échange en cours</option>
                  <option value="Intéressé / RDV">🟢 Intéressé / RDV obtenu</option>
                  <option value="Refus / Standby">⚪ Refus / Standby</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-medium text-slate-400">Message envoyé ou Notes de l'échange</label>
                {message && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3" /> : null}
                    {copied ? 'Copié !' : 'Copier le texte'}
                  </button>
                )}
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Rédigez ou collez le message envoyé, ou résumez le retour téléphonique..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono leading-relaxed"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Date de prochaine relance (optionnel)</label>
                <input
                  type="date"
                  value={prochaineDate}
                  onChange={(e) => setProchaineDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enregistrer l'échange</span>
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
