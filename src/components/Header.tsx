import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-10 m-2 md:m-5 rounded-xl">
      <div className="flex justify-between items-center px-4 md:px-6 py-3">
        <div className="flex items-center">
          {/* Bouton hamburger pour mobile */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-2"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-700">Obtenir mon A.V.I</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="md:flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-600">Mon agence</span>
          </button>
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium text-gray-900">Moni Roy</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm md:text-base">
            MR
          </div>
          <button className="text-gray-400 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
