// // import React, { useState } from 'react';
// // import { Box, Typography, Grid, Paper, Button, Divider } from '@mui/material';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // import HistoryIcon from '@mui/icons-material/History';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import AddIcon from '@mui/icons-material/Add';

// // const ClientDashboard = () => {
// //   const [orders, setOrders] = useState([
// //     { id: 1, product: 'Produit A', status: 'Livré', price: '50 €', date: '10/10/2023' },
// //     { id: 2, product: 'Produit B', status: 'En cours', price: '30 €', date: '12/10/2023' },
// //   ]);

// //   const [cart, setCart] = useState([
// //     { product: 'Produit C', quantity: 2, price: '25 €' },
// //     { product: 'Produit D', quantity: 1, price: '15 €' },
// //   ]);

// //   const [notifications, setNotifications] = useState([
// //     { message: 'Votre commande a été expédiée', time: 'Il y a 2 jours' },
// //     { message: 'Nouvelle promotion disponible', time: 'Il y a 5 jours' },
// //   ]);

// //   return (
// //     <Box sx={{ pl: 30 }}>
// //       <Typography variant="h4" sx={{ mb: 3 }}>
// //         Tableau de bord client
// //       </Typography>

// //       {/* Section des commandes */}
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} sm={6} md={4}>
// //           <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
// //             <ShoppingCartIcon sx={{ fontSize: 40, color: '#FFC107' }} />
// //             <Typography variant="h6" sx={{ mt: 2 }}>Commandes en cours</Typography>
// //             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1597B8' }}>{orders.length}</Typography>
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={4}>
// //           <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
// //             <HistoryIcon sx={{ fontSize: 40, color: '#28A745' }} />
// //             <Typography variant="h6" sx={{ mt: 2 }}>Historique des achats</Typography>
// //             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1597B8' }}>{orders.filter(order => order.status === 'Livré').length}</Typography>
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={4}>
// //           <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
// //             <AccountCircleIcon sx={{ fontSize: 40, color: '#FF6F61' }} />
// //             <Typography variant="h6" sx={{ mt: 2 }}>Mon Compte</Typography>
// //             <Button variant="contained" sx={{ mt: 2 }}>Modifier</Button>
// //           </Paper>
// //         </Grid>
// //       </Grid>

// //       {/* Section Gestion du panier */}
// //       <Box sx={{ mt: 5 }}>
// //         <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Mon Panier</Typography>
// //         <Paper sx={{ p: 3, boxShadow: 3 }}>
// //           {cart.map((item, index) => (
// //             <Box key={index} sx={{ mb: 3 }}>
// //               <Typography variant="h6">{item.product}</Typography>
// //               <Divider sx={{ my: 1 }} />
// //               <Typography>Quantité: {item.quantity}</Typography>
// //               <Typography>Prix: {item.price}</Typography>
// //             </Box>
// //           ))}
// //         </Paper>
// //       </Box>

// //       {/* Notifications */}
// //       <Box sx={{ mt: 5 }}>
// //         <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
// //         <Paper sx={{ p: 3, boxShadow: 3 }}>
// //           {notifications.map((notification, index) => (
// //             <Box key={index} sx={{ mb: 3 }}>
// //               <Typography variant="body1">{notification.message}</Typography>
// //               <Typography variant="caption">{notification.time}</Typography>
// //             </Box>
// //           ))}
// //         </Paper>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ClientDashboard;
// import { Avatar, Box, IconButton, TextField,Menu,MenuItem,Divider, ListItemIcon } from "@mui/material";
// import {React,useState} from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Settings as SettingsIcon,
//   AccountCircle as AccountCircleIcon,
//   Info as InfoIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import HeroClients from "../../component/Clients/pageAccueil/HeroClients";

// const ClientDashboard = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();
//   const handleAvatarClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleLogout = () => {
//     // Supprimer le token d'authentification de localStorage
//     localStorage.removeItem("authToken");

//     // Rediriger vers la page d'accueil
//     navigate("/admin");

//     // Empêcher l'accès aux pages protégées après déconnexion
//     window.location.reload();
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//       window.history.go(1);
//     };
//   };
//   return (
//     <Box maxWidth={true} sx={{ width: "100%" }}>
//       <Box
//         display="flex"
//         flexDirection="row"
//         sx={{ justifyContent: "flex-end", alignItems: "center", mr: 0, borderTopLeftRadius:20,borderTopRightRadius:20, bgcolor:"#333",width:"100%",}}
//       >
//         <TextField
//           label="Rechercher ici les produits (ex: rollup, banner,etc...)"
//           variant="outlined"
//           sx={{ width: "40%", mt: 1, mb:1,bgcolor: "#efefec", mr: "20%", borderRadius:12 }}
//         />
//         <IconButton onClick={handleAvatarClick}>
//         <Avatar sx={{ width: 52, height: 52, mt: 1,mr:6,mb:1 }}>
//         <AccountCircleIcon fontSize="large" />
//         </Avatar>
//         </IconButton>
//       </Box>
//       <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           PaperProps={{
//             elevation: 0,
//             sx: {
//               overflow: "visible",
//               mt: 1.5,
//               boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
//               borderRadius: 2,
//               "& .MuiAvatar-root": {
//                 width: 32,
//                 height: 32,
//                 ml: -0.5,
//                 mr: 1,
//               },
//               "&:before": {
//                 content: '""',
//                 display: "block",
//                 position: "absolute",
//                 top: 0,
//                 right: 14,
//                 width: 10,
//                 height: 10,
//                 bgcolor: "background.paper",
//                 transform: "translateY(-50%) rotate(45deg)",
//               },
//             },
//           }}
//           transformOrigin={{ horizontal: "right", vertical: "top" }}
//           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         >
//           <MenuItem onClick={handleClose}>
//             <Avatar /> Mon profil
//           </MenuItem>

//           <MenuItem onClick={handleClose}>
//             <ListItemIcon>
//               <InfoIcon fontSize="small" />
//             </ListItemIcon>
//             À propos
//           </MenuItem>

//           <MenuItem onClick={handleClose}>
//             <ListItemIcon>
//               <SettingsIcon fontSize="small" />
//             </ListItemIcon>
//             Paramètres
//           </MenuItem>

//           <Divider />
//           <MenuItem
//             onClick={handleLogout}
//             sx={{ justifyContent: "flex-start", mt: "auto", color: "#FF0000" }}
//           >
//             <ListItemIcon>
//               <LogoutIcon fontSize="small" />
//             </ListItemIcon>
//             Se déconnecter
//           </MenuItem>
//         </Menu>
//         <Box sx={{ml:15, }}>
//         <HeroClients/>
//         </Box>
//     </Box>
//   );
// };
// export default ClientDashboard;

// import React, { useState } from "react";
// import {
//   Avatar,
//   Box,
//   IconButton,
//   TextField,
//   Menu,
//   MenuItem,
//   Divider,
//   ListItemIcon,
//   InputAdornment,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   Settings as SettingsIcon,
//   AccountCircle as AccountCircleIcon,
//   Info as InfoIcon,
//   Logout as LogoutIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import HeroClients from "../../component/Clients/pageAccueil/HeroClients";

// const ClientDashboard = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   const handleAvatarClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/admin");
//     window.location.reload();
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//       window.history.go(1);
//     };
//   };

//   return (
//     <Box maxWidth={true} sx={{ width: "100%" }}>
//       <Box
//         display="flex"
//         flexDirection="row"
//         sx={{
//           justifyContent: "flex-end",
//           alignItems: "center",
//           borderTopLeftRadius: 25,
//           borderTopRightRadius: 25,
//           bgcolor: "transparent",
//           width: "100%",
//         }}
//       >
//         <Box
//           display="flex"
//           alignItems="center"
//           sx={{
//             width: "40%",
//             mt: 1,
//             mb: 1,
//             mr:"15%",
//             bgcolor: "#fff",
//             border: "2px solid #fff",
//             borderRadius: "50px", // Bordures arrondies continues
//             overflow: "hidden",
//           }}
//         >
//           <TextField
//             fullWidth
//             placeholder="Rechercher ici les produits (ex: rollup, banner, etc...)"
//             variant="standard"
//             InputProps={{
//               disableUnderline: true, // Supprime les bordures internes
//               sx: {
//                 pl: 2,
//                 bgcolor:"#fff",
//               },
//             }}
//           />
//           <IconButton sx={{ p: 1.5, bgcolor:"#d28024", borderTopLeftRadius:0 }}>
//             <SearchIcon />
//           </IconButton>
//         </Box>

//         <IconButton onClick={handleAvatarClick}>
//           <Avatar sx={{ width: 52, height: 52, mt: 1, mr: 20, mb: 1 }}>
//             <AccountCircleIcon fontSize="large" />
//           </Avatar>
//         </IconButton>
//       </Box>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: "visible",
//             mt: 1.5,
//             boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
//             borderRadius: 2,
//             "& .MuiAvatar-root": {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             "&:before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: "background.paper",
//               transform: "translateY(-50%) rotate(45deg)",
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={handleClose}>
//           <Avatar /> Mon profil
//         </MenuItem>

//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <InfoIcon fontSize="small" />
//           </ListItemIcon>
//           À propos
//         </MenuItem>

//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <SettingsIcon fontSize="small" />
//           </ListItemIcon>
//           Paramètres
//         </MenuItem>

//         <Divider />
//         <MenuItem
//           onClick={handleLogout}
//           sx={{ justifyContent: "flex-start", mt: "auto", color: "#FF0000" }}
//         >
//           <ListItemIcon>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           Se déconnecter
//         </MenuItem>
//       </Menu>

//       <Box sx={{ ml: 15 }}>
//         <HeroClients />
//       </Box>
//     </Box>
//   );
// };

// export default ClientDashboard;
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import HeroClients from "../../component/Clients/pageAccueil/HeroClients";
import axios from "axios";
import SectionCard from "./Public/SectionCard";

const ClientDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null); // Stockage des données utilisateur
  const navigate = useNavigate();

  // Fonction pour récupérer les données utilisateur
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
      );
      navigate("/admin"); // Redirige vers la page de connexion si une erreur survient
    }
  };
  console.log(userData);
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin");
    window.location.reload();
  };

  const handleProfile = () => {
    handleClose();
    // Rediriger vers une page de profil utilisateur (à créer si nécessaire)
    navigate("/profile");
  };

  return (
    <Box maxWidth={true} sx={{ width: "100%" }}>
      {/* Barre supérieure */}
      <Box
        display="flex"
        flexDirection="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          bgcolor: "transparent",
          width: "97.8%",
          p: 2,
        }}
      >
        {/* Recherche */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            width: { md: "40%", xs: "auto" },
            bgcolor: "#fff",
            border: "2px solid #fff",
            borderRadius: "50px",
            overflow: "hidden",
            ml: { md: 45, xs: "auto" },
          }}
        >
          <TextField
            fullWidth
            placeholder="Rechercher ici les produits (ex: rollup, banner, etc...)"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { pl: 2, bgcolor: "#fff" },
            }}
          />
          <IconButton
            sx={{ p: 1.5, bgcolor: "#d28024", borderTopLeftRadius: 0 }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Avatar et nom d'utilisateur */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ mr: { md: 20, xs: "auto" } }}
        >
          {userData && (
            <Typography variant="body1" sx={{ mr: 2, fontWeight: "bold" }}>
              {userData.name}
            </Typography>
          )}
          <IconButton onClick={handleAvatarClick}>
            <Avatar
              sx={{
                width: { md: 52, xs: "auto" },
                height: { md: 52, xs: "auto" },
              }}
              src={userData && userData.avatar ? userData.avatar : null}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150"; // Image de secours en cas d'erreur
              }}
            >
              {userData && !userData.avatar && (
                <AccountCircleIcon fontSize="large" />
              )}
            </Avatar>
          </IconButton>
        </Box>
      </Box>

      {/* Menu déroulant pour l'avatar */}
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
        <MenuItem onClick={handleProfile}>
          <Avatar src={userData ? userData.avatar : null} />
          Mon profil
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          À propos
        </MenuItem>

        <MenuItem>
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

      {/* Contenu principal */}
      <Box sx={{ ml: { md: 6, xs: 2 }, mr: { md: 0, xs: 2 } }}>
        <HeroClients />
      </Box>
      <Box sx={{ ml: { md: 6, xs: 2 }, mt: 3, mr: { md: 0, xs: 2 } }}>
        <SectionCard />
      </Box>
    </Box>
  );
};

export default ClientDashboard;
