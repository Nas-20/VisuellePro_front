import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Button, useMediaQuery, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar"; // Composant Navbar
import { DirectionsCar, Article } from "@mui/icons-material";
import SectionWidget from "./SectionWidget"; // Composant pour les sections

// Importation des composants spécifiques au propriétaire de véhicule
import Fleet from '../../Pages/Clients/Public/Fleet'; // Gestion des véhicules
import VehicleHistory from '../../Pages/Clients/Public/VehiculeHistory'; // Historique des véhicules
import SidebarOwner from "./SidebarOwner";
import VehicleOwnerDashboard from "../../Pages/Clients/Public/Proprietaire";

const OwnerDashboard = () => {
  const [open, setOpen] = useState(true); // État de la Sidebar
  const [activeSection, setActiveSection] = useState('Dashboard'); // Section active par défaut
  const isLargeScreen = useMediaQuery("(min-width:600px)"); // Vérification de la taille de l'écran

  const toggleDrawer = () => {
    setOpen(!open); // Ouvre/Ferme la Sidebar
  };

  // Fonction pour changer la section active
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (!isLargeScreen) {
      setOpen(false); // Ferme la Sidebar automatiquement sur petits écrans
    }
  };

  return (
    <Box maxWidth={true} sx={{ display: "flex", width: "100%", height: "100vh", bgcolor: "#e7e7e7", m: 0 }}>
      <CssBaseline />

      {/* Barre de navigation et Sidebar */}
      <Navbar toggleDrawer={toggleDrawer} isSidebarOpen={open} />
      <SidebarOwner open={open} toggleDrawer={toggleDrawer} isLargeScreen={isLargeScreen} onSectionChange={handleSectionChange} />

      {/* Section principale */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#e7e7e7",
          pl: 1,
          mt: 10,
          ml: open && isLargeScreen ? "290px" : "0px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {/* Widgets du tableau de bord */}
          {activeSection === 'Dashboard' && (
            <Grid item xs={12}>
              <SectionWidget
                icon={<DirectionsCar sx={{ fontSize: 40, color: "#fbfdfe " }} />}
                title="Aperçu des Véhicules"
                description="Gestion et suivi de vos véhicules publicitaires."
              />
              {/* Raccourcis pour la gestion des véhicules */}
              <Grid container spacing={2} maxWidth="lg" sx={{ pt: 2, m: 2, borderRadius: 5, pb: 8, bgcolor: "#392e22 " }}>
                <Grid item xs={12} md={4}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Fleet')}>
                    Gestion des Véhicules
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('VehicleHistory')}>
                    Historique des Véhicules
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Gestion des véhicules */}
          {activeSection === 'Fleet' && (
            <Grid item xs={12}>
              <SectionWidget
                icon={<DirectionsCar sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />}
                title="Gestion des Véhicules Publicitaires"
                description="Gérez et suivez vos véhicules publicitaires."
              />
              <VehicleOwnerDashboard />
            </Grid>
          )}

          {/* Historique des véhicules */}
          {activeSection === 'VehicleHistory' && (
            <Grid item xs={12}>
              <SectionWidget
                icon={<Article sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />}
                title="Historique des Véhicules"
                description="Consultez l'historique d'utilisation de vos véhicules."
              />
              <VehicleHistory />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default OwnerDashboard;
