import React, { useState } from 'react';
import './navbar.scss';

const Navbar = ({ navItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
          <li key={index} className="navbar-item">
            <a href={item.link} className="navbar-link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
