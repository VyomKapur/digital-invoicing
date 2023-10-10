import { useEffect, useState } from "react"
import Invoice from '../components/Invoice'
import { useAuthContext } from "../context/AuthContext"
import { Container } from "react-bootstrap"
const Orders = () => {
    const [orders, setOrders] = useState([])
    const { user } = useAuthContext()
    useEffect(() => {
        const getOrders = async() =>{
            const payload = {user_email: user.email}
            const response = await fetch('https://backend-zeta-roan.vercel.app/orders', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)
            setOrders(json)
        } 
        getOrders()
    }, [])
    return (
        <>
        {orders.length > 0 ? (
            orders.map((order, index) => (
                <Invoice key={order?._id} index={index} items={order?.items} grandTotal={order?.totalPrice} date={order?.createdAt}/>
            ))
        ):(
            <Container>
            <h1>No previous invoice</h1>
            </Container>
        )}
        </>
    )
}

export default Orders