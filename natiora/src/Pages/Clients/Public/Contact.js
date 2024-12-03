import { Box } from "@mui/material";
import React from "react";
import ContactPage from "../../../component/Clients/pageAccueil/ContactPage";
import Footer from "../../../component/Clients/pageAccueil/Footer";
import Header from "../../../component/Clients/pageAccueil/Header1";

const Contact = () => {
    return (
        <Box sx={{ 
            minHeight: '100vh',  // S'assure que la page occupe tout l'écran
            display: 'flex', 
            flexDirection: 'column'  // Organiser les éléments en colonne
        }}>

            <Header/>
                <ContactPage />

            
            {/* Footer en bas de la page */}
            <Box sx={{ flexShrink: 0 }}> 
                <Footer />
            </Box>
        </Box>
    ); 
};

export default Contact;
