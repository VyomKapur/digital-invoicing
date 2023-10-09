import { React, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const Invoice = (props) => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const getStatement = async() => {
            console.log(JSON.stringify(props.items))
            const response = await fetch('http://localhost:3500/calculatetax', {
                method: 'POST',
                body: JSON.stringify(props.items),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            console.log(response)
            if(response.ok){
                setItems(json)
                console.log(items)
            }
        }
        getStatement()
    }, [props.items])
    return (
        <Container className="mt-5">
        {props.items.length < 1 ? (
            <h1>No Items in cart!</h1>
        ):
        (
        <>
        <h1>Invoice</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tax</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
                <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs {item.price}</td>
                <td>Rs {item.tax}</td>
                <td>Rs{item.quantity * item.price + item.tax}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </>
        )}
        </Container>
    );
};

export default Invoice;