import React, { useState } from 'react';
import { X, Mail, Link2, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

interface TemplatesModalProps {
  onClose: () => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({ onClose }) => {
  const [activeChannel, setActiveChannel] = useState<'email' | 'linkedin'>('email');
  const [activeAngle, setActiveAngle] = useState<'generique' | 'partenariat' | 'preuve_sociale' | 'fondation'>('generique');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const emailTemplates = {
    generique: {
      title: "Message générique : Prise de contact à froid (Recommandé)",
      objet: "Proposition de partenariat 2026-2027 avec Ambition Campus",
      objetAlt: "[Nom Entreprise] × Ambition Campus : 15 minutes pour un partenariat 2026-2027",
      body: `Bonjour [Prénom] [Nom],

Je vous contacte au nom d'Ambition Campus pour vous proposer un temps d'échange sur la mise en place d'un partenariat pour l'année 2026-2027.

Notre association mobilise déjà des partenaires de référence comme PwC, Deloitte, EY ou la Banque de France, dont les collaborateurs s'engagent à nos côtés lors de nos sessions d'oraux blancs et d'ateliers d'éloquence.

Chaque année, nous accompagnons bénévolement plus de 500 lycéens issus de l'éducation prioritaire vers la réussite dans l'enseignement supérieur (21 admis à Sciences Po Paris, 17 à La Sorbonne, 13 en classes prépas en 2026).

Nous aimerions beaucoup associer [Nom Entreprise] à cette dynamique pour :
1. Ouvrir vos métiers à des lycéens motivés.
2. Permettre à vos collaborateurs de s'impliquer dans une action concrète et valorisante.
3. Construire une convention de mécénat sur-mesure pour votre structure.

Notre plaquette de présentation est jointe à ce message pour vous donner une vision d'ensemble.

Auriez-vous 15 minutes à nous accorder ces prochains jours pour que nous puissions échanger ensemble à ce sujet ?

Bien cordialement,

L'équipe Ambition Campus
Pôle Partenariats & Financements
ambitioncampus.finance@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    },
    partenariat: {
      title: "Variante 1 : Prise de contact Partenariat & Synergie Métier",
      objet: "Prise de contact / Proposition de partenariat mécénat avec Ambition Campus",
      objetAlt: "[Partenariat 2026] Échanger avec Ambition Campus & [Nom Entreprise]",
      body: `Bonjour [Prénom] [Nom],

Je me permets de prendre contact avec vous aujourd'hui dans l’optique d’étudier la mise en place d'un partenariat entre [Nom Entreprise / Organisation] et notre association Ambition Campus.

Depuis 17 ans, notre association d'intérêt général (100 % bénévole) œuvre pour l'égalité des chances en accompagnant chaque année plus de 500 lycéens issus de quartiers prioritaires (36 lycées REP partenaires) pour les aider à surmonter l'autocensure et intégrer les filières sélectives de l'enseignement supérieur (Sciences Po Paris, filières d'excellence universitaire, CPGE, grandes écoles).

En découvrant vos engagements RSE et vos initiatives en faveur de l'inclusion, nous avons identifié de fortes synergies entre nos missions respectives :
- Mobilisation de vos collaborateurs : Participation de vos équipes à nos jurys d'oraux blancs et simulations d'entretiens.
- Parrainage & Mécénat : Soutien direct à l'accompagnement des jeunes (bénéficiant du cadre fiscal avantageux du mécénat d'entreprise avec 60 % de déduction sur l'IS).

Vous trouverez en pièce jointe notre document de présentation synthétique résumant nos actions terrain et nos résultats.

Seriez-vous disponible pour un court échange téléphonique ou visio de 15 minutes la semaine prochaine (ex : mardi ou jeudi) afin que nous puissions faire connaissance et en discuter ?

En vous remerciant pour votre écoute et votre attention, je vous souhaite une excellente journée.

Bien cordialement,

L'équipe Ambition Campus
Pôle Partenariats & Financements
ambitioncampus@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    },
    preuve_sociale: {
      title: "Variante 2 : Preuve Sociale & Invitation Cercle Partenaires",
      objet: "Proposition d'échange & Partenariat avec Ambition Campus",
      objetAlt: "PwC, Deloitte, Banque de France : associer [Nom Entreprise] à Ambition Campus",
      body: `Bonjour [Prénom] [Nom],

Je vous contacte au nom d'Ambition Campus avec le souhait d'échanger avec vous sur la mise en place d'un partenariat pour l'année 2026-2027.

Notre association mobilise déjà des partenaires de référence comme PwC, Deloitte, EY ou la Banque de France, dont les collaborateurs s'engagent à nos côtés lors de nos sessions d'oraux blancs et d'ateliers d'éloquence.

Chaque année, nous accompagnons bénévolement plus de 500 lycéens issus de l'éducation prioritaire vers la réussite dans l'enseignement supérieur (21 admis à Sciences Po Paris, 17 à La Sorbonne, 13 en classes prépas en 2026).

Nous aimerions beaucoup associer [Nom Entreprise] à cette dynamique pour :
1. Ouvrir vos métiers à des lycéens méritants et motivés.
2. Permettre à vos collaborateurs de s'impliquer dans une action concrète et valorisante.
3. Construire une convention de mécénat sur-mesure pour votre structure.

Notre plaquette de présentation A4 est jointe à ce message pour vous donner une vision d'ensemble.

Auriez-vous 15 minutes à nous accorder ces prochains jours pour que nous puissions échanger ensemble à ce sujet ?

Bien cordialement,

L'équipe Ambition Campus
Pôle Partenariats & Financements
ambitioncampus@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    },
    fondation: {
      title: "Variante 3 : Orientation Fondations & Appels à Projets",
      objet: "Présentation d'Ambition Campus & Demande d'échange partenarial",
      objetAlt: "[Égalité des chances] Proposition de collaboration avec la [Nom Fondation]",
      body: `Bonjour [Prénom] [Nom],

Je prends attache avec vous dans l'optique d'un potentiel partenariat entre la [Nom de la Fondation] et l'association Ambition Campus.

En consultant les priorités philanthropiques de votre fondation (notamment autour de l'éducation, de la jeunesse et de l'égalité des chances), notre action terrain auprès de plus de 500 lycéens issus de 36 lycées REP fait particulièrement écho à vos critères d'intervention.

Notre démarche vise à donner aux jeunes issus de quartiers prioritaires les méthodes académiques, la maîtrise de l'art oratoire et le mentorat individuel indispensables pour réussir les filières les plus sélectives.

Vous trouverez ci-joint notre dossier de présentation résumant notre modèle associatif 100 % bénévole, notre coût d'intervention maîtrisé (35 € / an par jeune) et notre bilan d'admissions 2026.

Serait-il possible de convenir d'un court entretien téléphonique de 15 minutes afin de vous présenter notre projet plus en détail et recueillir vos conseils sur les modalités de collaboration ?

En vous remerciant chaleureusement pour votre temps et votre intérêt.

Très cordialement,

L'équipe Ambition Campus
Pôle Partenariats & Financements
ambitioncampus@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    }
  };

  const linkedinTemplates = {
    generique: {
      title: "Message générique à froid (Message direct / InMail)",
      body: `Bonjour [Prénom],

Je vous contacte au nom d'Ambition Campus pour vous proposer un temps d'échange sur un partenariat 2026-2027 entre [Nom Entreprise] et notre association.

PwC, Deloitte, EY ou la Banque de France mobilisent déjà leurs collaborateurs à nos côtés (jurys d'oraux blancs, ateliers d'éloquence) pour accompagner chaque année plus de 500 lycéens de l'éducation prioritaire vers l'enseignement supérieur.

Auriez-vous 15 minutes ces prochains jours pour en discuter ?

Très belle journée,
L'équipe Ambition Campus`
    },
    partenariat: {
      title: "Message direct / InMail (Chaleureux & Professionnel)",
      body: `Bonjour [Prénom],

Je me permets de vous contacter dans l'optique d'étudier un potentiel partenariat entre [Nom Entreprise] et notre association Ambition Campus.

Depuis 17 ans, nous accompagnons bénévolement plus de 500 lycéens issus de milieux populaires (36 lycées REP) vers les filières sélectives (Sciences Po Paris, Sorbonne, CPGE).

Des structures comme PwC ou Deloitte mobilisent déjà leurs équipes avec nous lors de nos oraux blancs. Seriez-vous ouvert(e) à un court échange de 10-15 minutes la semaine prochaine pour faire connaissance et voir si une collaboration ferait sens pour vous ?

Très belle journée,
L'équipe Ambition Campus`
    },
    preuve_sociale: {
      title: "Note de demande de connexion (Moins de 300 caractères)",
      body: `Bonjour [Prénom], je vous contacte pour échanger sur un partenariat entre [Nom Entreprise] et l'association Ambition Campus (500+ lycéens REP coachés vers les grandes écoles). Ravi de vous ajouter à mon réseau pour en discuter ! L'équipe Ambition Campus`
    },
    fondation: {
      title: "Invitation Jury VIP & Découverte Métiers",
      body: `Bonjour [Prénom],

Chez Ambition Campus, nous préparons chaque année plus de 500 lycéens talentueux aux concours d'éloquence et aux oraux d'admission des grandes filières.

Dans le cadre de nos actions 2026-2027, nous serions ravis de convier [Nom Entreprise] à composer l'un de nos jurys d'oraux blancs ou à parrainer notre promotion.

Auriez-vous un moment la semaine prochaine pour en parler brièvement lors d'un court échange ?

Très belle journée,
L'équipe Ambition Campus`
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Guide & Modèles de Prospection Officiels</h2>
              <p className="text-xs text-slate-500">Templates Email & LinkedIn prêts à l'envoi pour l'équipe Ambition Campus</p>
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
          
          {/* Channel Selector */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveChannel('email')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs transition cursor-pointer ${
                activeChannel === 'email'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Modèles Emails de Prospection (4 Variantes)</span>
            </button>

            <button
              onClick={() => setActiveChannel('linkedin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs transition cursor-pointer ${
                activeChannel === 'linkedin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Modèles Messages & Approches LinkedIn</span>
            </button>
          </div>

          {/* Angle Filter */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 text-[11px]">Angle d'approche :</span>
            <button
              onClick={() => setActiveAngle('generique')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'generique'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Message générique à froid (Recommandé)
            </button>
            <button
              onClick={() => setActiveAngle('partenariat')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'partenariat'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              1. Partenariat & Synergie
            </button>
            <button
              onClick={() => setActiveAngle('preuve_sociale')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'preuve_sociale'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              2. Preuve Sociale (PwC, Deloitte, BDF...)
            </button>
            <button
              onClick={() => setActiveAngle('fondation')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'fondation'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              3. Fondations & Appels à Projets
            </button>
          </div>

          {/* Active Content */}
          {activeChannel === 'email' ? (
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    Modèle d'email officiel
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{emailTemplates[activeAngle].title}</h3>
                </div>
                <button
                  onClick={() => handleCopy(emailTemplates[activeAngle].body, `email_${activeAngle}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-blue-700 hover:bg-blue-50 border border-slate-300 font-semibold shadow-xs transition cursor-pointer"
                >
                  {copiedId === `email_${activeAngle}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `email_${activeAngle}` ? 'Copié !' : 'Copier le template'}</span>
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Objet principal recommandé :</span>
                  <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-800 flex justify-between items-center">
                    <span>{emailTemplates[activeAngle].objet}</span>
                    <button
                      onClick={() => handleCopy(emailTemplates[activeAngle].objet, `obj1_${activeAngle}`)}
                      className="text-slate-400 hover:text-blue-600 ml-2 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Objet alternatif (A/B testing) :</span>
                  <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-800 flex justify-between items-center">
                    <span>{emailTemplates[activeAngle].objetAlt}</span>
                    <button
                      onClick={() => handleCopy(emailTemplates[activeAngle].objetAlt, `obj2_${activeAngle}`)}
                      className="text-slate-400 hover:text-blue-600 ml-2 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Corps du message :</span>
                  <pre className="p-4 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {emailTemplates[activeAngle].body}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    Modèle LinkedIn / InMail
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{linkedinTemplates[activeAngle].title}</h3>
                </div>
                <button
                  onClick={() => handleCopy(linkedinTemplates[activeAngle].body, `li_${activeAngle}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-blue-700 hover:bg-blue-50 border border-slate-300 font-semibold shadow-xs transition cursor-pointer"
                >
                  {copiedId === `li_${activeAngle}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `li_${activeAngle}` ? 'Copié !' : 'Copier le message'}</span>
                </button>
              </div>

              <div>
                <pre className="p-4 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {linkedinTemplates[activeAngle].body}
                </pre>
              </div>
            </div>
          )}

          {/* Guide d'utilisation pour l'équipe */}
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 space-y-2">
            <h4 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Protocole d'envoi & bonnes pratiques pour l'équipe</span>
            </h4>
            <ul className="list-disc list-inside text-blue-950 text-[11px] space-y-1">
              <li><b>J0 (Prise de contact) :</b> Envoyer le message générique de prise de contact à froid avec la plaquette PDF Ambition Campus en pièce jointe et passer le statut du contact à <code>Contacté (J0)</code>.</li>
              <li><b>J+7 (Relance 1) :</b> Si pas de réponse sous 7 jours, envoyer une relance courte ou une approche LinkedIn personnalisée.</li>
              <li><b>J+15 (Relance 2) :</b> Dernière relance avec proposition d'invitation jury ou d'échange téléphonique de 10-15 min.</li>
              <li><b>Mise à jour :</b> Toujours consigner la date et le canal via le bouton <b>« Relancer »</b> de la ligne correspondante.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
