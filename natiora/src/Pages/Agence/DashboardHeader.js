import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import agencyLogo from '../../component/asset/images/logo.png'; // Remplacer par le logo de l'agence

const drawerWidth = 300; // Largeur du sidebar

const AgencyDashboardHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3); // Exemple de notifications
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // Supprimer le token d'authentification de localStorage
    localStorage.removeItem("authToken");

    // Rediriger vers la page d'accueil
    navigate("/admin");

    // Empêcher l'accès aux pages protégées après déconnexion
    window.location.reload();
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: 'transparent', // Couleur de fond
        color: '#fff',
        boxShadow: 6, // Ombre
        position: 'sticky', // Coller en haut lors du défilement
        top: 0,
        left: drawerWidth, // Prendre en compte la largeur du sidebar
        width: `calc(100% - ${drawerWidth}px)`, // Ajuster la largeur du header
        zIndex: 1000, // Toujours visible au-dessus du contenu
        transition: 'width 0.3s ease', // Transition pour ajustement dynamique
      }}
    >
      {/* Section gauche : Logo de l'agence et titre du tableau de bord */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold',pl:3, color:"#F07B0C" }}>
          Gestion des Campagnes
        </Typography>
      </Box>

      {/* Section droite : Actions utilisateur */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Bouton Aide avec Tooltip */}
        <Tooltip title="Besoin d'aide ?">
          <IconButton sx={{ color: '#0483d1' }}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>

        {/* Icône Notifications avec Badge */}
        <Tooltip title="Voir les notifications">
          <IconButton sx={{ color: '#f20b0b' }}>
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Menu Utilisateur (Compte) */}
        <Tooltip title="Paramètres du compte">
          <IconButton onClick={handleMenuOpen} sx={{ color: '#0483d1' }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        {/* Menu déroulant du compte utilisateur */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{ mt: 3 }}
        >
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon sx={{ mr: 2 }} />
            Paramètres
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{ justifyContent: "flex-start", mt: "auto", color: "#FF0000" }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Se déconnecter
          </MenuItem>

        </Menu>
      </Box>
    </Box>
  );
};

export default AgencyDashboardHeader;
