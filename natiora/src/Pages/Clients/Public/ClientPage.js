import React, { useState } from "react";
import SidebarClient from "../SidebarClient"; // Sidebar personnalisé pour le client
import ClientDashboard from "../ClientDashboard"; // Page du tableau de bord client
import { Box } from "@mui/material";
import Side from "./Side";

const ClientPage = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <Box
      maxWidth={true}
      sx={{ display: "flex", bgcolor: "#fff", width: "100%" }}
    >
      <Box sx={{ flexGrow: 1,  mt: 5,ml:{md:10, xs:"auto"} }}>
        <Side />
      </Box>
      <Box sx={{ flexGrow: 1, position:"left"}}>
        <SidebarClient setSelectedSection={setSelectedSection} />
      </Box>
      <Box
        position="fixed"
        sx={{
          flexGrow: 1,
          bgcolor: "#f1f1f1",
          alignItems: "center",
          height: "100vh",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          boxShadow: 10,
          width: "78%",
          mt: 0.5,
          mr: {md:1.5, xs:"auto"},
          mb: 3,
          right: 15,
        }}
      >
        
        {selectedSection === "dashboard" && <ClientDashboard />}
        {/* Vous pouvez ajouter d'autres composants ici en fonction de la section sélectionnée */}
      </Box>
    </Box>
  );
};

export default ClientPage;
