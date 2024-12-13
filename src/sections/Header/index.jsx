import React from 'react';
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
    const navItems = [
        { text: 'Inicio', link: '' },
        { text: 'Planos', link: '#planos' },
        { text: 'Combos', link: '#combos' },
        { text: 'Perguntas Frequentes', link: '#faq' },
        { text: 'Nosso Contato', link: '#nosso-contato' },
    ];

    const socialItems = [
        { icon: instagramLogo, link: '' },
        { icon: tiktokLogo, link: '' },
        { icon: youtubeLogo, link: '' },
        { icon: twitterLogo, link: '' },
    ]

    return (
        <header>
            <div className="container header">
                <div className="left">
                    <img src={logoPath} className='logo' alt="Logo Lotus Group" />
                    <Navbar navItems={navItems} />
                </div>
                <div className="right">
                    <Button label="Carrinho" width='9em' icon={faShoppingCart} onClick={() => console.log('Carrinho clicado!')} />
                    <Button label="Área do Cliente" width='13em' icon={faUser} onClick={() => console.log('Usuário clicado!')} />
                </div>
            </div>
        </header>
    )
}

export default Header;