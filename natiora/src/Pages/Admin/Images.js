// import React, { useState } from "react";
// import { Box, Tabs, Tab } from "@mui/material";
// import ImageUpload from "./ImageUpload";
// import ImageGallery from "./ImageGallery";
// import ImageCategories from "./ImageCategories";
// import ImageAnalytics from "./ImageAnalytics";
// import ImageEditor from "./ImageEditor";

// const Images = () => {
//   // États globaux
//   const [tabIndex, setTabIndex] = useState(0);
//   const [uploadedImages, setUploadedImages] = useState([]); // Stocke les images téléchargées
//   const [categories, setCategories] = useState(["Produits", "Logos", "Bannières"]); // Catégories initiales
//   const [analyticsData, setAnalyticsData] = useState([]); // Données analytiques

//   // États pour l'éditeur d'image
//   const [currentImage, setCurrentImage] = useState(null); // Image sélectionnée pour l'édition
//   const [isEditing, setIsEditing] = useState(false); // État de la modale d'édition

//   // Gérer le changement d'onglet
//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   // Ajouter de nouvelles images
//   const handleUploadImages = (newImages) => {
//     setUploadedImages((prevImages) => [...prevImages, ...newImages]);
//   };

//   // Supprimer une image
//   const handleDeleteImage = (index) => {
//     setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   // Ouvrir l'éditeur pour une image
//   const handleEditOpen = (image) => {
//     setCurrentImage(image);
//     setIsEditing(true);
//   };

//   // Fermer l'éditeur
//   const handleEditClose = () => {
//     setCurrentImage(null);
//     setIsEditing(false);
//   };

//   // Sauvegarder l'image recadrée
//   const handleSaveCroppedImage = (croppedImage) => {
//     setUploadedImages((prevImages) =>
//       prevImages.map((img) => (img === currentImage ? croppedImage : img))
//     );
//     handleEditClose();
//   };

//   // Exemple de données analytiques (calculées dynamiquement)
//   React.useEffect(() => {
//     const calculateAnalytics = () => {
//       const totalImages = uploadedImages.length;
//       const totalCategories = categories.length;
//       setAnalyticsData([
//         { label: "Total Images", value: totalImages },
//         { label: "Total Categories", value: totalCategories },
//       ]);
//     };

//     calculateAnalytics();
//   }, [uploadedImages, categories]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Tabs
//         value={tabIndex}
//         onChange={handleTabChange}
//         textColor="primary"
//         indicatorColor="secondary"
//       >
//         <Tab label="Téléchargement" />
//         <Tab label="Galerie" />
//         <Tab label="Catégories" />
//         <Tab label="Statistiques" />
//       </Tabs>

//       <Box sx={{ mt: 3 }}>
//         {tabIndex === 0 && <ImageUpload onUpload={handleUploadImages} />}
//         {tabIndex === 1 && (
//           <ImageGallery
//             images={uploadedImages}
//             onDelete={handleDeleteImage}
//             onEdit={handleEditOpen} // Ajout de l'édition
//           />
//         )}
//         {tabIndex === 2 && (
//           <ImageCategories
//             categories={categories}
//             onAddCategory={(category) =>
//               setCategories((prev) => [...prev, category])
//             }
//           />
//         )}
//         {tabIndex === 3 && <ImageAnalytics data={analyticsData} />}
//       </Box>

//       {/* Éditeur d'image intégré */}
//       {isEditing && (
//         <ImageEditor
//           open={isEditing}
//           image={currentImage}
//           onSave={handleSaveCroppedImage}
//           onClose={handleEditClose}
//         />
//       )}
//     </Box>
//   );
// };

// export default Images;
import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";
import ImageCategories from "./ImageCategories";
import ImageAnalytics from "./ImageAnalytics";
import ImageEditor from "./ImageEditor";

const Images = () => {
  // États globaux
  const [tabIndex, setTabIndex] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]); // Stocke les images téléchargées
  const [categories, setCategories] = useState([
    "Produits",
    "Logos",
    "Bannières",
  ]); // Catégories initiales
  const [analyticsData, setAnalyticsData] = useState([]); // Données analytiques

  // États pour l'éditeur d'image
  const [currentImage, setCurrentImage] = useState(null); // Image sélectionnée pour l'édition
  const [isEditing, setIsEditing] = useState(false); // État de la modale d'édition

  // État de chargement
  const [loading, setLoading] = useState(false);

  // Gérer le changement d'onglet
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Ajouter de nouvelles images
  const handleUploadImages = async (newImages) => {
    setLoading(true); // Activer le chargement
    const validFiles = newImages.filter((image) => image instanceof File);
    const formData = new FormData();
    validFiles.forEach((file) => formData.append("images[]", file));
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/upload`,
        formData
      );
      if (response.data.success) {
        // Ajoutez le domaine complet pour chaque URL retournée
        const newUrls = response.data.images.map(
          (file) => `${process.env.REACT_APP_BACKEND_URL}${file.url}`
        );
        setUploadedImages((prevImages) => [...newUrls, ...prevImages]);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload des images :", error);
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };
  

  // Supprimer une image
  const handleDeleteImage = async (index) => {
    const imageToDelete = uploadedImages[index]; // URL complète ou nom du fichier
    const filename = imageToDelete.split("/").pop(); // Extrait le nom du fichier

    try {
      // Appelle l'API DELETE
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/delete-image`,
        {
          data: { filename },
        }
      );

      if (response.data.success) {
        // Met à jour l'état pour supprimer l'image
        setUploadedImages((prevImages) =>
          prevImages.filter((_, i) => i !== index)
        );
        alert("Image supprimée avec succès !");
      } else {
        alert(response.data.message || "Échec de la suppression de l'image.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  // Ouvrir l'éditeur pour une image
  const handleEditOpen = (image) => {
    setCurrentImage(image);
    setIsEditing(true);
  };

  // Fermer l'éditeur
  const handleEditClose = () => {
    setCurrentImage(null);
    setIsEditing(false);
  };

  // Sauvegarder l'image recadrée
  const handleSaveCroppedImage = (croppedImage) => {
    setUploadedImages((prevImages) =>
      prevImages.map((img) => (img === currentImage ? croppedImage : img))
    );
    handleEditClose();
  };

  // Charger les images du backend
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/list-images`);
        const fullUrls = response.data.map(
          (file) => `${backendUrl}${file.url}`
        );
        setUploadedImages(fullUrls);
      } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Nettoyer les URLs générées localement
  useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => {
        if (image instanceof File) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [uploadedImages]);

  // Exemple de données analytiques (calculées dynamiquement)
  useEffect(() => {
    const calculateAnalytics = () => {
      const totalImages = uploadedImages.length;
      const totalCategories = categories.length;
      setAnalyticsData([
        { label: "Total Images", value: totalImages },
        { label: "Total Categories", value: totalCategories },
      ]);
    };

    calculateAnalytics();
  }, [uploadedImages, categories]);

  return (
    <Box sx={{ p: 3 }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="secondary"
      >
        <Tab label="Téléchargement" />
        <Tab label="Galerie" />
        <Tab label="Catégories" />
        <Tab label="Statistiques" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress />
            <Typography variant="body2">Chargement des images...</Typography>
          </Box>
        ) : (
          <>
            {tabIndex === 0 && <ImageUpload onUpload={handleUploadImages} />}
            {tabIndex === 1 && (
              <ImageGallery
                images={uploadedImages}
                onDelete={handleDeleteImage}
                onEdit={handleEditOpen} // Ajout de l'édition
              />
            )}
            {tabIndex === 2 && (
              <ImageCategories
                categories={categories}
                onAddCategory={(category) =>
                  setCategories((prev) => [...prev, category])
                }
              />
            )}
            {tabIndex === 3 && <ImageAnalytics data={analyticsData} />}
          </>
        )}
      </Box>

      {/* Éditeur d'image intégré */}
      {isEditing && (
        <ImageEditor
          open={isEditing}
          image={currentImage}
          onSave={handleSaveCroppedImage}
          onClose={handleEditClose}
        />
      )}
    </Box>
  );
};

export default Images;
