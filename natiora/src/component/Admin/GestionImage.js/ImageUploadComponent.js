import React, { useState } from 'react';
import { Button, Grid, Typography, Box, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ImageUploadComponent = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    setImages([...images, ...newImages]);
  };

  return (
    <Box sx={{ p: 3, border: '2px dashed #ccc', borderRadius: '10px', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Importez vos images de produits</Typography>
      <Button variant="contained" component="label" startIcon={<PhotoCamera />} sx={{ mb: 3 }}>
        Télécharger des images
        <input type="file" multiple hidden onChange={handleImageUpload} />
      </Button>

      {/* Preview des images téléchargées */}
      <Grid container spacing={2} justifyContent="center">
        {images.map((image, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <img src={image} alt={`product-${index}`} style={{ width: '100%', borderRadius: '10px' }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUploadComponent;
