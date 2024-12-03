import React from 'react';
import { Container, Typography, Grid, Box, Card, CardContent } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

// Les données des fonctionnalités clés
const features = [
  {
    title: 'Personnalisation des Produits',
    description: 'Créez et personnalisez vos supports visuels uniques en ligne, tels que des affiches, bannières, et plus encore.',
    icon: <CheckCircleOutline sx={{ color: '#1597B8', fontSize: 50 }} />, // Icône
  },
  {
    title: 'Gestion des Campagnes Publicitaires',
    description: 'Lancez et gérez vos campagnes publicitaires sur des véhicules avec un suivi en temps réel.',
    icon: <CheckCircleOutline sx={{ color: '#F07B0C', fontSize: 50 }} />,
  },
  {
    title: 'Paiement Sécurisé',
    description: 'Bénéficiez d’un système de paiement sécurisé pour finaliser vos commandes et campagnes en toute confiance.',
    icon: <CheckCircleOutline sx={{ color: '#1597B8', fontSize: 50 }} />,
  },
];

const FeatureSection = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#F9F9F8" }}>
      <Container maxWidth="lg">
        {/* Titre de la section */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', mb: 5, color: '#333' }}
        >
          Pourquoi choisir VisuellePro ?
        </Typography>

        {/* Grille des fonctionnalités */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ boxShadow: 5, borderRadius: 3, height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  {/* Icône */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    {feature.icon}
                  </Box>

                  {/* Titre de la fonctionnalité */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description de la fonctionnalité */}
                  <Typography variant="body1" sx={{ color: '#555' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;
