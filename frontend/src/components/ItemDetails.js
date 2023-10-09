import {useState, React} from 'react';
import '../css/ItemDetails.css'; 
import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'

const ItemDetails = ({ item }) => {
    const [quantity, setQuantity] = useState(0)

    const { getItemQuantity } = useShoppingCart()
    return (
        <Card>
           <Card.Body>
            <Card.Title>{item.name} {item.price}</Card.Title>
            {item.description}
            <div>
                {quantity === 0 ? (
                    <Button onClick={() => setQuantity(1)}>Add to Cart</Button>
                ): (
                    <>
                    <Button onClick={() => setQuantity(quantity+1)}>+</Button>
                    <div>{quantity} in Cart</div>
                    <Button onClick={() => setQuantity(quantity-1)}>-</Button>
                    <Button onClick={() => setQuantity(0)}>Remove</Button>
                    </>
                )}
            </div>
            </Card.Body> 
        </Card>
    );
}

export default ItemDetails;
