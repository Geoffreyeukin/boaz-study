import React, { useState, useEffect } from 'react';
import { useAVI } from '../context/AVIContext';
import { AVIService } from '../services/aviService';
import { FinancialInfoRequest } from '../types/contracts';
import HorizontalStepper from '../components/HorizontalStepper';

const FinancialInfoForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { userId, financialInfo, isLoading, error, currentStep } = state;
  
  const [formData, setFormData] = useState<Partial<FinancialInfoRequest>>({
    userId: userId || '',
    totalAmount: financialInfo?.totalAmount || 0,
    currency: financialInfo?.currency || 'FCFA',
    paymentMethod: financialInfo?.paymentMethod || 'bank_transfer',
    additionalComments: financialInfo?.additionalComments || '',
    academicYear: financialInfo?.academicYear || '2024/2025',
    isRenewal: financialInfo?.isRenewal || false,
    studyPurpose: financialInfo?.studyPurpose || 'Études',
    hasInsurance: financialInfo?.hasInsurance || false,
    duration: financialInfo?.duration || '12 mois'
  });

  // Mettre à jour le formulaire lorsque les données du contexte changent
  useEffect(() => {
    if (userId) {
      setFormData(prevData => ({
        ...prevData,
        userId
      }));
    }
    
    if (financialInfo) {
      setFormData(prevData => ({
        ...prevData,
        ...financialInfo
      }));
    }
  }, [userId, financialInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'totalAmount') {
      setFormData(prevData => ({
        ...prevData,
        [name]: parseFloat(value) || 0
      }));
    } else if (name === 'paymentMethod') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value as 'bank_transfer' | 'credit_card' | 'wallet'
      }));
    } else if (name === 'isRenewal') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value === 'Oui'
      }));
    } else if (name === 'hasInsurance') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value === 'Oui'
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    // Valider les données du formulaire
    if (!formData.totalAmount || !formData.currency) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez remplir tous les champs obligatoires' });
      return;
    }
    
    // Valider le montant
    if (formData.totalAmount <= 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Le montant doit être supérieur à 0' });
      return;
    }
    
    // Mettre à jour le contexte avec les données du formulaire
    dispatch({ type: 'SET_FINANCIAL_INFO', payload: formData });
    
    // Soumettre les informations financières
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await AVIService.submitFinancialInfo(formData as FinancialInfoRequest);
      
      if (response.success) {
        // Passer à l'étape suivante (principe de paiement)
        dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Une erreur est survenue lors de la soumission du formulaire' });
      console.error('Error submitting form:', err);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
  };

  // Configuration du stepper horizontal
  const steps = [
    {
      id: 1,
      title: 'Informations Personnelles',
      isActive: false,
      isCompleted: true
    },
    {
      id: 2,
      title: 'Détails de la Formation',
      isActive: false,
      isCompleted: true
    },
    {
      id: 3,
      title: 'Informations Financières',
      subtitle: 'et Autres Détails',
      isActive: true,
      isCompleted: false
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <HorizontalStepper steps={steps} currentStep={3} />
      
      {error && error !== 'Veuillez fournir les détails bancaires pour un virement' && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Année scolaire
          </label>
          <div className="relative">
            <select
              name="academicYear"
              value={formData.academicYear || '2024/2025'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2023/2024">2023/2024</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Est-ce un renouvellement ?
          </label>
          <div className="relative">
            <select
              name="isRenewal"
              value={formData.isRenewal ? 'Oui' : 'Non'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Montant à recevoir par mois en euro
          </label>
          <input
            type="text"
            name="totalAmount"
            value={formData.totalAmount || ''}
            onChange={handleInputChange}
            placeholder="Exemple: 700€"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Je vais en France pour
          </label>
          <div className="relative">
            <select
              name="studyPurpose"
              value={formData.studyPurpose || 'Études'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Études">Études</option>
              <option value="Stage">Stage</option>
              <option value="Recherche">Recherche</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Devise de votre pays d'origine
          </label>
          <div className="relative">
            <select
              name="currency"
              value={formData.currency || 'FCFA'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="FCFA">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ACS Assurance France
          </label>
          <div className="relative">
            <select
              name="hasInsurance"
              value={formData.hasInsurance ? 'Oui' : 'Non'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée de l'AVI
          </label>
          <div className="relative">
            <select
              name="duration"
              value={formData.duration || '12 mois'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3 mois">3 mois</option>
              <option value="6 mois">6 mois</option>
              <option value="9 mois">9 mois</option>
              <option value="12 mois">12 mois</option>
              <option value="24 mois">24 mois</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          Retour
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 w-full sm:w-auto"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
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
  );
};

export default FinancialInfoForm;
