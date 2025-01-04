import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';       
import 'primeicons/primeicons.css';
import './assets/styles/main.scss';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Carrinho from './pages/Carrinho';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginRegister />} />
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
