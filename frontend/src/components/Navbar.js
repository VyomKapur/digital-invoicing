import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/Navbar.css';
import { Button, Container, Nav, Navbar as NavBar } from "react-bootstrap"
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useAuthContext } from '../context/AuthContext';


const Navbar = () => {
    const { totalQuantity } = useShoppingCart()
    const { user, dispatch } = useAuthContext()
    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'logout'})
    }
    return (
        <NavBar sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>
                    Home
                </Nav.Link>
                {!user && (
                <>
                <Nav.Link to="/login" as={NavLink}>
                    Login
                </Nav.Link>
                <Nav.Link to="/signup" as={NavLink}>
                    Sign Up
                </Nav.Link>
                </>)}
            </Nav>
            {user && ( <Nav.Link onClick={handleLogout}>
                Logout
            </Nav.Link>
            )}
            {user?.isAdmin === true && ( <Nav.Link to="/createitem" as={NavLink}>
                Create Item
            </Nav.Link>
            )}
            <Link to='/cart'>
            <Button style={{ width: "3rem", height: "3rem", position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
            <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center' 
            style={{
                color: 'white', 
                width: '1.5rem', 
                height: "1.5rem", 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                transform: "translate(25%, 25%)"
                }}>
            {totalQuantity}
            </div>
            </Button>
            </Link>
        </Container>
        </NavBar>
    );
}

export default Navbar;
