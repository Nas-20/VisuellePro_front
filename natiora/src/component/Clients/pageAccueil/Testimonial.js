import React from "react";
import { Container, Typography, Box, Grid, Avatar, Card, CardContent } from "@mui/material";

const testimonials = [
  {
    name: "Marie Dupont",
    feedback: "VisuellePro m'a permis de gérer mes campagnes publicitaires de manière efficace et rapide. J'ai adoré la personnalisation des produits !",
    role: "Responsable Marketing",
    avatar: "/path-to-avatar1.jpg", // Chemin vers l'image d'avatar
  },
  {
    name: "Jean Martin",
    feedback: "Une plateforme intuitive et facile à utiliser. J'ai pu lancer des campagnes publicitaires pour mes clients en quelques clics.",
    role: "Directeur d'Agence",
    avatar: "/path-to-avatar2.jpg",
  },
  {
    name: "Sophie Bernard",
    feedback: "Le support client est très réactif et m'a aidée à personnaliser mes affiches rapidement. Je recommande vivement !",
    role: "Entrepreneure",
    avatar: "/path-to-avatar3.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <Box sx={{ bgcolor: "#F9F9F8", py: 2 }}>
      <Container maxWidth="lg">
        {/* Titre de la section */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 5, color: "#333" }}
        >
          Ce que disent nos utilisateurs
        </Typography>

        {/* Grille des témoignages */}
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ boxShadow: 5, borderRadius: 3, p: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Avatar
                      alt={testimonial.name}
                      src={testimonial.avatar}
                      sx={{ width: 80, height: 80 }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ fontStyle: "italic", color: "#555" }}
                  >
                    "{testimonial.feedback}"
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mt: 3, fontWeight: "bold", color: "#333" }}
                    align="center"
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777" }}
                    align="center"
                  >
                    {testimonial.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialSection;
