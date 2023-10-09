import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ShoppingCartProvider>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </ShoppingCartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
