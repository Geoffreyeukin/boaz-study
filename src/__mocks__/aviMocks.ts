import { 
  PersonalInfoRequest, 
  PersonalInfoResponse,
  FormationDetailsRequest,
  FormationDetailsResponse,
  FinancialInfoRequest,
  FinancialInfoResponse,
  AttestationRequest,
  AttestationResponse
} from '../types/contracts';

// Fonction utilitaire pour simuler un délai de réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock pour la soumission des informations personnelles (étape 1)
 */
export const mockSubmitPersonalInfo = async (data: PersonalInfoRequest): Promise<PersonalInfoResponse> => {
  // Simuler un délai réseau
  await delay(800);
  
  // Validation simple
  if (!data.firstName || !data.lastName || !data.email) {
    return {
      success: false,
      message: 'Veuillez remplir tous les champs obligatoires'
    };
  }
  
  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      message: 'Adresse email invalide'
    };
  }
  
  // Simuler une réponse réussie
  return {
    success: true,
    message: 'Informations personnelles enregistrées avec succès',
    userId: 'user_' + Math.random().toString(36).substr(2, 9),
    step: 2
  };
};

/**
 * Mock pour la soumission des détails de formation (étape 2)
 */
export const mockSubmitFormationDetails = async (data: FormationDetailsRequest): Promise<FormationDetailsResponse> => {
  // Simuler un délai réseau
  await delay(800);
  
  // Validation simple
  if (!data.university || !data.program || !data.startDate) {
    return {
      success: false,
      message: 'Veuillez remplir tous les champs obligatoires'
    };
  }
  
  // Simuler une réponse réussie
  return {
    success: true,
    message: 'Détails de formation enregistrés avec succès',
    step: 3
  };
};

/**
 * Mock pour la soumission des informations financières (étape 3)
 */
export const mockSubmitFinancialInfo = async (data: FinancialInfoRequest): Promise<FinancialInfoResponse> => {
  // Simuler un délai réseau
  await delay(800);
  
  // Validation simple
  if (!data.totalAmount || !data.currency || !data.paymentMethod) {
    return {
      success: false,
      message: 'Veuillez remplir tous les champs obligatoires'
    };
  }
  
  // Validation du montant
  if (data.totalAmount <= 0) {
    return {
      success: false,
      message: 'Le montant doit être supérieur à 0'
    };
  }
  
  // Si paiement par virement bancaire, vérifier les détails bancaires
  // Cette validation est supprimée car les détails bancaires sont fournis dans une étape ultérieure
  /*
  if (data.paymentMethod === 'bank_transfer' && (!data.bankDetails || !data.bankDetails.accountNumber)) {
    return {
      success: false,
      message: 'Veuillez fournir les détails bancaires pour un virement'
    };
  }
  */
  
  // Générer un ID d'attestation
  const attestationId = 'att_' + Math.random().toString(36).substr(2, 9);
  
  // Simuler une réponse réussie
  return {
    success: true,
    message: 'Informations financières enregistrées avec succès',
    attestationId,
    attestationUrl: `/attestations/${attestationId}`,
    step: 4
  };
};

/**
 * Mock pour la demande d'attestation de virement
 */
export const mockRequestAttestation = async (data: AttestationRequest): Promise<AttestationResponse> => {
  // Simuler un délai réseau
  await delay(1200);
  
  // Générer un ID d'attestation
  const attestationId = 'att_' + Math.random().toString(36).substr(2, 9);
  
  // Simuler une réponse réussie
  return {
    id: attestationId,
    statut: 'en_attente',
    dateEmission: new Date().toISOString(),
    urlDocumentPDF: `https://example.com/attestations/${attestationId}.pdf`
  };
};
