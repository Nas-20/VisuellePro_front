import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Fleet = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, brand: "Ford", model: "Transit", status: "Disponible", licensePlate: "123-ABC", availability: "01/10/2024 - 30/10/2024" },
    { id: 2, brand: "Toyota", model: "Corolla", status: "En utilisation", licensePlate: "456-DEF", availability: "01/11/2024 - 30/11/2024" },
  ]);

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  return (
    
    <TableContainer maxWidth={false} sx={{ pt: 5, pb: 8, bgcolor: "#392e22", width: '100%' }}>
      <Table sx={{bgcolor:"#fff"}}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#ec8817" }}>
            <TableCell>ID</TableCell>
            <TableCell>Marque</TableCell>
            <TableCell>Modèle</TableCell>
            <TableCell>Immatriculation</TableCell>
            <TableCell>Disponibilité</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.brand}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>{vehicle.availability}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deleteVehicle(vehicle.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Fleet;
