import React from 'react';
import type { ActiveTab } from '../types';
import { 
  Building2, 
  FileText, 
  BarChart3, 
  Download, 
  RotateCcw, 
  Database,
  MessageSquareDiff,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  counts: {
    entreprises: number;
    aap: number;
    contacts: number;
    relances: number;
    feedbacks: number;
  };
  onExport: () => void;
  onReset: () => void;
  onSync: () => void;
  onOpenTemplates: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  counts,
  onExport,
  onReset,
  onSync,
  onOpenTemplates,
  isSyncing,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      
      {/* Top Navbar */}
      <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-xs">
              AC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight text-white">Ambition Campus</h1>
                <span className="text-slate-500 font-light">|</span>
                <span className="text-slate-300 font-medium text-xs tracking-wide">Direction des Financements & Partenariats</span>
              </div>
              <p className="text-[11px] text-slate-400">Plateforme de levée de fonds · Égalité des chances</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          
          {/* Guide & Modèles Email/LinkedIn */}
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white font-semibold transition border border-slate-700 cursor-pointer"
            title="Voir les modèles de mails et messages LinkedIn"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Guide & Modèles (Email / LinkedIn)</span>
          </button>

          {/* Sync Supabase */}
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition border border-blue-500 shadow-xs disabled:opacity-50 cursor-pointer"
            title="Synchroniser avec la base Supabase"
          >
            <Database className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronisation...' : 'Synchroniser Supabase'}</span>
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition border border-slate-700 cursor-pointer"
            title="Exporter les données au format Excel"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter Excel</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-rose-900/60 hover:text-rose-300 text-slate-400 transition border border-slate-700 cursor-pointer"
            title="Réinitialiser les données par défaut"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Large Navigation Tabs Section (4 Sections) */}
      <div className="px-6 bg-[#F8F9FA] border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <nav className="flex items-center gap-2 -mb-[1px] overflow-x-auto">
          
          {/* Section 1 : Entreprises */}
          <button
            onClick={() => setActiveTab('entreprises')}
            className={`flex items-center gap-2.5 px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'entreprises'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === 'entreprises' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Entreprises & Mécénat Privé</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'entreprises' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-200 text-slate-600'
            }`}>
              {counts.entreprises}
            </span>
          </button>

          {/* Section 2 : AAP & Fondations */}
          <button
            onClick={() => setActiveTab('aap')}
            className={`flex items-center gap-2.5 px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'aap'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'aap' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Fondations & Appels à Projets</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'aap' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-200 text-slate-600'
            }`}>
              {counts.aap}
            </span>
          </button>

          {/* Section 3 : Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2.5 px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activeTab === 'analytics' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Tableau de Bord & Métriques</span>
          </button>

          {/* Section 4 : Retours Site */}
          <button
            onClick={() => setActiveTab('retours')}
            className={`flex items-center gap-2.5 px-5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'retours'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <MessageSquareDiff className={`w-4 h-4 ${activeTab === 'retours' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Retours Site & Suggestions</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'retours' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-100 text-amber-800'
            }`}>
              {counts.feedbacks}
            </span>
          </button>

        </nav>

        <div className="text-xs text-slate-500 font-medium py-2 hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{counts.contacts} contacts</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>{counts.feedbacks} retours utilisateurs</span>
          </div>
        </div>
      </div>

    </header>
  );
};
