import React from 'react';
import type { Entreprise, AppelProjet, Contact, Relance } from '../types';
import { Building2, FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';

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
  const totalOrganisations = entreprises.length + appelsProjets.length;
  const totalContacts = contacts.length;
  const totalRelances = relances.length;

  const contactsContactes = contacts.filter((c) => c.statut !== 'À contacter').length;
  const contactsInteresses = contacts.filter((c) => c.statut.includes('Intéressé') || c.statut.includes('RDV')).length;

  return (
    <div className="space-y-6">
      
      {/* KPI Cards (Airtable Clean Dashboard Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Partenaires Qualifiés</span>
            <div className="p-1.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalOrganisations}</div>
          <p className="text-xs text-slate-500 mt-1">
            {entreprises.length} Entreprises · {appelsProjets.length} Fondations
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Base Contacts</span>
            <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalContacts}</div>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            {contactsContactes} sollicités ({((contactsContactes / (totalContacts || 1)) * 100).toFixed(0)}%)
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Échanges & Relances</span>
            <div className="p-1.5 rounded bg-amber-50 text-amber-600 border border-amber-100">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalRelances}</div>
          <p className="text-xs text-amber-700 font-medium mt-1">
            {contactsInteresses} pistes chaudes / RDV
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Objectif Annuel</span>
            <div className="p-1.5 rounded bg-purple-50 text-purple-600 border border-purple-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">85 000 € - 130 000 €</div>
          <p className="text-xs text-purple-600 font-medium mt-1">
            Coût moyen : 35 € / lycéen / an
          </p>
        </div>

      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Segmentation Entreprises (48 cibles)</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Pilier 2</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-medium">
                <span>Tier 1 - Partenaires Jurys Historiques (PwC, EY, Deloitte, KPMG...)</span>
                <span className="font-bold text-blue-600">12 cibles</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-medium">
                <span>Tier 2 - Banques, Tech, Luxe, Cabinets d'Avocats</span>
                <span className="font-bold text-emerald-600">24 cibles</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-3/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-medium">
                <span>Tier 3 - PME / ETI Territoriales</span>
                <span className="font-bold text-slate-500">8 cibles</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm">Segmentation Fondations & AAP (55 cibles)</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Pilier 3</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-slate-700 font-medium">Pistes Chaudes / Emails Prêts (Bolloré, PwC...)</span>
              </div>
              <span className="font-bold text-slate-900">20 fondations</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-slate-700 font-medium">Grands Donateurs (BNP, Total, SocGen...)</span>
              </div>
              <span className="font-bold text-slate-900">22 fondations</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-slate-700 font-medium">Fondations Thématiques & Territoriales</span>
              </div>
              <span className="font-bold text-slate-900">13 fondations</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
