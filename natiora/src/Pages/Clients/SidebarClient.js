import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';

const SidebarClient = ({ setSelectedSection }) => {
  const menuItems = [
    { icon: <AccountCircleIcon />, section: 'dashboard' },
    { icon: <ShoppingCartIcon />, section: 'cart' },
    { icon: <NotificationsIcon />, section: 'notifications' },
  ];

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open
      sx={{
        '& .MuiDrawer-paper': {
          bgcolor: '#d28024',
          color: '#fff',
          width: 70,
          boxShadow:15
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setSelectedSection(item.section)} // Changer la section affichée
            sx={{ '&:hover': { bgcolor: '#1597B8' }, mb: 1, px: 3, mt:5 }}
          >
            <ListItemIcon sx={{ color: '#FFF', mt:2,mb:2 }}>{item.icon}</ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarClient;
