import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Badge,
  Pagination,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  FileDownload as ExportIcon,
  Add as AddIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

// Exemple de données
const users = [
  {
    id: 1,
    name: "Emma Smith",
    email: "smith@kpmg.com",
    role: "Administrateur",
    lastLogin: "Hier",
    twoStep: "Activé",
    joinedDate: "15 Avr 2024, 20:43",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Melody Macy",
    email: "melody@altbox.com",
    role: "Analyste",
    lastLogin: "Il y a 20 min",
    twoStep: "Activé",
    joinedDate: "10 Nov 2024, 22:10",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Max Smith",
    email: "max@kt.com",
    role: "Développeur",
    lastLogin: "Il y a 3 jours",
    twoStep: "Désactivé",
    joinedDate: "15 Avr 2024, 18:05",
    avatar: "https://via.placeholder.com/50",
  },
];

// Thème Material-UI avec Poppins
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

const List = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#f4f6f8",
          height: "100vh",
          borderRadius: 2,
        }}
      >
        {/* Header avec Barre de Recherche */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 3 }}
        >
          {/* Barre de Recherche à Gauche */}
          <TextField
            placeholder="Rechercher un utilisateur"
            sx={{
              backgroundColor: "white",
              borderRadius: 10,
              maxWidth: "40%",
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

          {/* Boutons Alignés à Droite */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ textTransform: "none" }}
            >
              Filtrer
            </Button>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              sx={{ textTransform: "none" }}
            >
              Exporter
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
              Ajouter un Utilisateur
            </Button>
          </Stack>
        </Stack>

        {/* Tableau des Utilisateurs */}
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
                <TableCell sx={{ fontWeight: "bold" }}>Utilisateur</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Rôle</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Dernière Connexion
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>2FA</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Date d'inscription
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Badge
                        overlap="circular"
                        badgeContent=" "
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor:
                              user.twoStep === "Activé" ? "green" : "red",
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                          },
                        }}
                      >
                        <Avatar src={user.avatar} alt={user.name} />
                      </Badge>
                      <Box>
                        <Typography fontWeight="bold">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: user.twoStep === "Activé" ? "green" : "gray",
                        fontWeight: "bold",
                      }}
                    >
                      {user.twoStep}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell>
                    <IconButton>
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          sx={{ marginTop: 3 }}
        >
          <Pagination count={3} color="primary" />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default List;
