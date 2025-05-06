import React, { useState } from 'react';
import { useAVI } from '../context/AVIContext';
import HorizontalStepper from '../components/HorizontalStepper';

const ContractForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { currentStep, isLoading, error, personalInfo, formationDetails, financialInfo } = state;

  const [isContractAccepted, setIsContractAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAcceptContract = () => {
    setIsContractAccepted(true);
    dispatch({ 
      type: 'SET_CONTRACT', 
      payload: { accepted: true, acceptedAt: new Date().toISOString() } 
    });
  };

  const handleSubmit = async () => {
    if (!isContractAccepted) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez accepter le contrat avant de continuer' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Simuler une soumission de formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Une erreur est survenue lors de la soumission du formulaire' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
  };

  const handleGoToRequests = () => {
    // Redirection vers la page des demandes
    window.location.href = '/requests';
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

  if (isSubmitted) {
    return (
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <HorizontalStepper steps={steps} currentStep={currentStep} />
        
        <div className="max-w-3xl mx-auto mt-16 mb-16 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Demande envoyé avec succès</h2>
          <p className="text-gray-600 mb-8">Votre demande d'attestation de virement a été envoyée avec succès. Vous recevrez une confirmation par email.</p>
          
          <button
            onClick={handleGoToRequests}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Aller à mes demandes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <HorizontalStepper steps={steps} currentStep={currentStep} />
      
      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Contrat de service</h2>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">CONTRAT DE SERVICE POUR ATTESTATION DE VIREMENT INTERNATIONAL</h3>
              
              <p className="mb-4">
                Le présent contrat est conclu entre :
              </p>
              
              <p className="mb-4">
                <strong>Boaz Study</strong>, société immatriculée au Registre du Commerce et des Sociétés de Tours sous le numéro 123456789, dont le siège social est situé au 16 Rue de Boronier, 37000 Tours, France, représentée par son directeur en exercice, ci-après dénommée "le Prestataire",
              </p>
              
              <p className="mb-4">
                ET
              </p>
              
              <p className="mb-4">
                <strong>{personalInfo?.firstName || ''} {personalInfo?.lastName || ''}</strong>, résidant à [Adresse du client], ci-après dénommé(e) "le Client".
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 1 : OBJET DU CONTRAT</h4>
              <p className="text-sm mb-4">
                Le présent contrat a pour objet la fourniture par le Prestataire au Client d'une attestation de virement international destinée à l'établissement d'enseignement {formationDetails?.university || 'spécifié'} pour le programme {formationDetails?.program || 'spécifié'}.
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 2 : DESCRIPTION DES SERVICES</h4>
              <p className="text-sm mb-2">
                Le Prestataire s'engage à fournir au Client les services suivants :
              </p>
              <ul className="list-disc list-inside text-sm mb-4">
                <li>Préparation et délivrance d'une attestation de virement international</li>
                <li>Assistance administrative pour la procédure de paiement des frais de scolarité</li>
                <li>Suivi du dossier jusqu'à confirmation de réception du paiement par l'établissement</li>
                <li>Assistance en cas de problème lié au virement international</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 3 : DURÉE DU CONTRAT</h4>
              <p className="text-sm mb-4">
                Le présent contrat est conclu pour une durée de {financialInfo?.duration || '12 mois'} à compter de sa signature. Il pourra être renouvelé par accord écrit entre les parties.
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 4 : OBLIGATIONS DU PRESTATAIRE</h4>
              <p className="text-sm mb-2">
                Le Prestataire s'engage à :
              </p>
              <ul className="list-disc list-inside text-sm mb-4">
                <li>Fournir les services décrits à l'article 2 avec professionnalisme et diligence</li>
                <li>Respecter la confidentialité des informations communiquées par le Client</li>
                <li>Délivrer l'attestation de virement dans un délai de 5 jours ouvrés après confirmation du paiement</li>
                <li>Informer le Client de tout problème pouvant survenir dans l'exécution des services</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 5 : OBLIGATIONS DU CLIENT</h4>
              <p className="text-sm mb-2">
                Le Client s'engage à :
              </p>
              <ul className="list-disc list-inside text-sm mb-4">
                <li>Fournir au Prestataire toutes les informations nécessaires à l'exécution des services</li>
                <li>Effectuer le paiement des frais dans les délais convenus</li>
                <li>Informer le Prestataire de tout changement pouvant affecter l'exécution des services</li>
                <li>Utiliser l'attestation de virement uniquement aux fins prévues dans le présent contrat</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 6 : CONDITIONS FINANCIÈRES</h4>
              <p className="text-sm mb-4">
                En contrepartie des services fournis, le Client s'engage à payer au Prestataire la somme de {financialInfo?.totalAmount?.toLocaleString() || '0'} {financialInfo?.currency || 'FCFA'}, payable selon les modalités suivantes : [modalités de paiement].
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 7 : RÉSILIATION</h4>
              <p className="text-sm mb-4">
                Le présent contrat pourra être résilié par l'une ou l'autre des parties en cas de manquement grave de l'autre partie à ses obligations, après mise en demeure restée sans effet pendant un délai de 15 jours.
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">ARTICLE 8 : LOI APPLICABLE ET JURIDICTION COMPÉTENTE</h4>
              <p className="text-sm mb-4">
                Le présent contrat est soumis au droit français. Tout litige relatif à son interprétation ou à son exécution relèvera de la compétence exclusive des tribunaux de Tours.
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-sm">
                Fait à Tours, le {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleAcceptContract}
                disabled={isContractAccepted}
                className={`px-6 py-3 rounded-md text-white font-medium ${isContractAccepted ? 'bg-green-500 cursor-default' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isContractAccepted ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contrat accepté
                  </span>
                ) : (
                  "J'accepte les termes du contrat"
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
            onClick={handleSubmit}
            disabled={isSubmitting || !isContractAccepted}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </span>
            ) : (
              'Envoyer'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
