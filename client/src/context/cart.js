import { useContext, useState, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    // Pass an object with both cart and setCart
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
