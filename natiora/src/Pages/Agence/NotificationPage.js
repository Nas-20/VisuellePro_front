import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const NotificationPage = () => {
  // Exemple de notifications stockées dans un état
  const [notifications] = useState([
    { id: 1, message: 'Nouvelle campagne activée', time: 'Il y a 2 heures' },
    { id: 2, message: 'Véhicule ajouté à la campagne', time: 'Il y a 4 heures' },
    { id: 3, message: 'Campagne terminée', time: 'Il y a 1 jour' },
    { id: 4, message: 'Mise à jour du statut de la campagne', time: 'Il y a 3 jours' },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Notifications
      </Typography>

      {/* Affichage de la liste des notifications */}
      <Paper sx={{ p: 2, boxShadow: 3 }}>
        <List>
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <ListItem>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationPage;
