import React, { useState, useEffect } from 'react';
import type { ActiveTab, Contact, Relance } from './types';
import { loadData, saveData, resetToDefault } from './lib/storage';
import type { CRMData } from './lib/storage';
import { syncWithSupabase } from './lib/sync';
import { Header } from './components/Header';
import { EntreprisesTable } from './components/EntreprisesTable';
import { AppelsProjetsTable } from './components/AppelsProjetsTable';
import { AnalyticsView } from './components/AnalyticsView';
import { RelanceModal } from './components/RelanceModal';
import { AddContactModal } from './components/AddContactModal';
import * as XLSX from 'xlsx';

export function App() {
  const [data, setData] = useState<CRMData>(loadData);
  const [activeTab, setActiveTab] = useState<ActiveTab>('entreprises');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ message: string; isError: boolean } | null>(null);

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

  useEffect(() => {
    saveData(data);
  }, [data]);

  const handleAddRelance = (newRelance: Omit<Relance, 'id'>) => {
    const relance: Relance = {
      ...newRelance,
      id: `REL-${Date.now()}`,
    };

    setData((prev) => ({
      ...prev,
      relances: [relance, ...prev.relances],
    }));
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
  };

  const handleUpdateEntrepriseStatut = (entrepriseId: string, statut: string) => {
    setData((prev) => ({
      ...prev,
      entreprises: prev.entreprises.map((e) => (e.id === entrepriseId ? { ...e, statut_global: statut } : e)),
    }));
  };

  const handleUpdateAAPStatut = (aapId: string, statut: string) => {
    setData((prev) => ({
      ...prev,
      appels_projets: prev.appels_projets.map((a) => (a.id === aapId ? { ...a, statut_dossier: statut } : a)),
    }));
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const wsEntreprises = XLSX.utils.json_to_sheet(data.entreprises);
    XLSX.utils.book_append_sheet(wb, wsEntreprises, 'Entreprises');
    const wsAAP = XLSX.utils.json_to_sheet(data.appels_projets);
    XLSX.utils.book_append_sheet(wb, wsAAP, 'Fondations_AAP');
    const wsContacts = XLSX.utils.json_to_sheet(data.contacts);
    XLSX.utils.book_append_sheet(wb, wsContacts, 'Contacts');
    const wsRelances = XLSX.utils.json_to_sheet(data.relances);
    XLSX.utils.book_append_sheet(wb, wsRelances, 'Historique_Relances');
    XLSX.writeFile(wb, `Ambition_Campus_Airtable_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleReset = () => {
    if (confirm('Voulez-vous réinitialiser la table avec les 103 cibles qualifiées par défaut ?')) {
      const fresh = resetToDefault();
      setData(fresh);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
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
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col font-sans">
      {/* Airtable Master Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={{
          entreprises: data.entreprises.length,
          aap: data.appels_projets.length,
          contacts: data.contacts.length,
          relances: data.relances.length,
        }}
        onExport={handleExport}
        onReset={handleReset}
        onSync={handleSync}
        isSyncing={isSyncing}
      />

      {/* Sync Status Banner */}
      {syncStatus && (
        <div className={`px-4 py-2 text-xs text-center font-medium ${
          syncStatus.isError ? 'bg-rose-50 text-rose-700 border-b border-rose-200' : 'bg-emerald-50 text-emerald-700 border-b border-emerald-200'
        }`}>
          {syncStatus.message}
        </div>
      )}

      {/* Main Grid Viewport */}
      <main className="flex-1 p-4 max-w-[1600px] w-full mx-auto space-y-4">
        {activeTab === 'entreprises' && (
          <EntreprisesTable
            entreprises={data.entreprises}
            contacts={data.contacts}
            relances={data.relances}
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
            onUpdateContactStatut={handleUpdateContactStatut}
            onUpdateEntrepriseStatut={handleUpdateEntrepriseStatut}
          />
        )}

        {activeTab === 'aap' && (
          <AppelsProjetsTable
            appelsProjets={data.appels_projets}
            contacts={data.contacts}
            relances={data.relances}
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
            onUpdateContactStatut={handleUpdateContactStatut}
            onUpdateAAPStatut={handleUpdateAAPStatut}
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
      </main>

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
    </div>
  );
}

export default App;
