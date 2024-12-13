import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

const Button = ({ label, onClick, styleType = "primary", icon, variant, width, quantity = 1 }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const buttonStyle = width ? { width } : {};
  const buttonClass = variant === "cart" ? "btn cart" : "btn";

  const incrementQuantity = () => setCurrentQuantity(currentQuantity + 1);
  const decrementQuantity = () => setCurrentQuantity(currentQuantity > 1 ? currentQuantity - 1 : 1);

  return (
    <div className="button-container">
      {variant === "cart" && (
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={decrementQuantity}>-</button>
          <span className="quantity">{currentQuantity}</span>
          <button className="quantity-btn" onClick={incrementQuantity}>+</button>
        </div>
      )}

      <button 
        className={`${buttonClass} ${styleType}`} 
        onClick={onClick} 
        style={buttonStyle}
      >
        {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
        <span>{label}</span>
      </button>
    </div>
  );
};

export default Button;
