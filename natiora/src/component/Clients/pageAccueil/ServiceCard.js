import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ServiceCard = ({ image, title, description }) => {
  return (
    <Card sx={{ boxShadow: 10, borderRadius: 3, bgcolor:"#D6D6D5" }}>
      <CardMedia
        component="img"
        alt={title}
        image={image}
        sx={{bgcolor:"#D6D6D5",height: '300px', objectFit: 'cover'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{ color: "#FF8C00" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
