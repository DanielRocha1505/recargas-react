import React from 'react';
import Button from '../../components/Button';
import './nossocontato.scss';

const NossoContato = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="contato-container" id='nosso-contato'>
      <h2>Entre em Contato Conosco</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex">
          <label>
            <input className="input" type="text" placeholder="" required />
            <span>Nome</span>
          </label>

          <label>
            <input className="input" type="text" placeholder="" required />
            <span>Assunto</span>
          </label>
        </div>

        <label>
          <input className="input" type="email" placeholder="" required />
          <span>E-mail</span>
        </label>

        <label>
          <textarea className="input01" placeholder="" rows="3" required></textarea>
          <span>Mensagem</span>
        </label>

        <Button 
          label="Enviar" 
          onClick={handleSubmit} 
          styleType="primary"
          width='13em' 
        />
      </form>
    </section>
  );
};

export default NossoContato;
