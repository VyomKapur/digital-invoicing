import { useShoppingCart } from "../context/ShoppingCartContext"
import Invoice from '../components/Invoice'
import { Container, Button } from 'react-bootstrap'

const Cart = () => {
    const { clearCart, cartItems } = useShoppingCart()
    console.log(cartItems)
    return (
        <Container className="mt-5">
        <Invoice items={ cartItems }/>
        {cartItems.length > 0 && (
        <div>
        <Button onClick={clearCart} style={{margin: '10px'}}>Clear Cart</Button>
        <Button>Checkout</Button>
        </div>
        )}
        </Container>
    )
}

export default Cart