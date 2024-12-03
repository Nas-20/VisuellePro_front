import React, { createContext, useReducer, useContext } from 'react';

// Créer le contexte du panier
const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

// Réducteur pour gérer les actions du panier
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case 'REMOVE_FROM_CART':
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        total: state.total - action.payload.price,
      };
    default:
      return state;
  }
};

// Fournisseur du contexte du panier
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook pour utiliser le contexte du panier
export const useCart = () => useContext(CartContext);
