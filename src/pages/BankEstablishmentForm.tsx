import React, { useState } from 'react';
import { useAVI } from '../context/AVIContext';
import HorizontalStepper from '../components/HorizontalStepper';

const BankEstablishmentForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { currentStep, isLoading, error } = state;

  const [selectedBank, setSelectedBank] = useState<string>('');

  const handleBankChange = (bank: string) => {
    setSelectedBank(bank);
    dispatch({ 
      type: 'SET_BANK_ESTABLISHMENT', 
      payload: { bank } 
    });
  };

  const handleNext = () => {
    if (!selectedBank) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez sélectionner un établissement bancaire' });
      return;
    }
    
    dispatch({ type: 'SET_ERROR', payload: null });
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
        <h2 className="text-2xl font-semibold text-center mb-8">Choix de l'établissement bancaire</h2>
        
        <div className="space-y-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${selectedBank === 'societe_generale' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
            onClick={() => handleBankChange('societe_generale')}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img src="/banks/societe_generale.png" alt="Société Générale" className="h-8" onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiNlNjAwMDAiLz48dGV4dCB4PSI1MCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlNPQ0lFVEU8L3RleHQ+PHRleHQgeD0iNTAiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5HRU5FUkFMRTwvdGV4dD48L3N2Zz4=';
                }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedBank === 'societe_generale' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                    {selectedBank === 'societe_generale' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">Société Générale</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${selectedBank === 'banque_atlantique' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
            onClick={() => handleBankChange('banque_atlantique')}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img src="/banks/banque_atlantique.png" alt="Banque Atlantique" className="h-8" onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiNmZjk1MDAiLz48dGV4dCB4PSI1MCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJBTlFVRTwvdGV4dD48dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkFUTEFOVElRVUU8L3RleHQ+PC9zdmc+';
                }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedBank === 'banque_atlantique' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                    {selectedBank === 'banque_atlantique' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">Banque Atlantique</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${selectedBank === 'ecobank' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
            onClick={() => handleBankChange('ecobank')}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img src="/banks/ecobank.png" alt="Ecobank" className="h-8" onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDdmYmYiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkVDT0JBTks8L3RleHQ+PC9zdmc+';
                }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedBank === 'ecobank' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                    {selectedBank === 'ecobank' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">Ecobank</span>
                </div>
              </div>
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
            disabled={isLoading || !selectedBank}
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
              'Suivant'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankEstablishmentForm;
