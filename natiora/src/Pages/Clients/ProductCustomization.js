import React, { useState, useEffect, useRef } from 'react';
import { TextField, Container, Grid, Typography, Button, Box, Card, CardContent, CardMedia, IconButton, MenuItem, Select, Slider, Modal } from '@mui/material';
import * as THREE from 'three';
import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { Rnd } from 'react-rnd';
import { useVersions } from '../Clients/VersionContext'; // Assurez-vous que le chemin est correct
import { useCart } from '../Clients/CartContext'; // Import du contexte du panier

// Exemple de produit avec images et informations
const product = {
  id: 1,
  name: 'X-Banner',
  description: 'Bannière publicitaire personnalisée',
  price: 50,
  images: ['image-url-1', 'image-url-2', 'image-url-3'],
  technicalDetails: 'Dimensions: 80x200 cm, Matériaux: PVC, Garantie: 2 ans',
};

function ProductCustomization() {
  const { saveVersion, setCurrentDesign } = useVersions();
  const { dispatch } = useCart(); // Utiliser le dispatch pour ajouter au panier

  const [textOverlay, setTextOverlay] = useState('Votre texte ici');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [textSize, setTextSize] = useState('16');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textFont, setTextFont] = useState('Arial');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotationText, setRotationText] = useState(0);
  const [rotationImage, setRotationImage] = useState(0);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50, width: 200, height: 'auto' });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0, width: 200, height: 200 });

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  // Initialisation de Three.js pour la rotation 3D
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;

    renderer.setSize(300, 500);
    sceneRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 3, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: selectedColor });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (sceneRef.current && rendererRef.current) {
        sceneRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [selectedColor]);

  // Gestion de l'image importée par l'utilisateur
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour ajouter le produit personnalisé au panier
  const addToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      textOverlay,
      selectedColor,
      textSize,
      textColor,
      textFont,
      uploadedImage,
      rotationText,
      rotationImage,
      textPosition,
      imagePosition,
    };

    dispatch({ type: 'ADD_TO_CART', payload: productToAdd });
    alert('Produit ajouté au panier');
  };

  // Fonctionnalité de zoom
  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.2, 2));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1));

  // Gestion de la rotation avec le slider pour le texte et l'image
  const handleRotationText = (event, newValue) => setRotationText(newValue);
  const handleRotationImage = (event, newValue) => setRotationImage(newValue);

  // Ouvrir et fermer le modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Sauvegarde manuelle d'une version
  const handleSaveVersion = () => {
    saveVersion();
    alert('Version sauvegardée');
  };

  return (
    <Container sx={{ padding: '30px', backgroundColor: '#f9fafb', borderRadius: '15px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
        Personnalisez votre {product.name}
      </Typography>

      <Grid container spacing={4}>
        {/* Section des images du produit */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
            <CardMedia
              component="img"
              height="300"
              image={product.images[0]}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.technicalDetails}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }}>
                Prix: {product.price} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Section de personnalisation */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>Personnalisation</Typography>

            <TextField
              label="Ajoutez votre texte"
              variant="outlined"
              fullWidth
              value={textOverlay}
              onChange={(e) => setTextOverlay(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />

            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Police</Typography>
            <Select
              value={textFont}
              onChange={(e) => setTextFont(e.target.value)}
              fullWidth
              sx={{ marginBottom: '20px' }}
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
            </Select>

            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Taille du texte</Typography>
            <TextField
              type="number"
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />

            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Couleur du texte</Typography>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', padding: '5px', borderRadius: '10px' }}
            />

            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Ajoutez une image</Typography>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '20px' }}>Rotation du texte</Typography>
            <Slider
              value={rotationText}
              onChange={handleRotationText}
              min={0}
              max={360}
              valueLabelDisplay="auto"
              sx={{ marginBottom: '20px' }}
            />

            {uploadedImage && (
              <>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '20px' }}>Rotation de l'image</Typography>
                <Slider
                  value={rotationImage}
                  onChange={handleRotationImage}
                  min={0}
                  max={360}
                  valueLabelDisplay="auto"
                  sx={{ marginBottom: '20px' }}
                />
              </>
            )}

            {/* Bouton pour sauvegarder le design */}
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: '20px', width: '100%' }}
              onClick={handleSaveVersion}
            >
              Sauvegarder la version
            </Button>

            {/* Bouton pour la simulation d'impression */}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px', width: '100%', fontWeight: 'bold' }}
              onClick={handleOpenModal}
            >
              Prévisualiser le produit final
            </Button>

            {/* Bouton pour ajouter au panier */}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px', width: '100%' }}
              onClick={addToCart}
            >
              Ajouter au panier
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Prévisualisation avec gestion du texte et de l'image repositionnables */}
      <Box
        sx={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f4f8',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          transform: `scale(${zoom})`,
          transition: 'transform 0.3s ease-in-out',
          position: 'relative',
          height: '500px',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Prévisualisation en temps réel</Typography>

        {/* Zone de design */}
        <Box
          ref={sceneRef}
          sx={{
            position: 'absolute',
            width: '300px',
            height: '500px',
            top: 0,
            left: 0,
            backgroundColor: selectedColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #ddd',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
            transform: 'rotateY(15deg) rotateX(10deg)',
            perspective: '1000px',
            borderRadius: '10px',
          }}
        >
          {/* Image redimensionnable */}
          {uploadedImage && (
            <Rnd
              size={{ width: imagePosition.width, height: imagePosition.height }}
              position={{ x: imagePosition.x, y: imagePosition.y }}
              bounds="parent"
              onDragStop={(e, d) => setImagePosition({ ...imagePosition, x: d.x, y: d.y })}
              onResizeStop={(e, direction, ref, delta, position) => {
                setImagePosition({
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
            >
              <img
                src={uploadedImage}
                alt="Image ajoutée"
                style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `rotate(${rotationImage}deg)` }}
              />
            </Rnd>
          )}
        </Box>

        {/* Texte repositionnable */}
        <Rnd
          size={{ width: textPosition.width, height: textPosition.height }}
          position={{ x: textPosition.x, y: textPosition.y }}
          bounds="parent"
          onDragStop={(e, d) => setTextPosition({ ...textPosition, x: d.x, y: d.y })}
          onResizeStop={(e, direction, ref, delta, position) => {
            setTextPosition({
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            });
          }}
          style={{ transform: `rotate(${rotationText}deg)` }}
        >
          <Typography
            sx={{
              color: textColor,
              fontSize: `${textSize}px`,
              fontFamily: textFont,
              textAlign: 'center',
            }}
          >
            {textOverlay}
          </Typography>
        </Rnd>

        {/* Icônes de contrôle du zoom */}
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={handleZoomIn} sx={{ marginRight: '10px' }}>
            <ZoomIn fontSize="large" />
          </IconButton>
          <IconButton onClick={handleZoomOut}>
            <ZoomOut fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Modal pour prévisualisation */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ backgroundColor: '#fff', padding: '40px', margin: '100px auto', borderRadius: '10px', width: '600px', textAlign: 'center' }}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
            Prévisualisation finale
          </Typography>
          <Box sx={{ width: '300px', height: '500px', margin: 'auto', backgroundColor: selectedColor }}>
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Image ajoutée"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `rotate(${rotationImage}deg)`,
                }}
              />
            )}
            <Typography
              sx={{
                color: textColor,
                fontSize: `${textSize}px`,
                fontFamily: textFont,
                textAlign: 'center',
                transform: `rotate(${rotationText}deg)`,
                position: 'relative',
              }}
            >
              {textOverlay}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: '20px' }}
            onClick={handleCloseModal}
          >
            Fermer la prévisualisation
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ProductCustomization;
