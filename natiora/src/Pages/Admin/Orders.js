// import React, { useState } from "react";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// const OrderManagement = () => {
//   // Liste des commandes (données factices)
//   const [orders, setOrders] = useState([
//     { id: 1, client: "John Doe", total: "150€", status: "En attente" },
//     { id: 2, client: "Jane Smith", total: "200€", status: "Expédiée" },
//     { id: 3, client: "Alex Johnson", total: "100€", status: "Annulée" },
//   ]);

//   // État pour le filtre de statut
//   const [filter, setFilter] = useState("Toutes");

//   // Fonction pour mettre à jour le statut d'une commande
//   const handleStatusChange = (id, newStatus) => {
//     setOrders(
//       orders.map((order) =>
//         order.id === id ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   // Supprimer une commande
//   const deleteOrder = (id) => {
//     setOrders(orders.filter((order) => order.id !== id));
//   };

//   // Filtrer les commandes selon le statut sélectionné
//   const filteredOrders = filter === "Toutes"
//     ? orders
//     : orders.filter((order) => order.status === filter);

//   return (
//     <Container maxWidth={false} sx={{pt:2, borderRadius:5,pb:8, bgcolor:"#392e22 ", width:'100%'}}>
//       <Typography variant="h4" gutterBottom sx={{color:"#fff",pt:3}}>
//         Gestion des Commandes
//       </Typography>

//       {/* Filtre par statut */}
//       <FormControl sx={{ mb: 3, minWidth: 200,}}>
//         <InputLabel id="status-filter-label" sx={{color:"#fff"}}>Filtrer par statut</InputLabel>
//         <Select
//           labelId="status-filter-label"
//           value={filter}
//           sx={{color:"#fff"}}
//           label="Filtrer par statut"
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <MenuItem value="Toutes">Toutes</MenuItem>
//           <MenuItem value="En attente">En attente</MenuItem>
//           <MenuItem value="Expédiée">Expédiée</MenuItem>
//           <MenuItem value="Annulée">Annulée</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Tableau des commandes filtrées */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#ec8817" }}>
//               <TableCell>ID Commande</TableCell>
//               <TableCell>Client</TableCell>
//               <TableCell>Total</TableCell>
//               <TableCell>Statut</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredOrders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.client}</TableCell>
//                 <TableCell>{order.total}</TableCell>
//                 <TableCell>
//                   {/* Sélection du statut */}
//                   <Select
//                     value={order.status}
//                     onChange={(e) =>
//                       handleStatusChange(order.id, e.target.value)
//                     }
//                   >
//                     <MenuItem value="En attente">En attente</MenuItem>
//                     <MenuItem value="Expédiée">Expédiée</MenuItem>
//                     <MenuItem value="Annulée">Annulée</MenuItem>
//                   </Select>
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => deleteOrder(order.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default OrderManagement;
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Stack,
  Pagination,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

const orders = [
  {
    id: "#001",
    customer: "Emma Smith",
    status: "Payée",
    total: "100,00 €",
    createdDate: "01 Déc 2024, 10:00",
  },
  {
    id: "#002",
    customer: "John Doe",
    status: "En attente",
    total: "250,00 €",
    createdDate: "02 Déc 2024, 14:30",
  },
  {
    id: "#003",
    customer: "Melody Macy",
    status: "Annulée",
    total: "80,00 €",
    createdDate: "03 Déc 2024, 18:15",
  },
  {
    id: "#004",
    customer: "Max Smith",
    status: "Expédiée",
    total: "150,00 €",
    createdDate: "04 Déc 2024, 09:45",
  },
];

const GestionDesCommandes = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* En-tête */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Gestion des Commandes
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ textTransform: "none" }}
          >
            Filtrer
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              backgroundColor: "#007BFF",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Ajouter une Commande
          </Button>
        </Stack>
      </Stack>

      {/* Barre de Recherche */}
      <TextField
        placeholder="Rechercher une commande"
        fullWidth
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            padding: "8px",
            "& fieldset": {
              border: "none",
            },
          },
        }}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Tableau des Commandes */}
      <TableContainer
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f1f1" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID Commande</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Client</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Statut</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date de Création</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    sx={{
                      backgroundColor:
                        order.status === "Payée"
                          ? "#33FF57"
                          : order.status === "En attente"
                          ? "#FFC107"
                          : order.status === "Annulée"
                          ? "#FF5733"
                          : "#007BFF",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.createdDate}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton>
                      <EditIcon sx={{ color: "#007BFF" }} />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginTop: 3 }}
      >
        <Pagination count={3} color="primary" />
      </Stack>
    </Box>
  );
};

export default GestionDesCommandes;
