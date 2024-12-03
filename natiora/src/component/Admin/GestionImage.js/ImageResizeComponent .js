import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

const ImageResizeComponent = ({ image }) => {
  const [size, setSize] = useState(100);

  const handleSizeChange = (event, newValue) => {
    setSize(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Redimensionner l'image</Typography>
      {/* Fournissez un alt pertinent décrivant l'image */}
      <img src={image} alt="Image du produit" style={{ width: `${size}%`, borderRadius: '10px' }} />
      <Box sx={{ mt: 2 }}>
        <Typography>Choisissez la taille de l'image:</Typography>
        <Slider
          value={size}
          onChange={handleSizeChange}
          aria-labelledby="size-slider"
          valueLabelDisplay="auto"
          min={10}
          max={200}
        />
      </Box>
    </Box>
  );
};

export default ImageResizeComponent;
