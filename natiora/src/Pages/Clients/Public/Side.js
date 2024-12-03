import React from "react";
import { Box, Typography } from "@mui/material";
const Side = () => {
  return (
    <Box sx={{ width: "20%" }}>
      <Typography variant="h5" sx={{ fontWeight:"bold", color: "#F07B0C", ml:10 }}>
        Visuelle
        <Typography variant="h5" component="span" sx={{fontWeight:"bold", color: "#1597B8" }}>Pro</Typography>
      </Typography>
      <Box sx={{width:285,height:200, bgcolor:"#333",mt:4,borderRadius:2}}></Box>
    </Box>
  );
};

export default Side;
