import React, { useState, useEffect } from 'react';
import './navbar.scss';

const Navbar = ({ navItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav className={`navbar ${isDropdownOpen ? 'active' : ''}`}>
      <label htmlFor="burger" className="burger">
        <input id="burger" type="checkbox" checked={isDropdownOpen} onChange={toggleDropdown} />
        <span></span>
        <span></span>
        <span></span>
      </label>

      <ul className={`navbar-list ${isDropdownOpen ? 'active' : ''}`}>
        {navItems.map((item, index) => (
          <li key={index} className={`navbar-item ${activeLink === item.id ? 'active' : ''}`}>
            <a href={`/#${item.id}`} className="navbar-link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
