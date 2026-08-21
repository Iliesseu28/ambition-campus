import React, { useState } from 'react';
import { X, Mail, Link2, Copy, Check, Sparkles, BookOpen, Send } from 'lucide-react';

interface TemplatesModalProps {
  onClose: () => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({ onClose }) => {
  const [activeChannel, setActiveChannel] = useState<'email' | 'linkedin'>('email');
  const [activeAngle, setActiveAngle] = useState<'impact' | 'partenaires' | 'talents'>('impact');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const emailTemplates = {
    impact: {
      title: "Variante A : Chiffres Clés, Mesure d'Impact & ROI Social",
      objet: "[Impact 2026] 1 € investi = 5,30 € d'impact direct / Ambition Campus",
      objetAlt: "500+ lycéens propulsés vers l'excellence : les chiffres 2026 d'Ambition Campus",
      body: `Bonjour [Prénom] [Nom],

Depuis 17 ans, notre association Ambition Campus (Loi 1901 / ESS, 100 % bénévole) prouve qu'un accompagnement méthodique brise le plafond de verre des lycéens issus de milieux populaires (QPV / 36 lycées REP partenaires).

Voici le bilan chiffré de notre promotion 2026 :
- 500+ lycéens accompagnés par 525 binômes de mentorat actifs.
- 21 admis à Sciences Po Paris, 17 à La Sorbonne, 13 en classes préparatoires d'élite (Henri IV, Saint-Louis, Lakanal).
- Social ROI certifié : 1 € investi = 5,30 € de valeur d'accompagnement terrain (coût net : 35 € / an par jeune).
- Note de satisfaction : 9,2 / 10 mesurée auprès des lycéens et des 75 mentors.

Pourquoi un partenariat avec [Nom Entreprise / Fondation] fait sens :
[Insérer angle de pitch personnalisé ou synergie métier]

Levier fiscal (Art. 238 bis CGI) : 60 % de déduction sur l'impôt sur les sociétés (un soutien de 10 000 € ne vous revient qu'à 4 000 € net).

Vous trouverez ci-joint notre fiche synthétique A4 résumant nos résultats et nos besoins de financement.

Seriez-vous disponible pour un court échange téléphonique de 15 minutes la semaine prochaine (ex: mardi ou jeudi matin) ?

Bien cordialement,

Ilias Khafague
Pôle Partenariats & Financements — Ambition Campus
ambitioncampus@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    },
    partenaires: {
      title: "Variante B : Preuve Sociale & Cercle des Mécènes Historiques",
      objet: "PwC, Deloitte, Banque de France : rejoindre les mécènes d'Ambition Campus",
      objetAlt: "[Mécénat 2026-2027] Devenir Mécène Partenaire Officiel d'Ambition Campus",
      body: `Bonjour [Prénom] [Nom],

Des institutions comme PwC, EY, Deloitte, KPMG ou la Banque de France collaborent déjà activement avec Ambition Campus en mobilisant leurs collaborateurs pour nos simulations d'oraux blancs.

Depuis 17 ans, notre association 100 % bénévole accompagne chaque année plus de 500 lycéens issus de 36 lycées partenaires (Paris/IDF, Reims, Poitiers, Menton) vers les filières sélectives du supérieur.

En 2026, cette mobilisation conjointe a permis des résultats historiques :
- 21 lycéens admis à Sciences Po Paris, 17 à La Sorbonne, 13 en prépas d'élite.
- Plus de 210 oraux blancs et jurys d'admission organisés sur l'année.
- 100 % de transparence : zéro frais administratif, l'intégralité des dons finance directement les actions terrain des jeunes.

Nous souhaitons aujourd'hui élargir notre cercle de partenaires et vous proposer d'associer [Nom Entreprise / Fondation] au parrainage officiel de notre promotion 2026-2027 (convention annuelle, visibilité RSE, jurys VIP et déduction fiscale de 60 % sur l'IS).

Vous trouverez en pièce jointe notre document de présentation A4.

Auriez-vous 15 minutes la semaine prochaine pour un premier échange d'introduction ?

Bien cordialement,

Ilias Khafague
Pôle Partenariats & Financements — Ambition Campus
ambitioncampus@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    },
    talents: {
      title: "Variante C : Marque Employeur, Diversité & Concours d'Éloquence",
      objet: "[Diversité & Talents] Ouvrir vos métiers aux lycéens d'excellence avec Ambition Campus",
      objetAlt: "Briser l'autocensure : parrainez la promo 2026-2027 d'Ambition Campus",
      body: `Bonjour [Prénom] [Nom],

L'autocensure reste aujourd'hui le premier obstacle qui prive les grandes entreprises de profils brillants issus des quartiers populaires.

Depuis 2008, Ambition Campus forme plus de 500 lycéens par an aux codes de l'excellence académique et professionnelle à travers :
- Des modules intensifs d'art oratoire et d'éloquence (méthode Ethos / Pathos / Logos).
- Des immersions professionnelles et découvertes des métiers de cadre et dirigeant.
- Un accompagnement individuel par 75 mentors engagés.

Les résultats 2026 :
- 21 admis à Sciences Po Paris, 17 à La Sorbonne (Droit/Éco), 13 en classes prépas d'élite.
- Une note de satisfaction de 9,2 / 10 par les élèves et leurs mentors.
- Coût net par élève : seulement 35 € / an grâce à notre modèle 100 % bénévole.

En soutenant Ambition Campus (déduction IS de 60 % via l'Art. 238 bis CGI), vous financez l'ascension sociale de ces jeunes tout en valorisant vos engagements RSE et votre marque employeur auprès de futurs talents.

Vous trouverez ci-joint notre plaquette synthétique A4.

Seriez-vous disponible pour un court échange de 15 minutes la semaine prochaine afin d'en discuter ?

Bien cordialement,

Ilias Khafague
Pôle Partenariats & Financements — Ambition Campus
ambitioncampus@gmail.com | 06 98 99 62 00
https://ambitioncampus.com`
    }
  };

  const linkedinTemplates = {
    impact: {
      title: "Approche Directe / InMail (Angle Chiffres & Impact)",
      body: `Bonjour [Prénom],

Je vous contacte car vos engagements RSE et d'inclusion chez [Nom Entreprise] résonnent avec la mission d'Ambition Campus.

Depuis 17 ans, nous accompagnons plus de 500 lycéens issus de 36 lycées REP vers les filières sélectives (21 admis à Sciences Po Paris, 17 à La Sorbonne en 2026).

Coût moyen : 35 € / an par élève, pour un Social ROI certifié de 1 € = 5,30 € d'impact.

Seriez-vous ouvert(e) à un court échange de 10 minutes la semaine prochaine pour découvrir notre modèle de parrainage mécénat ?

Bien à vous,
Ilias Khafague — Ambition Campus`
    },
    partenaires: {
      title: "Message de Connexion Réseau (300 caractères max)",
      body: `Bonjour [Prénom],
PwC, Deloitte et la Banque de France mobilisent déjà leurs équipes avec Ambition Campus pour coacher 500+ lycéens REP vers les grandes écoles.
Ravi d'échanger avec vous sur vos initiatives RSE chez [Nom Entreprise] !
Ilias (Ambition Campus)`
    },
    talents: {
      title: "Invitation Jury VIP / Mentorat Pro",
      body: `Bonjour [Prénom],

Chez Ambition Campus, nous préparons chaque année 500+ lycéens talentueux aux concours d'éloquence et aux oraux d'admission des grandes filières.

Nous serions ravis de convier [Nom Entreprise] à composer l'un de nos jurys d'oraux blancs ou à parrainer notre promotion 2026-2027.

Auriez-vous un moment la semaine prochaine pour en parler brièvement ?

Très belle journée,
Ilias Khafague`
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
              <span>Modèles Emails de Prospection (3 Variantes)</span>
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
            <span className="font-semibold text-slate-500 text-[11px]">Angle d'accroche :</span>
            <button
              onClick={() => setActiveAngle('impact')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'impact'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              1. Chiffres & ROI Social
            </button>
            <button
              onClick={() => setActiveAngle('partenaires')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'partenaires'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              2. Preuve Sociale (PwC, Deloitte...)
            </button>
            <button
              onClick={() => setActiveAngle('talents')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                activeAngle === 'talents'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              3. Marque Employeur & Éloquence
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
                      className="text-slate-400 hover:text-blue-600 ml-2"
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
                      className="text-slate-400 hover:text-blue-600 ml-2"
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
              <li><b>J0 (Prise de contact) :</b> Envoyer l'email principal avec la plaquette PDF Ambition Campus en pièce jointe et passer le statut du contact à <code>Contacté (J0)</code>.</li>
              <li><b>J+7 (Relance 1) :</b> Si pas de réponse sous 7 jours, envoyer une relance courte ou une approche LinkedIn personnalisée.</li>
              <li><b>J+15 (Relance 2) :</b> Dernière relance avec proposition d'invitation jury ou d'échange téléphonique de 10 min.</li>
              <li><b>Mise à jour :</b> Toujours consigner la date et le canal via le bouton <b>« Relancer »</b> de la ligne correspondante.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
