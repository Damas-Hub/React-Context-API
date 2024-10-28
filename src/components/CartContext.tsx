 import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
}
//This function creates a new context. default value as undefined to enforce that the context must be used within a CartProvider
const CartContext = createContext<CartContextType | undefined>(undefined);

// the CartProvider provide context to its children
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
// Checks if the product being added already exists in the cart by finding its index. If it exists, itemIndex will be its position; otherwise, it will be -1.
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);

      //If it exists (itemIndex !== -1)
      return itemIndex !== -1
        ? prevCart.map((item, index) =>
          //If the item's index matches itemIndex, we create a new object with the same properties but increase the quantity by 1
            index === itemIndex
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
          //If it doesn't exist return a new array that includes all previous items and adds the new item with an initial quantity of 1.
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    //This component provides the cart and addToCart function to all its child components
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
  
};

// This is a custom hook that provides access to the CartContext.
export const useCart = (): CartContextType => {
  // Use the useContext hook to access the current value of CartContext.
  const context = useContext(CartContext);

  // Check if the context is undefined.
  // This condition ensures that the hook is only used within a CartProvider.
  if (context === undefined) {
    // If context is undefined, throw an error 
    throw new Error('useCart must be used within a CartProvider');
  }
  // Return the context, which contains the cart state and addToCart function.
  return context;
};

