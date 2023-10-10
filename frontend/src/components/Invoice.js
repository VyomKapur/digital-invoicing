import { React, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
const Invoice = (props) => {
    const [items, setItems] = useState([])
    const grandTotal = items.reduce((accumulator, item) => accumulator + (item.quantity * item.price) + item.tax, 0);
    const { user } = useAuthContext()
    useEffect(() => {
        const getStatement = async() => {
            console.log(JSON.stringify(props.items))
            const response = await fetch('http://localhost:3500/calculatetax', {
                method: 'POST',
                body: JSON.stringify(props.items),
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
    }, [props.items, user])

    return (
        <>
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
                <th>Total Tax</th>
                <th>Total Cost</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
                <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs {item.price}</td>
                <td>Rs {item.tax}</td>
                <td>Rs {item.quantity * item.price + item.tax}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        <h1>Your grand total is: {grandTotal}</h1>
        </>
        )}
        </>
    );
};

export default Invoice;