import React from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalStepper from '../components/VerticalStepper';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      id: 1,
      title: 'Informations Personnelles',
      description: 'Ici, veuillez remplir vos informations personnelles',
      isActive: true,
      isCompleted: false
    },
    {
      id: 2,
      title: 'Détails de la Formation',
      isActive: false,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Informations Financières et Autres Détails',
      isActive: false,
      isCompleted: false
    },
    {
      id: 4,
      title: 'Principe de paiement',
      isActive: false,
      isCompleted: false
    },
    {
      id: 5,
      title: 'Mode de paiement',
      isActive: false,
      isCompleted: false
    },
    {
      id: 6,
      title: 'Établissement bancaire',
      isActive: false,
      isCompleted: false
    },
    {
      id: 7,
      title: 'Coordonnées bancaires',
      isActive: false,
      isCompleted: false
    },
    {
      id: 8,
      title: 'Proforma',
      isActive: false,
      isCompleted: false
    },
    {
      id: 9,
      title: 'Mon contrat',
      isActive: false,
      isCompleted: false
    },
    {
      id: 10,
      title: 'Dépôt de preuve',
      isActive: false,
      isCompleted: false
    }
  ];

  const handleStepClick = (stepId: number) => {
    // Naviguer vers l'étape correspondante
    switch (stepId) {
      case 1:
        navigate('/personal-info');
        break;
      case 2:
        navigate('/formation-details');
        break;
      case 3:
        navigate('/financial-info');
        break;
      case 4:
        navigate('/payment-principle');
        break;
      case 5:
        navigate('/payment-mode');
        break;
      case 6:
        navigate('/bank-establishment');
        break;
      case 7:
        navigate('/bank-coordinates');
        break;
      case 8:
        navigate('/proforma');
        break;
      case 9:
        navigate('/contract');
        break;
      case 10:
        navigate('/proof-deposit');
        break;
      default:
        navigate('/personal-info');
    }
  };

  const handleStart = () => {
    navigate('/personal-info');
  };

  const handleDownloadSummary = () => {
    // Logique pour télécharger un résumé
    alert('Téléchargement du résumé...');
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <VerticalStepper 
        steps={steps} 
        onStepClick={handleStepClick} 
      />
      
      <div className="mt-8 flex justify-between">
        <button 
          onClick={handleDownloadSummary}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Télécharger un résumé
        </button>
        
        <button 
          onClick={handleStart}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Commencer
        </button>
      </div>
    </div>
  );
};

export default HomePage;
