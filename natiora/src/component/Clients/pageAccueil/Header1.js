import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Avatar,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Vérifie si l'écran est mobile
  const [scrolling, setScrolling] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Gérer l'état du Drawer (pour mobile)

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50); // Change la couleur d'arrière-plan lors du défilement
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fonction pour basculer le Drawer pour les mobiles
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 7,
          mt: 0,
          borderTopLeftRadius: 25,
          bgcolor: scrolling ? "#fff" : "transparent",
          color: scrolling ? "#333" : "#fff",
          transition: "background-color 0.5s ease",
          zIndex: 1300,
          width: { xs: "100%", md: "100%" }, // Ajustement de la largeur selon la taille de l'écran
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Navigation Links pour écran non mobile */}
          <Box sx={{ display: "flex" }}>
            <Avatar
              alt="VisuellePro Logo"
              src={require("../../../component/asset/images/VisuellePro.jpg")}
              sx={{ width: 50, height: 50, mr: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#F07B0C", mt: 0.5 }}
            >
              Visuelle
              <Typography
                component="span"
                variant="h4"
                sx={{ fontWeight: "bold", color: "#1597B8" }}
              >
                Pro
              </Typography>
            </Typography>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#333",
                ml: "0%", // Ajustement du margin-left pour plus d'espace
                pt: 3,
                pb: 3,
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                Accueil
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                À propos
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/products"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                Produits
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                Contact
              </Button>
            </Box>
          )}

          {/* Bouton Connexion */}
          {!isMobile && (
            <Button
              variant="outlined"
              sx={{
                bgcolor: "#0992f7",
                color: "#fff",
                textTransform: "none",
                ml: 1,
                fontWeight: "bold",
                px: 3,
              }}
            >
              Connexion
            </Button>
          )}

          {/* Icône Menu pour mobile */}
          {isMobile && (
            <IconButton edge="start" color="#000" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer pour le menu mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 290, mt: 10 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Accueil" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="À propos" />
            </ListItem>
            <ListItem button component={Link} to="/products">
              <ListItemText primary="Produits" />
            </ListItem>
            <ListItem button component={Link} to="/contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
