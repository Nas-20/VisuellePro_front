import React from "react";
import { Grid, Card, IconButton, Box } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const ImageGallery = ({ images, onDelete, onEdit }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={4}>
        {images.map((image, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                position: "relative",
                width: "100%",
                height: "270px",
                backgroundColor: "#f4f4f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Affichage de l'image */}
              <img
  src={image} // Utilise directement l'URL de l'image
  alt={`Image ${index + 1}`}
  style={{
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/placeholder.png"; // Affiche un placeholder si l'image ne charge pas
  }}
/>

              {/* Bouton pour éditer */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { backgroundColor: "#1976d2", color: "white" },
                }}
                onClick={() => onEdit(image)}
              >
                <EditIcon />
              </IconButton>

              {/* Bouton pour supprimer */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { backgroundColor: "red", color: "white" },
                }}
                onClick={() => onDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
