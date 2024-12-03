import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, TextField, InputAdornment, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../../../component/Clients/pageAccueil/ProductCard';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Liste des produits
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés
  const [searchTerm, setSearchTerm] = useState(''); // Termes de recherche

  // Récupérer les produits depuis l'API au chargement de la page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products'); // URL de l'API
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialement, tous les produits sont affichés
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
      }
    };

    fetchProducts();
  }, []);

  // Fonction pour filtrer les produits selon le terme de recherche
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value !== '') {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products); // Si la barre de recherche est vide, montrer tous les produits
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Section Barre de recherche */}
      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Rechercher des produits"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: '600px' }}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Affichage des produits */}
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                image={product.image}
                title={product.name}
                alt={product.name}
                price={product.price}
                description={product.description}
                // Pas besoin de parser customization, car c'est déjà un objet
                customization={product.customization}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Aucun produit trouvé</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductPage;
