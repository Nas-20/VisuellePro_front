import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Interface simplifiée pour le propriétaire de véhicule
const VehicleOwnerDashboard = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, brand: "Ford", model: "Transit", status: "Disponible", licensePlate: "123-ABC", availability: "01/10/2024 - 30/10/2024" },
    { id: 2, brand: "Toyota", model: "Corolla", status: "En utilisation", licensePlate: "456-DEF", availability: "01/11/2024 - 30/11/2024" },
  ]);
  
  const [newVehicle, setNewVehicle] = useState({ brand: "", model: "", licensePlate: "", availability: "" });
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const addVehicle = () => {
    const newId = vehicles.length + 1;
    setVehicles([...vehicles, { id: newId, ...newVehicle }]);
    setNewVehicle({ brand: "", model: "", licensePlate: "", availability: "" });
  };

  const handleEditVehicle = (vehicle) => setEditingVehicle(vehicle);
  const handleSaveEdit = () => {
    setVehicles(vehicles.map((vehicle) => (vehicle.id === editingVehicle.id ? editingVehicle : vehicle)));
    setEditingVehicle(null);
  };

  const deleteVehicle = (id) => setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));

  return (
    <Container maxWidth={false} sx={{ pt: 5, borderRadius: 5, pb: 8, bgcolor: "#392e22", width: '100%' }}>
      
      {/* Formulaire d'ajout de véhicule */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Ajouter un nouveau véhicule</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marque"
              value={newVehicle.brand}
              onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Modèle"
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Plaque d'immatriculation"
              value={newVehicle.licensePlate}
              onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Période de disponibilité"
              value={newVehicle.availability}
              onChange={(e) => setNewVehicle({ ...newVehicle, availability: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addVehicle}
            >
              Ajouter Véhicule
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Liste des véhicules */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ec8817" }}>
              <TableCell>ID</TableCell>
              <TableCell>Marque</TableCell>
              <TableCell>Modèle</TableCell>
              <TableCell>Plaque d'immatriculation</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>{vehicle.availability}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditVehicle(vehicle)}>
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
        <TablePagination
          component="div"
          count={vehicles.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </TableContainer>

      {/* Fenêtre de modification */}
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
              label="Plaque d'immatriculation"
              value={editingVehicle.licensePlate}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, licensePlate: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Période de disponibilité"
              value={editingVehicle.availability}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, availability: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingVehicle(null)} color="secondary">Annuler</Button>
            <Button onClick={handleSaveEdit} color="primary">Enregistrer</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default VehicleOwnerDashboard;
