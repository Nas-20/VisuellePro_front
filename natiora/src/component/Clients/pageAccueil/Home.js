import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ProductCarousel from "./ProductCarousel";
import HeroSection from "./HeroSection"; // Importation du nouveau composant Hero
import ProductCustomizationFeature from "../../../Pages/Clients/Public/ProductCust";
import CallToActionSection from "./CallToSection";
import FAQSection from "../../../Pages/Clients/Public/FAQSection";
import { useNavigate } from "react-router-dom"; // Importation pour redirection

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "transparent ", pb: 10 }}>
      {/* Section de présentation principale (Hero Section) */}
      <HeroSection />

      {/* Section des produits populaires */}
      <Container maxWidth={true} sx={{ mt: 1, pb: 15, bgcolor: "#fafafa",width:"100%" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#333", fontWeight: "bold", mb: 3, pt: 9 }}
        >
          Nos Produits Populaires
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#333", pb: 7 }}
        >
          Découvrez tout ce qu’il faut savoir sur les types de documents les
          plus populaires de VisuellePro. Trouvez l’inspiration en découvrant du
          contenu, des guides pratiques vidéo, des modèles gratuits et plus
          encore.
        </Typography>

        {/* Ajout du bouton Découvrez nos produits */}
        <Box sx={{ textAlign: "center", mt: 0, pb:5 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/products')} // Redirection vers la page /products
            sx={{
              bgcolor: "#1d8df7", // Couleur personnalisée du bouton
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "10px 20px",
              borderRadius: "30px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "#e63e1c", // Changement de couleur au hover
              },
            }}
          >
            Découvrez nos produits
          </Button>
        </Box>

        <ProductCarousel />
      </Container>

      <ProductCustomizationFeature />
      <FAQSection />
      <CallToActionSection />
    </Box>
  );
};

export default Home;
