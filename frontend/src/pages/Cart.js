import { useShoppingCart } from "../context/ShoppingCartContext"
import Invoice from '../components/Invoice'
import { Container, Button } from 'react-bootstrap'
import { useAuthContext } from "../context/AuthContext"
const Cart = () => {
    const { clearCart, cartItems } = useShoppingCart()
    const { user } = useAuthContext()
    console.log(cartItems)
    return (
        <>
        {user && (
            <Container className="mt-5">
            <Invoice items={ cartItems }/>
            {cartItems.length > 0 && (
            <div>
            <Button onClick={clearCart} style={{margin: '10px'}}>Clear Cart</Button>
            <Button>Checkout</Button>
            </div>
            )}
            </Container>
        )}
        </>
    )
}

export default Cart