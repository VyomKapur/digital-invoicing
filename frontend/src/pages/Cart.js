import { useShoppingCart } from "../context/ShoppingCartContext"
import Invoice from '../components/Invoice'

const Cart = () => {
    const { cartItems } = useShoppingCart()
    console.log(cartItems)
    return (
        <Invoice items={cartItems}/>
    )
}

export default Cart