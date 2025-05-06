import React from 'react';

interface Step {
  id: number;
  title: string;
  subtitle?: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface HorizontalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full mb-8 overflow-x-auto">
      <div className="flex items-center justify-center min-w-max px-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Étape */}
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step.isActive 
                    ? 'bg-blue-500 text-white' 
                    : step.isCompleted 
                      ? 'bg-white border-2 border-blue-500 text-blue-500' 
                      : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => onStepClick && step.isCompleted && onStepClick(step.id)}
              >
                {step.isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.id < 10 ? '0' + step.id : step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs font-medium ${
                  step.isActive 
                    ? 'text-blue-600' 
                    : step.isCompleted 
                      ? 'text-blue-600' 
                      : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                {step.subtitle && (
                  <div className="text-xs text-gray-400">{step.subtitle}</div>
                )}
              </div>
            </div>
            
            {/* Ligne de connexion entre les étapes */}
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-px mx-2 md:mx-4 ${
                  index < currentStep - 1 ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HorizontalStepper;
