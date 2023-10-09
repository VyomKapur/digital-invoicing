import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <ShoppingCartProvider>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </ShoppingCartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
