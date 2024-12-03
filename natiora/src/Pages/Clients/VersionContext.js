import React, { createContext, useState, useContext } from 'react';

// Créer le contexte pour les versions de design
const VersionContext = createContext();

// Le fournisseur de versions
export const VersionProvider = ({ children }) => {
  const [versions, setVersions] = useState([]);
  const [currentDesign, setCurrentDesign] = useState(null);

  const saveVersion = () => {
    setVersions([...versions, currentDesign]);
  };

  return (
    <VersionContext.Provider value={{ saveVersion, setCurrentDesign, currentDesign }}>
      {children}
    </VersionContext.Provider>
  );
};

// Custom hook pour utiliser le contexte des versions
export const useVersions = () => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersions must be used within a VersionProvider');
  }
  return context;
};
