import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';       
import 'primeicons/primeicons.css';
import './assets/styles/main.scss';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
