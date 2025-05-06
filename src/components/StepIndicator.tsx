import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Informations Personnelles' },
    { id: 2, name: 'Détails de la Formation' },
    { id: 3, name: 'Informations Financières et Autres Détails' }
  ];

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step.id === currentStep
                ? 'bg-blue-500 text-white'
                : step.id < currentStep
                ? 'bg-blue-100 text-blue-500'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.id}
            </div>
            <div className="text-xs mt-2 text-center text-gray-500">
              {step.name}
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px mx-4 ${
              step.id < currentStep ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
