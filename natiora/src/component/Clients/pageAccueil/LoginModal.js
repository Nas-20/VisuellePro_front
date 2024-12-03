// LoginModal.js
import React, { useState } from 'react';
import { Box, Button, Modal, Typography, Avatar, TextField, Divider } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';

const LoginModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulation de redirection en fonction du rôle
    const role = email.includes('admin') ? 'admin' : 'client';
    if (role === 'admin') {
      window.location.href = '/admin-dashboard'; // Redirection vers la page admin
    } else {
      window.location.href = '/client-dashboard'; // Redirection vers la page client
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, mx: 'auto', mt: '20vh', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Se connecter</Typography>

        <Avatar sx={{ bgcolor: '#8A2BE2', width: 80, height: 80, mx: 'auto', mb: 2 }}>S</Avatar>
        <Typography variant="h6">VisuellePro</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>santatra@example.com</Typography>

        <Button fullWidth variant="contained" sx={{ bgcolor: '#7A00FF', mb: 2 }} onClick={handleLogin}>
          Continuer
        </Button>

        <Divider sx={{ my: 2 }}>OU</Divider>

        {/* Connexion avec Google et Facebook */}
        <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 1 }}>
          Se connecter avec Google
        </Button>
        <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ mb: 2 }}>
          Se connecter avec Facebook
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>Ou utiliser un autre compte</Typography>
        <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mt: 2 }} />
        <TextField fullWidth label="Mot de passe" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mt: 2 }} />
        <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
          Connexion
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Vous n'avez pas encore de compte ? <a href="/signup">Créer un compte</a>
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginModal;
