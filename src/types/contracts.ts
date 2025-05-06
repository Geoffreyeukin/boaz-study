// Définition des contrats d'API pour l'application Boaz Study

// Interface pour les informations personnelles (étape 1)
export interface PersonalInfoRequest {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportScan?: string | File;
}

export interface PersonalInfoResponse {
  success: boolean;
  message: string;
  userId?: string;
  step?: number;
}

// Interface pour les détails de formation (étape 2)
export interface FormationDetailsRequest {
  userId: string;
  university: string;
  program: string;
  startDate: string;
  endDate: string;
  level: 'bachelor' | 'master' | 'phd' | 'other';
  city?: string;
  country?: string;
  address?: string;
  documents?: File[];
}

export interface FormationDetailsResponse {
  success: boolean;
  message: string;
  step?: number;
}

// Interface pour les informations financières (étape 3)
export interface FinancialInfoRequest {
  userId: string;
  totalAmount: number;
  currency: string;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'wallet';
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    swiftCode: string;
  };
  additionalComments?: string;
  academicYear?: string;
  isRenewal?: boolean;
  studyPurpose?: string;
  hasInsurance?: boolean;
  duration?: string;
}

export interface FinancialInfoResponse {
  success: boolean;
  message: string;
  attestationId?: string;
  attestationUrl?: string;
  step?: number;
}

// Interface pour l'attestation de virement (A.V.I)
export interface AttestationRequest {
  userId: string;
  montant: number;
  devise: string;
  nomEtudiant: string;
  universiteCible: string;
}

export interface AttestationResponse {
  id: string;
  statut: 'en_attente' | 'validée' | 'refusée';
  dateEmission: string;
  urlDocumentPDF: string;
}

// Interface pour la gestion des utilisateurs
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: 'student' | 'admin';
  createdAt: string;
}

// Interface pour la gestion des erreurs API
export interface ApiError {
  code: string;
  message: string;
  details?: string;
}
