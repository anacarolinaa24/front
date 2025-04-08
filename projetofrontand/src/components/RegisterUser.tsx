import { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      setErrorMessage("Preencha todos os campos");
      return;
    }

    alert("Cadastro realizado com sucesso!");
    navigate("/options");
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Usuário:</label>
            <input
              id="usuario"
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Escolha um usuário"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              id="cpf"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
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
