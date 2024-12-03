// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import { Add as AddIcon } from "@mui/icons-material";
// import axios from "axios";

// const AddProduct = ({ onProductAdded }) => {
//   const [categories, setCategories] = useState([]);
//   const [previewImage, setPreviewImage] = useState(""); // Pour l'aperçu d'image
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     category_id: "",
//     status: "Actif",
//     description: "",
//     customization: {
//       dimensions: "",
//       colors: "",
//       materials: "",
//       finishOptions: "",
//     },
//     stock: 0,
//   });

//   useEffect(() => {
//     // Récupérer les catégories depuis l'API Laravel
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des catégories :", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fonction pour gérer l'ajout du produit
//   const handleAddProduct = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/products", newProduct, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       alert("Produit ajouté avec succès !");
//       if (onProductAdded) {
//         onProductAdded(response.data); // Notifie le parent que le produit a été ajouté
//       }
//       // Réinitialiser le formulaire
//       setNewProduct({
//         name: "",
//         price: "",
//         category_id: "",
//         status: "Actif",
//         description: "",
//         customization: {
//           dimensions: "",
//           colors: "",
//           materials: "",
//           finishOptions: "",
//         },
//         stock: 0,
//       });
//       setPreviewImage("");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout du produit :", error);
//     }
//   };

//   // Fonction pour gérer l'image d'aperçu
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreviewImage(URL.createObjectURL(file)); // Affiche l'aperçu local
//     }
//   };

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         mt: 4,
//         bgcolor: "#fff",
//         p: 4,
//         borderRadius: 2,
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
//         Ajouter un Nouveau Produit
//       </Typography>
//       <Grid container spacing={4}>
//         {/* Formulaire d'ajout de produit */}
//         <Grid item xs={12} md={8}>
//           <Box component="form">
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Nom du produit"
//                   variant="outlined"
//                   value={newProduct.name}
//                   onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Prix"
//                   type="number"
//                   variant="outlined"
//                   value={newProduct.price}
//                   onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Catégorie</InputLabel>
//                   <Select
//                     value={newProduct.category_id}
//                     onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
//                   >
//                     {categories.map((category) => (
//                       <MenuItem key={category.id} value={category.id}>
//                         {category.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   multiline
//                   rows={3}
//                   variant="outlined"
//                   value={newProduct.description}
//                   onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Statut</InputLabel>
//                   <Select
//                     value={newProduct.status}
//                     onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
//                   >
//                     <MenuItem value="Actif">Actif</MenuItem>
//                     <MenuItem value="Inactif">Inactif</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Stock"
//                   type="number"
//                   variant="outlined"
//                   value={newProduct.stock}
//                   onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Options de personnalisation :
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Dimensions"
//                   variant="outlined"
//                   value={newProduct.customization.dimensions}
//                   onChange={(e) =>
//                     setNewProduct({
//                       ...newProduct,
//                       customization: { ...newProduct.customization, dimensions: e.target.value },
//                     })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Couleurs"
//                   variant="outlined"
//                   value={newProduct.customization.colors}
//                   onChange={(e) =>
//                     setNewProduct({
//                       ...newProduct,
//                       customization: { ...newProduct.customization, colors: e.target.value },
//                     })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   component="label"
//                   sx={{ mt: 2 }}
//                   startIcon={<AddIcon />}
//                 >
//                   Télécharger une Image
//                   <input type="file" hidden onChange={handleImageChange} />
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>

//         {/* Aperçu dynamique */}
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               maxWidth: 345,
//               bgcolor: "#f5f5f5",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <CardMedia
//               component="img"
//               height="200"
//               image={previewImage || "https://via.placeholder.com/150"}
//               alt="Aperçu du produit"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h6" component="div">
//                 {newProduct.name || "Nom du produit"}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {newProduct.description || "Description du produit..."}
//               </Typography>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
//                 {newProduct.price ? `${newProduct.price} MGA` : "Prix : ---"}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box textAlign="center" mt={4}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddProduct}
//           sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
//         >
//           Ajouter le Produit
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    status: "Actif",
    description: "",
    customization: {
      sizes: [{ dimensions: "", price_adjustment: 0 }],
      finish: [{ description: "", price_adjustment: 0 }],
    },
    stock: 0,
  });

  useEffect(() => {
    // Récupérer les catégories depuis l'API Laravel
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  // Fonction pour gérer les changements des champs de personnalisation
  const handleCustomizationChange = (index, field, value, type) => {
    const customization = { ...newProduct.customization };
    customization[type][index][field] = value;
    setNewProduct({ ...newProduct, customization });
  };

  // Ajouter une ligne pour les tailles ou les finitions
  const addCustomizationRow = (type) => {
    const customization = { ...newProduct.customization };
    customization[type].push({ dimensions: "", price_adjustment: 0 });
    setNewProduct({ ...newProduct, customization });
  };

  // Supprimer une ligne pour les tailles ou les finitions
  const removeCustomizationRow = (index, type) => {
    const customization = { ...newProduct.customization };
    customization[type].splice(index, 1);
    setNewProduct({ ...newProduct, customization });
  };

  // Fonction pour ajouter un produit
  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/products", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Produit ajouté avec succès !");
      if (onProductAdded) {
        onProductAdded(response.data); // Met à jour la liste des produits dans le parent
      }
      // Réinitialiser le formulaire
      setNewProduct({
        name: "",
        price: "",
        category_id: "",
        status: "Actif",
        description: "",
        customization: {
          sizes: [{ dimensions: "", price_adjustment: 0 }],
          finish: [{ description: "", price_adjustment: 0 }],
        },
        stock: 0,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      alert("Erreur lors de l'ajout du produit. Veuillez vérifier les champs.");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        ml: 2,
        bgcolor: "#fff",
        p: 4,
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        Ajouter un Produit
      </Typography>
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
                label="Catégorie"
                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
              >
                {categories.map((category) => (
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
                label="Statut"
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
            {newProduct.customization.sizes.map((size, index) => (
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
            {newProduct.customization.finish.map((finish, index) => (
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

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              sx={{ mt: 2, px: 4 }}
            >
              Ajouter le Produit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddProduct;

