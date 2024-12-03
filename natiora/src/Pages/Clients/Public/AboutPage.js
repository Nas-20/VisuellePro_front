import { Box } from "@mui/material";
import React from "react";
import About from "../../../component/Clients/pageAccueil/About";
import Header from "../../../component/Clients/pageAccueil/Header1";

const AboutPage = () => {
    return (
        <Box sx={{ 
            minHeight: '100vh',  // S'assure que la page occupe tout l'écran
            display: 'flex', 
            flexDirection: 'column',  // Organiser les éléments en colonne
            mt:12,
        }}>
            {/* Passez isContactPage comme prop */}
            <Header/>
            
            {/* Contenu principal */}
            <Box sx={{ flex: '1 0 auto' }}> 
                <About />
            </Box>
            
        </Box>
    );
};

export default AboutPage;
