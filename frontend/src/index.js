import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
