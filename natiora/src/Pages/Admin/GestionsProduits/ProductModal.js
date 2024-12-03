import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const ProductModal = ({ open, handleClose, categories, onSave, product }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    status: "Actif",
    description: "",
    customization: {
      sizes: [],
      finish: [],
    },
    stock: 0,
  });

  // Initialiser le produit à modifier ou un nouveau produit
  useEffect(() => {
    if (product) {
      setNewProduct({
        ...product,
        customization: {
          sizes: product.customization?.sizes || [],
          finish: product.customization?.finish || [],
        },
      });
    }
  }, [product]); // Déclencher seulement si "product" change
  

  // Gérer les changements dans les champs de personnalisation
  const handleCustomizationChange = (index, field, value, type) => {
    const customization = { ...newProduct.customization };
    customization[type][index][field] = value;
    setNewProduct({ ...newProduct, customization });
  };

  // Ajouter une ligne pour les tailles ou les finitions
  const addCustomizationRow = (type) => {
    const customization = { ...newProduct.customization };
    customization[type].push(type === "sizes" ? { dimensions: "", price_adjustment: 0 } : { description: "", price_adjustment: 0 });
    setNewProduct({ ...newProduct, customization });
  };

  // Supprimer une ligne pour les tailles ou les finitions
  const removeCustomizationRow = (index, type) => {
    const customization = { ...newProduct.customization };
    customization[type].splice(index, 1);
    setNewProduct({ ...newProduct, customization });
  };

  // Sauvegarder le produit
  const handleSave = () => {
    const productToSave = {
      ...newProduct,
      customization: JSON.stringify(newProduct.customization), // Convertir en JSON
    };
    onSave(productToSave);
  };
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {product ? "Modifier le Produit" : "Ajouter un Produit"}
      </DialogTitle>
      <DialogContent>
        <Box component="form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom du produit"
                variant="outlined"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prix"
                type="number"
                variant="outlined"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={newProduct.category_id}
                  onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                >
                  {categories && categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={newProduct.status}
                  onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                >
                  <MenuItem value="Actif">Actif</MenuItem>
                  <MenuItem value="Inactif">Inactif</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                variant="outlined"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </Grid>

            {/* Personnalisation : Tailles */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Tailles</Typography>
              {newProduct.customization.sizes?.map((size, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Dimensions"
                      value={size.dimensions}
                      onChange={(e) =>
                        handleCustomizationChange(index, "dimensions", e.target.value, "sizes")
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Ajustement de prix"
                      type="number"
                      value={size.price_adjustment}
                      onChange={(e) =>
                        handleCustomizationChange(index, "price_adjustment", e.target.value, "sizes")
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => removeCustomizationRow(index, "sizes")}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => addCustomizationRow("sizes")}
                sx={{ mt: 2 }}
              >
                Ajouter une taille
              </Button>
            </Grid>

            {/* Personnalisation : Finitions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Finitions</Typography>
              {newProduct.customization.finish?.map((finish, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={finish.description}
                      onChange={(e) =>
                        handleCustomizationChange(index, "description", e.target.value, "finish")
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Ajustement de prix"
                      type="number"
                      value={finish.price_adjustment}
                      onChange={(e) =>
                        handleCustomizationChange(index, "price_adjustment", e.target.value, "finish")
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => removeCustomizationRow(index, "finish")}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => addCustomizationRow("finish")}
                sx={{ mt: 2 }}
              >
                Ajouter une finition
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSave} color="primary">
          {product ? "Modifier le Produit" : "Ajouter le Produit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
