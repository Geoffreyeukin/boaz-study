import React, { useState } from 'react';
import { useAVI } from '../context/AVIContext';
import HorizontalStepper from '../components/HorizontalStepper';

const PaymentModeForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { currentStep, isLoading, error } = state;

  const [selectedMode, setSelectedMode] = useState<string>('');
  const [expandedMode, setExpandedMode] = useState<string | null>(null);

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    dispatch({ 
      type: 'SET_PAYMENT_MODE', 
      payload: { mode } 
    });
  };

  const toggleExpand = (mode: string) => {
    if (expandedMode === mode) {
      setExpandedMode(null);
    } else {
      setExpandedMode(mode);
    }
  };

  const handleNext = () => {
    if (!selectedMode) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez sélectionner un mode de paiement' });
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
        <h2 className="text-2xl font-semibold text-center mb-8">Sélectionnez votre mode de paiement</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <div 
              className={`p-4 border rounded-lg cursor-pointer ${selectedMode === 'depot' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
              onClick={() => handleModeChange('depot')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedMode === 'depot' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                    {selectedMode === 'depot' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">Dépôt Bancaire</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand('depot');
                  }}
                  className="text-gray-500 focus:outline-none"
                >
                  <svg className={`h-5 w-5 transform transition-transform ${expandedMode === 'depot' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            {(expandedMode === 'depot' || selectedMode === 'depot') && (
              <div className="mt-2 p-4 bg-blue-50 rounded-lg text-sm text-blue-600 italic">
                Effectuez un dépôt sur le compte Boaz Study, puis téléchargez la preuve de paiement directement dans l'application.
              </div>
            )}
          </div>

          <div className="relative">
            <div 
              className={`p-4 border rounded-lg cursor-pointer ${selectedMode === 'virement' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
              onClick={() => handleModeChange('virement')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedMode === 'virement' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                    {selectedMode === 'virement' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">Virement Bancaire Direct</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand('virement');
                  }}
                  className="text-gray-500 focus:outline-none"
                >
                  <svg className={`h-5 w-5 transform transition-transform ${expandedMode === 'virement' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            {(expandedMode === 'virement' || selectedMode === 'virement') && (
              <div className="mt-2 p-4 bg-blue-50 rounded-lg text-sm text-blue-600 italic">
                Effectuez un virement bancaire directement sur le compte Boaz Study, puis téléchargez la preuve de paiement dans l'application.
              </div>
            )}
          </div>

          <div className="relative">
            <div 
              className={`p-4 border rounded-lg cursor-pointer ${selectedMode === 'mobile' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
              onClick={() => handleModeChange('mobile')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedMode === 'mobile' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                    {selectedMode === 'mobile' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">Mobile Money</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand('mobile');
                  }}
                  className="text-gray-500 focus:outline-none"
                >
                  <svg className={`h-5 w-5 transform transition-transform ${expandedMode === 'mobile' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            {(expandedMode === 'mobile' || selectedMode === 'mobile') && (
              <div className="mt-2 p-4 bg-blue-50 rounded-lg text-sm text-blue-600 italic">
                Effectuez un paiement via Mobile Money sur le compte Boaz Study, puis téléchargez la preuve de paiement dans l'application.
              </div>
            )}
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
            disabled={isLoading || !selectedMode}
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

export default PaymentModeForm;
