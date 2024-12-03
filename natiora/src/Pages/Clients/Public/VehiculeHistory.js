import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const VehicleHistory = () => {
  const vehicleHistory = [
    { id: 1, vehicle: "Ford Transit", campaign: "Campagne A", date: "01/10/2024 - 15/10/2024", status: "Terminé" },
    { id: 2, vehicle: "Toyota Corolla", campaign: "Campagne B", date: "01/11/2024 - 15/11/2024", status: "En cours" },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Véhicule</TableCell>
            <TableCell>Campagne</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleHistory.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.id}</TableCell>
              <TableCell>{entry.vehicle}</TableCell>
              <TableCell>{entry.campaign}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleHistory;
