import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthContextProvider>
      <ShoppingCartProvider>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </ShoppingCartProvider>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
