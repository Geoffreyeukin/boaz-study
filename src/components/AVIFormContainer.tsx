import React from 'react';
import { useAVI } from '../context/AVIContext';
import AVIForm from '../pages/AVIForm';
import FormationDetailsForm from '../pages/FormationDetailsForm';
import FinancialInfoForm from '../pages/FinancialInfoForm';
import PaymentPrincipleForm from '../pages/PaymentPrincipleForm';
import PaymentModeForm from '../pages/PaymentModeForm';
import BankEstablishmentForm from '../pages/BankEstablishmentForm';
import BankCoordinatesForm from '../pages/BankCoordinatesForm';
import ProformaForm from '../pages/ProformaForm';
import ContractForm from '../pages/ContractForm';

const AVIFormContainer: React.FC = () => {
  const { state } = useAVI();
  const { currentStep } = state;

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <AVIForm />;
      case 2:
        return <FormationDetailsForm />;
      case 3:
        return <FinancialInfoForm />;
      case 4:
        return <PaymentPrincipleForm />;
      case 5:
        return <PaymentModeForm />;
      case 6:
        return <BankEstablishmentForm />;
      case 7:
        return <BankCoordinatesForm />;
      case 8:
        return <ProformaForm />;
      case 9:
        return <ContractForm />;
      default:
        return <AVIForm />;
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:max-w-6xl md:mx-auto">
      {renderStepForm()}
    </div>
  );
};

export default AVIFormContainer;
