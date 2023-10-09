import { useEffect, useState } from 'react'
import ItemDetails from '../components/ItemDetails.js'
import { Container, Row, Col } from "react-bootstrap"

const Home = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('http://localhost:3500/items')
            const json = await response.json()
            if(response.ok){
                setItems(json)
            }
        }
        fetchItems()
    }, [items])
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

export default Home;