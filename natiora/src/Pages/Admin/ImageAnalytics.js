import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const ImageAnalytics = ({ data = [] }) => {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Performance des Images
            </Typography>
            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                            <Typography variant="h5" sx={{ color: "#ec8817" }}>
                                {item.value}
                            </Typography>
                            <Typography>{item.label}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default ImageAnalytics;
