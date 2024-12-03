import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  useMediaQuery,
  AppBar,
  Toolbar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Comment as CommentIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Info as InfoIcon,
  ToggleOn as ToggleIconOn,
  ToggleOff as ToggleIconOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleDrawer, isSidebarOpen }) => {
  const [scrolling, setScrolling] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolling(offset > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Supprimer le token d'authentification de localStorage
    localStorage.removeItem("authToken");

    // Rediriger vers la page d'accueil
    navigate("/admin");

    // Empêcher l'accès aux pages protégées après déconnexion
    window.location.reload();
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        width: "100%",
        display: "flex",
        p: 0,
        boxShadow: 10,
        flexDirection: "row",
        bgcolor: scrolling ? "transparent" : "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Section gauche du Navbar avec logo et texte VisuellePro */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 25px",
          m: 2,
        }}
      >
        <Avatar
          alt="VisuellePro Logo"
          src={require("../asset/images/VisuellePro.jpg")}
          sx={{ width: 50, height: 50, mr: 2 }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#FF8C00",
          }}
        >
          VisuellePro
        </Typography>

        <IconButton sx={{ color: "#db8707 ", ml: 2 }} onClick={toggleDrawer}>
          {isSidebarOpen ? (
            <ToggleIconOn fontSize="large" />
          ) : (
            <ToggleIconOff fontSize="large" />
          )}
        </IconButton>
      </Box>

      {/* Section droite avec icônes et avatar */}
      <Toolbar
        sx={{
          flexGrow: 1,
          justifyContent: "flex-end",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "#FF4081" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: "#4CAF50" }}>
            <CommentIcon />
          </IconButton>

          <IconButton onClick={handleAvatarClick}>
            <Avatar sx={{ color: "#FFF", bgcolor: "#2196F3" }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Mon profil
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            À propos
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Paramètres
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{ justifyContent: "flex-start", mt: "auto", color: "#FF0000" }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Se déconnecter
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
