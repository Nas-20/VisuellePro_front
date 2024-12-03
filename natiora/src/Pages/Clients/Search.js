import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Avatar,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Fab,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Joyride, { STATUS } from "react-joyride";
import Header from "../../component/Clients/pageAccueil/Header1";
import ProductCard from "../../component/Clients/pageAccueil/ProductCard";
import axios from "axios";
import titre from "../../component/asset/images/banner.jpg";

const Search = () => {
  // État pour les données des produits et des catégories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredColor, setFilteredColor] = useState("");
  const [runTour, setRunTour] = useState(false); // État pour le tutoriel interactif (Joyride)

  // Récupère les produits et catégories depuis l'API
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:8000/api/products"
        );
        const categoryResponse = await axios.get(
          "http://localhost:8000/api/categories"
        );

        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    fetchProductsAndCategories();
  }, []);

  // Filtrer les produits en fonction des critères de recherche et des filtres
  const filteredProducts = products.filter((product) => {
    const productColor = product.customization?.couleur
      ? product.customization.couleur.trim().toLowerCase()
      : "";
    const selectedColor = filteredColor.trim().toLowerCase();

    const passesColorFilter =
      filteredColor === "" || productColor === selectedColor;

    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" ||
        product.category?.name === selectedCategory) &&
      (priceRange === "" ||
        (priceRange === "100-500" &&
          product.price >= 100 &&
          product.price <= 500) ||
        (priceRange === "1000-1500" &&
          product.price > 1000 &&
          product.price <= 1500) ||
        (priceRange === "1000+" && product.price > 1000)) &&
      passesColorFilter
    );
  });

  // Configuration des étapes du tutoriel interactif (Joyride)
  const steps = [
    {
      target: ".search-bar",
      content: "Ici, vous pouvez rechercher des produits par leur nom ou un mot-clé.",
    },
    {
      target: ".category-filter",
      content: "Filtrer les produits par catégorie.",
    },
    {
      target: ".price-filter",
      content: "Sélectionner une gamme de prix pour affiner la recherche.",
    },
    {
      target: ".color-filter",
      content: "Vous pouvez également filtrer par couleur.",
    },
    {
      target: ".product-list",
      content: "Voici la liste des produits correspondant à vos critères.",
    },
  ];

  // Fonction pour démarrer le tutoriel interactif
  const startTour = () => {
    setRunTour(true);
  };

  // Gestion de la fin du tutoriel interactif
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false); // Arrête Joyride après la fin du tour
    }
  };

  return (
    <Box maxWidth={true} sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      {/* Barre latérale pour la recherche et les filtres */}
      <Box
        sx={{
          width: { xs: "95%", md: "19%" },
          display: "flex",
          flexDirection: "column",
          mt: { xs: 7, md: 10.5 },
          backgroundColor: "#efefec",
          padding: { xs: "10px", md: "20px" },
          height: { xs: "auto", md: "100vh" },
          marginRight: { xs: "0px", md: "20px" },
          boxShadow: "20px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          position: { md: "fixed" },
        }}
      >
        {/* Logo */}


        {/* Barre de recherche */}
        <Box
          className="search-bar"
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            mt:2,
            marginBottom: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            label="Ex: xbanner, banner, etc"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ borderRadius: 1 }}
          />
          <IconButton sx={{ position: "absolute", right: "10px" }}>
            <SearchIcon sx={{ color: "#555", fontSize: 28 }} />
          </IconButton>
        </Box>

        {/* Filtres par catégorie, prix, couleur */}
        <FormControl fullWidth sx={{ marginBottom: "10px" }} className="category-filter">
          <InputLabel>Catégories</InputLabel>
          <Select
            value={selectedCategory}
            label="Catégories"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="">Toutes les catégories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "10px" }} className="price-filter">
          <InputLabel>Prix</InputLabel>
          <Select
            value={priceRange}
            label="Prix"
            onChange={(e) => setPriceRange(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">Tous les prix</MenuItem>
            <MenuItem value="100-500">100 - 500 MGA</MenuItem>
            <MenuItem value="1000-1500">1000 - 1500 MGA</MenuItem>
            <MenuItem value="1000+">1000 MGA et plus</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Dimensions"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: "#fff", borderRadius: 1, marginBottom: "10px" }}
        />
        <TextField
          label="Couleur"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: "#fff", borderRadius: 1, marginBottom: "10px" }}
          onChange={(e) => setFilteredColor(e.target.value)}
        />
      </Box>

      {/* Affichage des produits filtrés */}
      <Box sx={{ flex: 1, ml: { xs: "0", md: "370px" }, mt: { xs: 3, md: 10.5 }, px: { xs: 2, md: 3 }, bgcolor: "#fafafa", boxShadow: "4px 4px 15px 15px rgba(0, 0, 0, 0.1)", borderRadius: 5 }}>
        <Header />
        <Box sx={{ m: 3, ml: 5 }}>
          <Typography variant="h4" sx={{ mb: "25px", mt: 4 }}>
            Populaire
          </Typography>
          <Grid container spacing={4} className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard
                    image={product.image || titre}
                    title={product.name}
                    alt={product.name}
                    price={product.price}
                    description={product.description}
                    customization={product.customization || {}}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ margin: "20px auto", textAlign: "center" }}>
                Aucun produit trouvé.
              </Typography>
            )}
          </Grid>

          <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>
            Afficher tous
          </Button>
        </Box>
      </Box>

      {/* Bouton flottant pour démarrer le tutoriel */}
      <Fab
        sx={{
          position: "fixed",
          bottom: "30px",
          left: "20px",
          backgroundColor: "#ff0000",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        onClick={startTour}
      >
        ?
      </Fab>

      {/* Texte explicatif "Guides" à côté du bouton flottant */}
      <Box sx={{ position: "fixed", bottom: "90px", left: "28px", color: "#555", fontSize: "14px", fontWeight: "bold" }}>
        Guides
      </Box>

      {/* Tutoriel interactif avec Joyride */}
      <Joyride
        steps={steps}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        run={runTour}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 1000,
          },
        }}
      />
    </Box>
  );
};

export default Search;
