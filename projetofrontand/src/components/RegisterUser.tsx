import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.css";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.usuario ||
      !formData.email ||
      !formData.cpf ||
      !formData.senha
    ) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    console.log("Usuário cadastrado:", formData);
    alert("Usuário cadastrado com sucesso!");

    navigate("/options");

    setFormData({ nome: "", usuario: "", email: "", cpf: "", senha: "" });
    setErrorMessage("");
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>
          <div className="form-group">
            <label>Nome de Usuário:</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Escolha um usuário"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="form-group">
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Crie sua senha"
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
