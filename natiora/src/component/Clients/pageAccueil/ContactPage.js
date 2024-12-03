import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactPage = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 17, pb: 10, bgcolor:"#fafafa" }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          mb: 12, 
          fontFamily: 'Poppins, sans-serif' 
        }}
      >
        Nous contacter
      </Typography>

      <Grid container spacing={4}>
        {/* Formulaire de contact */}
        <Grid item xs={12} md={6}>
          <Box 
            component="form" 
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl:"50%" }}
          >
            <TextField 
              fullWidth 
              label="Votre nom" 
              variant="outlined" 
              required 
            />

            <TextField 
              fullWidth 
              label="Votre email" 
              variant="outlined" 
              type="email" 
              required 
            />

            <TextField 
              fullWidth 
              label="Votre message" 
              variant="outlined" 
              multiline 
              rows={4} 
              required 
            />

            <Button 
              variant="contained" 
              color="primary" 
              sx={{ py: 1.5, fontSize: '16px', fontWeight: 'bold', borderRadius: '50px' }}
            >
              Envoyer
            </Button>
          </Box>
        </Grid>

        {/* Informations de contact */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              variant="h5" 
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Informations de contact
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton sx={{ color: 'primary.main', mr: 2 }}>
                <LocationOn />
              </IconButton>
              <Typography variant="body1">
                Lazaret CUR, Anstiranana, Madagascar
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton sx={{ color: 'primary.main', mr: 2 }}>
                <Phone />
              </IconButton>
              <Typography variant="body1">
                038 13 029 40
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton sx={{ color: 'primary.main', mr: 2 }}>
                <Email />
              </IconButton>
              <Typography variant="body1">
                contact@visuellepro.com
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
