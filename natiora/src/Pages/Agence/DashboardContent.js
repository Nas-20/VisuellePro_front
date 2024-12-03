import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, Button } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import CampaignManagement from './CampaignManagement'; 
import VehicleSearchForCampaign from '../Agence/VehiculeData'; 

const DashboardContent = ({ selectedSection }) => {
  const [campaigns, setCampaigns] = useState([
    { name: 'Lancement Produit A', status: 'Active', vehicles: 5, revenue: '5 000 000 Ar' },
    { name: 'Promotion Été 2024', status: 'Active', vehicles: 7, revenue: '10 000 000 Ar' },
  ]);

  const [vehicles, setVehicles] = useState([
    { name: 'Véhicule 1', status: 'Disponible' },
    { name: 'Véhicule 2', status: 'Utilisé' },
    { name: 'Véhicule 3', status: 'Disponible' },
  ]);

  const [notifications, setNotifications] = useState([
    { message: 'Nouvelle campagne activée', time: 'Il y a 2 heures' },
    { message: 'Véhicule ajouté à la campagne', time: 'Il y a 4 heures' },
    { message: 'Campagne terminée', time: 'Il y a 1 jour' },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      {selectedSection === 'dashboard' && (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Vue d'ensemble du Tableau de Bord
          </Typography>

          {/* Section des indicateurs clés */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                <CampaignIcon sx={{ fontSize: 40, color: '#FFC107' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Campagnes Actives</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1597B8' }}>5</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                <DirectionsCarIcon sx={{ fontSize: 40, color: '#28A745' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Véhicules Utilisés</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1597B8' }}>12</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#DC3545' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Revenus Générés</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1597B8' }}>15 000 000 Ar</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                <NotificationsIcon sx={{ fontSize: 40, color: '#FF6F61' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Notifications</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1597B8' }}>3</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Section Gestion des Campagnes */}
          <Box sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Campagnes Actives</Typography>
              <Button variant="contained" sx={{ bgcolor: '#28A745', fontWeight: 'bold' }}>
                <AddIcon /> Nouvelle Campagne
              </Button>
            </Box>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              {campaigns.map((campaign, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6">{campaign.name}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>Status: {campaign.status}</Typography>
                  <Typography>Véhicules: {campaign.vehicles}</Typography>
                  <Typography>Revenus: {campaign.revenue}</Typography>
                </Box>
              ))}
            </Paper>
          </Box>

          {/* Section Gestion des Véhicules */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Véhicules Disponibles</Typography>
            <Grid container spacing={3}>
              {vehicles.map((vehicle, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
                    <Typography variant="h6">{vehicle.name}</Typography>
                    <Typography>Status: {vehicle.status}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Notifications Récentes */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications Récentes</Typography>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              {notifications.map((notification, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="body1">{notification.message}</Typography>
                  <Typography variant="caption">{notification.time}</Typography>
                </Box>
              ))}
            </Paper>
          </Box>
        </>
      )}

      {/* Section Gestion des Campagnes */}
      {selectedSection === 'campaigns' && (
        <CampaignManagement />
      )}

      {/* Section Recherche de Véhicules pour une Campagne */}
      {selectedSection === 'vehicles' && (
        <VehicleSearchForCampaign />
      )}

      {/* Section Notifications */}
      {selectedSection === 'notifications' && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            {notifications.map((notification, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption">{notification.time}</Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default DashboardContent;
