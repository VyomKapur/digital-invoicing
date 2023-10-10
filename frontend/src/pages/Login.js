import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'

const Login = () => {
    const { dispatch } = useAuthContext() 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch("http://localhost:3500/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
            setEmail("")
            setPassword("")
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'login', payload: json})
        }
    }
    return (
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email id"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>
    
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
    
                <Button variant="primary" type="submit" disabled={isLoading}
                style={{
                    margin: '5px'
                }}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
    
                {error && <div className="mt-2 text-danger">{error}</div>}
              </Form>
            </Col>
          </Row>
        </Container>
      );
}

export default Login