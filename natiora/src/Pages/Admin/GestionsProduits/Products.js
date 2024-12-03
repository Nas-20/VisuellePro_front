import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import axios from "axios"; // Import axios pour gérer les appels API
import ProductModal from "./ProductModal";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // Pour gérer l'ajout d'une nouvelle catégorie
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category_id: "", // Ajouter la catégorie au produit via category_id
    status: "",
    description: "",
    customization: {
      dimensions: "",
      colors: "",
      materials: "",
      finishOptions: "",
    },
    stock: 0,
  });
  const [open, setOpen] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false); // Pour la modale d'ajout de catégorie
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  // Fonction pour récupérer le cookie CSRF
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  // Récupérer les produits et catégories depuis l'API Laravel au chargement du composant
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
        console.error(
          "Erreur lors de la récupération des produits ou des catégories",
          error
        );
      }
    };
    // Récupérer le jeton CSRF
    const getCsrfToken = async () => {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      } catch (error) {
        console.error("Erreur lors de la récupération du token CSRF", error);
      }
    };
    fetchProductsAndCategories();
    getCsrfToken();
  }, []);
  // Fonction pour formater le prix en MGA
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MGA",
    }).format(price);
  };
  // Ouvrir la fenêtre modale pour ajouter un produit
  const handleClickOpen = () => {
    setSelectedProduct(null); // Réinitialiser pour ajouter un nouveau produit
    setEditingProductIndex(null); // Pas d'édition
    setOpen(true);
  };
  // Ouvrir la fenêtre modale pour ajouter une nouvelle catégorie
  const handleOpenCategoryDialog = () => {
    setNewCategory("");
    setOpenCategoryDialog(true);
  };
  // Fermer la fenêtre modale d'ajout de catégorie
  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };
  // Ajouter une nouvelle catégorie
  const addNewCategory = async () => {
    try {
      const config = {
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:8000/api/categories",
        { name: newCategory },
        config
      );
      setCategories([...categories, response.data]); // Ajouter la nouvelle catégorie à la liste
      handleCloseCategoryDialog();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
    }
  };
  // Modifier un produit
  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setSelectedProduct(productToEdit); // Mettre à jour le produit sélectionné
    setEditingProductIndex(index); // Index pour modification
    setOpen(true); // Ouvrir la modale
  };
  // Fermer la fenêtre modale
  const handleClose = () => {
    setOpen(false);
  };
  // Afficher les détails d'un produit
  const handleShowDetails = (index) => {
    const product = products[index];
    // Analyser la chaîne JSON 'customization' en un objet
    if (typeof product.customization === "string") {
      product.customization = JSON.parse(product.customization);
    }
    setSelectedProduct(product);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  // Fonction pour ajouter ou modifier un produit
  const saveProduct = async (product) => {
    const payload = {
      ...product,
      customization: JSON.parse(product.customization), // Laravel attend un tableau
    };
  
    try {
      if (editingProductIndex !== null) {
        // Modification
        const productId = products[editingProductIndex].id;
        const response = await axios.put(`http://localhost:8000/api/products/${productId}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const updatedProducts = [...products];
        updatedProducts[editingProductIndex] = response.data;
        setProducts(updatedProducts);
      } else {
        // Création
        const response = await axios.post(`http://localhost:8000/api/products`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProducts([...products, response.data]);
      }
      setOpen(false); // Fermer la modale
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification :", error.response?.data || error.message);
    }
  };
  

  // Fonction pour supprimer un produit
  const deleteProduct = async (index) => {
    try {
      const config = {
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
      };
      await axios.delete(
        `http://localhost:8000/api/products/${products[index].id}`,
        config
      );
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };
  const handleNestedInputChange = (parentField, field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value,
      },
    }));
  };
  const handleInputChange = (field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        width: { xs: "auto", md: "98%" },
        p: 0,
        m: 1.5,
        borderRadius: 5,
        pb: 8,
        bgcolor: "#392e22",
        pr: 5,
        boxShadow: "0px 4px 20px 20px rgba(0, 0, 0, 0.1)",
        mt: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3, pt: 4, pb: 3 }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Populaires
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenCategoryDialog}
        >
          Ajouter une catégorie
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ec8817" }}>
              <TableCell sx={{ color: "#fff" }}>Nom</TableCell>
              <TableCell sx={{ color: "#fff" }}>Prix</TableCell>
              <TableCell sx={{ color: "#fff" }}>Catégorie</TableCell>
              <TableCell sx={{ color: "#fff" }}>Statut</TableCell>
              <TableCell sx={{ color: "#fff" }}>Stock</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  {product.category
                    ? product.category.name
                    : "Aucune catégorie"}
                </TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProduct(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteProduct(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => handleShowDetails(index)}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modale d'ajout/modification de produit */}
      {open && (
        <ProductModal
          open={open}
          handleClose={() => setOpen(false)}
          onSave={saveProduct}
          categories={categories}
          product={selectedProduct}
        />
      )}
      {/* Modale de détails du produit */}
      <ProductDetailsModal
        open={openDetails}
        handleClose={handleCloseDetails}
        product={selectedProduct}
      />
      {/* Modale d'ajout de catégorie */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom de la catégorie"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoryDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={addNewCategory} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
