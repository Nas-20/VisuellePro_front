import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  InputAdornment,
  Tooltip,
  Fab,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";  // Importer axios pour les requêtes API

// Composant principal de gestion de la flotte publicitaire
const FleetManagement = () => {
  // État pour stocker la liste des véhicules
  const [vehicles, setVehicles] = useState([]);

  // État pour gérer les champs du nouveau véhicule
  const [newVehicle, setNewVehicle] = useState({
    brand: "", model: "", owner: "", status: "Disponible", type: "Voiture", availability: "", licensePlate: "", capacity: "", color: "", location: { lat: 0, lng: 0 }, image: null
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // État pour un véhicule en cours de modification
  const [editingVehicle, setEditingVehicle] = useState(null);

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour récupérer les véhicules depuis l'API au chargement du composant
  const fetchVehicles = () => {
    axios.get('http://localhost:8000/api/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Erreur lors du chargement des véhicules:', error));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Fonction pour ajouter un nouveau véhicule via l'API
  const addVehicle = () => {
    // Affichez les données envoyées pour voir ce qui est incorrect
    console.log(newVehicle);  // Vérifiez ce qui est envoyé

    axios.post('http://localhost:8000/api/vehicles', newVehicle)
      .then(response => {
        setVehicles([...vehicles, response.data]);
        setNewVehicle({
          brand: "", model: "", owner: "", status: "Disponible", type: "Voiture",
          availability: "", licensePlate: "", capacity: "", color: "", location: { lat: 0, lng: 0 }, image: null
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du véhicule:', error.response ? error.response.data : error.message);
      });
};


  // Fonction pour gérer la modification d'un véhicule via l'API
  const handleSaveEdit = () => {
    axios.put(`http://localhost:8000/api/vehicles/${editingVehicle.id}`, editingVehicle)
      .then(() => {
        setVehicles(vehicles.map(vehicle => (vehicle.id === editingVehicle.id ? editingVehicle : vehicle)));
        setEditingVehicle(null);  // Fermer la boîte de dialogue de modification
      })
      .catch(error => console.error('Erreur lors de la modification du véhicule:', error));
  };

  // Fonction pour supprimer un véhicule via l'API
  const deleteVehicle = (id) => {
    axios.delete(`http://localhost:8000/api/vehicles/${id}`)
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));  // Supprimer de la liste localement
      })
      .catch(error => console.error('Erreur lors de la suppression du véhicule:', error));
  };

  // Fonction pour uploader une image de véhicule
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setNewVehicle({ ...newVehicle, image: imageUrl });
  };

  // Fonction pour la pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fonction pour filtrer les véhicules par recherche
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth={false} sx={{ pt: 2, borderRadius: 5, pb: 8, bgcolor: "#392e22", width: {xs:"auto",md:"98.5%"}, }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#fff", pt: 3, pb: 3 }}>
        Gestion de la Flotte Publicitaire
      </Typography>

      {/* Champ de recherche */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          placeholder="Rechercher par marque, modèle ou propriétaire"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3, bgcolor: "#fff", borderRadius: 1 }}
        />
      </Grid>

      <Grid container spacing={3}>
        {/* Formulaire d'ajout de véhicule */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Ajouter un nouveau véhicule</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Marque" value={newVehicle.brand} onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Modèle" value={newVehicle.model} onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Propriétaire" value={newVehicle.owner} onChange={(e) => setNewVehicle({ ...newVehicle, owner: e.target.value })} />
              </Grid>

              {/* Icône flottante pour importer des images */}
              <Grid item xs={12} sm={4}>
                <Tooltip title="Importer une image du véhicule">
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <Fab color="primary" aria-label="upload picture" component="span" size="small" sx={{ ml: 1 }}>
                      <PhotoCameraIcon />
                    </Fab>
                  </label>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Plaque d'immatriculation" value={newVehicle.licensePlate} onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Capacité de charge" value={newVehicle.capacity} onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Type de véhicule</InputLabel>
                  <Select
                    labelId="type-label"
                    value={newVehicle.type}
                    label="Type de véhicule"
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                  >
                    <MenuItem value="Voiture">Voiture</MenuItem>
                    <MenuItem value="Camion">Camion</MenuItem>
                    <MenuItem value="Moto">Moto</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Période de disponibilité"
                  placeholder="01/10/2024 - 30/10/2024"
                  value={newVehicle.availability}
                  onChange={(e) => setNewVehicle({ ...newVehicle, availability: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={addVehicle}
                >
                  Ajouter Véhicule
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Liste des véhicules avec pagination */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ec8817" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Marque</TableCell>
                  <TableCell>Modèle</TableCell>
                  <TableCell>Propriétaire</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Période de disponibilité</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.id}</TableCell>
                    <TableCell>{vehicle.brand}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.availability}</TableCell>
                    <TableCell>{vehicle.status}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => setEditingVehicle(vehicle)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteVehicle(vehicle.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredVehicles.length}
            page={page}
            sx={{ color: "#fff" }}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

      {/* Fenêtre de modification de véhicule */}
      {editingVehicle && (
        <Dialog open={Boolean(editingVehicle)} onClose={() => setEditingVehicle(null)}>
          <DialogTitle>Modifier le véhicule</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Marque"
              value={editingVehicle.brand}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, brand: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Modèle"
              value={editingVehicle.model}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Propriétaire"
              value={editingVehicle.owner}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, owner: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="edit-type-label">Type de véhicule</InputLabel>
              <Select
                labelId="edit-type-label"
                value={editingVehicle.type}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, type: e.target.value })}
              >
                <MenuItem value="Voiture">Voiture</MenuItem>
                <MenuItem value="Camion">Camion</MenuItem>
                <MenuItem value="Moto">Moto</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Période de disponibilité"
              value={editingVehicle.availability}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, availability: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingVehicle(null)} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default FleetManagement;
