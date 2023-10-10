import { useEffect, useState } from 'react'
import ItemDetails from '../components/ItemDetails.js'
import { Container, Row, Col } from "react-bootstrap"
import { useAuthContext } from '../context/AuthContext.js'

const Services = () => {
    const [items, setItems] = useState([])
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('http://localhost:3500/items/services',{
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                setItems(json)
            }
        }
        if(user){
            fetchItems()
        }
        
    }, [user])
    return (
        <Container>
        <Row md={2} xs={1} lg={3} className="g-3">
            {items.map((item) => (
                <Col><ItemDetails key={items._id} item={item}/></Col>
            ))}
        </Row>
        </Container>
    )
}

export default Services