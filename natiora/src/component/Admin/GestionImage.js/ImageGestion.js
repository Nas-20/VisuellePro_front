import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/CloudUpload';

const ImageManagement = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: '#333' }}>
        <ImageIcon sx={{ fontSize: 40, color: '#007bff', mr: 1 }} />
        Gestion des Images
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 3 }}>
        Importez et gérez vos images de produits.
      </Typography>

      {/* Bouton d'importation d'image */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: 2,
            p: 2,
            '&:hover': { backgroundColor: '#0056b3' },
            fontWeight: 'bold',
          }}
        >
          <UploadIcon sx={{ mr: 1 }} /> TÉLÉCHARGER DES IMAGES
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
      </Box>

      {/* Aperçu des images téléchargées */}
      {imageSrc && (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                '&:hover': { boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)' },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <img
                  src={imageSrc}
                  alt="Aperçu"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <Typography variant="caption" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>
                  Image Importée - {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Section de gestion des images */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': { boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)' },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Redimensionner
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Ajustez les dimensions de l'image pour l'adapter à vos besoins.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': { boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)' },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Recadrer
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Découpez les parties inutiles pour garder l'essentiel de l'image.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': { boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)' },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Optimiser
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Réduisez la taille du fichier pour un meilleur chargement.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageManagement;
