import React, { useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import mytvPath from '../../assets/imgs/mytv.png';
import hightvPath from '../../assets/imgs/highTv.png';
import eppicinemaPath from '../../assets/imgs/eppicinema.png';
import './planos.scss';

const Planos = ({ cartItems, setCartItems }) => {
  const [planType, setPlanType] = useState('mensal');
  const [comboType, setComboType] = useState('mensal');
  const [quantities, setQuantities] = useState({});

  const togglePlanType = (type) => {
    setPlanType(type);
  };

  const toggleComboType = (type) => {
    setComboType(type);
  };

  const planosMensais = [
    { id: 1, nome: 'MyTv Fun', preco: 'R$ 23,90', precoCartao: 'R$ 28,90', descricao: '', imagem: mytvPath },
    { id: 2, nome: 'HighTv', preco: 'R$ 23,90', precoCartao: 'R$ 29,90', descricao: '', imagem: hightvPath },
    { id: 3, nome: 'EppiCinema', preco: 'R$ 14,90', precoCartao: 'R$ 19,90', descricao: '', imagem: eppicinemaPath },
  ];

  const planosAnuais = [
    { id: 4, nome: 'MyTv Fun', preco: 'R$ 159,90', precoCartao: 'R$ 169,90', descricao: '', imagem: mytvPath },
    { id: 5, nome: 'HighTv', preco: 'R$ 159,90', precoCartao: 'R$ 169,90', descricao: '', imagem: hightvPath },
    { id: 6, nome: 'EppiCinema', preco: 'R$ 99,90', precoCartao: 'R$ 109,90', descricao: '', imagem: eppicinemaPath },
  ];

  const combosMensais = [
    { id: 7, nome: 'Combo Básico', descricao: 'MyTv Fun + EppiCinema', preco: 'R$ 39,90', imagens: [mytvPath, eppicinemaPath] },
    { id: 8, nome: 'Combo Completo', descricao: 'HighTv + EppiCinema', preco: 'R$ 49,90', imagens: [hightvPath, eppicinemaPath] },
    { id: 9, nome: 'Combo Premium', descricao: 'MyTv Fun + HighTv', preco: 'R$ 59,90', imagens: [mytvPath, hightvPath] },
  ];

  const combosAnuais = [
    { id: 10, nome: 'Combo Básico', descricao: 'MyTv Fun + EppiCinema', preco: 'R$ 399,90', imagens: [mytvPath, eppicinemaPath] },
    { id: 11, nome: 'Combo Completo', descricao: 'HighTv + EppiCinema', preco: 'R$ 499,90', imagens: [hightvPath, eppicinemaPath] },
    { id: 12, nome: 'Combo Premium', descricao: 'MyTv Fun + HighTv', preco: 'R$ 599,90', imagens: [mytvPath, hightvPath] },
  ];

  const incrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
  
      let updatedItems;
      if (itemIndex !== -1) {
        updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + quantity,
        };
      } else {
        updatedItems = [...prevItems, { ...item, quantity }];
      }
  
      // Salvar os itens no localStorage sempre que o carrinho for alterado
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  
      return updatedItems;
    });
  
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.id]: 1,
    }));
  };
  

  const renderButtons = (item) => (
    <div className="quantity-controls">
      <div className="quantity-wrapper">
      <button className="quantity-btn" onClick={() => decrementQuantity(item.id)}>-</button>
      <span className="quantity">{quantities[item.id] || 1}</span>
      <button className="quantity-btn" onClick={() => incrementQuantity(item.id)}>+</button>
      </div>
      <Button
        label="Adicionar ao carrinho"
        onClick={() => addToCart(item)}
        styleType="primary"
        variant="cart"
        icon={faShoppingCart}
        width="15em"
      />
    </div>
  );

  return (
    <section className="planos" id="planos">
      <div className="planos-header">
        <h2 className="planos-title">Escolha o melhor plano para você</h2>
        <div className="planos-toggle">
          <Button
            label="Mensais"
            onClick={() => togglePlanType('mensal')}
            styleType={planType === 'mensal' ? 'active' : 'primary'}
            width="150px"
          />
          <Button
            label="Anuais"
            onClick={() => togglePlanType('anual')}
            styleType={planType === 'anual' ? 'active' : 'primary'}
            width="150px"
          />
        </div>
      </div>

      <div className="planos-cards">
        {(planType === 'mensal' ? planosMensais : planosAnuais).map((plano) => (
          <div key={plano.id} className="plano-card">
            <div className={`plan-type-tag ${planType === 'mensal' ? 'mensal' : 'anual'}`}>
              {planType === 'mensal' ? 'Mensal' : 'Anual'}
            </div>
            <div className="card-image">
              <img src={plano.imagem} alt={plano.nome} />
            </div>
            <div className="card-content">
              <h3>{plano.nome}</h3>
              <div className="card-prices">
                <p className="apenas">
                  Por apenas <span className="preco">{plano.preco}</span>, no PIX, garanta já o seu!
                </p>
                <p className="apenas">
                  Ou por <span className="preco-cartao">{plano.precoCartao}</span> no cartão!
                </p>
              </div>
              <p>{plano.descricao}</p>
              <div className="plans-buttons">{renderButtons(plano)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="combos" id="combos">
        <h2 className="planos-title">Confira nossos combos</h2>
        <div className="planos-toggle">
          <Button
            label="Mensais"
            onClick={() => toggleComboType('mensal')}
            styleType={comboType === 'mensal' ? 'active' : 'primary'}
            width="150px"
          />
          <Button
            label="Anuais"
            onClick={() => toggleComboType('anual')}
            styleType={comboType === 'anual' ? 'active' : 'primary'}
            width="150px"
          />
        </div>
        <div className="planos-cards">
          {(comboType === 'mensal' ? combosMensais : combosAnuais).map((combo) => (
            <div key={combo.id} className="plano-card">
              <div className={`plan-type-tag ${comboType === 'mensal' ? 'mensal' : 'anual'}`}>
                {comboType === 'mensal' ? 'Mensal' : 'Anual'}
              </div>
              <div className="card-image">
                <img src={combo.imagens[0]} alt={combo.nome} className="combo-image" />
                <span className="plus-icon">+</span>
                <img src={combo.imagens[1]} alt={combo.nome} className="combo-image" />
              </div>
              <div className="card-content">
                <h3>{combo.nome}</h3>
                <div className="card-prices">
                  <p className="apenas">
                    Por apenas <span className="preco">{combo.preco}</span>, no PIX, garanta já o seu!
                  </p>
                  <p className="apenas">
                    Ou por <span className="preco-cartao">{combo.preco}</span> no cartão!
                  </p>
                </div>
                <p>{combo.descricao}</p>
                <div className="plans-buttons">{renderButtons(combo)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planos;
