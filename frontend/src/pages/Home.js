import { Container, Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap"
import "../css/Home.css"

const Home = () => {
    return (
        <Container className="md-6">
            <Row>
            <Col>
            <Card className="home-container">
                <Card.Header>Problem statement</Card.Header>
                <Card.Body>
                A digital invoicing platform is essential for businesses to manage their invoicing, payments,
                and financial transactions efficiently. This application is a Node.js server coupled with
                an intuitive user interface for an invoicing system that ensures smooth operations and
                provides a user-friendly experience.
                </Card.Body>
            </Card>
            <br/>
            <Card className="home-container">
                <Card.Header>Context</Card.Header>
                <Card.Body>
                ● The company offers various products and services, each with its own pricing. <br/>
                ● A user can create his account, add/remove items to/from their cart, and view his
                total bill during checkout. <br/>
                ● Integrate tax calculation based on the price range of the product using the following
                rules: <br/>
                ○ Apply Tax PA if the price range of the product is greater than 1000 and less
                than or equal to 5000. The tax percentage should be 12% of the price.<br />
                ○ Apply Tax PB if the price of the product is above 5000. The tax percentage
                should be 18% of the price.<br />
                ○ Apply Tax PC to all products with a flat tax amount of 200. <br />
                ● Integrate tax calculation based on the price range of the services using the following
                rules:<br />
                ○ Apply Tax SA if the price range of the service is greater than 1000 and less
                than or equal to 8000. The tax percentage should be 10% of the price.<br />
                ○ Apply Tax SB if the price of the service is above 8000. The tax percentage
                should be 15% of the price.<br />
                ○ Apply Tax SC to all services with a flat tax amount of 100.<br />
                ● The tax should be applied to each product/service individually, not on the entire bill.
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="home-container">
                <Card.Header>Must Haves</Card.Header>
                <ListGroup>
                    <ListGroupItem className="done">See all products and services information with their prices.</ListGroupItem>
                    <ListGroupItem className="done">Add/Remove a product or service to the cart.</ListGroupItem>
                    <ListGroupItem className="done">Clear the cart.</ListGroupItem>
                    <ListGroupItem className="done">View total bill (should include price, quantity, and tax on each item as well as total
value of selected items)</ListGroupItem>
                    <ListGroupItem className="done">Place the order</ListGroupItem>
                </ListGroup>
            </Card>
            <br />
            <Card className="home-container">
                <Card.Header>Good to have</Card.Header>
                <ListGroup>
                    <ListGroupItem className="done">Functionality for users to create an account</ListGroupItem>
                    <ListGroupItem className="done">Functionality for users to see all the orders placed</ListGroupItem>
                    <ListGroupItem>Appropriate test cases in the backend to simulate practical scenarios that you would
want to test the system for.</ListGroupItem>
                </ListGroup>
            </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default Home;