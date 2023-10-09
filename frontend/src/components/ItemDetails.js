import { React} from 'react';
import '../css/ItemDetails.css'; 
import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'

const ItemDetails = ({ item }) => {
    const { 
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
    } = useShoppingCart() 
    const quantity = getItemQuantity(item.id)
    return (
        <Card>
           <Card.Body>
            <Card.Title>{item.name} {item.price}</Card.Title>
            {item.description}
            <div>
                {quantity === 0 ? (
                    <Button onClick={() => increaseItemQuantity(item.id)}>Add to Cart</Button>
                ): (
                    <>
                    <Button onClick={() => increaseItemQuantity(item.id)}>+</Button>
                    <div>{quantity} in Cart</div>
                    <Button onClick={() => decreaseItemQuantity(item.id)}>-</Button>
                    <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </>
                )}
            </div>
            </Card.Body> 
        </Card>
    );
}

export default ItemDetails;
