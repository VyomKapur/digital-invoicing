import { useContext, useState, createContext } from 'react'

const ShoppingCartContext = createContext({})

const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const getItemQuantity = (id) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const increaseItemQuantity = (id) => {
        setCartItems( currItems => {
            if(currItems.find(item => item.id === id) === null){
                return [...currItems, {id, quantity: 1}]
            } else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity+1}
                    } else{
                        return item
                    }
                })
            }             
        })
    }

    const decreaseItemQuantity = (id) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id).quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                }) 
            }
        })
    }

    const removeFromCart = (id) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export {ShoppingCartProvider, useShoppingCart}