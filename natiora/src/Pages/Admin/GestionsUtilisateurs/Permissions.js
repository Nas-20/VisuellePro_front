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
  Pagination,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const permissions = [
  {
    name: "Gestion des Utilisateurs",
    assignedTo: ["Administrateur"],
    createdDate: "20 Déc 2024, 22:10",
  },
  {
    name: "Gestion du Contenu",
    assignedTo: ["Administrateur", "Développeur", "Analyste", "Support", "Essai"],
    createdDate: "10 Mars 2024, 20:43",
  },
  {
    name: "Gestion Financière",
    assignedTo: ["Administrateur", "Analyste"],
    createdDate: "10 Nov 2024, 06:43",
  },
  {
    name: "Reporting",
    assignedTo: ["Administrateur", "Analyste"],
    createdDate: "10 Nov 2024, 18:05",
  },
  {
    name: "Gestion des Paies",
    assignedTo: ["Administrateur", "Analyste"],
    createdDate: "25 Oct 2024, 21:23",
  },
  {
    name: "Gestion des Litiges",
    assignedTo: ["Administrateur", "Développeur", "Support"],
    createdDate: "22 Sept 2024, 10:30",
  },
  {
    name: "Contrôles API",
    assignedTo: ["Administrateur", "Développeur"],
    createdDate: "05 Mai 2024, 22:10",
  },
  {
    name: "Gestion de la Base de Données",
    assignedTo: ["Administrateur", "Développeur"],
    createdDate: "21 Fév 2024, 06:43",
  },
  {
    name: "Gestion des Dépôts",
    assignedTo: ["Administrateur", "Développeur"],
    createdDate: "21 Fév 2024, 21:23",
  },
];

const GestionDesPermissions = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* En-tête */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Liste des Permissions
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
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
            Ajouter une Permission
          </Button>
        </Stack>
      </Stack>

      {/* Barre de Recherche */}
      <TextField
        placeholder="Rechercher des permissions"
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

      {/* Tableau des Permissions */}
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
              <TableCell sx={{ fontWeight: "bold" }}>Nom</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Attribué à</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date de Création</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission, index) => (
              <TableRow key={index} hover>
                <TableCell>{permission.name}</TableCell>
                <TableCell>
                  {permission.assignedTo.map((role, i) => (
                    <Chip
                      key={i}
                      label={role}
                      sx={{
                        marginRight: 0.5,
                        backgroundColor:
                          role === "Administrateur"
                            ? "#007BFF"
                            : role === "Développeur"
                            ? "#FF5733"
                            : role === "Analyste"
                            ? "#33FF57"
                            : role === "Support"
                            ? "#800080"
                            : "#FFC300",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </TableCell>
                <TableCell>{permission.createdDate}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton>
                      <SettingsIcon sx={{ color: "#007BFF" }} />
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

export default GestionDesPermissions;
