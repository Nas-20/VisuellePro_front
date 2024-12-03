import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const ProductDetailsModal = ({ open, handleClose, product }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Détails du Produit</DialogTitle>
      <DialogContent>
        {product && (
          <Box>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>Prix : {product.price} MGA</Typography>
            <Typography>
              Catégorie : {product.category ? product.category.name : "Non catégorisé"}
            </Typography>
            <Typography>Statut : {product.status}</Typography>
            <Typography>Stock : {product.stock}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Personnalisation :
            </Typography>

            {product.customization && (
              <Box sx={{ pl: 2 }}>
                {/* Afficher les tailles avec ajustement de prix */}
                {product.customization.sizes &&
                  product.customization.sizes.length > 0 && (
                    <>
                      <Typography variant="subtitle2">Tailles :</Typography>
                      {product.customization.sizes.map((size, index) => (
                        <Typography key={index}>
                          Dimensions : {size.dimensions}, Ajustement de prix : {size.price_adjustment} MGA
                        </Typography>
                      ))}
                    </>
                  )}
                {/* Afficher les finitions avec ajustement de prix */}
                {product.customization.finish &&
                  product.customization.finish.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 1 }}>
                        Finitions :
                      </Typography>
                      {product.customization.finish.map((finish, index) => (
                        <Typography key={index}>
                          Description : {finish.description}, Ajustement de prix : {finish.price_adjustment} MGA
                        </Typography>
                      ))}
                    </>
                  )}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsModal;
