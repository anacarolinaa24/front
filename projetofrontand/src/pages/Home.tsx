import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import FoodRain from "../components/FoodRain";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("Verificando conexão...");

  // Verificar se o servidor está respondendo ao carregar a página
  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get("http://localhost:3001/teste");
        setServerStatus("Conectado ao servidor ✅");
      } catch (error) {
        setServerStatus("Servidor não está respondendo ❌");
      }
    };

    checkServer();
  }, []);

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  function isValidCPF(cpf) {
    return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError("");

    // Log dos dados do formulário
    console.log("Dados do formulário:", registerData);

    if (
      !registerData.nome ||
      !registerData.email ||
      !registerData.cpf ||
      !registerData.senha ||
      !registerData.confirmarSenha
    ) {
      setRegisterError("Preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (!isValidCPF(registerData.cpf)) {
      setRegisterError("Digite um CPF válido.");
      setIsLoading(false);
      return;
    }

    if (registerData.senha.length < 8) {
      setRegisterError("A senha deve ter pelo menos 8 caracteres.");
      setIsLoading(false);
      return;
    }

    if (registerData.senha !== registerData.confirmarSenha) {
      setRegisterError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      // Usar URL direta em vez de variável de ambiente
      const response = await axios.post(
        "http://localhost:3001/api/usuarios/registro",
        {
          nome: registerData.nome,
          email: registerData.email,
          cpf: registerData.cpf,
          senha: registerData.senha,
        }
      );

      console.log("Resposta do cadastro:", response.data);

      // Armazenar o token recebido
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Cadastro realizado com sucesso!");
        navigate("/options");
      } else {
        setRegisterError(
          "Cadastro realizado, mas não recebeu token de autenticação"
        );
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      if (axios.isAxiosError(error)) {
        setRegisterError(
          error.response?.data?.message ||
            `Erro ${error.response?.status}: ${error.message}`
        );
      } else {
        setRegisterError("Erro desconhecido ao cadastrar");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    // Verificar campos
    if (!loginData.email || !loginData.senha) {
      setLoginError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Tentando login com:", {
        email: loginData.email,
        senha: loginData.senha,
      });

      const response = await axios.post(
        "http://localhost:3001/api/usuarios/login",
        {
          email: loginData.email,
          senha: loginData.senha,
        }
      );

      console.log("Resposta do servidor:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/options");
      } else {
        setLoginError("Resposta sem token. Contate o administrador.");
      }
    } catch (error) {
      console.error("Erro completo:", error);

      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Detalhes do erro:", error.response?.data);

        if (error.response?.status === 401) {
          setLoginError("Email ou senha incorretos");
        } else {
          setLoginError(
            `Erro ${error.response?.status || ""}: ${
              error.response?.data?.message || error.message
            }`
          );
        }
      } else {
        setLoginError("Erro ao conectar com o servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-main-container">
      <FoodRain />
      <div className="home-container">
        <div className="server-status">{serverStatus}</div>
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
                disabled={isLoading}
              >
                Login
              </button>
              <button
                className={formType === "register" ? "active" : ""}
                onClick={() => setFormType("register")}
                disabled={isLoading}
              >
                Cadastro
              </button>
            </div>

            {formType === "login" ? (
              <form onSubmit={handleLogin} className="form">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  disabled={isLoading}
                  required
                />
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={loginData.senha}
                  onChange={handleLoginChange}
                  disabled={isLoading}
                  required
                />
                {loginError && <div className="form-error">{loginError}</div>}
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Processando..." : "Entrar"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="form">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={registerData.nome}
                  onChange={handleRegisterChange}
                  disabled={isLoading}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  disabled={isLoading}
                  required
                />
                <input
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                  value={registerData.cpf}
                  onChange={handleRegisterChange}
                  disabled={isLoading}
                  required
                  maxLength={14}
                />
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={registerData.senha}
                  onChange={handleRegisterChange}
                  disabled={isLoading}
                  required
                />
                <input
                  type="password"
                  name="confirmarSenha"
                  placeholder="Confirmar Senha"
                  value={registerData.confirmarSenha}
                  onChange={handleRegisterChange}
                  disabled={isLoading}
                  required
                />
                {registerError && (
                  <div className="form-error">{registerError}</div>
                )}
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Processando..." : "Cadastrar"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
