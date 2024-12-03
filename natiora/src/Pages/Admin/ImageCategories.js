import React, { useState } from "react";
import { Box, Chip, TextField, Button } from "@mui/material";

const ImageCategories = ({ categories = [], onAddCategory }) => {
    const [newCategory, setNewCategory] = useState("");
  
    const handleAddCategory = () => {
      if (newCategory.trim()) {
        onAddCategory(newCategory.trim());
        setNewCategory("");
      }
    };
  
    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          {categories.map((category, index) => (
            <Chip key={index} label={category} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        <TextField
          variant="outlined"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddCategory}>
          Ajouter
        </Button>
      </Box>
    );
  };
  
  export default ImageCategories;
  
