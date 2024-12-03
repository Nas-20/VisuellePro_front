import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  Avatar,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";

import imageTop from "../../asset/images/perso.jpg";
import imageBottom from "../../asset/images/vehicule.jpg";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const toggleDrawer = (open) => setDrawerOpen(open);

  const handleScroll = () => setScrolling(window.scrollY > 50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginView(true);
    setOpenLoginModal(true);
  }, []);

  const handleCloseLogin = useCallback(() => setOpenLoginModal(false), []);

  const handleRoleChange = useCallback(
    (event) => setUserRole(event.target.value),
    []
  );

  const validateForm = () => {
    if (!name || !email || !password || !phone || !address) {
      setError("Tous les champs sont obligatoires");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
    } else {
      setPasswordError("");
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleLogin = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
  
      const { access_token, user } = response.data; // Extraire le token et l'utilisateur
      const { role } = user; // Extraire le rôle
  
      // Stocker le token et le rôle dans localStorage
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("userRole", role);
  
      setIsLoggedIn(true); // Mettre à jour l'état de connexion
      handleCloseLogin(); // Fermer la modale de connexion
  
      // Redirection basée sur le rôle
      if (role === "administrateur") {
        navigate("/admin/dashboard");
      } else if (role === "client") {
        navigate("/clients");
      } else if (role === "agence") {
        navigate("/agency");
      } else if (role === "proprietaire") {
        navigate("/owner/dashboard");
      } else {
        navigate("/"); // Redirection par défaut
      }
    } catch (error) {
      setError("Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  }, [email, password, handleCloseLogin, navigate]);
  

  const handleSignup = useCallback(async () => {
    if (!validateForm()) return; // Valider le formulaire
    setError(""); // Réinitialiser les erreurs
    setLoading(true); // Activer le chargement
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role: userRole,
        phone,
        address,
      });
  
      // Afficher un message de succès à l'utilisateur
      setAlertTitle("Inscription réussie");
      setAlertMessage(
        "Votre compte a été créé avec succès. Veuillez vérifier votre email pour l'activer."
      );
      setAlertOpen(true);
  
      // Fermer la modale d'inscription
      handleCloseLogin();
  
      // Ne pas connecter automatiquement l'utilisateur
    } catch (error) {
      // En cas d'erreur, afficher un message dans la modale
      setError("Erreur lors de l'inscription");
      setAlertTitle("Erreur d'inscription");
      setAlertMessage(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
      setAlertOpen(true);
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  }, [
    name,
    email,
    password,
    passwordConfirmation,
    userRole,
    phone,
    address,
    handleCloseLogin,
  ]);
  

const handleGoogleRedirect = () => {
  window.location.href = "http://localhost:8000/auth/google";
};

  const handleFacebookSuccess = useCallback((response) => {
    console.log("Facebook Login Success:", response);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/admin");
  };

  const handleSearchQueryChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/search?query=${query}`
        );
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erreur lors de la recherche des suggestions", error);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/products/${suggestion.id}`);
    setShowSuggestions(false);
    setSearchQuery(suggestion.name);
  };

  return (
    <GoogleOAuthProvider clientId="763714605-5limbcd1v6j96sge2j1oonggp9r33im4.apps.googleusercontent.com">
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 7,
          bgcolor: scrolling ? "#fff" : "transparent",
          color: scrolling ? "#040404" : "#fff",
          transition: "background-color 0.7s ease",
          p: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                bgcolor: scrolling ? "#fff" : "transparent",
                borderRadius: 12,
              }}
            >
              <Avatar
                alt="VisuellePro Logo"
                src={require("../../asset/images/VisuellePro.jpg")}
                sx={{ width: 50, height: 50, mr: 1 }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: scrolling ? "#F07B0C" : "#F07B0C",
                }}
              >
                Visuelle
                <Typography
                  component="span"
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: scrolling ? "#1597B8" : "#1597B8",
                  }}
                >
                  Pro
                </Typography>
              </Typography>
            </Box>
          </Box>

          {/* Navigation links */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                Accueil
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                À propos
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/products"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                Produits
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{ mx: 1, fontWeight: "bold" }}
              >
                Contact
              </Button>
            </Box>
          )}

          <Box
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "transparent",
                  borderRadius: 4,
                  px: 0,
                  mr: 2,
                }}
              >
                <TextField
                  placeholder="Rechercher des produits ou catégories…"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
                  size="small"
                  sx={{ bgcolor: "white", width: 200, borderRadius: 2 }}
                />
                <IconButton
                  type="button"
                  onClick={handleSearchSubmit}
                  sx={{ p: "10px", color: "#000" }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            )}

            {showSuggestions && (
              <Paper
                sx={{
                  position: "absolute",
                  top: 60,
                  left: 15,
                  right: 15,
                  zIndex: 1000,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {suggestions.map((suggestion) => (
                  <ListItemButton
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion.name} />
                  </ListItemButton>
                ))}
              </Paper>
            )}

            {!isLoggedIn ? (
              <Button
                onClick={handleOpenLogin}
                variant="outlined"
                sx={{
                  bgcolor: "#0992f7",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { bgcolor: "#0676d9" },
                }}
              >
                Connexion
              </Button>
            ) : (
              <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{ bgcolor: "#0676d9", color: "#fff" }}
              >
                Déconnexion
              </Button>
            )}
          </Box>
        </Toolbar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary="Accueil" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/about"
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary="À propos" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/products"
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary="Produits" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/contact"
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>

      {/* Modale de connexion/inscription */}
      <Modal open={openLoginModal} onClose={handleCloseLogin}>
        <Box
          sx={{
            p: 4,
            maxWidth: 700,
            mx: "auto",
            mt: 10,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              {isLoginView ? (
                <>
                  <Typography variant="h5" mb={3}>
                    Connectez-vous avec{" "}
                    <span style={{ color: "#e57013" }}>
                      Visuelle<span style={{ color: "#0f8fe3" }}>Pro</span>
                    </span>{" "}
                    !
                  </Typography>
                  {error && <Typography color="error">{error}</Typography>}
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 4 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 4 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2, bgcolor: "#0992f7" }}
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? "Connexion en cours..." : "Connexion"}
                  </Button>
                  <Divider sx={{ my: 2 }}>Ou</Divider>
                  <button onClick={handleGoogleRedirect}>Se connecter avec Google</button>
                  <FacebookLogin
                    appId="your_facebook_app_id"
                    onSuccess={handleFacebookSuccess}
                    render={({ onClick }) => (
                      <Button
                        onClick={onClick}
                        variant="contained"
                        fullWidth
                        sx={{ bgcolor: "#3b5998", color: "#fff", mt: 2 }}
                      >
                        Se connecter avec Facebook
                      </Button>
                    )}
                  />
                  <Button
                    fullWidth
                    sx={{ mt: 2, color: "#333" }}
                    onClick={() => setIsLoginView(false)}
                  >
                    Pas encore inscrit ?{" "}
                    <span style={{ color: "#0f8fe3" }}>S'inscrire</span>
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" mb={5}>
                    Inscription
                  </Typography>
                  {error && <Typography color="error">{error}</Typography>}
                  <TextField
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    label="Téléphone"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    label="Adresse"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <Typography color="error" variant="body2">
                      {passwordError}
                    </Typography>
                  )}
                  <TextField
                    label="Confirmer mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Sélectionner votre rôle</InputLabel>
                    <Select value={userRole} onChange={handleRoleChange}>
                      <MenuItem value="client">Client</MenuItem>
                      <MenuItem value="proprietaire">
                        Propriétaire de Véhicule
                      </MenuItem>
                      <MenuItem value="agence">
                        Agence de Communication
                      </MenuItem>
                      <MenuItem value="administrateur">Administrateur</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: "#28a745", mb: 2 }}
                    onClick={handleSignup}
                    disabled={loading}
                  >
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                  </Button>
                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => setIsLoginView(true)}
                  >
                    Déjà inscrit ? Se connecter
                  </Button>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={imageTop}
                alt="Illustration de la personnalisation"
                style={{ width: "100%", borderRadius: 0, marginBottom: "20px" }}
              />
              <img
                src={imageBottom}
                alt="Illustration de véhicule de publicité"
                style={{ width: "100%", borderRadius: 0 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Dialogue d'alerte */}
      <Dialog open={alertOpen} onClose={handleCloseAlert}>
        <DialogTitle>{alertTitle}</DialogTitle>
        <DialogContent>
          <Typography>{alertMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
