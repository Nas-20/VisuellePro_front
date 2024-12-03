import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Box, Button } from '@mui/material';

const ImageCropComponent = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = () => {
    // Logique de recadrage ici
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ height: 400, position: 'relative' }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </Box>
      <Button variant="contained" sx={{ mt: 2 }} onClick={onCropComplete}>
        Recadrer l'image
      </Button>
    </Box>
  );
};

export default ImageCropComponent;
