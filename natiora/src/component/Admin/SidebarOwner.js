import React from "react";
import { Drawer, Box, Button } from "@mui/material";
import {
  Home as HomeIcon,
  DirectionsCar as DirectionsCarIcon,
  Article as HistoryIcon,
} from "@mui/icons-material";

const SidebarOwner = ({ open, toggleDrawer, isLargeScreen, onSectionChange }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      variant={isLargeScreen ? (open ? "persistent" : "temporary") : "temporary"}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
          background: "linear-gradient(60deg, #FF8C00 5%, #000000 80%)", // Dégradé noir vers orange
          color: "white",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          padding: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pt: 12,
          margin: 3,
        }}
      >
        {/* Contenu du Sidebar pour le propriétaire */}
        <Box sx={{ flexGrow: 1 }}>
          <Button
            startIcon={<HomeIcon />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 4,
              '&:hover': {
                color: "#dad8d7", // Couleur lors du survol
              },
              transition: "color 0.3s ease",
            }}
            onClick={() => onSectionChange("Dashboard")}
          >
            Accueil
          </Button>

          <Button
            startIcon={<DirectionsCarIcon />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 4,
              '&:hover': {
                color: "#FF8C00", // Couleur lors du survol
              },
              transition: "color 0.3s ease",
            }}
            onClick={() => onSectionChange("Fleet")}
          >
            Gestion des Véhicules
          </Button>

          <Button
            startIcon={<HistoryIcon />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 4,
              '&:hover': {
                color: "#FF8C00",
              },
              transition: "color 0.3s ease",
            }}
            onClick={() => onSectionChange("VehicleHistory")}
          >
            Historique des Véhicules
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarOwner;
