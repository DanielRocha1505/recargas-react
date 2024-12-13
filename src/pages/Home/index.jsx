import React from 'react';
import './home.scss';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import Herobanner from '../../sections/Herobanner';
import Planos from '../../sections/Planos';
import NossoContato from '../../sections/NossoContato';
import Faq from '../../sections/Faq';

const Home = () => {
  return (
    <div>
        <Header />
        <Herobanner />
        <Planos />
        <Faq />
        <NossoContato />
        <Footer />
    </div>
  )
}

export default Home;