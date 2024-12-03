import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          VisuellePro
        </Typography>

        {/* Liens de navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">Accueil</Button>
          <Button color="inherit" component={Link} to="/search">Produits</Button>
          <Button color="inherit" component={Link} to="/customer">Personnalisation</Button>
          <Button color="inherit" component={Link} to="/cart">Panier</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Box>

        {/* Menu pour mobile */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Accueil</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/search">Produits</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/customer">Personnalisation</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/cart">Panier</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/contact">Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
