import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../../../component/Clients/pageAccueil/Navbar'; // Importer la barre de navigation
import Footer from '../../../component/Clients/pageAccueil/Footer';

function HomePage() {
  return (
    <>
      <Navbar /> {/* Inclure la barre de navigation */}
      <Container>
        {/* Bannière principale */}
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '50px',
            textAlign: 'center',
            marginBottom: '50px',
          }}
        >
          <Typography variant="h2" gutterBottom>
            Bienvenue sur notre plateforme de personnalisation
          </Typography>
          <Typography variant="h5" gutterBottom>
            Personnalisez vos enseignes, bannières, et bien plus encore en quelques clics !
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/products" sx={{ mt: 3 }}>
            Découvrez nos produits
          </Button>
        </Box>

        {/* Section des catégories de produits */}
        <Typography variant="h4" gutterBottom>
          Nos Catégories de Produits
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/enseignes.jpg" // Remplacez par l'URL de l'image
                alt="Enseignes"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Enseignes
                </Typography>
                <Typography variant="body2">
                  Personnalisez vos enseignes pour donner de la visibilité à votre entreprise.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to="/products">
                  Voir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/bannieres.jpg" // Remplacez par l'URL de l'image
                alt="Bannières"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Bannières
                </Typography>
                <Typography variant="body2">
                  Créez des bannières attractives pour vos événements ou promotions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to="/products">
                  Voir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Section "À propos", "Contact", etc. */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            En savoir plus
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    À propos
                  </Typography>
                  <Typography variant="body2">
                    Découvrez notre histoire, nos missions, et ce qui rend notre plateforme unique.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to="/about">
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Contact
                  </Typography>
                  <Typography variant="body2">
                    Vous avez des questions ? N'hésitez pas à nous contacter !
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to="/contact">
                    Contactez-nous
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Section des pages légales */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5">Mentions Légales</Typography>
          <Button size="small" color="secondary" component={Link} to="/legal">
            Lire les conditions générales
          </Button>
        </Box>
      </Container>
      <Footer/>
    </>
  );
}

export default HomePage;
