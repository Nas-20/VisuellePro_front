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
  Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const UserManagement = () => {
  // Liste des utilisateurs initialisée vide
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Client" });
  const [editingUser, setEditingUser] = useState(null); // État de modification utilisateur
  const [filterRole, setFilterRole] = useState("Tous");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Charger les utilisateurs à partir de l'API Laravel
  useEffect(() => {
    axios.get("http://localhost:8000/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des utilisateurs", error);
      });
  }, []);

  // Fonction pour éditer l'utilisateur sélectionné
  const handleEditUser = (user) => {
    setEditingUser(user); // Ouvre la fenêtre de modification avec l'utilisateur sélectionné
  };

  // Validation de base
  const validateFields = () => {
    if (!newUser.name || !newUser.email) {
      setErrorMessage("Tous les champs doivent être remplis.");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(newUser.email)) {
      setErrorMessage("Email invalide.");
      return false;
    }
    return true;
  };

  // Ajouter un nouvel utilisateur
  const addUser = () => {
    if (!validateFields()) return;

    axios.post("http://localhost:8000/api/users", newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: "", email: "", role: "Client" });
        setSuccessMessage("Utilisateur ajouté avec succès.");
        setErrorMessage(null);
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        setErrorMessage("Erreur lors de l'ajout de l'utilisateur.");
      });
  };

  // Modifier un utilisateur existant
  const handleSaveEdit = () => {
    if (!validateFields()) return;

    axios.put(`http://localhost:8000/api/users/${editingUser.id}`, editingUser)
      .then(response => {
        setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
        setEditingUser(null);
        setSuccessMessage("Utilisateur modifié avec succès.");
        setErrorMessage(null);
      })
      .catch(error => {
        console.error("Erreur lors de la modification de l'utilisateur", error);
        setErrorMessage("Erreur lors de la modification de l'utilisateur.");
      });
  };

  // Supprimer un utilisateur
  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setSuccessMessage("Utilisateur supprimé avec succès.");
        setErrorMessage(null);
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        setErrorMessage("Erreur lors de la suppression de l'utilisateur.");
      });
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtrer les utilisateurs selon le rôle sélectionné
  const filteredUsers = filterRole === "Tous"
    ? users
    : users.filter((user) => user.role === filterRole);

  // Pagination des utilisateurs
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth={false} sx={{ pt: 2,mt:1, borderRadius: 5, pb: 8, bgcolor: "#392e22", width: '100%', boxShadow:"0px 4px 20px 20px rgba(0, 0, 0, 0.1)", }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#fff", pt: 3, pb: 3 }}>
        Gestion des Utilisateurs
      </Typography>

      {/* Afficher le message de succès ou d'erreur */}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Grid container spacing={3}>
        {/* Formulaire d'ajout d'utilisateur */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Ajouter un nouvel utilisateur</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Rôle</InputLabel>
                  <Select
                    label="role-label"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <MenuItem value="Client">Client</MenuItem>
                    <MenuItem value="Propriétaire de véhicule">Propriétaire de véhicule</MenuItem>
                    <MenuItem value="Administrateur">Administrateur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={addUser}
                >
                  Ajouter Utilisateur
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Liste des utilisateurs */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#f0f0f0" }}>
            <Typography variant="h6" sx={{mb:2}}>Liste des utilisateurs</Typography>
            <FormControl sx={{ mb: 3, minWidth: 200 }}>
              <InputLabel >Filtrer par rôle</InputLabel>
              <Select
                label="filter-role-label"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <MenuItem value="Tous">Tous</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Propriétaire de véhicule">Propriétaire de véhicule</MenuItem>
                <MenuItem value="Administrateur">Administrateur</MenuItem>
              </Select>
            </FormControl>

            {/* Table des utilisateurs */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#ec8817" }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rôle</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditUser(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteUser(user.id)}>
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
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Fenêtre de modification d'utilisateur */}
      {editingUser && (
        <Dialog open={Boolean(editingUser)} onClose={() => setEditingUser(null)}>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Nom"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="edit-role-label">Rôle</InputLabel>
              <Select
                labelId="edit-role-label"
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              >
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Propriétaire de véhicule">Propriétaire de véhicule</MenuItem>
                <MenuItem value="Administrateur">Administrateur</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingUser(null)} color="secondary">
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

export default UserManagement;
