import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './button.scss';

const Button = ({ label, onClick, styleType = "primary", icon, variant, width }) => {
  const buttonStyle = width ? { width } : {};
  const buttonClass = variant === "cart" ? "btn cart" : "btn";

  return (
    <button 
      className={`${buttonClass} ${styleType}`} 
      onClick={onClick} 
      style={buttonStyle}
    >
      {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
