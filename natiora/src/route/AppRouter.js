import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../component/Admin/Login';
import Dashboard from '../component/Admin/Dashboard';
import Search from '../Pages/Clients/Search';
import ProductCustomization from '../Pages/Clients/ProductCustomization';
import CartPage from '../Pages/Clients/Panier/CartPage'; // Importer la page panier
import { CartProvider } from '../Pages/Clients/CartContext'; // Importer le fournisseur du contexte du panier
import { VersionProvider } from '../Pages/Clients/VersionContext'; 
import Homepage from '../Pages/Clients/Homepage';
import Contact from '../Pages/Clients/Public/Contact';
import AboutPage from '../Pages/Clients/Public/AboutPage';
import AgencyDashboard from '../Pages/Agence/Angency';
import OwnerDashboard from '../component/Admin/PageOwner';
import CampaignManagement from '../Pages/Agence/CampaignManagement';
import ClientPage from '../Pages/Clients/Public/ClientPage';
import ProtectedRoute from '../component/Admin/ProtectedRoute';
import GoogleLogin from '../component/Admin/LoginGoogle';
import ProfilePage from '../Pages/Clients/Public/ProfilPage';
// import ProductPage from '../Pages/Clients/Public/ProductPage';

function AppRouter() {
  return (
    <CartProvider> {/* Fournir le contexte du panier à toute l'application */}
      <VersionProvider>
        <Routes>
          {/* Routes pour les clients */}
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/customer" element={<ProductCustomization />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<Search />} />
          <Route path='/owner' element={<OwnerDashboard/>}/>
          <Route path='campaigns' element={<CampaignManagement/>}/>
          <Route path='/clients' element={<ClientPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>

          {/* Route pour l'agence */}
          <Route path="/agency" element={<ProtectedRoute><AgencyDashboard /></ProtectedRoute>} />

          {/* Routes pour l'administration */}
          <Route path="/admin" element={<SignIn />} />
          <Route path="/admin/google" element={<GoogleLogin/>}/>
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </VersionProvider>
    </CartProvider>
  );
}

export default AppRouter;


