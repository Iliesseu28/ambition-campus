import React from 'react';
import type { ActiveTab } from '../types';
import { 
  Building2, 
  FileText, 
  BarChart3, 
  Download, 
  RotateCcw, 
  Database, 
  Share2, 
  HelpCircle, 
  Search, 
  Grid, 
  Plus
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  counts: {
    entreprises: number;
    aap: number;
    contacts: number;
    relances: number;
  };
  onExport: () => void;
  onReset: () => void;
  onSync: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  counts,
  onExport,
  onReset,
  onSync,
  isSyncing,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      
      {/* Top Banner (Airtable Brand & Title Bar) */}
      <div className="px-4 py-2 bg-[#2D7FF9] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Airtable-like Logo icon */}
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center font-black text-xs text-white">
              ▲
            </div>
            <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
              <span>Ambition Campus</span>
              <span className="text-white/60 font-normal">/</span>
              <span className="text-white/90 font-medium">CRM & Financements 2026</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/20 hidden md:inline-block">
            Base Active · 103 Partenaires
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/15 hover:bg-white/25 text-white font-medium transition border border-white/20 disabled:opacity-50"
            title="Synchroniser avec Supabase"
          >
            <Database className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Sync...' : 'Sync Supabase'}</span>
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-[#2D7FF9] hover:bg-slate-50 font-semibold transition shadow-xs"
            title="Exporter la table au format Excel"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter</span>
          </button>

          <button
            onClick={onReset}
            className="p-1 rounded bg-white/10 hover:bg-rose-500 hover:text-white text-white/80 transition"
            title="Réinitialiser les données"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Airtable View Tabs Bar (Entreprises / AAP / Analytics) */}
      <div className="px-4 flex items-center justify-between border-b border-slate-200 bg-[#F4F5F7]">
        <div className="flex items-center gap-1 -mb-[1px]">
          
          {/* Tab 1 : Entreprises */}
          <button
            onClick={() => setActiveTab('entreprises')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'entreprises'
                ? 'border-[#2D7FF9] text-[#2D7FF9] bg-white rounded-t'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-t'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-emerald-600" />
            <span>🏢 Entreprises & Mécénat</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-normal">
              {counts.entreprises}
            </span>
          </button>

          {/* Tab 2 : AAP */}
          <button
            onClick={() => setActiveTab('aap')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'aap'
                ? 'border-[#2D7FF9] text-[#2D7FF9] bg-white rounded-t'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-t'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>📑 Appels à Projets & Fondations</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-normal">
              {counts.aap}
            </span>
          </button>

          {/* Tab 3 : Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-[#2D7FF9] text-[#2D7FF9] bg-white rounded-t'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-t'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
            <span>📊 Dashboard & Synthèse</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 hidden md:flex items-center gap-3">
          <span><b>{counts.contacts}</b> contacts référents</span>
          <span>•</span>
          <span><b>{counts.relances}</b> échanges enregistrés</span>
        </div>
      </div>

    </header>
  );
};
