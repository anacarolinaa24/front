import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

interface UserProfile {
  nome: string;
  usuario: string;
  email: string;
  cpf: string;
  senha: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    nome: "",
    usuario: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Aqui você pode carregar os dados do usuário
    // Simulando dados salvos
    const mockUser = {
      nome: "Usuário Teste",
      usuario: "usuario123",
      email: "usuario@teste.com",
      cpf: "123.456.789-00",
      senha: "******",
    };
    setProfile(mockUser);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aqui você implementaria a lógica para salvar as alterações
      setSuccessMessage("Perfil atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Meu Perfil</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={profile.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuario">Nome de Usuário:</label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            value={profile.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            disabled
            className="disabled-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={profile.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Nova Senha:</label>
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite para alterar a senha"
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button type="submit">Salvar Alterações</button>
          <button
            type="button"
            onClick={() => navigate("/options")}
            className="cancel-button"
          >
            Voltar
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Profile;
