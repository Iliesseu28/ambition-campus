import React from 'react';
import type { ActiveTab } from '../types';
import { Building2, FileText, BarChart3, Download, RotateCcw, Database } from 'lucide-react';

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
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold text-slate-950 text-xl">
            AC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Ambition Campus</h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                CRM & Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Plateforme collaborative de levée de fonds & mécénat (500+ lycéens · 36 REP)
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('entreprises')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'entreprises'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>🏢 Entreprises & Mécénat</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'entreprises' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}>
              {counts.entreprises}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('aap')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'aap'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📑 Appels à Projets & Fondations</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'aap' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}>
              {counts.aap}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📊 Métriques & Dashboard</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition shadow-sm disabled:opacity-50"
            title="Synchroniser avec le backend Supabase en temps réel"
          >
            <Database className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronisation...' : 'Sync Supabase'}</span>
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Exporter les données au format Excel / CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter</span>
          </button>
          
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition"
            title="Réinitialiser avec les 103 partenaires qualifiés par défaut"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
