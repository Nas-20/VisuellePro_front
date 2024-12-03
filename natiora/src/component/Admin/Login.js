import React, { useState, useEffect } from 'react';
import { Divider, Grid, useMediaQuery } from '@mui/material';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Logo from '../asset/images/VisuellePro.jpg';

const customTheme = createTheme({
  palette: {
    primary: { main: '#ff9800' },
    secondary: { main: '#1976d2' },
    background: { default: '#000', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#b0bec5' },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
    h4: { fontWeight: 600, color: '#ffffff', fontSize: '1.4rem' },
    body1: { fontSize: '0.9rem', color: '#ffffff' },
    body2: { fontSize: '0.8rem' },
  },
  shape: { borderRadius: 20 },
});

const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY: 'auto',
}));

const Form = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  width: '85%',
  maxWidth: '450px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // Nouveau champ pour téléphone
  const [address, setAddress] = useState(''); // Nouveau champ pour adresse
  const [role, setRole] = useState('client');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (email === 'test@example.com' && password === 'password') {
      navigate('/dashboard');
    } else if (error) {
      alert(error);
    }
  }, [email, password, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (name === '' || email === '' || password === '' || phone === '' || address === '') {
        setError('Veuillez remplir tous les champs.');
      } else {
        setError(null);
        // Gérer l'inscription ici (ex. appeler une API)
        alert('Inscription réussie');
      }
    } else {
      if (email === '' || password === '') {
        setError('Veuillez remplir tous les champs.');
      } else {
        setError(null);
        // Gérer la connexion ici (ex. appeler une API)
        alert('Connexion réussie');
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <CssBaseline />
        <Grid
          container
          spacing={2}
          sx={{
            backgroundImage: 'linear-gradient(to bottom, #fff, #000)',
            height: '100vh',
            padding: isSmallScreen ? '12px' : '0',
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            {!isSmallScreen && (
              <Box component="img" src={Logo} alt="Logo" sx={{ width: 250, mb: 2 }} />
            )}
            <Typography variant="h4" component="h1" gutterBottom align="center">
              {isSignUp ? 'Inscription' : 'Bienvenu dans notre Plateforme'}
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 1 }}>
              {isSignUp
                ? 'Veuillez remplir le formulaire pour créer votre compte VisuellePro'
                : 'Connectez-vous et découvrez nos meilleures fonctionnalités'}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Form component="form" noValidate onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" alignItems="center" width="100%" sx={{ mt: 1 }}>
                {isSignUp && (
                  <>
                    <TextField
                      label="Nom"
                      id="name"
                      name="name"
                      type="text"
                      required
                      fullWidth
                      helperText="Veuillez entrer votre nom"
                      margin="normal"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                        },
                      }}
                    />
                    <TextField
                      label="Téléphone"
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      fullWidth
                      helperText="Veuillez entrer votre numéro de téléphone"
                      margin="normal"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      sx={{
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                        },
                      }}
                    />
                    <TextField
                      label="Adresse"
                      id="address"
                      name="address"
                      type="text"
                      required
                      fullWidth
                      helperText="Veuillez entrer votre adresse"
                      margin="normal"
                      variant="outlined"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      sx={{
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                        },
                      }}
                    />
                  </>
                )}

                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  fullWidth
                  helperText="Veuillez entrer votre email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon style={{ color: '#ff9800', fontSize: isSmallScreen ? '18px' : '24px' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                    },
                  }}
                />

                <TextField
                  label="Mot de passe"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  required
                  fullWidth
                  helperText="Veuillez entrer votre mot de passe"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: '#ff9800', fontSize: isSmallScreen ? '18px' : '24px' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                    },
                  }}
                />

                {isSignUp && (
                  <TextField
                    label="Rôle"
                    id="role"
                    name="role"
                    select
                    required
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    helperText="Sélectionnez votre rôle"
                    margin="normal"
                    variant="outlined"
                    sx={{
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                      },
                    }}
                  >
                    <option value="client">Client</option>
                    <option value="gestionnaire">Gestionnaire</option>
                    <option value="administrateur">Administrateur</option>
                  </TextField>
                )}

                <FormControlLabel control={<Checkbox name="remember" color="primary" />} label="Se souvenir de moi" sx={{ alignSelf: 'flex-start', margin: 1 }} />

                <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '10px', color: '#fff', width: '100%', mt: 2 }}>
                  {isSignUp ? "S'inscrire" : 'Se connecter'}
                </Button>

                <Box display="flex" justifyContent="center" width="90%" sx={{ margin: 1 }}>
                  <Divider sx={{ flex: 1, margin: 3, borderColor: '#b0bec5' }} />
                  <Typography align="center" color="textSecondary" sx={{ margin: 2 }}>ou</Typography>
                  <Divider sx={{ flex: 1, margin: 3, borderColor: '#b0bec5' }} />
                </Box>

                {!isSignUp && (
                  <Stack spacing={3} sx={{ width: '100%' }}>
                    <Button variant="outlined" startIcon={<GoogleIcon sx={{ fontSize: isSmallScreen ? '18px' : '24px' }} />} fullWidth sx={{ borderRadius: '25px', textTransform: 'capitalize', backgroundColor: '#ffff', color: '#000', borderColor: '#DB4437', '&:hover': { backgroundColor: '#e53935' } }}>
                      Se connecter avec Google
                    </Button>
                    <Button variant="outlined" startIcon={<FacebookIcon sx={{ fontSize: isSmallScreen ? '18px' : '24px' }} />} fullWidth sx={{ borderRadius: '25px', textTransform: 'capitalize', backgroundColor: '#0a58e0 ', color: '#fff', borderColor: '#4267B2', '&:hover': { backgroundColor: '#3b5998' } }}>
                      Se connecter avec Facebook
                    </Button>
                  </Stack>
                )}

                <Typography variant="body2" align="center" sx={{ marginTop: 2, cursor: 'pointer', color: '#fff' }} onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? 'Vous avez déjà un compte ? Connexion' : "Vous n'avez pas de compte ? Inscrivez-vous"}
                </Typography>
              </Box>
            </Form>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
