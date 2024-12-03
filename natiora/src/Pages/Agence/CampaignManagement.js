import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Campagne Promotionnelle Été",
      budget: 1000,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      vehicle: "Camion Ford Transit",
    },
    {
      id: 2,
      name: "Lancement Nouveau Produit",
      budget: 1500,
      startDate: "2024-09-01",
      endDate: "2024-09-30",
      vehicle: "Voiture Toyota Corolla",
    },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    budget: "",
    startDate: "",
    endDate: "",
    vehicle: "",
  });

  const [editingCampaign, setEditingCampaign] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  // Fonction pour ajouter une nouvelle campagne
  const addCampaign = () => {
    const newId = campaigns.length + 1;
    setCampaigns([...campaigns, { id: newId, ...newCampaign }]);
    setNewCampaign({ name: "", budget: "", startDate: "", endDate: "", vehicle: "" });
    setOpenDialog(false);
  };

  // Fonction pour ouvrir le modal de modification d'une campagne
  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setOpenDialog(true);
  };

  // Fonction pour enregistrer les modifications apportées à une campagne
  const saveEditedCampaign = () => {
    setCampaigns(campaigns.map((c) => (c.id === editingCampaign.id ? editingCampaign : c)));
    setEditingCampaign(null);
    setOpenDialog(false);
  };

  // Fonction pour supprimer une campagne
  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  // Pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ padding: "30px", backgroundColor: "#2f3132", borderRadius: "15px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#fff", textAlign: "center", fontWeight: "bold" }}>
        Gérer vos Campagnes Publicitaires
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ marginBottom: "20px" }}
      >
        Créer une nouvelle campagne
      </Button>

      {/* Liste des campagnes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ec8817" }}>
              <TableCell>Nom</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Date de début</TableCell>
              <TableCell>Date de fin</TableCell>
              <TableCell>Véhicule affecté</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.budget} €</TableCell>
                <TableCell>{campaign.startDate}</TableCell>
                <TableCell>{campaign.endDate}</TableCell>
                <TableCell>{campaign.vehicle}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditCampaign(campaign)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteCampaign(campaign.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={campaigns.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal pour ajouter/modifier une campagne */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingCampaign ? "Modifier la Campagne" : "Nouvelle Campagne"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de la campagne"
            fullWidth
            value={editingCampaign ? editingCampaign.name : newCampaign.name}
            onChange={(e) => (editingCampaign ? setEditingCampaign({ ...editingCampaign, name: e.target.value }) : setNewCampaign({ ...newCampaign, name: e.target.value }))}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Budget"
            fullWidth
            type="number"
            value={editingCampaign ? editingCampaign.budget : newCampaign.budget}
            onChange={(e) => (editingCampaign ? setEditingCampaign({ ...editingCampaign, budget: e.target.value }) : setNewCampaign({ ...newCampaign, budget: e.target.value }))}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Date de début"
            fullWidth
            type="date"
            value={editingCampaign ? editingCampaign.startDate : newCampaign.startDate}
            onChange={(e) => (editingCampaign ? setEditingCampaign({ ...editingCampaign, startDate: e.target.value }) : setNewCampaign({ ...newCampaign, startDate: e.target.value }))}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Date de fin"
            fullWidth
            type="date"
            value={editingCampaign ? editingCampaign.endDate : newCampaign.endDate}
            onChange={(e) => (editingCampaign ? setEditingCampaign({ ...editingCampaign, endDate: e.target.value }) : setNewCampaign({ ...newCampaign, endDate: e.target.value }))}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
          <Select
            label="Véhicule affecté"
            fullWidth
            value={editingCampaign ? editingCampaign.vehicle : newCampaign.vehicle}
            onChange={(e) => (editingCampaign ? setEditingCampaign({ ...editingCampaign, vehicle: e.target.value }) : setNewCampaign({ ...newCampaign, vehicle: e.target.value }))}
            sx={{ marginBottom: "20px" }}
          >
            <MenuItem value="Camion Ford Transit">Camion Ford Transit</MenuItem>
            <MenuItem value="Voiture Toyota Corolla">Voiture Toyota Corolla</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={editingCampaign ? saveEditedCampaign : addCampaign}
            color="primary"
            variant="contained"
          >
            {editingCampaign ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CampaignManagement;
