import api, { shouldUseMocks } from './api';
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

// Import des mocks si nécessaire
import { 
  mockSubmitPersonalInfo,
  mockSubmitFormationDetails,
  mockSubmitFinancialInfo,
  mockRequestAttestation
} from '../__mocks__/aviMocks';

/**
 * Service pour gérer les requêtes liées à l'AVI (Attestation de Virement International)
 */
export const AVIService = {
  /**
   * Soumet les informations personnelles (étape 1)
   */
  submitPersonalInfo: async (data: PersonalInfoRequest): Promise<PersonalInfoResponse> => {
    if (shouldUseMocks()) {
      return mockSubmitPersonalInfo(data);
    }
    
    const response = await api.post<PersonalInfoResponse>('/avi/personal-info', data);
    return response.data;
  },
  
  /**
   * Soumet les détails de formation (étape 2)
   */
  submitFormationDetails: async (data: FormationDetailsRequest): Promise<FormationDetailsResponse> => {
    if (shouldUseMocks()) {
      return mockSubmitFormationDetails(data);
    }
    
    const response = await api.post<FormationDetailsResponse>('/avi/formation-details', data);
    return response.data;
  },
  
  /**
   * Soumet les informations financières (étape 3)
   */
  submitFinancialInfo: async (data: FinancialInfoRequest): Promise<FinancialInfoResponse> => {
    if (shouldUseMocks()) {
      return mockSubmitFinancialInfo(data);
    }
    
    const response = await api.post<FinancialInfoResponse>('/avi/financial-info', data);
    return response.data;
  },
  
  /**
   * Demande une attestation de virement
   */
  requestAttestation: async (data: AttestationRequest): Promise<AttestationResponse> => {
    if (shouldUseMocks()) {
      return mockRequestAttestation(data);
    }
    
    const response = await api.post<AttestationResponse>('/avi/request-attestation', data);
    return response.data;
  },
  
  /**
   * Récupère une attestation par son ID
   */
  getAttestationById: async (id: string): Promise<AttestationResponse> => {
    if (shouldUseMocks()) {
      return {
        id,
        statut: 'validée',
        dateEmission: new Date().toISOString(),
        urlDocumentPDF: 'https://example.com/attestation.pdf'
      };
    }
    
    const response = await api.get<AttestationResponse>(`/avi/attestation/${id}`);
    return response.data;
  }
};
