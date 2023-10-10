import { React } from 'react';
import { Table, Container } from 'react-bootstrap';

const Invoice = (props) => {
    return (
        <Container>
        {props.items.length < 1 ? (
            <h1>No Items in cart!</h1>
        ):
        (
        <>
        <h1>Invoice</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price Per Item</th>
                <th>Total Pre-Tax Cost</th>
                <th>Total Tax</th>
                <th>Total Cost</th>
            </tr>
            </thead>
            <tbody>
            {props.items.map((item, index) => (
                <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs {item.price}</td>
                <td>Rs {item.price * item.quantity}</td>
                <td>Rs {item.tax}</td>
                <td>Rs {item.quantity * item.price + item.tax}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        <h2>Grand total: Rs {props.grandTotal}</h2>
        </>
        )}
        </Container>
    );
};

export default Invoice;