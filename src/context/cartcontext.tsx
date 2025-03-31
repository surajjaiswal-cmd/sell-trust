"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Define cart item structure
interface CartItem {
  id: number;
  name: string;
  price: number;
  selectedDate?: string;
  selectedTime?: string;
}

// Define Cart Context Type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
}

// Create context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Default empty array (SSR-safe)
  const [isHydrated, setIsHydrated] = useState(false); // Ensures client-only state updates

  // ✅ Load cart from localStorage **only on client-side**
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsHydrated(true); // Prevents hydration mismatches
  }, []);

  // ✅ Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  // Add item to cart
 const addToCart = (item: CartItem) => {
   setCart((prevCart) => {
     const itemExists = prevCart.some((cartItem) => cartItem.id === item.id);
     if (itemExists) {
       return prevCart; // ✅ Prevent duplicates
     }
     return [...prevCart, item]; // ✅ Add new item
   });
 };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // ✅ Clears from localStorage
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, clearCart, cartCount }}>
      {/* Prevent rendering until hydration is complete */}
      {isHydrated ? children : null}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
