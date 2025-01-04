import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.scss';

const Cart = ({ items, setCartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemToRemove.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      });

      return updatedItems.filter((item) => item !== null);
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <div className="cart-icon" onClick={toggleCart}>
        <span>{totalItems}</span> 🛒
      </div>

      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h2>Carrinho</h2>
          <button className="close-btn" onClick={toggleCart}>
            X
          </button>
        </div>
        <div className="cart-sidebar-body">
          {items.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <img src={item.imagem} alt={item.nome} />
                  <p>
                    {item.quantity}x {item.nome}
                  </p>
                  <p>{item.preco}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item)}
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-sidebar-footer">
          <h3>
            Total: R${' '}
            {items
              .reduce(
                (total, item) =>
                  total +
                  item.quantity *
                    parseFloat(item.preco.replace('R$', '').replace(',', '.')),
                0
              )
              .toFixed(2)}
          </h3>
          <button className="checkout-btn" onClick={() => navigate('/carrinho')}>Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
