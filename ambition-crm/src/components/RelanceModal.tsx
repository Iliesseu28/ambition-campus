import React, { useState } from 'react';
import type { Contact, Relance } from '../types';
import { X, Send, Calendar, Clock, MessageSquare, Sparkles, Check, User } from 'lucide-react';

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
    const generated = `Bonjour ${contact.nom},\n\nJe me permets de prendre contact avec vous aujourd'hui dans l'optique d'étudier la mise en place d'un partenariat entre ${entityName} et notre association Ambition Campus.\n\nDepuis 17 ans, notre association d'intérêt général (100 % bénévole) accompagne chaque année plus de 500 lycéens issus de 36 lycées REP pour les aider à surmonter l'autocensure et intégrer les filières d'excellence (Sciences Po Paris, CPGE, La Sorbonne).\n\n${pitchAngle ? `Concernant ${entityName} : ${pitchAngle}\n\n` : ''}Seriez-vous disponible pour un court échange téléphonique ou visio de 15 minutes la semaine prochaine afin que nous puissions faire connaissance et en discuter ?\n\nBien cordialement,\nL'équipe Ambition Campus\nPôle Partenariats & Financements\nambitioncampus@gmail.com | 06 98 99 62 00`;
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
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{contact.nom}</h2>
              <p className="text-xs text-slate-500">
                Organisme : <span className="font-semibold text-slate-800">{entityName}</span> · {contact.poste || 'Référent'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* History */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Historique des échanges ({contactRelances.length})</span>
            </h3>
            {contactRelances.length === 0 ? (
              <div className="p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 text-center">
                <p className="text-slate-500">Aucun échange consigné pour ce contact.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {contactRelances.map((r) => (
                  <div key={r.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-[10px]">
                          {r.type_canal}
                        </span>
                        <span className="text-slate-700 font-medium">{r.date_relance}</span>
                      </div>
                      {r.prochaine_date && (
                        <span className="text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600" /> Prochaine : {r.prochaine_date}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 whitespace-pre-line bg-white p-2.5 rounded border border-slate-200 font-mono text-[11px] leading-relaxed">
                      {r.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Consigner une nouvelle relance / note</span>
              </h3>
              
              <button
                type="button"
                onClick={handleGeneratePitch}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Générer proposition IA</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Canal utilisé</label>
                <select
                  value={canal}
                  onChange={(e) => setCanal(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Email">Email</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Téléphone">Téléphone</option>
                  <option value="Visio">Visio / Rendez-vous</option>
                  <option value="Courrier">Courrier officiel</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Nouveau statut</label>
                <select
                  value={nouveauStatut}
                  onChange={(e) => setNouveauStatut(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="À contacter">À contacter</option>
                  <option value="Contacté">Contacté (J0)</option>
                  <option value="Relance 1">Relance 1 (J+7)</option>
                  <option value="Relance 2">Relance 2 (J+15)</option>
                  <option value="Échange en cours">Échange en cours</option>
                  <option value="Intéressé / RDV">Intéressé / RDV</option>
                  <option value="Refus / Standby">Refus / Standby</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-medium text-slate-700">Contenu du message ou compte-rendu</label>
                {message && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copied ? <Check className="w-3 h-3" /> : null}
                    {copied ? 'Copié' : 'Copier le message'}
                  </button>
                )}
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Rédigez le message ou notez les points clés..."
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-md p-2.5 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-[11px] leading-relaxed"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block font-medium text-slate-700 mb-1">Prochaine relance (optionnel)</label>
                <input
                  type="date"
                  value={prochaineDate}
                  onChange={(e) => setProchaineDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
