import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import presentation from "../../../component/asset/images/presentation.jpg";
import campaignImage from "../../../component/asset/images/campaigne.jpg";
import securePaymentImage from "../../../component/asset/images/payement.jpg";
import fleetManagementImage from "../../../component/asset/images/flotte.jpg";

const ProductCustomizationFeature = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate

  const features = [
    {
      id: 1,
      title: 'Personnaliser avec VisuellePro',
      description: 'Créez et personnalisez vos supports visuels tels que des bannières, enseignes, habillage véhicule et plus encore avec nos outils professionnels faciles à utiliser.',
      icon: '🔧',
      buttonText: 'Personnaliser maintenant',
      imgSrc: presentation,
      imgWidth: '70%', 
      imgHeight: 'auto', 
      imgMargin: 12, 
      buttonLink: '/personalize', // Lien pour redirection
    },
    {
      id: 2,
      title: 'Gérez vos campagnes publicitaires',
      description: 'Gérez et optimisez vos campagnes publicitaires avec notre solution complète. Maximisez l\'impact de vos annonces sur tous les types de supports, y compris les véhicules.',
      icon: '🚚',
      buttonText: 'Gérer vos campagnes',
      imgSrc: campaignImage,
      imgWidth: '70%', 
      imgHeight: 'auto', 
      imgMargin: 12, 
      buttonLink: '/manage-campaigns', // Lien pour redirection
    },
    {
      id: 3,
      title: 'Bénéficiez d\'un paiement sécurisé',
      description: 'Effectuez vos transactions en toute confiance grâce à notre système de paiement en ligne sécurisé et fiable, pour toutes vos commandes.',
      icon: '💳',
      buttonText: 'En savoir plus',
      imgSrc: securePaymentImage,
      imgWidth: '70%', 
      imgHeight: 'auto', 
      imgMargin: 10, 
      buttonLink: '/secure-payment', // Lien pour redirection
    },
    {
      id: 4,
      title: 'Optimisez votre gestion de flotte',
      description: 'Gérez et affectez vos véhicules pour vos campagnes publicitaires de manière optimale avec des outils dédiés.',
      icon: '🚗',
      buttonText: 'Gérer votre flotte',
      imgSrc: fleetManagementImage,
      imgWidth: '70%', 
      imgHeight: 'auto',
      imgMargin: 10, 
      buttonLink: '/fleet-management', // Lien pour redirection
    },
  ];

  // Fonction pour rediriger vers la page de chaque fonctionnalité
  const handleRedirect = (link) => {
    navigate(link); // Utilise navigate pour rediriger
  };

  return (
    <>
      {/* Box indépendant pour le titre */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          bgcolor: '#BEBDBA', 
          py: 4,  
          mt: -13,
          pb:12,
          pt:12,
          borderRadius:0,
          px: 0, 
          boxShadow: 3, 
          borderTopRightRadius:0,
          borderTopLeftRadius:0,
          mb: 6,  
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#0C0C0C', 
            fontWeight: 'bold', 
            fontFamily: 'Poppins, sans-serif',
            mb: 2
          }}
        >
          Découvrez nos fonctionnalités clés
        </Typography>

        <Box sx={{ width: '60px', height: '5px', bgcolor: '#1597B8', mb: 2, mx: 'auto' }}></Box>

        <Typography 
          variant="h6" 
          sx={{ color: '#fafafa', lineHeight: '1.6' }}
        >
          Simplifiez et optimisez la gestion de vos campagnes publicitaires avec nos outils professionnels dédiés.
        </Typography>
      </Box>

      <Box
        sx={{
          borderRadius: '60px', 
          boxShadow: '20px 18px 18px rgba(0, 0, 0, 0.2)',  
          border: '2px solid #fff', 
          padding: '0px',
          mt:-12,
          ml:4,
          mr:4,  
          bgcolor: '#fff',  
        }}
      >
        {/* Container pour les fonctionnalités */}
        <Container maxWidth="xl" sx={{ mt: 8, mb: 8, fontFamily: 'Roboto, sans-serif' }}>
          {features.map((feature, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ mb: 4 }}
              key={feature.id}
              direction={index % 2 === 0 ? 'row' : 'row-reverse'}  
            >
              {/* Texte */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ maxWidth: '500px', textAlign: index % 2 === 0 ? 'left' : 'left', ml: { md: 14 }, mr: { md: index % 2 !== 0 ? 10 : 0 } }}>
                  <Box>
                    <Typography variant="h4" sx={{ color: '#555' }}>
                      {feature.icon}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="h4" 
                    sx={{ color: '#333', mb: 1, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>

                  <Box sx={{ width: '50px', height: '4px', bgcolor: '#1597B8', mb: 3 }}></Box> 

                  <Typography variant="body1" sx={{ color: '#555', mb: 3, lineHeight: '1.5', fontSize: '16px' }}>
                    {feature.description}
                  </Typography>

                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: '#000', 
                      color: '#fff', 
                      padding: '8px 16px', 
                      borderRadius: '50px', 
                      fontSize: '14px', 
                      boxShadow: 3, 
                      '&:hover': { bgcolor: '#FF8C00' },
                    }}
                    onClick={() => handleRedirect(feature.buttonLink)} // Redirection
                  >
                    {feature.buttonText}
                  </Button>
                </Box>
              </Grid>

              {/* Image */}
              <Grid item xs={12} md={6}>
                <Box 
                  component="img" 
                  src={feature.imgSrc} 
                  alt={feature.title} 
                  sx={{ 
                    width: feature.imgWidth,  
                    height: feature.imgHeight,  
                    borderRadius: '15px', 
                    boxShadow: 3, 
                    display: { xs: 'none', md: 'block' },  
                    margin: feature.imgMargin,  
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 5,
                    },
                  }} 
                />
              </Grid>
            </Grid>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default ProductCustomizationFeature;
