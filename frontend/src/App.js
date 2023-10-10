import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import CreateItem from './pages/CreateItem'
import Orders from './pages/Orders'
import { useAuthContext } from './context/AuthContext';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={user? <Home />: <Navigate to='/login' />}/>
          <Route path='/orders' element={user? <Orders />: <Navigate to='/login' />}/>
          <Route path='/cart' element={user ? <Cart /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login />:<Navigate to='/' />} />
          <Route path='/signup' element={!user? <Signup /> : <Navigate to='/' />} />
          <Route path='/createitem' element={user && user.isAdmin ? <CreateItem />: <Navigate to='/' />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
