import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';

const ImageManagement = () => {
  const [images, setImages] = useState([]);  // Stocker les images importées
  const [selectedImage, setSelectedImage] = useState(null);  // Image actuellement sélectionnée pour la prévisualisation ou édition
  const [openPreview, setOpenPreview] = useState(false);  // État pour gérer la boîte de dialogue de prévisualisation

  // Fonction pour gérer l'importation des images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file,
    }));
    setImages([...images, ...newImages]);
  };

  // Fonction pour supprimer une image
  const handleDeleteImage = (imageToDelete) => {
    setImages(images.filter((image) => image !== imageToDelete));
  };

  // Fonction pour ouvrir la boîte de dialogue de prévisualisation d'une image
  const handleOpenPreview = (image) => {
    setSelectedImage(image);
    setOpenPreview(true);
  };

  // Fonction pour fermer la boîte de dialogue de prévisualisation
  const handleClosePreview = () => {
    setOpenPreview(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Gestion des Images
      </Typography>

      {/* Bouton pour importer des images */}
      <Button
        variant="contained"
        component="label"
        sx={{ mb: 3 }}
        startIcon={<PhotoCameraIcon />}
      >
        Importer des Images
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>

      {/* Affichage des images importées */}
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                boxShadow: 3,
                cursor: 'pointer',
              }}
            >
              <img
                src={image.url}
                alt={image.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                onClick={() => handleOpenPreview(image)}  // Ouvre la prévisualisation
              />
              <Typography sx={{ mt: 1 }}>{image.name}</Typography>

              {/* Actions pour chaque image : Prévisualiser, Supprimer */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenPreview(image)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteImage(image)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Boîte de dialogue de prévisualisation */}
      <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle>
          Prévisualisation d'image
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClosePreview}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} variant="contained" color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageManagement;
