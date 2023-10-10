import { useState } from 'react'
import "../css/Login.css"
import { useAuthContext } from '../context/AuthContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const Login = () => {
    const { dispatch } = useAuthContext() 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch("https://backend-zeta-roan.vercel.app/users/login", {
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
          <div className='login'>
            <div className='wrapper'>
              <Row>
                <Col md={6}>
                  <Form onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Enter email id"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </Form.Group>
        
                    <Form.Group controlId="password">
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </Form.Group>
        
                    <Button variant="primary" type="submit" className="button" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
        
                    {error && <div className="mt-2 text-danger">{error}</div>}
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      );
}

export default Login