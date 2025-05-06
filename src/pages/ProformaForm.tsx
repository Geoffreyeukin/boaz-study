import React, { useState } from 'react';
import { useAVI } from '../context/AVIContext';
import HorizontalStepper from '../components/HorizontalStepper';

const ProformaForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { currentStep, isLoading, error, personalInfo, formationDetails, financialInfo } = state;

  const [isProformaAccepted, setIsProformaAccepted] = useState(false);

  const handleAcceptProforma = () => {
    setIsProformaAccepted(true);
    dispatch({ 
      type: 'SET_PROFORMA', 
      payload: { accepted: true, acceptedAt: new Date().toISOString() } 
    });
  };

  const handleNext = () => {
    if (!isProformaAccepted) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez accepter la proforma avant de continuer' });
      return;
    }
    
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
  };

  const handlePrevious = () => {
    dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
  };

  // Calcul des montants
  const totalAmount = financialInfo?.totalAmount || 0;
  const vatRate = 0.2; // 20% TVA
  const vatAmount = totalAmount * vatRate;
  const totalWithVat = totalAmount + vatAmount;

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
      
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Proforma</h2>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between mb-8">
              <div>
                <img src="/logo.svg" alt="Boaz Study" className="h-12 mb-2" onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjxwYXRoIGZpbGw9IiMxZTQwYWYiIGQ9Ik0yMCAxMGMwLTUuNTIzIDQuNDc3LTEwIDEwLTEwczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEwek01MCAxMGMwLTUuNTIzIDQuNDc3LTEwIDEwLTEwczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEweiIvPjxwYXRoIGZpbGw9IiNmNTllMGIiIGQ9Ik0yMCAzMGMwLTUuNTIzIDQuNDc3LTEwIDEwLTEwczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEweiIvPjx0ZXh0IHg9IjcwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFlNDBhZiI+Ym9hejwvdGV4dD48dGV4dCB4PSI3MCIgeT0iMzgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzFlNDBhZiI+c3R1ZHk8L3RleHQ+PC9zdmc+';
                }} />
                <h3 className="text-lg font-bold">Boaz Study</h3>
                <p className="text-sm">16 Rue de Boronier</p>
                <p className="text-sm">37000 Tours, France</p>
                <p className="text-sm">contact@boazstudy.com</p>
                <p className="text-sm">+33 2 47 66 66 66</p>
              </div>
              
              <div className="text-right">
                <h2 className="text-xl font-bold text-blue-600 mb-2">FACTURE PROFORMA</h2>
                <p className="text-sm">N° : PRO-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                <p className="text-sm">Date : {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Client :</h3>
              <p className="text-sm">{personalInfo?.firstName || ''} {personalInfo?.lastName || ''}</p>
              <p className="text-sm">Email : {personalInfo?.email || ''}</p>
              <p className="text-sm">Tél : {personalInfo?.phoneCode || ''} {personalInfo?.phoneNumber || ''}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Détails de la prestation :</h3>
              
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left border border-gray-200">Description</th>
                    <th className="py-2 px-4 text-right border border-gray-200">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border border-gray-200">
                      <p className="font-medium">Accompagnement pour études à l'étranger</p>
                      <p className="text-sm text-gray-600">Établissement : {formationDetails?.university || 'Non spécifié'}</p>
                      <p className="text-sm text-gray-600">Programme : {formationDetails?.program || 'Non spécifié'}</p>
                      <p className="text-sm text-gray-600">Niveau : {formationDetails?.level || 'Non spécifié'}</p>
                      <p className="text-sm text-gray-600">Durée : {financialInfo?.duration || '12 mois'}</p>
                      <p className="text-sm text-gray-600">Année académique : {financialInfo?.academicYear || '2024/2025'}</p>
                    </td>
                    <td className="py-3 px-4 text-right border border-gray-200">
                      {totalAmount.toLocaleString()} {financialInfo?.currency || 'FCFA'}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-2 px-4 text-right font-medium border border-gray-200">Sous-total</td>
                    <td className="py-2 px-4 text-right border border-gray-200">{totalAmount.toLocaleString()} {financialInfo?.currency || 'FCFA'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-right font-medium border border-gray-200">TVA (20%)</td>
                    <td className="py-2 px-4 text-right border border-gray-200">{vatAmount.toLocaleString()} {financialInfo?.currency || 'FCFA'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 text-right font-bold border border-gray-200">Total</td>
                    <td className="py-2 px-4 text-right font-bold border border-gray-200">{totalWithVat.toLocaleString()} {financialInfo?.currency || 'FCFA'}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Conditions de paiement :</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Validité de l'offre : 30 jours à compter de la date d'émission</li>
                <li>Mode de paiement : Virement bancaire ou dépôt</li>
                <li>Cette facture proforma n'est pas une facture définitive</li>
                <li>Une facture définitive sera émise après réception du paiement</li>
              </ul>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600">Nous vous remercions pour votre confiance.</p>
              <p className="text-sm text-gray-600">Pour toute question, n'hésitez pas à nous contacter.</p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleAcceptProforma}
                disabled={isProformaAccepted}
                className={`px-6 py-3 rounded-md text-white font-medium ${isProformaAccepted ? 'bg-green-500 cursor-default' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isProformaAccepted ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Proforma acceptée
                  </span>
                ) : (
                  "J'accepte cette proforma"
                )}
              </button>
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
            disabled={isLoading || !isProformaAccepted}
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
              'Voir le contrat'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProformaForm;
