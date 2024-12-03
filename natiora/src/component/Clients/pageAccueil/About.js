import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Footer from "../../../component/Clients/pageAccueil/Footer";


const About = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>

      {/* Contenu principal */}
      <Container maxWidth="lg" sx={{ flex: '1 0 auto', my: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 4, 
            fontFamily: 'Poppins, sans-serif' 
          }}
        >
          À propos de notre plateforme
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: '#555', 
            lineHeight: '1.6', 
            mb: 4,
            textAlign: 'center'
          }}
        >
          Bienvenue sur VisuellePro, votre solution tout-en-un pour la production et la gestion de supports de communication visuels. 
          Notre mission est de vous fournir les outils nécessaires pour personnaliser vos campagnes publicitaires 
          et gérer vos supports visuels de manière efficace et intuitive.
        </Typography>

        {/* Section en colonnes */}
        <Grid container spacing={4}>
          {/* Première colonne : Fonctionnalités */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Nos fonctionnalités principales :
            </Typography>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#555' }}>
              <li>Personnalisation de bannières et enseignes publicitaires</li>
              <li>Habillage de véhicules pour campagnes promotionnelles</li>
              <li>Gestion de flotte publicitaire</li>
              <li>Gestion de vos campagnes publicitaires de bout en bout</li>
              <li>Système de paiement sécurisé pour vos transactions</li>
            </ul>
          </Grid>

          {/* Deuxième colonne : Valeurs et vision */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Nos valeurs :
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
              Nous croyons en l'innovation et l'efficacité. Notre équipe s'engage à vous fournir des solutions 
              adaptées à vos besoins en matière de communication visuelle. Nous mettons un point d'honneur à 
              offrir une expérience utilisateur simple et efficace, avec des outils à la pointe de la technologie.
            </Typography>

            <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
              Nos services s'adressent à tout le monde, que vous soyez une entreprise cherchant à maximiser 
              l'impact de ses campagnes ou un particulier désireux de personnaliser ses supports de communication.
            </Typography>
          </Grid>
        </Grid>

        {/* Appel à l'action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: "#1597B8", 
              color: "#fff", 
              textTransform: "none", 
              px: 5, 
              py: 2, 
              fontSize: "16px", 
              borderRadius: "50px", 
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#FF8C00' }
            }}
          >
            En savoir plus sur nos services
          </Button>
        </Box>
      </Container>

      {/* Footer en bas de la page */}
      <Box sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default About;
