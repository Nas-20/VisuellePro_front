import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
      setUserData(null); // Gérer une erreur API
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        bgcolor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      {userData ? (
        <>
          <Avatar
            src={userData.avatar || "https://via.placeholder.com/100"}
            alt={userData.name}
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {userData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {userData.email}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => alert("Fonctionnalité Modifier à implémenter.")}
          >
            Modifier le profil
          </Button>
        </>
      ) : (
        <Typography color="error">
          Chargement des données utilisateur...
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
