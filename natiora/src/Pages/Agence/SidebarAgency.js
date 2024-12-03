import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import agencyLogo from '../../component/asset/images/logo.png'; // Logo de l'agence

const Sidebar = ({ setSelectedSection }) => {
  // Liste des items du sidebar
  const menuItems = [
    { text: 'Tableau de bord', icon: <TrendingUpIcon />, section: 'dashboard' },
    { text: 'Campagnes', icon: <CampaignIcon />, section: 'campaigns' }, // Section "Campagnes"
    { text: 'Véhicules', icon: <DirectionsCarIcon />, section: 'vehicles' },
    { text: 'Notifications', icon: <NotificationsIcon />, section: 'notifications' },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        variant="persistent"
        open
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: '#1E2A38',
            color: '#fff',
            width: 290,
            boxSizing: 'border-box',
            boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar
            src={agencyLogo}
            alt="Logo Agence"
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Agence Pro
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => setSelectedSection(item.section)} // Changer la section affichée
              sx={{
                '&:hover': {
                  bgcolor: '#1597B8',
                },
                mb: 1,
                px: 3,
              }}
            >
              <ListItemIcon sx={{ color: '#FF6F61' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mt: 20 }} />

        <List>
          <ListItem button onClick={() => setSelectedSection('settings')} sx={{ px: 3 }}>
            <ListItemIcon sx={{ color: '#FF6F61' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Paramètres" sx={{ color: '#fff', fontWeight: 'bold' }} />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('logout')} sx={{ px: 3 }}>
            <ListItemIcon sx={{ color: '#FF6F61' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" sx={{ color: '#fff', fontWeight: 'bold' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
