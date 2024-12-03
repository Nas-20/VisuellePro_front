import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
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
  Button,
  TablePagination,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

const PaymentManagement = () => {
  // Liste des paiements (données factices)
  const [payments, setPayments] = useState([
    { id: 1, client: "John Doe", amount: "150€", date: "01/10/2024", status: "Réussi", method: "Carte Bancaire" },
    { id: 2, client: "Jane Smith", amount: "200€", date: "05/10/2024", status: "En attente", method: "PayPal" },
    { id: 3, client: "Alex Johnson", amount: "100€", date: "10/10/2024", status: "Échoué", method: "Virement Bancaire" },
  ]);

  // Filtrer par statut
  const [filterStatus, setFilterStatus] = useState("Tous");

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Gérer les changements de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gérer les changements de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtrer les paiements par statut
  const filteredPayments = filterStatus === "Tous"
    ? payments
    : payments.filter((payment) => payment.status === filterStatus);

  // Simuler le téléchargement de la facture (fonctionnalité fictive ici)
  const handleDownloadInvoice = (id) => {
    alert(`Télécharger la facture pour le paiement ID : ${id}`);
  };

  return (
    <Container maxWidth={false} sx={{pt:2, borderRadius:5,pb:8, bgcolor:"#392e22 ", width:{xs:'auto'}}}>
      <Typography variant="h5" gutterBottom sx={{color:"#fff",pt:3,pb:3}}>
        Gestion des Paiements
      </Typography>

      <Grid container spacing={3}>
        {/* Filtre par statut */}
        <Grid item xs={12}>
          <FormControl sx={{ mb: 3, minWidth: 200 }}>
            <InputLabel id="filter-status-label" sx={{color:"#fff"}}>Filtrer par statut</InputLabel>
            <Select
              labelId="filter-status-label"
              value={filterStatus}
              sx={{color:"#fff"}}
              label="Filtrer par statut"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="Tous">Tous</MenuItem>
              <MenuItem value="Réussi">Réussi</MenuItem>
              <MenuItem value="En attente">En attente</MenuItem>
              <MenuItem value="Échoué">Échoué</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Liste des paiements avec pagination */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ec8817" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Méthode de paiement</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.client}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadInvoice(payment.id)}
                      >
                        Facture
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredPayments.length}
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

export default PaymentManagement;
