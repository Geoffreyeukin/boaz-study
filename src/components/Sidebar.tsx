import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  // État pour chaque menu déroulant
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="bg-white w-full md:w-56 shadow-md flex flex-col md:m-5 rounded-xl py-5 h-full overflow-y-auto">
      <div className="p-4">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="Boaz Study" 
            className="h-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjxwYXRoIGZpbGw9IiMxZTQwYWYiIGQ9Ik0yMCAxMGMwLTUuNTIzIDQuNDc3LTEwIDEwLTEwczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEwek01MCAxMGMwLTUuNTIzIDQuNDc3LTEwIDEwLTEwczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEweiIvPjxwYXRoIGZpbGw9IiNmNTllMGIiIGQ9Ik0yMCAzMGMwLTUuNTIzIDQuNDc3LTEwIDEwLTEwczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEweiIvPjx0ZXh0IHg9IjcwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFlNDBhZiI+Ym9hejwvdGV4dD48dGV4dCB4PSI3MCIgeT0iMzgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzFlNDBhZiI+c3R1ZHk8L3RleHQ+PC9zdmc+';
            }}
          />
          <span className="ml-2 text-boaz-primary font-bold">boaz</span>
          <span className="text-gray-500 text-sm ml-1">study</span>
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 bg-white space-y-1">
        <Link to="/" className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 rounded-md bg-blue-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Accueil
        </Link>

        {/* Mon agence (déroulant) */}
        <div className="pt-4 pb-2">
          <button type="button" className="flex items-center px-4 w-full focus:outline-none" onClick={() => toggleMenu('agence')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Mon agence</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto h-5 w-5 text-gray-400 transform transition-transform ${openMenus['agence'] ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {openMenus['agence'] && (
            <div className="mt-1 space-y-1">
              <Link to="/agence/infos" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Infos agence</Link>
              <Link to="/agence/contacts" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Contacts</Link>
            </div>
          )}
        </div>

        {/* Services (déroulant) */}
        <div className="pt-4 pb-2">
          <button type="button" className="flex items-center px-4 w-full focus:outline-none" onClick={() => toggleMenu('services')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Services</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto h-5 w-5 text-gray-400 transform transition-transform ${openMenus['services'] ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {openMenus['services'] && (
            <div className="mt-1 space-y-1">
              <Link to="/services/avi" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Attestation de virement</Link>
              <Link to="/services/visa" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Visa</Link>
              <Link to="/services/logement" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Logement</Link>
            </div>
          )}
        </div>

        {/* Mes souscriptions (déroulant) */}
        <div className="pt-4 pb-2">
          <button type="button" className="flex items-center px-4 w-full focus:outline-none" onClick={() => toggleMenu('souscriptions')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Mes souscriptions</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto h-5 w-5 text-gray-400 transform transition-transform ${openMenus['souscriptions'] ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {openMenus['souscriptions'] && (
            <div className="mt-1 space-y-1">
              <Link to="/souscriptions/services" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Services</Link>
              <Link to="/souscriptions/financement" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Financement</Link>
              <Link to="/souscriptions/remboursements" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Remboursements</Link>
            </div>
          )}
        </div>

        <Link to="/preuves" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Preuves de versement
        </Link>

        {/* Mon Wallet Boaz (déroulant) */}
        <div className="pt-4 pb-2">
          <button type="button" className="flex items-center px-4 w-full focus:outline-none" onClick={() => toggleMenu('wallet')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Mon Wallet Boaz</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto h-5 w-5 text-gray-400 transform transition-transform ${openMenus['wallet'] ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {openMenus['wallet'] && (
            <div className="mt-1 space-y-1">
              <Link to="/wallet/historiques" className="flex items-center pl-12 pr-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">Mes historiques</Link>
            </div>
          )}
        </div>

        <Link to="/affiliation" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Programme d'affiliation
        </Link>

        <div className="pt-4 mt-6 border-t border-gray-200">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">GENERAL</h3>
        </div>

        <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          Tableau de bord
        </Link>

        <Link to="/parametres" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Paramètres
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
