import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import InputMask from 'react-input-mask'; 
import Header from '../../sections/Header';
import './dashboard.scss';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeContent, setActiveContent] = useState('conta');
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      fetchUserData(token);
    }
  }, [navigate]);

  const fetchUserData = (token) => {
    axios.get('http://localhost:3000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserData(response.data);
      setFormData(response.data); 
    })
    .catch((error) => {
      console.error('Erro ao buscar informações do usuário:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios.put('http://localhost:3000/api/user', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setSuccessMessage('Informações salvas com sucesso!'); 
      setIsEditing(false); 
      setUserData(formData); 
    })
    .catch((error) => {
      console.error('Erro ao salvar as informações:', error);
    });
  };

  const handleNavigation = (content) => {
    setActiveContent(content);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderContent = () => {
    if (!userData) {
      return <div>Carregando...</div>;
    }

    switch (activeContent) {
      case 'conta':
        return (
          <div>
            <h2>Minha Conta</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {isEditing ? (
              <form className="account-form">
                <div className="form-row">
                  <div className="form-column">
                    <label>Nome</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-column">
                    <label>Sobrenome</label>
                    <input
                      type="text"
                      name="sobrenome"
                      value={formData.sobrenome || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-column">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-column">
                    <label>CPF</label>
                    <InputMask
                      mask="999.999.999-99"
                      name="cpf"
                      value={formData.cpf || ''}
                      onChange={handleInputChange}
                      readOnly
                    >
                      {(inputProps) => <input {...inputProps} />}
                    </InputMask>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-column">
                    <label>Whatsapp</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      name="whatsapp"
                      value={formData.whatsapp || ''}
                      onChange={handleInputChange}
                      required
                    >
                      {(inputProps) => <input {...inputProps} placeholder="Digite seu WhatsApp" />}
                    </InputMask>
                  </div>
                  <div className="form-column">
                    <label>Cidade</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-column">
                    <label>Estado</label>
                    <input
                      type="text"
                      name="estado"
                      value={formData.estado || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button type="button" onClick={handleSave}>Salvar</button>
                <button type="button" className="back-button" onClick={() => setIsEditing(false)}>Voltar</button>
              </form>
            ) : (
              <div className="info-box">
                <div className="info-item">
                  <strong>Nome:</strong> {userData.nome} {userData.sobrenome}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {userData.email}
                </div>
                <div className="info-item">
                  <strong>CPF:</strong> {userData.cpf}
                </div>
                <div className="info-item">
                  <strong>Whatsapp:</strong> {userData.whatsapp}
                </div>
                <div className="info-item">
                  <strong>Cidade:</strong> {userData.cidade}
                </div>
                <div className="info-item">
                  <strong>Estado:</strong> {userData.estado}
                </div>
                <button onClick={() => setIsEditing(true)}>Editar</button>
              </div>
            )}
          </div>
        );
      case 'extrato':
        return (
          <div>
            <h2>Extrato</h2>
            <p>Detalhes do extrato...</p>
          </div>
        );
      default:
        return (
          <div>
            <h2>Bem-vindo, {userData.nome}</h2>
            <p>Selecione uma categoria para ver mais detalhes.</p>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="container dashboard-container">
      <Header />
      <div className="dashboard-content">
        <div className="sidebar">
          <ul>
            <li><a href="#" onClick={() => handleNavigation('conta')}>Minha Conta</a></li>
            <li><a href="#" onClick={() => handleNavigation('extrato')}>Extrato</a></li>
          </ul>
        </div>
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
