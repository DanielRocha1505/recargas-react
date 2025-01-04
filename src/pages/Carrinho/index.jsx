import React, { useEffect, useState } from 'react';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import Button from '../../components/Button';
import './carrinho.scss';
import { useNavigate } from 'react-router-dom';

const Carrinho = () => {
  const [cart, setCart] = useState([]);
  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(savedCartItems);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const removeItemFromCart = (id) => {
    const updatedItems = cart.filter(item => item.id !== id);
    setCart(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); 
  };

  const updateItemQuantity = (id, quantity) => {
    if (quantity < 1) return; 
    const updatedItems = cart.map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setCart(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); 
  };

  const getTotal = () => {
    const total = cart.reduce((total, item) => {
      const preco = item.preco && typeof item.preco === 'string' 
        ? parseFloat(item.preco.replace('R$', '').replace(',', '.'))
        : 0; 
      const itemTotal = preco * item.quantity;
      return total + itemTotal;
    }, 0);
    return total > 0 ? total - desconto : 0;
  };

  const aplicarCupom = () => {
    if (cupomAplicado) {
      alert('Você já usou um cupom!');
      return;
    }

    if (cupom === 'DESCONTO10') {
      setDesconto(getTotal() * 0.10);
      setCupomAplicado(true);
      alert('Cupom aplicado com sucesso!');
    } else {
      alert('Cupom inválido!');
    }
  };

  const finalizarCompra = () => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para finalizar a compra!');
      return;
    }
    alert('Finalizando compra...');
  };

  return (
    <>
      <Header />
      <section className="carrinho">
        <div className="carrinho-conteudo">
          <h2 className="carrinho-titulo">Seu Carrinho</h2>
          {cart.length === 0 ? (
            <p className="carrinho-vazio">Seu carrinho está vazio!</p>
          ) : (
            <div className="carrinho-itens">
              {cart.map((item) => (
                <div key={item.id} className="carrinho-item">
                  <div className="carrinho-item-info">
                    <img src={item.imagem} alt={item.nome} className="carrinho-item-imagem"/>
                    <div>
                      <h3 className="carrinho-item-nome">{item.nome}</h3>
                      <p className="carrinho-item-preco">
                        Preço: <span>{item.preco}</span>
                      </p>
                      <div className="controle-quantidade">
                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="quantidade">{item.quantity}</span>
                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <p className="carrinho-item-total">
                        Total: R$ {(
                          (item.preco && typeof item.preco === 'string' 
                            ? parseFloat(item.preco.replace('R$', '').replace(',', '.'))
                            : 0) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    label="Remover"
                    onClick={() => removeItemFromCart(item.id)}
                    styleType="danger"
                    variant="carrinho"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="cupom">
            <input
              type="text"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              placeholder="Digite seu cupom"
              disabled={cupomAplicado}
            />
            <Button
              label="Aplicar Cupom"
              onClick={aplicarCupom}
              styleType="primary"
              variant="cupom"
              disabled={cupomAplicado}
            />
          </div>

          <div className="carrinho-total">
            <p>Total do Carrinho: R$ {getTotal().toFixed(2)}</p>
            <Button
              label="Finalizar Compra"
              onClick={finalizarCompra}
              styleType="primary"
              variant="checkout"
              disabled={!isAuthenticated}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Carrinho;
