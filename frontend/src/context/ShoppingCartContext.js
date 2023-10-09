import { useContext, useState, createContext, useEffect } from 'react'
const ShoppingCartContext = createContext({})

const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

const ShoppingCartProvider = ({ children }) => {    
    const [cartItems, setCartItems] = useState([]) 
    const totalQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const getItemQuantity = (id) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    
    const increaseItemQuantity = (id) => {
        setCartItems((currItems) => {
            const itemIndex = currItems.findIndex((item) => item.id === id);
            if (itemIndex === -1) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                const updatedItems = [...currItems];
                updatedItems[itemIndex].quantity += 1;
                return updatedItems;
            }
        });
    };
    
    const decreaseItemQuantity = (id) => {
        setCartItems((currItems) => {
            const itemIndex = currItems.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
                const updatedItems = [...currItems];
                if (updatedItems[itemIndex].quantity === 1) {
                    updatedItems.splice(itemIndex, 1);
                } else {
                    updatedItems[itemIndex].quantity -= 1;
                }
                return updatedItems;
            }
            return currItems;
        });
    };
    

    const removeFromCart = (id) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart, cartItems, totalQuantity}}>
            { children }
        </ShoppingCartContext.Provider>
    )
}

export {ShoppingCartProvider, useShoppingCart}