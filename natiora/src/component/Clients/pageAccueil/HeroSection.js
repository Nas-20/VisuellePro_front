import React from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Icône de recherche
import enseigne from "../../asset/images/enseigne1.jpg"; // Image Néon à droite
import visu from "../../asset/images/visu.png"; // Image circulaire Visuelle Pro en haut à gauche
import xbanner from "../../asset/images/xbanner.jpg"; // Image en bas à gauche (roll-up banner)
import vehicule from "../../asset/images/vehicule.jpg"; // Image principale du camion

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: 'linear-gradient(45deg, #000,#000, #F07B0C)',
        display: "flex",
        alignItems: { xs: "center", md: "center" },
        justifyContent: "center",
        position: "relative",
        py: { xs: "auto", md: 10 },
        boxShadow: "0px 18px 18px rgba(0, 0, 0, 0.2)", // Ombre en bas pour donner un effet bombé
      }}
    >
      <Grid
        container
        spacing={2}
        maxWidth="lg"
        alignItems="center"
        justifyContent="center"
        sx={{ m: 0, pt: 3, pb: 5 }}
      >
        {/* Partie gauche - Images */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: "relative", textAlign: "center" }}
        >
          {/* Images cachées sur petits écrans */}
          <Box
            component="img"
            src={enseigne}
            alt="Image 3"
            sx={{
              width: { xs: "150px", md: "230px" },
              height: "auto",
              position: "absolute",
              top: { xs: "-40px", md: "-70px" },
              right: { xs: "20px", md: "30px" },
              zIndex: 1,
              opacity: 0.9,
              display: { xs: "none", md: "block" }, // Masquer sur petits écrans
            }}
          />

          <Box
            component="img"
            src={vehicule}
            alt="Image 1"
            sx={{
              width: { xs: "90%", md: "60%" },
              maxWidth: "600px",
              height: "auto",
              objectFit: "cover",
              borderRadius: 5,
              zIndex: 2,
              position: "relative",
              mx: "auto",
              display: { xs: "none", md: "block" }, // Masquer sur petits écrans
            }}
          />

          <Box
            component="img"
            src={visu}
            alt="Image 2"
            sx={{
              width: { xs: "80px", md: "100px" },
              height: { xs: "80px", md: "100px" },
              borderRadius: "50%",
              position: "absolute",
              top: { xs: "-10px", md: "-20px" },
              left: { xs: "50px", md: "95px" },
              zIndex: 3,
              border: "3px solid #fff",
              display: { xs: "none", md: "block" }, // Masquer sur petits écrans
            }}
          />

          <Box
            component="img"
            src={xbanner}
            alt="Image 4"
            sx={{
              width: { xs: "130px", md: "230px" },
              height: { xs: "200px", md: "250px" },
              position: "absolute",
              bottom: { xs: "-40px", md: "-70px" },
              left: { xs: "20px", md: "-10px" },
              zIndex: 2,
              border: "2px solid #fff",
              display: { xs: "none", md: "block" }, // Masquer sur petits écrans
            }}
          />
        </Grid>

        {/* Partie droite - Texte et Bouton */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "transparent", // Garder le fond transparent ici
              width: "100%",
              maxWidth: { xs: "80%", md: "75%" },
              textAlign: { xs: "center", md: "left" },
              borderRadius: "15px",
              p: 3,
              mt: { xs: 7, md: 0 },
              border: "2px solid #b4b0ab ", // Bordure blanche visible
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)", // Légère ombre pour améliorer la visibilité
              mx: { xs: "auto", md: "0" }, // Centrer sur petits écrans
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Roboto', sans-serif", // Font-family pour le titre
                fontWeight: "bold",
                fontSize: { xs: "2rem", md: "3rem" },
                mb: 3,
                color: "#fbf9f6", // Texte blanc pour bien ressortir
              }}
            >
              Créer vos campagnes avec{" "}
              <span style={{ color: "#e57013" }}>
                Visuelle<span style={{ color: "#0f8fe3" }}>Pro</span>
              </span>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Roboto', sans-serif", // Font-family pour le sous-titre
                fontSize: { xs: "1rem", md: "1.25rem" },
                mb: 4,
                lineHeight: 1.6,
                color: "#e0e0e0", // Couleur de texte plus claire pour la description
              }}
            >
              Personnalisez vos supports de communication visuelle pour vos
              besoins publicitaires. Simple, rapide et efficace.
            </Typography>

            {/* Boîte de recherche et bouton */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Qu'est ce que vous personnalisez?"
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Font-family pour le champ de recherche
                  flexGrow: 1,
                  mr: 2,
                  width: { xs: "100%", md: "auto" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    bgcolor: "#fbf9f6", // Fond blanc pour le champ de texte
                    color: "#000", // Texte noir à l'intérieur
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#999" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Font-family pour le bouton
                  textTransform: "none",
                  bgcolor: "#0992f7",
                  color: "#fff",
                  px: 4,
                  borderRadius: "50px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  "&:hover": { bgcolor: "#f07b0c" },
                }}
              >
                Personnalisez
              </Button>
            </Box>

            {/* Section Populaire dans une ligne */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Font-family pour le label Populaire
                  fontWeight: "bold",
                  mr: 2,
                  color: "#fff",
                }}
              >
                Populaire:
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Font-family pour les boutons populaires
                  mr: 2,
                  borderRadius: "50px",
                  textTransform: "none",
                  color: "#ffffff", // Texte blanc
                  borderColor: "#ffffff", // Bordure blanche
                  "&:hover": {
                    borderColor: "#bbb",
                    color: "#000", // Changement de couleur au survol
                  },
                }}
              >
                Affiches
              </Button>
              <Button
                variant="outlined"
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Font-family pour les boutons populaires
                  mr: 2,
                  borderRadius: "50px",
                  textTransform: "none",
                  color: "#ffffff", // Texte blanc
                  borderColor: "#ffffff", // Bordure blanche
                  "&:hover": {
                    borderColor: "#bbb",
                    color: "#000", // Changement de couleur au survol
                  },
                }}
              >
                Wrap
              </Button>
              <Button
                variant="outlined"
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Font-family pour les boutons populaires
                  borderRadius: "50px",
                  textTransform: "none",
                  color: "#ffffff", // Texte blanc
                  borderColor: "#ffffff", // Bordure blanche
                  "&:hover": {
                    borderColor: "#bbb",
                    color: "#000", // Changement de couleur au survol
                  },
                }}
              >
                Rollup
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
