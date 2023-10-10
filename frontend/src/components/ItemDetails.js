import { React} from 'react';
import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import "../css/ItemDetails.css"

const ItemDetails = ({ item }) => {
    const { 
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
    } = useShoppingCart() 
    const quantity = getItemQuantity(item.id)
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>Rs {item.price}</Card.Text>
            <Card.Text>({item.isService === true? ('Service'): ('Product')})</Card.Text>
            <Card.Text>{item.description}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              {quantity === 0 ? (
                <Button className='button1' onClick={() => increaseItemQuantity(item.id)}>
                  Add to Cart
                </Button>
              ) : (
                <>
                  <Button variant="success" onClick={() => increaseItemQuantity(item.id)}>
                    +
                  </Button>
                  <div>{quantity} in Cart</div>
                  <Button variant="danger" onClick={() => decreaseItemQuantity(item.id)}>
                    -
                  </Button>
                  <Button variant="warning" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      );
}

export default ItemDetails;
