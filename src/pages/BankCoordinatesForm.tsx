import React, { useState } from 'react';
import { useAVI } from '../context/AVIContext';
import HorizontalStepper from '../components/HorizontalStepper';

const BankCoordinatesForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { currentStep, isLoading, error, bankEstablishment } = state;

  const getBankDetails = () => {
    const bankName = bankEstablishment?.bank || 'societe_generale';
    
    switch(bankName) {
      case 'societe_generale':
        return {
          name: 'Société Générale',
          accountHolder: 'BOAZ STUDY',
          address: '16 RUE DE BORONIER',
          city: 'TOURS',
          postalCode: '37000',
          country: 'FRANCE',
          accountNumber: '00020991191',
          iban: 'FR76 3000 3021 2000 0209 9519 138',
          bic: 'SOGEFRPP'
        };
      case 'banque_atlantique':
        return {
          name: 'Banque Atlantique',
          accountHolder: 'BOAZ STUDY',
          address: '23 AVENUE JEAN MERMOZ',
          city: 'ABIDJAN',
          postalCode: '01',
          country: 'CÔTE D\'IVOIRE',
          accountNumber: '40454545454',
          iban: 'CI93 CI42 1010 0100 0040 4545 4545',
          bic: 'ATCICIE2A'
        };
      case 'ecobank':
        return {
          name: 'Ecobank',
          accountHolder: 'BOAZ STUDY',
          address: 'AVENUE HOUDAILLE',
          city: 'ABIDJAN',
          postalCode: '01',
          country: 'CÔTE D\'IVOIRE',
          accountNumber: '12345678901',
          iban: 'CI93 CI05 9010 0100 0123 4567 8901',
          bic: 'ECOCCIAB'
        };
      default:
        return {
          name: 'Société Générale',
          accountHolder: 'BOAZ STUDY',
          address: '16 RUE DE BORONIER',
          city: 'TOURS',
          postalCode: '37000',
          country: 'FRANCE',
          accountNumber: '00020991191',
          iban: 'FR76 3000 3021 2000 0209 9519 138',
          bic: 'SOGEFRPP'
        };
    }
  };

  const bankDetails = getBankDetails();

  const handleNext = () => {
    dispatch({ type: 'SET_BANK_COORDINATES', payload: { bankDetails } });
    dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
  };

  const handlePrevious = () => {
    dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
  };

  // Configuration du stepper horizontal
  const steps = [
    {
      id: 1,
      title: 'Mes informations',
      isActive: currentStep === 1,
      isCompleted: currentStep > 1
    },
    {
      id: 2,
      title: 'Détails de la formation',
      isActive: currentStep === 2,
      isCompleted: currentStep > 2
    },
    {
      id: 3,
      title: 'Informations Financières',
      subtitle: 'et Autres Détails',
      isActive: currentStep === 3,
      isCompleted: currentStep > 3
    },
    {
      id: 4,
      title: 'Principe de paiement',
      isActive: currentStep === 4,
      isCompleted: currentStep > 4
    },
    {
      id: 5,
      title: 'Mode de paiement',
      isActive: currentStep === 5,
      isCompleted: currentStep > 5
    },
    {
      id: 6,
      title: 'Établissement bancaire',
      isActive: currentStep === 6,
      isCompleted: currentStep > 6
    },
    {
      id: 7,
      title: 'Coordonnées bancaires',
      isActive: currentStep === 7,
      isCompleted: currentStep > 7
    },
    {
      id: 8,
      title: 'Proforma',
      isActive: currentStep === 8,
      isCompleted: currentStep > 8
    },
    {
      id: 9,
      title: 'Mon contrat',
      isActive: currentStep === 9,
      isCompleted: currentStep > 9
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <HorizontalStepper steps={steps} currentStep={currentStep} />
      
      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Informations bancaires</h2>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img src={`/banks/${bankEstablishment?.bank || 'societe_generale'}.png`} alt={bankDetails.name} className="h-8" onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDdmYmYiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJBTlFVRTwvdGV4dD48L3N2Zz4=';
                }} />
              </div>
              <h3 className="text-lg font-semibold">{bankDetails.name}</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-4">RELEVÉ D'IDENTITÉ BANCAIRE</h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">TITULAIRE DU COMPTE</p>
                  <p className="text-sm">{bankDetails.accountHolder}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold">ADRESSE</p>
                  <p className="text-sm">{bankDetails.address}</p>
                  <p className="text-sm">{bankDetails.postalCode} {bankDetails.city}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold">DOMICILIATION</p>
                    <p className="text-sm">{bankDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Guichet</p>
                    <p className="text-sm">00100</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">N° de compte</p>
                    <p className="text-sm">{bankDetails.accountNumber}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold">Identification Internationale (IBAN)</p>
                  <p className="text-sm font-mono">{bankDetails.iban}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold">Identification Internationale de la Banque (BIC)</p>
                  <p className="text-sm font-mono">{bankDetails.bic}</p>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Ce relevé est destiné à être remis, sur leur demande, à vos créanciers ou débiteurs appelés à faire inscrire des opérations à votre compte (virements, paiements de quittances, etc.).</p>
              <p className="mt-2">Son utilisation vous garantit le bon enregistrement des opérations en cause et vous évite ainsi des réclamations pour erreurs ou retards d'imputation.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handlePrevious}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour
          </button>
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </span>
            ) : (
              'Voir la proforma'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankCoordinatesForm;
