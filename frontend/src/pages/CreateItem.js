import { Form, Container, Row, Button, Col, Alert } from "react-bootstrap";
import { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import '../css/CreateItem.css'

const CreateItem = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [service, setIsService] = useState("product");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false); 
    const { user } = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user && !user.isAdmin){
            return 
        }
        setIsLoading(true);
        const isService = service === "service"
        const response = await fetch("https://backend-zeta-roan.vercel.app/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, description, price, isService})
        });
        const json = await response.json();
        setIsLoading(false);
        if (!response.ok) {
            setError(json.error);
        } else {
            setSuccess(true);
            setName("");
            setDescription("");
            setPrice("");
            setIsService("product");
        }
    };

    return (
        <Container>
            <Row>
            <div className='login'>
            <div className='wrapper-create-item'>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <h3>Create Item</h3>
                        {success && (
                            <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                                Item created successfully!
                            </Alert>
                        )}
                        <Form.Group controlId="name">
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Control
                                type="number"
                                placeholder="Enter item price"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Control
                                as="textarea"
                                placeholder="Enter item description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="isService">
                            <Form.Control
                                as="select"
                                onChange={(e) => setIsService(e.target.value)}
                                value={service}
                                required
                            >
                                <option value="product">Product</option>
                                <option value="service">Service</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading} className="button">
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>

                        {error && <div className="mt-2 text-danger">{error}</div>}
                    </Form>
                </Col>
                </div>
            </div>
            </Row>
        </Container>
    );
}

export default CreateItem;
