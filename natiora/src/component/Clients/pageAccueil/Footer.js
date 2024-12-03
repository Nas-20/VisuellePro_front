import React from 'react';
import { Container, Box, Typography, Link, Grid } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#fafafa',
        color: '#333',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={30}>
          {/* Colonne pour le texte VisuellePro */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ color: "#FF8C00", fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline' }}
            >
              Visuelle<Typography 
                component="span" 
                variant="h6" 
                sx={{ fontWeight: 'bold', color: "#3C82F6", textTransform: 'uppercase', textDecoration: 'underline' }}
              >
                Pro
              </Typography>
            </Typography>
            <Typography variant="body2">
              Découvrez les meilleurs produits personnalisés pour votre entreprise ou événement. Bannières, enseignes, et plus encore.
            </Typography>
          </Grid>

          {/* Colonne pour les liens rapides */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Liens Rapides
            </Typography>
            <Link href="/" color="inherit" underline="none">
              Accueil
            </Link>
            <br />
            <Link href="/search" color="inherit" underline="none">
              Produits
            </Link>
            <br />
            <Link href="/about" color="inherit" underline="none">
              À propos
            </Link>
            <br />
            <Link href="/contact" color="inherit" underline="none">
              Contact
            </Link>
          </Grid>

          {/* Colonne pour les mentions légales */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Mentions Légales
            </Typography>
            <Link href="/legal" color="inherit" underline="none">
              Conditions générales d'utilisation
            </Link>
            <br />
            <Link href="/privacy" color="inherit" underline="none">
              Politique de confidentialité
            </Link>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Ma Plateforme. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
