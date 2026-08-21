import React from 'react';
import { Entreprise, AppelProjet, Contact, Relance } from '../types';
import { Building2, FileText, Users, MessageSquare, TrendingUp, Award, Calendar, CheckCircle2 } from 'lucide-react';

interface AnalyticsViewProps {
  entreprises: Entreprise[];
  appelsProjets: AppelProjet[];
  contacts: Contact[];
  relances: Relance[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  entreprises,
  appelsProjets,
  contacts,
  relances,
}) => {
  // Calculs KPIs
  const totalOrganisations = entreprises.length + appelsProjets.length;
  const totalContacts = contacts.length;
  const totalRelances = relances.length;

  const contactsContactes = contacts.filter((c) => c.statut !== 'À contacter').length;
  const contactsInteresses = contacts.filter((c) => c.statut.includes('Intéressé') || c.statut.includes('RDV')).length;

  // Calcul du taux de conversion
  const conversionRate = contactsContactes > 0 ? ((contactsInteresses / contactsContactes) * 100).toFixed(1) : '0';

  // Statuts AAP
  const aapDeposes = appelsProjets.filter((a) => a.statut_dossier === 'Déposé' || a.statut_dossier === 'Lauréat / Accord').length;

  return (
    <div className="space-y-6">
      
      {/* 4 Cartes de Synthèse Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Partenaires Qualifiés</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{totalOrganisations}</div>
          <p className="text-xs text-slate-400 mt-1">
            {entreprises.length} Entreprises · {appelsProjets.length} Fondations/AAP
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Réseau Contacts</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{totalContacts}</div>
          <p className="text-xs text-sky-400 mt-1">
            {contactsContactes} sollicités ({((contactsContactes / (totalContacts || 1)) * 100).toFixed(0)}%)
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Échanges & Relances</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{totalRelances}</div>
          <p className="text-xs text-emerald-400 mt-1">
            {contactsInteresses} pistes chaudes / RDV
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Potentiel Financier</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">85k€ - 130k€</div>
          <p className="text-xs text-purple-400 mt-1">
            Objectif annuel Ambition Campus
          </p>
        </div>

      </div>

      {/* Détail de l'avancement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Avancement Mécénat Entreprises */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Tunnel Prospection Entreprises (48 cibles)</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Pilier 2</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Tier 1 - Partenaires Jurys Historiques (PwC, EY, Deloitte, KPMG, etc.)</span>
                <span className="font-bold text-amber-400">12 cibles</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-full rounded-full w-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Tier 2 - Banques, Tech, Luxe, Cabinets d'Avocats</span>
                <span className="font-bold text-sky-400">24 cibles</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-sky-400 h-full rounded-full w-3/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Tier 3 - PME / ETI Territoriales</span>
                <span className="font-bold text-slate-400">8 cibles</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-slate-600 h-full rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Avancement Fondations & AAP */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Avancement Appels à Projets (55 fondations)</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Pilier 3</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span className="text-slate-300">Pistes Chaudes / Emails Prêts (Bolloré, PwC, etc.)</span>
              </div>
              <span className="font-bold text-white">20 fondations</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                <span className="text-slate-300">Grands Donateurs (BNP, Total, SocGen, etc.)</span>
              </div>
              <span className="font-bold text-white">22 fondations</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="text-slate-300">Fondations Thématiques & Territoriales</span>
              </div>
              <span className="font-bold text-white">13 fondations</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
