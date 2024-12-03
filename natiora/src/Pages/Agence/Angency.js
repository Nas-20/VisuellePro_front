import React, { useState } from 'react';
import { Box } from '@mui/material';
import AgencyDashboardHeader from './DashboardHeader'; // Importer le header
import Sidebar from './SidebarAgency'; // Importer le Sidebar
import DashboardContent from './DashboardContent'; // Contenu principal dynamique

const AgencyDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard'); // Gérer la section active

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar section */}
      <Sidebar setSelectedSection={setSelectedSection} /> {/* Passer la fonction pour changer la section */}

      {/* Main content section */}
      <Box sx={{ flexGrow: 1, p: 0 }}>
        <AgencyDashboardHeader /> {/* Header adaptatif */}
        
        {/* Le contenu principal */}
        <Box sx={{ mt: 3, pl: 40 }}>
          <DashboardContent selectedSection={selectedSection} /> {/* Afficher la section sélectionnée */}
        </Box>
      </Box>
    </Box>
  );
};

export default AgencyDashboard;
