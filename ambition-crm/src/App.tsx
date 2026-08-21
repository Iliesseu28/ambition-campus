import React, { useState, useEffect } from 'react';
import type { ActiveTab, Entreprise, AppelProjet, Contact, Relance } from './types';
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

  // Sync back to local storage whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Handlers for Relances
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

  // Handlers for Add Contact
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

  // Handlers for Enterprise & AAP updates
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

  // Export Data to Excel
  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    // Sheet 1 : Entreprises
    const wsEntreprises = XLSX.utils.json_to_sheet(data.entreprises);
    XLSX.utils.book_append_sheet(wb, wsEntreprises, 'Entreprises');

    // Sheet 2 : Appels à projets
    const wsAAP = XLSX.utils.json_to_sheet(data.appels_projets);
    XLSX.utils.book_append_sheet(wb, wsAAP, 'Fondations_AAP');

    // Sheet 3 : Contacts
    const wsContacts = XLSX.utils.json_to_sheet(data.contacts);
    XLSX.utils.book_append_sheet(wb, wsContacts, 'Contacts');

    // Sheet 4 : Relances
    const wsRelances = XLSX.utils.json_to_sheet(data.relances);
    XLSX.utils.book_append_sheet(wb, wsRelances, 'Historique_Relances');

    XLSX.writeFile(wb, `Ambition_Campus_CRM_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleReset = () => {
    if (confirm('Voulez-vous réinitialiser le tableau avec les 103 cibles qualifiées par défaut ?')) {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header & Nav */}
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
        <div className={`px-6 py-2.5 text-xs text-center font-medium ${
          syncStatus.isError ? 'bg-rose-500/20 text-rose-300 border-b border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30'
        }`}>
          {syncStatus.message}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
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

      {/* Modal Relance & Échange */}
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

      {/* Modal Add Contact */}
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
