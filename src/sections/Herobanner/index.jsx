import React from 'react';
import { Carousel } from 'primereact/carousel';
import heroimg01 from '../../assets/imgs/hero01.png';
import heroimg02 from '../../assets/imgs/hero02.png';
import heroimg03 from '../../assets/imgs/hero03.png';
import './herobanner.scss';

const Herobanner = () => {
  const images = [
    { id: 1, src: heroimg01, alt: "Imagem Carroussel 01" },
    { id: 2, src: heroimg02, alt: "Imagem Carroussel 02" },
    { id: 2, src: heroimg03, alt: "Imagem Carroussel 02" }
  ];

  return (
    <section className="container herobanner" id='herobanner'>
        <div className='carrousel'>
            <Carousel value={images} itemTemplate={(item) => (<img src={item.src} alt={item.alt} className="carousel-image" />)} numVisible={1} circular={true}  autoplay={true}  autoplayInterval={3000}  infiniteLoop={true}  showIndicators={true} />
        </div>
    </section>
  );
}

export default Herobanner;
