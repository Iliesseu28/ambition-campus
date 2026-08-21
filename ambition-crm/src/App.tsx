import React, { useState, useEffect, useRef } from 'react';
import type { ActiveTab, Contact, Relance, Entreprise, AppelProjet, CustomField, Feedback } from './types';
import { loadData, saveData, resetToDefault } from './lib/storage';
import type { CRMData } from './lib/storage';
import { syncWithSupabase } from './lib/sync';
import { Header } from './components/Header';
import { EntreprisesTable } from './components/EntreprisesTable';
import { AppelsProjetsTable } from './components/AppelsProjetsTable';
import { AnalyticsView } from './components/AnalyticsView';
import { FeedbacksTable } from './components/FeedbacksTable';
import { RelanceModal } from './components/RelanceModal';
import { AddContactModal } from './components/AddContactModal';
import { AddOrganisationModal } from './components/AddOrganisationModal';
import { AddColumnModal } from './components/AddColumnModal';
import { AddFeedbackModal } from './components/AddFeedbackModal';
import { TemplatesModal } from './components/TemplatesModal';
import { Check, Save, Cloud, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';

export function App() {
  const [data, setData] = useState<CRMData>(loadData);
  const [activeTab, setActiveTab] = useState<ActiveTab>('entreprises');
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSyncStatus, setAutoSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const debounceTimerRef = useRef<any | null>(null);

  // Modals state
  const [activeRelanceContact, setActiveRelanceContact] = useState<{
    contact: Contact;
    entityName: string;
    pitchAngle?: string;
  } | null>(null);

  const [activeAddContactEntity, setActiveAddContactEntity] = useState<{
    type: 'entreprise' | 'aap';
    id: string;
    nom: string;
  } | null>(null);

  const [showAddOrganisationModal, setShowAddOrganisationModal] = useState<boolean>(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState<boolean>(false);
  const [showAddFeedbackModal, setShowAddFeedbackModal] = useState<boolean>(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState<boolean>(false);

  // Auto-Sync Debounced Mechanism (Enregistre et Synchronise automatiquement à chaque changement)
  useEffect(() => {
    saveData(data);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setAutoSyncStatus('syncing');

    debounceTimerRef.current = setTimeout(async () => {
      const res = await syncWithSupabase(data);
      if (res.success) {
        setAutoSyncStatus('synced');
      } else {
        setAutoSyncStatus('error');
      }
    }, 1500);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [data]);

  // Inline Cell Editing handler
  const handleCellEdit = (type: 'entreprise' | 'aap' | 'contact' | 'feedback', id: string, field: string, value: string) => {
    setData((prev) => {
      let updated = { ...prev };
      if (type === 'entreprise') {
        updated.entreprises = prev.entreprises.map((e) => {
          if (e.id === id) {
            if (field in e) {
              return { ...e, [field]: value };
            } else {
              return { ...e, custom_values: { ...(e.custom_values || {}), [field]: value } };
            }
          }
          return e;
        });
      } else if (type === 'aap') {
        updated.appels_projets = prev.appels_projets.map((a) => {
          if (a.id === id) {
            if (field in a) {
              return { ...a, [field]: value };
            } else {
              return { ...a, custom_values: { ...(a.custom_values || {}), [field]: value } };
            }
          }
          return a;
        });
      } else if (type === 'contact') {
        updated.contacts = prev.contacts.map((c) => {
          if (c.id === id) {
            if (field in c) {
              return { ...c, [field]: value };
            } else {
              return { ...c, custom_values: { ...(c.custom_values || {}), [field]: value } };
            }
          }
          return c;
        });
      } else if (type === 'feedback') {
        updated.feedbacks = prev.feedbacks.map((f) => (f.id === id ? { ...f, [field]: value } : f));
      }
      return updated;
    });

    setHasUnsavedChanges(true);
  };

  const handleSaveAll = async () => {
    saveData(data);
    setIsSyncing(true);
    const res = await syncWithSupabase(data);
    setIsSyncing(false);
    setHasUnsavedChanges(false);
    setSaveSuccessMessage(true);
    setTimeout(() => {
      setSaveSuccessMessage(false);
    }, 3000);
  };

  const handleAddRelance = (newRelance: Omit<Relance, 'id'>) => {
    const relance: Relance = {
      ...newRelance,
      id: `REL-${Date.now()}`,
    };

    setData((prev) => ({
      ...prev,
      relances: [relance, ...prev.relances],
    }));
    setHasUnsavedChanges(true);
  };

  const handleUpdateContactStatut = (contactId: string, statut: string, dateContact?: string) => {
    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) =>
        c.id === contactId
          ? {
              ...c,
              statut,
              dernier_contact: dateContact || c.dernier_contact || new Date().toISOString().split('T')[0],
            }
          : c
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    const contact: Contact = {
      ...newContact,
      id: `CNT-${Date.now()}`,
    };

    setData((prev) => ({
      ...prev,
      contacts: [contact, ...prev.contacts],
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddEntreprise = (newEnt: Entreprise) => {
    setData((prev) => ({
      ...prev,
      entreprises: [newEnt, ...prev.entreprises],
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddAAP = (newAAP: AppelProjet) => {
    setData((prev) => ({
      ...prev,
      appels_projets: [newAAP, ...prev.appels_projets],
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddColumn = (newField: CustomField) => {
    setData((prev) => ({
      ...prev,
      custom_fields: [...(prev.custom_fields || []), newField],
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddFeedback = (newFeedback: Feedback) => {
    setData((prev) => ({
      ...prev,
      feedbacks: [newFeedback, ...prev.feedbacks],
    }));
    setHasUnsavedChanges(true);
  };

  const handleUpdateFeedbackStatut = (id: string, statut: Feedback['statut']) => {
    setData((prev) => ({
      ...prev,
      feedbacks: prev.feedbacks.map((f) => (f.id === id ? { ...f, statut } : f)),
    }));
    setHasUnsavedChanges(true);
  };

  const handleUpdateAAPStatut = (aapId: string, statut: string) => {
    setData((prev) => ({
      ...prev,
      appels_projets: prev.appels_projets.map((a) => (a.id === aapId ? { ...a, statut_dossier: statut } : a)),
    }));
    setHasUnsavedChanges(true);
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const wsEntreprises = XLSX.utils.json_to_sheet(data.entreprises);
    XLSX.utils.book_append_sheet(wb, wsEntreprises, 'Entreprises');
    const wsAAP = XLSX.utils.json_to_sheet(data.appels_projets);
    XLSX.utils.book_append_sheet(wb, wsAAP, 'Fondations_AAP');
    const wsContacts = XLSX.utils.json_to_sheet(data.contacts);
    XLSX.utils.book_append_sheet(wb, wsContacts, 'Contacts');
    const wsFeedbacks = XLSX.utils.json_to_sheet(data.feedbacks);
    XLSX.utils.book_append_sheet(wb, wsFeedbacks, 'Retours_Site');
    XLSX.writeFile(wb, `Ambition_Campus_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleReset = () => {
    if (confirm('Voulez-vous réinitialiser la base par défaut ?')) {
      const fresh = resetToDefault();
      setData(fresh);
      setHasUnsavedChanges(false);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    saveData(data);
    const result = await syncWithSupabase(data);
    setIsSyncing(false);
    setSyncStatus({
      message: result.message,
      isError: !result.success,
    });
    setTimeout(() => {
      setSyncStatus(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col font-sans pb-24">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={{
          entreprises: data.entreprises.length,
          aap: data.appels_projets.length,
          contacts: data.contacts.length,
          relances: data.relances.length,
          feedbacks: data.feedbacks.length,
        }}
        onExport={handleExport}
        onReset={handleReset}
        onSync={handleManualSync}
        onOpenTemplates={() => setShowTemplatesModal(true)}
        isSyncing={isSyncing}
      />

      {/* Auto-Sync Indicator & Manual Status Banner */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-1.5 flex items-center justify-between text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          {autoSyncStatus === 'syncing' ? (
            <span className="flex items-center gap-1.5 text-blue-600 font-medium">
              <RefreshCw className="w-3 h-3 animate-spin" /> Synchronisation automatique Supabase en cours...
            </span>
          ) : autoSyncStatus === 'synced' ? (
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <Cloud className="w-3.5 h-3.5" /> Synchronisé en direct avec Supabase
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-700 font-medium">
              Mode local actif · Cliquez sur Synchroniser Supabase pour forcer l'envoi
            </span>
          )}
        </div>

        <div className="text-slate-400">
          Auto-save instantané (LocalStorage + Supabase Cloud)
        </div>
      </div>

      {syncStatus && (
        <div className={`px-4 py-2.5 text-xs text-center font-medium ${
          syncStatus.isError ? 'bg-rose-50 text-rose-700 border-b border-rose-200' : 'bg-emerald-50 text-emerald-700 border-b border-emerald-200'
        }`}>
          {syncStatus.message}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-5 max-w-[1700px] w-full mx-auto space-y-4">
        {activeTab === 'entreprises' && (
          <EntreprisesTable
            entreprises={data.entreprises}
            contacts={data.contacts}
            relances={data.relances}
            customFields={data.custom_fields || []}
            onOpenRelance={(contact, entreprise) =>
              setActiveRelanceContact({
                contact,
                entityName: entreprise.nom,
                pitchAngle: entreprise.angle_pitch,
              })
            }
            onOpenAddContact={(entreprise) =>
              setActiveAddContactEntity({
                type: 'entreprise',
                id: entreprise.id,
                nom: entreprise.nom,
              })
            }
            onOpenAddOrganisation={() => setShowAddOrganisationModal(true)}
            onOpenAddColumn={() => setShowAddColumnModal(true)}
            onUpdateContactStatut={handleUpdateContactStatut}
            onCellEdit={handleCellEdit}
          />
        )}

        {activeTab === 'aap' && (
          <AppelsProjetsTable
            appelsProjets={data.appels_projets}
            contacts={data.contacts}
            relances={data.relances}
            customFields={data.custom_fields || []}
            onOpenRelance={(contact, aap) =>
              setActiveRelanceContact({
                contact,
                entityName: aap.organisme,
                pitchAngle: aap.angle_pitch,
              })
            }
            onOpenAddContact={(aap) =>
              setActiveAddContactEntity({
                type: 'aap',
                id: aap.id,
                nom: aap.organisme,
              })
            }
            onOpenAddOrganisation={() => setShowAddOrganisationModal(true)}
            onOpenAddColumn={() => setShowAddColumnModal(true)}
            onUpdateContactStatut={handleUpdateContactStatut}
            onUpdateAAPStatut={handleUpdateAAPStatut}
            onCellEdit={handleCellEdit}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            entreprises={data.entreprises}
            appelsProjets={data.appels_projets}
            contacts={data.contacts}
            relances={data.relances}
          />
        )}

        {activeTab === 'retours' && (
          <FeedbacksTable
            feedbacks={data.feedbacks}
            onOpenAddFeedback={() => setShowAddFeedbackModal(true)}
            onUpdateFeedbackStatut={handleUpdateFeedbackStatut}
            onCellEdit={handleCellEdit}
          />
        )}
      </main>

      {/* Sticky Bottom Floating Save Bar */}
      <div className="fixed bottom-5 right-6 z-30 flex items-center gap-3">
        {saveSuccessMessage && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Check className="w-4 h-4" />
            <span>Modifications enregistrées !</span>
          </div>
        )}

        {hasUnsavedChanges && (
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xl transition-all hover:scale-105 cursor-pointer animate-bounce"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer et synchroniser</span>
          </button>
        )}
      </div>

      {/* Modals */}
      {activeRelanceContact && (
        <RelanceModal
          contact={activeRelanceContact.contact}
          entityName={activeRelanceContact.entityName}
          pitchAngle={activeRelanceContact.pitchAngle}
          relances={data.relances}
          onClose={() => setActiveRelanceContact(null)}
          onAddRelance={handleAddRelance}
          onUpdateContactStatut={handleUpdateContactStatut}
        />
      )}

      {activeAddContactEntity && (
        <AddContactModal
          targetType={activeAddContactEntity.type}
          targetId={activeAddContactEntity.id}
          entityName={activeAddContactEntity.nom}
          onClose={() => setActiveAddContactEntity(null)}
          onAddContact={handleAddContact}
        />
      )}

      {showAddOrganisationModal && (
        <AddOrganisationModal
          type={activeTab === 'entreprises' ? 'entreprise' : 'aap'}
          onClose={() => setShowAddOrganisationModal(false)}
          onAddEntreprise={handleAddEntreprise}
          onAddAAP={handleAddAAP}
        />
      )}

      {showAddColumnModal && (
        <AddColumnModal
          onClose={() => setShowAddColumnModal(false)}
          onAddColumn={handleAddColumn}
        />
      )}

      {showAddFeedbackModal && (
        <AddFeedbackModal
          onClose={() => setShowAddFeedbackModal(false)}
          onAddFeedback={handleAddFeedback}
        />
      )}

      {showTemplatesModal && (
        <TemplatesModal
          onClose={() => setShowTemplatesModal(false)}
        />
      )}
    </div>
  );
}

export default App;
