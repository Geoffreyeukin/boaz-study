import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  PersonalInfoRequest,
  FormationDetailsRequest,
  FinancialInfoRequest
} from '../types/contracts';

// Définition des types pour le contexte AVI
interface AVIState {
  currentStep: number;
  userId: string | null;
  personalInfo: Partial<PersonalInfoRequest>;
  formationDetails: Partial<FormationDetailsRequest>;
  financialInfo: Partial<FinancialInfoRequest>;
  paymentPrinciple: any;
  paymentMode: any;
  bankEstablishment: any;
  bankCoordinates: any;
  proforma: any;
  contract: any;
  isLoading: boolean;
  error: string | null;
}

// État initial
const initialState: AVIState = {
  currentStep: 1,
  userId: null,
  personalInfo: {},
  formationDetails: {},
  financialInfo: {},
  paymentPrinciple: {},
  paymentMode: {},
  bankEstablishment: {},
  bankCoordinates: {},
  proforma: {},
  contract: {},
  isLoading: false,
  error: null
};

// Types d'actions
type AVIAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'SET_PERSONAL_INFO'; payload: Partial<PersonalInfoRequest> }
  | { type: 'SET_FORMATION_DETAILS'; payload: Partial<FormationDetailsRequest> }
  | { type: 'SET_FINANCIAL_INFO'; payload: Partial<FinancialInfoRequest> }
  | { type: 'SET_PAYMENT_PRINCIPLE'; payload: any }
  | { type: 'SET_PAYMENT_MODE'; payload: any }
  | { type: 'SET_BANK_ESTABLISHMENT'; payload: any }
  | { type: 'SET_BANK_COORDINATES'; payload: any }
  | { type: 'SET_PROFORMA'; payload: any }
  | { type: 'SET_CONTRACT'; payload: any }
  | { type: 'RESET_FORM' };

// Réducteur pour gérer les actions
const aviReducer = (state: AVIState, action: AVIAction): AVIState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_PERSONAL_INFO':
      return { 
        ...state, 
        personalInfo: { ...state.personalInfo, ...action.payload } 
      };
    case 'SET_FORMATION_DETAILS':
      return { 
        ...state, 
        formationDetails: { ...state.formationDetails, ...action.payload } 
      };
    case 'SET_FINANCIAL_INFO':
      return { 
        ...state, 
        financialInfo: { ...state.financialInfo, ...action.payload } 
      };
    case 'SET_PAYMENT_PRINCIPLE':
      return { 
        ...state, 
        paymentPrinciple: { ...state.paymentPrinciple, ...action.payload } 
      };
    case 'SET_PAYMENT_MODE':
      return { 
        ...state, 
        paymentMode: { ...state.paymentMode, ...action.payload } 
      };
    case 'SET_BANK_ESTABLISHMENT':
      return { 
        ...state, 
        bankEstablishment: { ...state.bankEstablishment, ...action.payload } 
      };
    case 'SET_BANK_COORDINATES':
      return { 
        ...state, 
        bankCoordinates: { ...state.bankCoordinates, ...action.payload } 
      };
    case 'SET_PROFORMA':
      return { 
        ...state, 
        proforma: { ...state.proforma, ...action.payload } 
      };
    case 'SET_CONTRACT':
      return { 
        ...state, 
        contract: { ...state.contract, ...action.payload } 
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

// Création du contexte
interface AVIContextType {
  state: AVIState;
  dispatch: React.Dispatch<AVIAction>;
}

const AVIContext = createContext<AVIContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useAVI = () => {
  const context = useContext(AVIContext);
  if (!context) {
    throw new Error('useAVI doit être utilisé à l\'intérieur d\'un AVIProvider');
  }
  return context;
};

// Fournisseur du contexte
interface AVIProviderProps {
  children: ReactNode;
}

export const AVIProvider: React.FC<AVIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(aviReducer, initialState);
  
  return (
    <AVIContext.Provider value={{ state, dispatch }}>
      {children}
    </AVIContext.Provider>
  );
};

export default AVIContext;
