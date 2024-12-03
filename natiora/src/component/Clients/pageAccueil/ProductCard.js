import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

// Fonction pour formater le prix en MGA
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MGA' }).format(price);
};

const ProductCard = ({ image, title, alt, price, description, customization }) => {
  const [showDetails, setShowDetails] = useState(false); // État pour basculer entre les détails

  // Fonction pour basculer les détails
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        boxShadow: 10,
        bgcolor: '#211c0e',
        borderRadius: 3,
        marginRight: 5,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={alt}
        image={image}
        sx={{ height: '250px', objectFit: 'cover' }}
      />
      <CardContent>
        {/* Nom du produit */}
        <Typography gutterBottom variant="body1" sx={{ color: "#fff", fontWeight: 'bold' }}>
          {title}
        </Typography>

        {/* Prix du produit */}
        {price && (
          <Typography variant="body2" sx={{ color: "#fafafa" }}>
            Prix : {formatPrice(price)}
          </Typography>
        )}

        {/* Dimensions uniquement */}
        {customization && (
          <Typography variant="body2" sx={{ color: "#fafafa", marginTop: '8px' }}>
            Dimensions : {customization.dimensions}
          </Typography>
        )}

        {/* Affichage conditionnel des détails supplémentaires */}
        {showDetails && (
          <>
            {description && (
              <Typography variant="body2" sx={{ color: "#fafafa", marginTop: '8px' }}>
                {description}
              </Typography>
            )}

            <Typography variant="body2" sx={{ color: "#fafafa", marginTop: '8px' }}>
              Couleurs : {customization.colors}
            </Typography>
            <Typography variant="body2" sx={{ color: "#fafafa" }}>
              Matériaux : {customization.materials}
            </Typography>
            <Typography variant="body2" sx={{ color: "#fafafa" }}>
              Finition : {customization.finishOptions}
            </Typography>
          </>
        )}

        {/* Bouton pour basculer entre les détails minimaux et complets */}
        <Button
          variant="contained"
          onClick={toggleDetails}
          sx={{ marginTop: '10px', bgcolor: "#ec8817", color: "#fff", '&:hover': { bgcolor: "#d07015" } }}
        >
          {showDetails ? 'Moins de détails' : 'Plus de détails'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

