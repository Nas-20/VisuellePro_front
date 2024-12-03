import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SectionWidget = ({ icon, title, description }) => {
  return (
    <Paper elevation={0} sx={{ display: 'flex', p: 2, bgcolor: "transparent", alignItems: 'center', width: "100%", mb: 2,pb:0 }}>
      <Box sx={{ mr: 2, bgcolor:"#14a8f1 ", borderRadius:2 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
};

export default SectionWidget;
