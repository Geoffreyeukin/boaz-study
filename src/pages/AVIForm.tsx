import React, { useState, useEffect } from 'react';
import { useAVI } from '../context/AVIContext';
import { AVIService } from '../services/aviService';
import { PersonalInfoRequest } from '../types/contracts';
import HorizontalStepper from '../components/HorizontalStepper';

const AVIForm: React.FC = () => {
  const { state, dispatch } = useAVI();
  const { userId, personalInfo, isLoading, error, currentStep } = state;
  
  const [formData, setFormData] = useState<Partial<PersonalInfoRequest>>({
    userId: userId || '',
    firstName: personalInfo?.firstName || '',
    lastName: personalInfo?.lastName || '',
    email: personalInfo?.email || '',
    phoneCode: personalInfo?.phoneCode || '+237',
    phoneNumber: personalInfo?.phoneNumber || '',
    passportNumber: personalInfo?.passportNumber || '',
    passportIssueDate: personalInfo?.passportIssueDate || '',
    passportExpiryDate: personalInfo?.passportExpiryDate || '',
    passportScan: personalInfo?.passportScan || undefined
  });
  
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);

  // Mettre à jour le formulaire lorsque les données du contexte changent
  useEffect(() => {
    if (personalInfo) {
      setFormData(prevData => ({
        ...prevData,
        ...personalInfo
      }));
      
      if (personalInfo.passportScan) {
        setSelectedFile('Passeport téléchargé');
      }
    }
  }, [personalInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('Le fichier est trop volumineux. Taille maximale: 5MB');
        setSelectedFile('');
        return;
      }
      
      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Type de fichier non supporté. Veuillez utiliser JPG, PNG ou PDF');
        setSelectedFile('');
        return;
      }
      
      setSelectedFile(file.name);
      setFileError(null);
      
      // Convertir le fichier en base64 pour le stockage
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData({
            ...formData,
            passportScan: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Valider les données du formulaire
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez remplir tous les champs obligatoires' });
      return;
    }
    
    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez entrer une adresse email valide' });
      return;
    }
    
    // Valider le numéro de téléphone
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      dispatch({ type: 'SET_ERROR', payload: 'Veuillez entrer un numéro de téléphone valide (9 chiffres)' });
      return;
    }
    
    // Mettre à jour le contexte avec les données du formulaire
    dispatch({ type: 'SET_PERSONAL_INFO', payload: formData });
    
    // Soumettre les informations personnelles
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await AVIService.submitPersonalInfo(formData as PersonalInfoRequest);
      
      if (response.success) {
        // Passer à l'étape suivante (détails de formation)
        dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
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

  const handleCancel = () => {
    // Rediriger vers la page d'accueil ou réinitialiser le formulaire
    dispatch({ type: 'RESET_FORM' });
    // Rediriger vers la page d'accueil
    window.location.href = '/';
  };

  // Configuration du stepper horizontal
  const steps = [
    {
      id: 1,
      title: 'Informations Personnelles',
      isActive: currentStep === 1,
      isCompleted: currentStep > 1
    },
    {
      id: 2,
      title: 'Détails de la Formation',
      isActive: currentStep === 2,
      isCompleted: currentStep > 2
    },
    {
      id: 3,
      title: 'Informations Financières',
      subtitle: 'et Autres Détails',
      isActive: currentStep === 3,
      isCompleted: currentStep > 3
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 sm:p-6">
      {/* Stepper dans la card uniquement */}
      <HorizontalStepper steps={steps} currentStep={currentStep} />
      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleInputChange}
            placeholder="Moni"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            placeholder="Roy"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            placeholder="Moniroy22@gmail.com"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de téléphone
          </label>
          <div className="flex">
            <div className="relative w-1/4">
              <select
                name="phoneCode"
                value={formData.phoneCode || '+237'}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-l-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+237">+237</option>
                <option value="+33">+33</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleInputChange}
              placeholder="696418984"
              className="w-3/4 px-4 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de passeport
          </label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber || ''}
            onChange={handleInputChange}
            placeholder="Numéro de passeport"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de délivrance du passeport
          </label>
          <input
            type="date"
            name="passportIssueDate"
            value={formData.passportIssueDate || ''}
            onChange={handleInputChange}
            placeholder="jj/mm/aa"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date d'expiration du passeport
          </label>
          <input
            type="date"
            name="passportExpiryDate"
            value={formData.passportExpiryDate || ''}
            onChange={handleInputChange}
            placeholder="jj/mm/aa"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scan du passeport
          </label>
          <div className="flex items-center">
            <label className="flex-1 flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md border border-gray-300 cursor-pointer hover:bg-gray-300">
              <span className="mr-2">Choisir un fichier</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
            <span className="px-4 py-2 bg-white text-gray-500 rounded-r-md border border-l-0 border-gray-300">
              {selectedFile || "Aucun fichier sélectionné"}
            </span>
          </div>
          {fileError && (
            <p className="mt-1 text-sm text-red-600">{fileError}</p>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 w-full sm:w-auto"
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 w-full sm:w-auto"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
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

export default AVIForm;
