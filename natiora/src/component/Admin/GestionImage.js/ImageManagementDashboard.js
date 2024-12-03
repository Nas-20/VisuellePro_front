import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ImageUploadComponent from './ImageUploadComponent';
import ImagePreviewComponent from './ImagePreviewComponent';
import ImageResizeComponent from './ImageResizeComponent ';
import ImageCropComponent from './ImageCropComponent';

const ImageManagementDashboard = () => {
  const [images, setImages] = useState([]);

  return (
    <Box sx={{ p: 3 }}>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ImageUploadComponent />
        </Grid>

        {images.length > 0 && (
          <>
            <Grid item xs={12}>
              <ImagePreviewComponent images={images} />
            </Grid>
            <Grid item xs={12}>
              <ImageResizeComponent image={images[0]} />
            </Grid>
            <Grid item xs={12}>
              <ImageCropComponent image={images[0]} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ImageManagementDashboard;
