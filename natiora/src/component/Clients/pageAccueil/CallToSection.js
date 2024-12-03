import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const CallToActionSection = () => {
  return (
    <Box sx={{ bgcolor: '#151545', py: 10, color: '#fff', textAlign: 'center' }}>
      <Container maxWidth="md">
        {/* Titre de la section */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Rejoignez-nous maintenant !
        </Typography>

        {/* Description avec avantages */}
        <Typography variant="body1" sx={{ mb: 4, color: '#fff' }}>
          Créez un compte pour accéder à toutes nos fonctionnalités et gérez vos campagnes publicitaires en ligne.
        </Typography>

        {/* Boutons pour Connexion et Inscription */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {/* Bouton Connexion */}
          <Button
            variant="contained"
            href="/login"
            sx={{
              bgcolor: '#F07B0C',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              px: 4,
              py: 2,
              '&:hover': {
                bgcolor: '#FF8C00',
              },
            }}
          >
            Se connecter
          </Button>

          {/* Bouton Inscription */}
          <Button
            variant="outlined"
            href="/signup"
            sx={{
              borderColor: '#fff',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              px: 4,
              py: 2,
              '&:hover': {
                bgcolor: '#fff',
                color: '#1597B8',
              },
            }}
          >
            Créer un compte
          </Button>
        </Box>

        {/* Texte supplémentaire pour encourager l'utilisateur */}
        <Typography variant="body2" sx={{ mt: 4 }}>
          Vous avez déjà un compte ? <a href="/login" style={{ color: '#fff', textDecoration: 'underline' }}>Connectez-vous</a>
        </Typography>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
