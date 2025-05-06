import React, { useState } from 'react';
import { useAVI } from '../context/AVIContext';
import HorizontalStepper from '../components/HorizontalStepper';

const PaymentPrincipleForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { currentStep, isLoading, error } = state;

  const [selectedPrinciple, setSelectedPrinciple] = useState<string>('');

  const handlePrincipleChange = (principle: string) => {
    setSelectedPrinciple(principle);
    dispatch({ 
      type: 'SET_PAYMENT_PRINCIPLE', 
      payload: { principle } 
    });
  };

  const handleNext = () => {
    if (!selectedPrinciple) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez sélectionner un principe de paiement' });
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
        <h2 className="text-2xl font-semibold text-center mb-8">Principe de paiement</h2>
        
        <div className="space-y-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${selectedPrinciple === 'total' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
            onClick={() => handlePrincipleChange('total')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border ${selectedPrinciple === 'total' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                {selectedPrinciple === 'total' && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Paiement total</h3>
                <p className="text-sm text-gray-600">Payer la totalité des frais en une seule fois</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${selectedPrinciple === 'partial' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
            onClick={() => handlePrincipleChange('partial')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border ${selectedPrinciple === 'partial' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                {selectedPrinciple === 'partial' && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Paiement partiel</h3>
                <p className="text-sm text-gray-600">Payer une partie maintenant et le reste plus tard</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${selectedPrinciple === 'installments' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
            onClick={() => handlePrincipleChange('installments')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border ${selectedPrinciple === 'installments' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} mr-3 flex items-center justify-center`}>
                {selectedPrinciple === 'installments' && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Paiement échelonné</h3>
                <p className="text-sm text-gray-600">Payer en plusieurs versements selon un calendrier défini</p>
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
            disabled={isLoading || !selectedPrinciple}
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

export default PaymentPrincipleForm;
