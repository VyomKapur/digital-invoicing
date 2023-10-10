import { useShoppingCart } from "../context/ShoppingCartContext"
import Invoice from '../components/Invoice'
import { Container, Button } from 'react-bootstrap'
import { useAuthContext } from "../context/AuthContext"
import { useEffect, useState } from "react"
const Cart = () => {
    const { clearCart, cartItems } = useShoppingCart()
    const { user } = useAuthContext()
    const [items, setItems] = useState(cartItems)
    let grandTotal = 0
    try{
        grandTotal = items.reduce((accumulator, item) => accumulator + (item.quantity * item.price) + item.tax, 0)
    } catch(error){
        console.log(error)
    }
    useEffect(() => {
        const getStatement = async() => {
            console.log(items)
            const response = await fetch('http://localhost:3500/calculatetax', {
                method: 'POST',
                body: JSON.stringify(items),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(response)
            if(response.ok){
                setItems(json)
                console.log(items)
            }
        }
        if(user){
            getStatement()
        }
    }, [user])

    const handleCheckout = (e) =>{
        e.preventDefault()
        const payload = { user_email: user.email, items: items, totalPrice: grandTotal}
        console.log(payload)
        const createOrder = async() => {
            const response = await fetch('http://localhost:3500/orders/place', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(response)
            if(response.ok){
                setItems(json)
                console.log(items)
            }
        }
        createOrder()
    }
    const handleClearCart = () => {
        setItems([])
        clearCart()
    }
    return (
        <>
        {user && (
            <Container className="mt-5">
            <Invoice items={ items } grandTotal={ grandTotal }/>
            {cartItems.length > 0 && (
            <div>
            <Button onClick={handleClearCart} style={{margin: '10px'}}>Clear Cart</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
            </div>
            )}
            </Container>
        )}
        </>
    )
}

export default Cart