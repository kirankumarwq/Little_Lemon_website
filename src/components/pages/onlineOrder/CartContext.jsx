import { createContext, useContext, useState } from "react";

// Create the CartContext
const CartContext = createContext();

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // ✅ Default to an empty array

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
