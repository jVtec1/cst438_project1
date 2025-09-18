//@ts-nocheck
import { createContext, useContext, useState } from "react";

const cartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
    const context = useContext(cartContext);
    
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;

};

  // Provider component that wraps app
export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]); // our array of cars 

    // Add item to cart
    const addToCart = (item) => {
        // sending function in setCartItems
        setCartItems(prevItems => { // prevItems is the current array of cars/items 
       
        const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            console.log('Item already in cart:', item.id);
            return prevItems; // Don't add duplicate
        } else {
            // Add new item to cart
            console.log('Adding to cart:', item.id, item.make, item.model);
            return [...prevItems, item]; // spread operater "..." copies all items from array of cars/items and ", item" adds new 
            // one to end of array
            // the way setCartItems is written ensures we always use current state
        }
        });
    };

    // Remove specific item from cart
    const removeFromCart = (itemId) => {
        // similar logic to addToCart
        setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item.id !== itemId);
        console.log('Removed from cart:', itemId);
        return newItems;
        });
    };

    // Check if specific item is in cart
    const isInCart = (itemId) => {
        return cartItems.some(item => item.id === itemId);
    };

    // The value object contains everything other components can use
    const value = {
        // State
        cartItems,
        
        // Functions
        addToCart,
        removeFromCart,
        isInCart,
        
    };

    return (
        <cartContext.Provider value={value}>
        {children}
        </cartContext.Provider>
    );
}