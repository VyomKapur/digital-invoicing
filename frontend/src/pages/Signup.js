import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import '../css/Signup.css'

const Signup = () => {
    const { dispatch } = useAuthContext() 
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch("https://backend-zeta-roan.vercel.app/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, username,password})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.Message)
        }
        if(response.ok){
            setEmail("")
            setPassword("")
            setUsername("")
            setIsLoading(false)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'login', payload: json})
        }
    }
    return (
        <Container>
          <div className='login'>
            <div className='wrapper'>
            <Row >
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  <h3>Sign Up</h3>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Enter email id"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="name">
                      <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
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
      
                  <Button variant="primary" type="submit" disabled={isLoading} className='button'>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
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

export default Signup