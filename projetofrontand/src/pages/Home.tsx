import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [formType, setFormType] = useState("login");
  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });
  const [registerError, setRegisterError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso (simulação)");
  };

  function isValidCPF(cpf) {
    return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !registerData.nome ||
      !registerData.email ||
      !registerData.cpf ||
      !registerData.senha ||
      !registerData.confirmarSenha
    ) {
      setRegisterError("Preencha todos os campos.");
      return;
    }

    if (!isValidCPF(registerData.cpf)) {
      setRegisterError("Digite um CPF válido.");
      return;
    }

    if (registerData.senha.length < 6) {
      setRegisterError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (registerData.senha !== registerData.confirmarSenha) {
      setRegisterError("As senhas não coincidem.");
      return;
    }

    setRegisterError("");
    alert("Cadastro realizado com sucesso (simulação)");
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="home-container">
      <div className="home-box-row">
        <div className="home-logo-area">
          <h1 className="home-welcome">Bem-vindo</h1>
          <img src="/src/assets/logo.png" alt="logo" className="logo-side" />
        </div>
        <div className="home-form-area">
          <div className="form-toggle">
            <button
              className={formType === "login" ? "active" : ""}
              onClick={() => setFormType("login")}
            >
              Login
            </button>
            <button
              className={formType === "register" ? "active" : ""}
              onClick={() => setFormType("register")}
            >
              Cadastrar
            </button>
          </div>
          {formType === "login" ? (
            <form onSubmit={handleLogin} className="form">
              <input type="text" placeholder="Usuário" required />
              <input type="password" placeholder="Senha" required />
              <button type="submit">Entrar</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="form">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={registerData.nome}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={registerData.cpf}
                onChange={handleRegisterChange}
                required
                maxLength={14}
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={registerData.senha}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                value={registerData.confirmarSenha}
                onChange={handleRegisterChange}
                required
              />
              {registerError && (
                <div className="form-error">{registerError}</div>
              )}
              <button type="submit">Cadastrar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
