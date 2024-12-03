import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PaymentsIcon from '@mui/icons-material/Payments';
import GroupIcon from '@mui/icons-material/Group';

const FunctionSection = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 10 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', mb: 6, color: '#333' }}
      >
        Fonctionnalités Clés de VisuellePro
      </Typography>

      <Grid container spacing={4}>
        {/* Fonctionnalité 1: Personnalisation de Produits Visuels */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 10, borderRadius: 3, textAlign: 'center' }}>
            <CardContent>
              <DesignServicesIcon sx={{ fontSize: 50, color: '#F07B0C' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Personnalisation de Produits
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
                Créez et personnalisez vos supports visuels tels que des bannières, enseignes et autocollants.
              </Typography>
              {/* Bouton CTA */}
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#1597B8', color: '#fff' }}
                href="/customer"
              >
                Personnalisez Maintenant
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Fonctionnalité 2: Gestion de Campagnes Publicitaires */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 10, borderRadius: 3, textAlign: 'center' }}>
            <CardContent>
              <CampaignIcon sx={{ fontSize: 50, color: '#F07B0C' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Gestion des Campagnes
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
                Gérez vos campagnes publicitaires en attribuant des véhicules et en suivant les performances.
              </Typography>
              {/* Bouton CTA */}
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#1597B8', color: '#fff' }}
                href="/campaigns"
              >
                Gérez Votre Campagne
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Fonctionnalité 3: Paiement Sécurisé */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 10, borderRadius: 3, textAlign: 'center' }}>
            <CardContent>
              <PaymentsIcon sx={{ fontSize: 50, color: '#F07B0C' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Paiement Sécurisé
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
                Effectuez vos paiements en toute sécurité grâce à notre système de paiement en ligne.
              </Typography>
              {/* Bouton CTA */}
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#1597B8', color: '#fff' }}
                href="/payment-info"
              >
                En savoir plus
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Fonctionnalité 4: Gestion des Utilisateurs et des Rôles */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 10, borderRadius: 3, textAlign: 'center' }}>
            <CardContent>
              <GroupIcon sx={{ fontSize: 50, color: '#F07B0C' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Gestion des Utilisateurs
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
                Gérez les différents types d’utilisateurs : clients, agences, et propriétaires de véhicules.
              </Typography>
              {/* Bouton CTA */}
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#1597B8', color: '#fff' }}
                href="/register"
              >
                Inscrivez-vous Maintenant
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FunctionSection;
