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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";

const PromotionManagement = () => {
  // Liste des promotions (données factices)
  const [promotions, setPromotions] = useState([
    { id: 1, name: "Réduction de 20%", discount: "20%", validity: "01/10/2024 - 30/10/2024", status: "Active", code: "PROMO20" },
    { id: 2, name: "Réduction de 10%", discount: "10%", validity: "01/11/2024 - 15/11/2024", status: "Expire", code: "PROMO10" },
  ]);

  // État pour une nouvelle promotion
  const [newPromotion, setNewPromotion] = useState({ name: "", discount: "", validity: "", status: "Active", code: "" });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Ajouter une nouvelle promotion
  const addPromotion = () => {
    const newId = promotions.length + 1;
    setPromotions([...promotions, { id: newId, ...newPromotion }]);
    setNewPromotion({ name: "", discount: "", validity: "", status: "Active", code: "" });
  };

  // Modifier une promotion
  const handleEditPromotion = (promotion) => {
    setNewPromotion(promotion); // Charger la promotion à modifier
  };

  // Supprimer une promotion
  const deletePromotion = (id) => {
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
  };

  // Générer un code promo aléatoire
  const generatePromoCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPromotion({ ...newPromotion, code });
  };

  // Gérer les changements de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gérer les changements de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth={false} sx={{pt:2, borderRadius:5,pb:8, bgcolor:"#392e22 ", width:'100%',mt:1, boxShadow:"0px 4px 20px 20px rgba(0, 0, 0, 0.1)"}}>
      <Typography variant="h4" gutterBottom sx={{color:"#fff",pt:3,pb:3}}>
        Gestion des Promotions
      </Typography>

      <Grid container spacing={3}>
        {/* Formulaire d'ajout de promotion */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Ajouter une nouvelle promotion</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nom de la promotion"
                  value={newPromotion.name}
                  onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Pourcentage de réduction"
                  value={newPromotion.discount}
                  onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Période de validité"
                  placeholder="01/10/2024 - 30/10/2024"
                  value={newPromotion.validity}
                  onChange={(e) => setNewPromotion({ ...newPromotion, validity: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Statut</InputLabel>
                  <Select
                    labelId="status-label"
                    value={newPromotion.status}
                    label="Statut"
                    onChange={(e) => setNewPromotion({ ...newPromotion, status: e.target.value })}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Expire">Expire</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Code Promo"
                  value={newPromotion.code}
                  onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" onClick={generatePromoCode}>
                  Générer Code Promo
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={addPromotion}
                >
                  Ajouter Promotion
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Liste des promotions avec pagination */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ec8817" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Pourcentage de réduction</TableCell>
                  <TableCell>Validité</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Code Promo</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell>{promotion.id}</TableCell>
                    <TableCell>{promotion.name}</TableCell>
                    <TableCell>{promotion.discount}</TableCell>
                    <TableCell>{promotion.validity}</TableCell>
                    <TableCell>{promotion.status}</TableCell>
                    <TableCell>{promotion.code}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditPromotion(promotion)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deletePromotion(promotion.id)}>
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
            count={promotions.length}
            page={page}
            sx={{color:"#fff"}}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PromotionManagement;
