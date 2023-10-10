import { useContext, useState, createContext, useEffect } from 'react';

const ShoppingCartContext = createContext({});

const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
}

const ShoppingCartProvider = ({ children }) => {    
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
        return Array.isArray(storedCart) ? storedCart : [];
    });
    
    const CART_STORAGE_KEY = 'cart';

    const totalQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
    
    const getItemQuantity = (id) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    };
    
    const increaseItemQuantity = (id) => {
        const itemIndex = cartItems.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            const updatedCart = [...cartItems, { id, quantity: 1 }];
            setCartItems(updatedCart);
        } else {
            const updatedItems = [...cartItems];
            updatedItems[itemIndex].quantity += 1;
            setCartItems(updatedItems);
        }
    };
    
    const decreaseItemQuantity = (id) => {
        const itemIndex = cartItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            const updatedItems = [...cartItems];
            if (updatedItems[itemIndex].quantity === 1) {   
                updatedItems.splice(itemIndex, 1);
            } else {
                updatedItems[itemIndex].quantity -= 1;
            }
            setCartItems(updatedItems);
        }
    };
    
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    }
    
    const clearCart = () => {
        localStorage.removeItem(CART_STORAGE_KEY)
        setCartItems([])
    }
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                setCartItems(parsedCart);
            }
        } catch (error) {
            console.error('Error loading cart from local storage:', error);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart, clearCart, cartItems, totalQuantity }}>
            { children }
        </ShoppingCartContext.Provider>
    )
}

export { ShoppingCartProvider, useShoppingCart };
