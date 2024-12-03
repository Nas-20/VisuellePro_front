import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  TextField, 
  MenuItem, 
  Box,
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Select, 
  InputLabel, 
  FormControl 
} from '@mui/material';

// Exemple de données de véhicules
const vehiclesData = [
  { id: 1, brand: 'Ford', model: 'Transit', type: 'Camion', capacity: 3, availability: 'Disponible', color: 'Blanc' },
  { id: 2, brand: 'Toyota', model: 'Corolla', type: 'Voiture', capacity: 1, availability: 'Disponible', color: 'Rouge' },
  { id: 3, brand: 'Mercedes', model: 'Sprinter', type: 'Camion', capacity: 5, availability: 'Disponible', color: 'Noir' },
  { id: 4, brand: 'BMW', model: 'X5', type: 'Voiture', capacity: 2, availability: 'Disponible', color: 'Bleu' },
];

const VehicleSearchForCampaign = () => {
  // États pour stocker les véhicules et les filtres de recherche
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [filteredVehicles, setFilteredVehicles] = useState(vehiclesData);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  
  // États pour les filtres
  const [vehicleType, setVehicleType] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');

  // Fonction de filtrage en fonction des critères
  useEffect(() => {
    let filtered = vehicles;
    if (vehicleType) {
      filtered = filtered.filter(vehicle => vehicle.type === vehicleType);
    }
    if (capacityFilter) {
      filtered = filtered.filter(vehicle => vehicle.capacity >= capacityFilter);
    }
    setFilteredVehicles(filtered);
  }, [vehicleType, capacityFilter, vehicles]);

  // Fonction pour ajouter un véhicule à la campagne
  const addVehicleToCampaign = (vehicle) => {
    if (!selectedVehicles.includes(vehicle)) {
      setSelectedVehicles([...selectedVehicles, vehicle]);
    }
  };

  // Fonction pour retirer un véhicule de la sélection
  const removeVehicleFromCampaign = (vehicleId) => {
    setSelectedVehicles(selectedVehicles.filter(vehicle => vehicle.id !== vehicleId));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Recherche de Véhicules pour la Campagne</Typography>
      
      {/* Filtres de recherche */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Type de Véhicule</InputLabel>
            <Select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              label="Type de Véhicule"
            >
              <MenuItem value="">Tous les types</MenuItem>
              <MenuItem value="Voiture">Voiture</MenuItem>
              <MenuItem value="Camion">Camion</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Capacité Minimale (tonnes)"
            type="number"
            value={capacityFilter}
            onChange={(e) => setCapacityFilter(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Liste des véhicules disponibles */}
      <Typography variant="h5" sx={{ mb: 2 }}>Véhicules Disponibles</Typography>
      <Grid container spacing={3}>
        {filteredVehicles.map((vehicle) => (
          <Grid item xs={12} md={4} key={vehicle.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{vehicle.brand} {vehicle.model}</Typography>
                <Typography>Type: {vehicle.type}</Typography>
                <Typography>Capacité: {vehicle.capacity} tonnes</Typography>
                <Typography>Couleur: {vehicle.color}</Typography>
                <Typography>Disponibilité: {vehicle.availability}</Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => addVehicleToCampaign(vehicle)}
                >
                  Ajouter à la Campagne
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Liste des véhicules ajoutés à la campagne */}
      {selectedVehicles.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Véhicules Sélectionnés pour la Campagne</Typography>
          <Grid container spacing={3}>
            {selectedVehicles.map((vehicle) => (
              <Grid item xs={12} md={4} key={vehicle.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{vehicle.brand} {vehicle.model}</Typography>
                    <Typography>Type: {vehicle.type}</Typography>
                    <Typography>Capacité: {vehicle.capacity} tonnes</Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => removeVehicleFromCampaign(vehicle.id)}
                    >
                      Retirer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="success" fullWidth>
              Confirmer la sélection de véhicules pour la campagne
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default VehicleSearchForCampaign;
