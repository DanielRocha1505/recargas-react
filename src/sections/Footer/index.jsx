import React from 'react';
import logoPath from '../../assets/imgs/logo.webp';
import './footer.scss';

const Footer = () => {
    return (
    <footer>
        <div className="container footer-content">
        <div className="left">
            <img src={logoPath} alt="Logo ATIVARECARGAS" />
            <p className='left-text'>
                A ATIVARECARGAS é uma revenda de Gift Cards dos mais variados segmentos. 
                Não é responsável por adicionar ou controlar conteúdo. Os usuários são 
                responsáveis por baixar, instalar, alterar e adicionar seu próprio conteúdo 
                conforme o Termo de Aceite. A ATIVARECARGAS não se responsabiliza pela perda 
                do Gift Card.
            </p>
        </div>

        <div className="center">
            <div className="menu">
                <p>MENU</p>
                <div className='menu-item'>
                    <p>Início</p>
                    <p>Store</p>
                    <p>Sobre</p>
                    <p>Contato</p>
                </div>
            </div>
            <div className="store">
                <p>STORE</p>
                <div className='menu-item'>
                    <p>Gift Cards</p>
                    <p>Ofertas</p>
                </div>
            </div>
            <div className="contato">
                <p>CONTATO</p>
                <div className='menu-item'>
                    <p>Suporte via Discord</p>
                    <p>Envie um email</p>
                </div>
            </div>
            <div className="redes-sociais">
                <p>REDES SOCIAIS</p>
                <div className='menu-item'>
                    <ul className='social-footer'>
                        <li>Discord</li>
                        <li>Instagram</li>
                        <li>TikTok</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </div>
        </div>
        </div>

        <div className="footer-text">
            <p><span className='footer-text-strong'>ATIVARECARGAS</span> - REVENDEDORA DE GIFT CARDS</p>
        </div>
    </footer>
    )
}

export default Footer;
