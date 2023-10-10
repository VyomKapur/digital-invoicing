import { useEffect, useState } from "react"
import Invoice from '../components/Invoice'
import { useAuthContext } from "../context/AuthContext"
const Orders = () => {
    const [orders, setOrders] = useState([])
    const { user } = useAuthContext()
    useEffect(() => {
        const getOrders = async() =>{
            const payload = {user_email: user.email}
            const response = await fetch('http://localhost:3500/orders', {
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
        {orders.map(order => (
            <Invoice key={order?._id} items={order?.items} grandTotal={order?.totalPrice} />
        ))}
        </>
    )
}

export default Orders