import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faUndo, faPhone, faIdCard, faMapPin } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import InputMask from 'react-input-mask';

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      return setError('E-mail e senha são obrigatórios.');
    }
  
    try {
      const url = isRegistering
        ? 'http://localhost:3000/api/register'
        : 'http://localhost:3000/api/login';
      
      const requestBody = {
        email,
        password,
        nome,
        sobrenome,
        cpf,
        whatsapp,
        cep,
        cidade,
        estado,
      };
  
      const response = await axios.post(url, requestBody);
      const data = response.data;
  
      if (data.error) {
        setError(`Erro: ${data.error}`);
      } else {
        localStorage.setItem('token', data.token); 
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setError(`Erro: ${err.response.data.error || err.response.data.message}`);
      } else if (err.request) {
        setError('Erro: Não foi possível conectar ao servidor.');
      } else {
        setError(`Erro: ${err.message}`);
      }
    }
  };
  
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      return setError('Por favor, insira seu email.');
    }

    try {
      alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      setIsResetting(false);
    } catch (err) {
      setError('Erro ao enviar o e-mail de recuperação: ' + err.message);
    }
  };

  return (
    <div className="containerAuth">
      <div className="auth-form-container">
        <h1>{isRegistering ? 'Registrar' : isResetting ? 'Redefinir senha' : 'Entrar'}</h1>
        <form onSubmit={isResetting ? handlePasswordReset : handleAuth} className="auth-form">
          {isRegistering && (
            <div className="form-columns">
              <div className="column">
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faUser} /> Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faUser} /> Sobrenome
                  </label>
                  <input
                    type="text"
                    placeholder="Digite seu sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faIdCard} /> CPF
                  </label>
                  <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  >
                    {(inputProps) => <input {...inputProps} placeholder="Digite seu CPF" />}
                  </InputMask>
                </div>
              </div>

              <div className="column">
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faMapPin} /> CEP
                  </label>
                  <InputMask
                    mask="99999-999"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    required
                  >
                    {(inputProps) => <input {...inputProps} placeholder="Digite seu CEP" />}
                  </InputMask>
                </div>

                <div className="input-group">
                  <label>Cidade</label>
                  <input
                    type="text"
                    placeholder="Digite sua cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Estado</label>
                  <input
                    type="text"
                    placeholder="Digite seu estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faEnvelope} /> Endereço de e-mail
            </label>
            <input
              type="email"
              placeholder="recargas@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {isRegistering && (
            <div className="input-group">
              <label>
                <FontAwesomeIcon icon={faPhone} /> WhatsApp
              </label>
              <InputMask
                mask="(99) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              >
                {(inputProps) => <input {...inputProps} placeholder="Digite seu WhatsApp" />}
              </InputMask>
            </div>
          )}

          {!isResetting && (
            <div className="input-group">
              <label>
                <FontAwesomeIcon icon={faLock} /> Senha
              </label>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button
            to={isResetting ? '#' : '/dashboard'}
            width={'14rem'}
            onClick={(e) => isResetting ? handlePasswordReset(e) : handleAuth(e)}
            icon={<FontAwesomeIcon icon={isResetting ? faUndo : isRegistering ? faUser : faLock} />}
            label={isRegistering ? 'Registrar' : isResetting ? 'Enviar e-mail de recuperação' : 'Entrar'}
          />
        </form>

        {error && <p className="error-message">{error}</p>}
        <p
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-auth"
        >
          {isRegistering ? (
            <>
              Já tem uma conta?{' '}
              <span className="highlight-register">Entrar</span>
            </>
          ) : (
            <>
              Não tem uma conta?{' '}
              <span className="highlight-register">Registrar</span>
            </>
          )}
        </p>

        {!isRegistering && !isResetting && (
          <p
            onClick={() => setIsResetting(true)}
            className="reset-password-link"
          >
            <FontAwesomeIcon icon={faUndo} /> Esqueceu sua senha? <span className="highlight-register">Clique aqui!</span>
          </p>
        )}

        {isResetting && (
          <p
            onClick={() => setIsResetting(false)}
            className="cancel-reset-link"
          >
            Cancelar
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
