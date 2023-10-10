import { React } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';

const Invoice = (props) => {
    function formatDate(dateString) {
        const date = new Date(dateString); 
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    }
    return (
        <Container>
        <Container>
            <Row>
                <Col><h1>Invoice {props.date && (props.index+1)}</h1></Col>
                {props.date && (
                <Col style={{margin: '10px'}}><h5>Date: {formatDate(props.date)}</h5></Col>
                )}
            </Row>
        </Container>
        
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
        </Container>
    );
};

export default Invoice;