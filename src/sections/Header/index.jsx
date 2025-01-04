import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoPath from '../../assets/imgs/logo.webp';
import instagramLogo from '../../assets/imgs/instagramLogo.png';
import tiktokLogo from '../../assets/imgs/tiktokLogo.png';
import youtubeLogo from '../../assets/imgs/youtubeLogo.png';
import twitterLogo from '../../assets/imgs/twitterLogo.png';
import Navbar from '../../components/Navbar';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './header.scss';
import Button from '../../components/Button';

const Header = () => {
    const navigate = useNavigate();

    const navItems = [
        { id: 'herobanner', text: 'Inicio' },
        { id: 'planos', text: 'Planos' },
        { id: 'combos', text: 'Combos' },
        { id: 'faq', text: 'Perguntas Frequentes' },
        { id: 'nosso-contato', text: 'Nosso Contato' },
      ];

    const socialItems = [
        { icon: instagramLogo, link: '' },
        { icon: tiktokLogo, link: '' },
        { icon: youtubeLogo, link: '' },
        { icon: twitterLogo, link: '' },
    ];

    const handleClientAreaClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <header>
            <div className="container header">
                <div className="left">
                    <img src={logoPath} className='logo' alt="Logo Ativa Recargas" />
                    <Navbar navItems={navItems} />
                </div>
                <div className="right">
                    <Button label="Carrinho" width='9em' icon={faShoppingCart} onClick={() => navigate('/carrinho')} />
                    <Button 
                        label="Área do Cliente" 
                        width='13em' 
                        icon={faUser} 
                        onClick={handleClientAreaClick} 
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
