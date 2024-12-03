import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Button, IconButton, useMediaQuery, Grid, Typography, Container } from "@mui/material";
import {
  Home,
  Inventory,
  ShoppingCart,
  Group,
  DirectionsCar,
  CreditCard,
  Loyalty,
  Article,
  PhotoCamera,
} from "@mui/icons-material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SectionWidget from "./SectionWidget";

import ProductManagement from '../../Pages/Admin/GestionsProduits/Products';
import OrderManagement from '../../Pages/Admin/Orders';
import UserManagement from '../../Pages/Admin/Users';
import FleetManagement from '../../Pages/Admin/Fleet';
import PaymentManagement from '../../Pages/Admin/Payements';
import PromotionManagement from '../../Pages/Admin/Promotions';
import CMSManagement from '../../Pages/Admin/CMS';
import ImageManagementDashboard from "./GestionImage.js/ImageManagementDashboard";
import useAuth from "./UseAuth";
import Images from "../../Pages/Admin/Images";
import AddProduct from "../../Pages/Admin/GestionsProduits/AddProduct";
import List from "../../Pages/Admin/GestionsUtilisateurs/List";
import GestionDesRoles from "../../Pages/Admin/GestionsUtilisateurs/Role";
import GestionDesPermissions from "../../Pages/Admin/GestionsUtilisateurs/Permissions";
import GestionDesCommandes from "../../Pages/Admin/Orders";

const Dashboard = () => {
  useAuth(); // Ajoutez le hook pour vérifier l'authentification
  const [open, setOpen] = useState(true);  // Sidebar ouvert par défaut
  const [activeSection, setActiveSection] = useState('Dashboard');
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Fonction pour changer la section active
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (!isLargeScreen) {
      setOpen(false);  // Ferme la sidebar automatiquement sur petits écrans
    }
  };

  // Icônes de navigation à afficher lorsque la sidebar est fermée
  const renderIcons = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center',mr:{xs:"auto", md:3} }}>
      <IconButton onClick={() => handleSectionChange('Products/List')}>
        <Inventory sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('Orders')}>
        <ShoppingCart sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('Users')}>
        <Group sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('Fleet')}>
        <DirectionsCar sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('Payments')}>
        <CreditCard sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('Promotions')}>
        <Loyalty sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('CMS')}>
        <Article sx={{ color: '#ec8817' }} />
      </IconButton>
      <IconButton onClick={() => handleSectionChange('Images')}>
        <PhotoCamera sx={{ color: '#ec8817' }} />
      </IconButton>
    </Box>
  );

  return (
    <Container maxWidth={true} sx={{ display: "flex", width:"100%" , bgcolor: "#e7e7e7", mt:10.5,height:"100vh"}}>
      <CssBaseline />
      
      <Navbar toggleDrawer={toggleDrawer} isSidebarOpen={open} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} isLargeScreen={isLargeScreen} onSectionChange={handleSectionChange} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#e7e7e7",
          pl: 1,
          mt: 10,
          ml: open && isLargeScreen ? "300px" : "2px",
          transition: "margin-left 0.3s ease",
        }}
      >

        <Grid container spacing={3} sx={{ mt: -11 }}>
          {/* Widgets de raccourcis dans le tableau de bord */}
          {activeSection === 'Dashboard' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <SectionWidget 
                  icon={<Home sx={{ fontSize: 40, color: "#fbfdfe " }} />} 
                  title="Aperçu du tableau de bord" 
                  description="Statistiques globales et accès rapide aux sections." 
                />
                {!open && renderIcons()} {/* Affiche les icônes de navigation si la sidebar est fermée */}
              </Box>

              <Grid container spacing={2} maxWidth={true} sx={{ pt: 2, m: 2, borderRadius: 5, pb: 8, bgcolor: "#392e22 ", width:'98%' }}>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Products')}>
                    Gestion des Produits
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Orders')}>
                    Gestion des Commandes
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Users')}>
                    Gestion des Utilisateurs
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Fleet')}>
                    Gestion de la Flotte 
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Payments')}>
                    Gestion des Paiements
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Promotions')}>
                    Gestion des Promotions
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('CMS')}>
                    Gestion du Contenu (CMS)
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" sx={{ backgroundColor: "#ec8817" }} fullWidth onClick={() => handleSectionChange('Images')}>
                    Gestion des Images
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Gestion des sections spécifiques */}
          {activeSection === 'Products/List' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Inventory sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Produits" 
                  description="Ajouter, modifier ou supprimer des produits." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <ProductManagement />
            </Grid>
          )}
          {activeSection === 'Products/Add' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Inventory sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Produits" 
                  description="Ajouter, modifier ou supprimer des produits." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <AddProduct />
            </Grid>
          )}
          {activeSection === 'Orders' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<ShoppingCart sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Commandes" 
                  description="Suivez, gérez et traitez vos commandes." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <GestionDesCommandes />
            </Grid>
          )}
          {activeSection === 'Users/List' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Group sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Utilisateurs" 
                  description="Gérez les utilisateurs et leurs autorisations." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <List />
            </Grid>
          )}
                    {activeSection === 'Users/Roles' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Group sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Utilisateurs" 
                  description="Gérez les utilisateurs et leurs autorisations." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <GestionDesRoles />
            </Grid>
          )}
                              {activeSection === 'Users/Permissions' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Group sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Utilisateurs" 
                  description="Gérez les utilisateurs et leurs autorisations." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <GestionDesPermissions />
            </Grid>
          )}
          {activeSection === 'Fleet' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<DirectionsCar sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion de la Flotte Publicitaire" 
                  description="Gérez et suivez vos véhicules publicitaires." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <FleetManagement />
            </Grid>
          )}
          {activeSection === 'Payments' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<CreditCard sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Paiements" 
                  description="Gérez les paiements et les transactions." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <PaymentManagement />
            </Grid>
          )}
          {activeSection === 'Promotions' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Loyalty sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Promotions" 
                  description="Créez et gérez des campagnes promotionnelles." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <PromotionManagement />
            </Grid>
          )}
          {activeSection === 'CMS' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<Article sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion du Contenu (CMS)" 
                  description="Gérez le contenu de votre site web." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <CMSManagement />
            </Grid>
          )}
          {activeSection === 'Products/Images' && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionWidget 
                  icon={<PhotoCamera sx={{ fontSize: 40, color: "#fbfdfe ", pt: 1 }} />} 
                  title="Gestion des Images des Produits" 
                  description="Téléchargez ou supprimez des images de vos produits." 
                />
                {!open && renderIcons()} {/* Affiche les icônes si la sidebar est fermée */}
              </Box>
              <Images />
            </Grid>
          )}
          
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
