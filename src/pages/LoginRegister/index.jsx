import React from 'react';
import './loginregister.scss';
import Auth from '../../components/Auth';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';

const LoginRegister = () => {
  return (
    <div>
      <Header />
      <Auth />
      <Footer />
    </div>
  )
}

export default LoginRegister;