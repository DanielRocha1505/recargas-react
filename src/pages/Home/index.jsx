import React, { useState, useEffect } from 'react';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import Herobanner from '../../sections/Herobanner';
import Planos from '../../sections/Planos';
import NossoContato from '../../sections/NossoContato';
import Faq from '../../sections/Faq';
import FixedSocial from '../../components/FixedSocial';
import Cart from '../../components/Cart';
import './home.scss';

const Home = () => {
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div>
      <Header />
      <Herobanner />
      <Planos cartItems={cartItems} setCartItems={setCartItems} />
      <Faq />
      <NossoContato />
      <Footer />
      
      <FixedSocial />
      <Cart items={cartItems} setCartItems={setCartItems} />
    </div>
  );
}

export default Home;
