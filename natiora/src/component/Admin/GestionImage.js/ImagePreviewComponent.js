import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const ImagePreviewComponent = ({ images }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Prévisualisation des images</Typography>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={image.url}
                alt={`image-${index}`}
              />
              <CardContent>
                <Typography variant="body1">Nom de fichier: {image.name}</Typography>
                <Typography variant="body2">Dimensions: {image.dimensions}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImagePreviewComponent;
