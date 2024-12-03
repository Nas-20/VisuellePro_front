import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { Add as AddIcon, CheckCircle as CheckIcon } from "@mui/icons-material";

const roles = [
  {
    title: "Administrateur",
    totalUsers: 5,
    features: [
      "Tous les contrôles administrateurs",
      "Voir et modifier les résumés financiers",
      "Rapports groupés activés",
      "Voir et modifier les paiements",
      "Voir et modifier les litiges",
      "et 7 autres...",
    ],
  },
  {
    title: "Développeur",
    totalUsers: 14,
    features: [
      "Certains contrôles administrateurs",
      "Voir uniquement les résumés financiers",
      "Voir et modifier les contrôles API",
      "Voir uniquement les paiements",
      "Voir et modifier les litiges",
      "et 3 autres...",
    ],
  },
  {
    title: "Analyste",
    totalUsers: 4,
    features: [
      "Pas de contrôle administrateur",
      "Voir et modifier les résumés financiers",
      "Rapports groupés activés",
      "Voir uniquement les paiements",
      "Voir uniquement les litiges",
      "et 2 autres...",
    ],
  },
  {
    title: "Support",
    totalUsers: 23,
    features: [
      "Pas de contrôle administrateur",
      "Voir uniquement les résumés financiers",
      "Voir uniquement les paiements",
      "Voir et modifier les litiges",
      "Réponse aux commentaires des clients",
    ],
  },
  {
    title: "Essai",
    totalUsers: 546,
    features: [
      "Pas de contrôle administrateur",
      "Voir uniquement les résumés financiers",
      "Voir uniquement les rapports groupés",
      "Voir uniquement les paiements",
      "Voir uniquement les litiges",
    ],
  },
];

const GestionDesRoles = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* En-tête */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Liste des Rôles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            backgroundColor: "#007BFF",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          Créer un Rôle
        </Button>
      </Stack>

      {/* Grille des Rôles */}
      <Grid container spacing={3}>
        {roles.map((role, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {role.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Nombre total d'utilisateurs avec ce rôle : <strong>{role.totalUsers}</strong>
                </Typography>
                <List dense>
                  {role.features.map((feature, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemIcon>
                        <CheckIcon sx={{ color: "#007BFF" }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Voir le Rôle
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#007BFF",
                      "&:hover": { backgroundColor: "#0056b3" },
                    }}
                  >
                    Modifier le Rôle
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Ajouter un Nouveau Rôle */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Ajouter un Nouveau Rôle
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#007BFF",
                  color: "#007BFF",
                  "&:hover": { borderColor: "#0056b3", color: "#0056b3" },
                }}
              >
                Créer
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GestionDesRoles;
