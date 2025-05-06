import React from 'react';

interface Step {
  id: number;
  title: string;
  description?: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface VerticalStepperProps {
  steps: Step[];
  onStepClick?: (stepId: number) => void;
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({ steps, onStepClick }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-medium text-gray-700 mb-6 text-center">Parcours à suivre</h2>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Ligne de connexion entre les étapes */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute left-4 top-10 w-0.5 h-full -ml-px ${
                  step.isCompleted ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
            
            {/* Étape */}
            <div className="flex items-start group">
              {/* Cercle numéroté */}
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                  step.isActive 
                    ? 'bg-blue-500 text-white' 
                    : step.isCompleted 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.isCompleted ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              
              {/* Contenu de l'étape */}
              <div 
                className={`ml-4 flex-1 p-3 border rounded-md ${
                  step.isActive 
                    ? 'border-blue-500 bg-white' 
                    : 'border-gray-200 bg-white'
                }`}
                onClick={() => onStepClick && onStepClick(step.id)}
              >
                <div className="flex justify-between items-center">
                  <span 
                    className={`font-medium ${
                      step.isActive ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {step.title}
                  </span>
                  
                  {step.isActive ? (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
                      Revenir
                    </span>
                  ) : (
                    <button 
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStepClick && onStepClick(step.id);
                      }}
                    >
                      Aller à l'étape
                    </button>
                  )}
                </div>
                
                {step.isActive && step.description && (
                  <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Télécharger un résumé
        </button>
        
        <button 
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Commencer
        </button>
      </div>
    </div>
  );
};

export default VerticalStepper;
