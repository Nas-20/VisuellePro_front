import React, { useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Canvas, Image, IText, Rect, Circle } from "fabric";

const ImageEditor = ({ open, image, onSave, onClose }) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    if (canvasRef.current && open) {
      // Initialisation du canvas Fabric.js
      fabricCanvas.current = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#f4f4f4",
      });

      // Charger l'image sur le canvas si elle est disponible
      if (image) {
        Image.fromURL(image, (img) => {
          img.set({
            left: 100,
            top: 100,
            scaleX: 0.8,
            scaleY: 0.8,
            selectable: true,
          });
          fabricCanvas.current.add(img);
        });
      }
    }

    return () => {
      // Nettoyer le canvas à la fermeture
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
    };
  }, [image, open]);

  // Ajouter du texte au canvas
  const addText = () => {
    const text = new IText("Votre texte ici", {
      left: 200,
      top: 200,
      fontSize: 24,
      fill: "#333",
    });
    fabricCanvas.current.add(text);
  };

  // Ajouter une forme (rectangle ou cercle) au canvas
  const addShape = (type) => {
    let shape;
    if (type === "rectangle") {
      shape = new Rect({
        left: 150,
        top: 150,
        fill: "blue",
        width: 100,
        height: 100,
      });
    } else if (type === "circle") {
      shape = new Circle({
        left: 150,
        top: 150,
        fill: "red",
        radius: 50,
      });
    }
    fabricCanvas.current.add(shape);
  };

  // Sauvegarder le contenu du canvas en image
  const handleSave = () => {
    if (fabricCanvas.current) {
      const canvasDataURL = fabricCanvas.current.toDataURL({
        format: "png",
        quality: 1,
      });
      onSave(canvasDataURL); // Appelle la fonction `onSave` pour transmettre l'image
      onClose(); // Ferme l'éditeur
    }
  };

  return (
    <Box>
      {open && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Éditeur d'image avancé
          </Typography>

          {/* Canvas Fabric.js */}
          <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />

          {/* Outils pour ajouter du contenu */}
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={addText}>
              Ajouter du texte
            </Button>
            <Button variant="outlined" onClick={() => addShape("rectangle")}>
              Ajouter un rectangle
            </Button>
            <Button variant="outlined" onClick={() => addShape("circle")}>
              Ajouter un cercle
            </Button>
          </Box>

          {/* Boutons pour sauvegarder ou annuler */}
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Sauvegarder
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Annuler
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageEditor;
