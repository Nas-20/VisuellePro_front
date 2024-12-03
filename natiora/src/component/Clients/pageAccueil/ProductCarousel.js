import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import axios from "axios"; // Pour les requêtes API
// import defaultImage from '../../asset/images/default.jpg'; // Image par défaut
import banner from "../../asset/images/banner.jpg";

const ProductCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [products, setProducts] = useState([]); // Stocker les produits récupérés

  // Récupérer les produits depuis l'API au chargement du composant
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products"); // Remplacer par l'URL de votre API
        setProducts(response.data); // Stocker les produits dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };
    fetchProducts();
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    const newPosition = scrollPosition + scrollAmount;
    setScrollPosition(newPosition);
    document.getElementById("scrollContainer").scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Flèche gauche */}
      <IconButton
        onClick={() => handleScroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 2,
          bgcolor: "#fff",
          boxShadow: 15,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            bgcolor: "#FF8C00",
            color: "#fff",
            transform: "scale(1.1)",
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        id="scrollContainer"
        sx={{
          display: "flex",
          gap: 3, // Espace entre les produits
          overflowX: "hidden",
          scrollBehavior: "smooth",
          padding: "16px",
        }}
      >
        {products.map((product) => (
          <ProductCard
            image={banner}
            title={product.name}
            alt={product.name}
            price={product.price}
            description={product.description}
            // Vérification avant de parser customization
            customization={
              typeof product.customization === "string"
                ? JSON.parse(product.customization)
                : product.customization
            }
          />
        ))}
      </Box>

      {/* Flèche droite */}
      <IconButton
        onClick={() => handleScroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 5,
          transform: "translateY(-50%)",
          zIndex: 2,
          bgcolor: "#fff",
          boxShadow: 3,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            bgcolor: "#FF8C00",
            color: "#fff",
            transform: "scale(1.1)",
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default ProductCarousel;
