import React from 'react';
import './socialIcons.scss';

const SocialIcons = ({ socialItems }) => {
  return (
    <nav className="social-icons">
      <ul className="social-list">
        {socialItems.map((item, index) => (
          <li key={index} className="social-item">
            <a href={item.link} className="social-link">
              <img src={item.icon} alt="Imagem Icone Social" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SocialIcons;