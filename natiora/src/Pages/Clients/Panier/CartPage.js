import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCart } from '../CartContext';

function CartPage() {
  const { state, dispatch } = useCart();
  const { items, total } = state;

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Votre panier</Typography>

      {items.length === 0 ? (
        <Typography variant="h6">Votre panier est vide</Typography>
      ) : (
        <>
          {items.map((item, index) => (
            <Box key={index} sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Texte : {item.textOverlay}</Typography>
              <Typography>Couleur : {item.selectedColor}</Typography>
              <Typography>Taille du texte : {item.textSize}px</Typography>
              <Typography>Prix : {item.price} €</Typography>
              <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item)}>
                Retirer
              </Button>
            </Box>
          ))}

          <Typography variant="h5" sx={{ marginTop: '20px' }}>Total : {total} €</Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Finaliser la commande
          </Button>
        </>
      )}
    </Box>
  );
}

export default CartPage;
