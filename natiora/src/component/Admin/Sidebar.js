// import React from "react";
// import { Drawer, Box, Button } from "@mui/material";
// import {
//   Home as HomeIcon,
//   Inventory as InventoryIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Public as PublicIcon,
//   CreditCard as CreditCardIcon,
//   Loyalty as LoyaltyIcon,
//   ContentPaste as CMSIcon,
//   DirectionsCar,
//   PhotoCamera as PhotoCameraIcon, // Importation de l'icône pour Images
// } from "@mui/icons-material";
// import { Group } from "@mui/icons-material";

// const Sidebar = ({ open, toggleDrawer, isLargeScreen, onSectionChange }) => {
//   return (
//     <Drawer
//       anchor="left"
//       open={open}  // Contrôlé par l'état `open` du Dashboard
//       onClose={toggleDrawer}  // Ferme la sidebar quand on clique à l'extérieur (petit écran)
//       variant={isLargeScreen ? (open ? "persistent" : "temporary") : "temporary"}  // Change le comportement selon la taille de l'écran
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: 300,
//           boxSizing: "border-box",
//           background: "linear-gradient(60deg, #FF8C00 5%, #000000 80%)", // Noir en haut vers orange
//           color: "white",
//           display: "flex",
//           flexDirection: "column",
//           overflowY: "auto",  // Ajout de l'overflow-y pour le contenu scrollable
//         },
//       }}
//     >
//       <Box
//         sx={{
//           padding: 1,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           pt: 9,
//           margin: 3,
//         }}
//       >
//         {/* Contenu du Sidebar */}
//         <Box sx={{ flexGrow: 1 }}>
//           <Button
//             startIcon={<HomeIcon />}
//             fullWidth
//             sx={{
//               color: "white", // Pas de couleur de fond pour les boutons
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#dad8d7 ", // Changement de couleur de texte au survol (orange du logo)
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Dashboard")}
//           >
//             Accueil
//           </Button>
//           <Button
//             startIcon={<InventoryIcon />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Products")}
//           >
//             Produits
//           </Button>
//           <Button
//             startIcon={<ShoppingCartIcon />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Orders")}
//           >
//             Commandes
//           </Button>
//           <Button
//             startIcon={<Group />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Users")}
//           >
//             Utilisateurs
//           </Button>
//           <Button
//             startIcon={<DirectionsCar />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Fleet")}
//           >
//             Flotte Publicitaire
//           </Button>
//           <Button
//             startIcon={<CreditCardIcon />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Payments")}
//           >
//             Paiements
//           </Button>
//           <Button
//             startIcon={<LoyaltyIcon />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Promotions")}
//           >
//             Promotions
//           </Button>
//           <Button
//             startIcon={<CMSIcon />}
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("CMS")}
//           >
//             CMS
//           </Button>
//           <Button
//             startIcon={<PhotoCameraIcon />}  // Icône pour Images
//             fullWidth
//             sx={{
//               color: "white",
//               justifyContent: "flex-start",
//               mb: 4,
//               '&:hover': {
//                 color: "#FF8C00",
//               },
//               transition: "color 0.3s ease",
//             }}
//             onClick={() => onSectionChange("Images")}  // Ajout de la section Images
//           >
//             Images
//           </Button>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;

import React from "react";
import { Drawer, Box, Button, Collapse } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useState } from "react";
import {
  Home,
  Box as Inventory,
  ShoppingCart,
  Users,
  Image as ImageIcon,
  CreditCard,
  Layers,
  PlusCircle,
  Tag, // Icon for Categories
  Clipboard, // Icon for Stock
  Settings, // Icon for Permissions
  UserCheck, // Icon for Roles
  List, 
} from "react-feather";

const Sidebar = ({ open, toggleDrawer, isLargeScreen, onSectionChange }) => {
  const [openProducts, setOpenProducts] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const toggleProducts = () => {
    setOpenProducts((prev) => !prev);
  };
  const toggleUsers = () => {
    setOpenUsers((prev) => !prev);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      variant={isLargeScreen ? (open ? "persistent" : "temporary") : "temporary"}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
          background: "linear-gradient(60deg, #FF8C00 5%, #000000 80%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          boxShadow:7
        },
      }}
    >
      <Box
        sx={{
          padding: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pt: 9,
          margin: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* Accueil */}
          <Button
            startIcon={<Home size={20} />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 4,
              '&:hover': { color: "#dad8d7" },
              transition: "color 0.3s ease",
            }}
            onClick={() => onSectionChange("Dashboard")}
          >
            Accueil
          </Button>

          {/* Gestion des Produits */}
          <Button
            startIcon={<Inventory size={22} />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 3,
              '&:hover': { color: "#FF8C00" },
              transition: "color 0.3s ease",
            }}
            onClick={toggleProducts}
          >
            Gestions Produits {openProducts ? <ExpandLessIcon sx={{ml:3}}/> : <ExpandMoreIcon sx={{ml:3}}/>}
          </Button>
          <Collapse in={openProducts} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 1.5 }}>
              <Button
                startIcon={<Layers size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  '&:hover': { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Products/List")}
              >
                Produits
              </Button>
              <Button
                startIcon={<PlusCircle size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  '&:hover': { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Products/Add")}
              >
                Ajouter
              </Button>
              <Button
                startIcon={<Tag size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  '&:hover': { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Products/Categories")}
              >
                Catégories
              </Button>
              <Button
                startIcon={<Clipboard size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  '&:hover': { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Products/Stock")}
              >
                Gestion des Stocks
              </Button>
              <Button
                startIcon={<ImageIcon size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  '&:hover': { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Products/Images")}
              >
                Images du Produit
              </Button>
            </Box>
          </Collapse>

          {/* Autres sections */}
          <Button
            startIcon={<ShoppingCart size={20} />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 4,
              '&:hover': { color: "#FF8C00" },
              transition: "color 0.3s ease",
            }}
            onClick={() => onSectionChange("Orders")}
          >
            Commandes
          </Button>
          {/* Gestion des Utilisateurs */}
          <Button
            startIcon={<Users size={22} />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 3,
              "&:hover": { color: "#FF8C00" },
              transition: "color 0.3s ease",
            }}
            onClick={toggleUsers}
          >
            Gestion Utilisateurs {openUsers ? <ExpandLessIcon sx={{ ml: 0 }} /> : <ExpandMoreIcon sx={{ ml: 0 }} />}
          </Button>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 1.5 }}>
              <Button
                startIcon={<List size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  "&:hover": { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Users/List")}
              >
                Utilisateurs
              </Button>
              <Button
                startIcon={<UserCheck size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  "&:hover": { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Users/Roles")}
              >
                Rôles
              </Button>
              <Button
                startIcon={<Settings size={20} />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  mb: 2,
                  "&:hover": { color: "#FF8C00" },
                  transition: "color 0.3s ease",
                }}
                onClick={() => onSectionChange("Users/Permissions")}
              >
                Permissions
              </Button>
            </Box>
          </Collapse>
          <Button
            startIcon={<CreditCard size={20} />}
            fullWidth
            sx={{
              color: "white",
              justifyContent: "flex-start",
              mb: 4,
              '&:hover': { color: "#FF8C00" },
              transition: "color 0.3s ease",
            }}
            onClick={() => onSectionChange("Payments")}
          >
            Paiements
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;


