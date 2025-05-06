import React, { useState, useEffect } from 'react';
import { useAVI } from '../context/AVIContext';
import { AVIService } from '../services/aviService';
import { FormationDetailsRequest } from '../types/contracts';
import HorizontalStepper from '../components/HorizontalStepper';

const FormationDetailsForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { userId, formationDetails, isLoading, error, currentStep } = state;
  
  const [formData, setFormData] = useState<Partial<FormationDetailsRequest>>({
    userId: userId || '',
    university: formationDetails?.university || '',
    program: formationDetails?.program || '',
    startDate: formationDetails?.startDate || '',
    endDate: formationDetails?.endDate || '',
    level: formationDetails?.level || 'bachelor'
  });
  
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  // Mettre à jour le formulaire lorsque les données du contexte changent
  useEffect(() => {
    if (userId) {
      setFormData(prevData => ({
        ...prevData,
        userId
      }));
    }
    
    if (formationDetails) {
      setFormData(prevData => ({
        ...prevData,
        ...formationDetails
      }));
    }
  }, [userId, formationDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      
      // Vérifier la taille des fichiers (max 5MB chacun)
      const oversizedFiles = fileList.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setFileError(`${oversizedFiles.length} fichier(s) trop volumineux. Taille maximale: 5MB par fichier`);
        return;
      }
      
      // Vérifier les types de fichiers
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const invalidFiles = fileList.filter(file => !allowedTypes.includes(file.type));
      if (invalidFiles.length > 0) {
        setFileError(`${invalidFiles.length} fichier(s) de type non supporté. Formats acceptés: PDF, JPG, PNG, DOC, DOCX`);
        return;
      }
      
      setSelectedFiles(fileList.map(file => file.name));
    }
  };

  const handleNext = async () => {
    // Valider les données du formulaire
    if (!formData.university || !formData.program || !formData.startDate) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez remplir tous les champs obligatoires' });
      return;
    }
    
    // Mettre à jour le contexte avec les données du formulaire
    dispatch({ type: 'SET_FORMATION_DETAILS', payload: formData });
    
    // Soumettre les détails de formation
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await AVIService.submitFormationDetails(formData as FormationDetailsRequest);
      
      if (response.success) {
        // Passer à l'étape suivante
        if (response.step) {
          dispatch({ type: 'SET_STEP', payload: response.step });
        } else {
          dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Une erreur est survenue lors de la soumission du formulaire' });
      console.error('Error submitting form:', err);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
  };

  // Configuration du stepper horizontal
  const steps = [
    {
      id: 1,
      title: 'Mes informations',
      isActive: false,
      isCompleted: true
    },
    {
      id: 2,
      title: 'Détails de la formation',
      isActive: true,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Payment info',
      subtitle: 'Lorem ipsum is simply',
      isActive: false,
      isCompleted: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <HorizontalStepper steps={steps} currentStep={2} />
      
      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'établissement d'accueil
          </label>
          <input
            type="text"
            name="university"
            value={formData.university || ''}
            onChange={handleInputChange}
            placeholder="Nom de l'université"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre de la formation
          </label>
          <input
            type="text"
            name="program"
            value={formData.program || ''}
            onChange={handleInputChange}
            placeholder="Ex: Informatique, Médecine, etc."
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleInputChange}
            placeholder="Ville où se déroule la formation"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de début de la formation
          </label>
          <div className="relative">
            <input
              type="text"
              name="startDate"
              value={formData.startDate || ''}
              onChange={handleInputChange}
              placeholder="jj/mm/aa"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attestation d'inscription / Lettre d'admission
          </label>
          <div className="flex items-center">
            <label className="flex-1 flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md border border-gray-300 cursor-pointer hover:bg-gray-300">
              <span className="mr-2">Choisir un fichier</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </label>
            <span className="px-4 py-2 bg-white text-gray-500 rounded-r-md border border-l-0 border-gray-300">
              {selectedFiles.length > 0 ? selectedFiles[0] : "Aucun fichier sélectionné"}
            </span>
          </div>
          {fileError && (
            <p className="mt-1 text-sm text-red-600">{fileError}</p>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4 max-w-3xl mx-auto">
        <button
          onClick={handlePrevious}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          disabled={isLoading}
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
            'Suivant'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormationDetailsForm;
