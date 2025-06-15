import React, { useState, useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import NewDiet from "./NewDiet";
import { useNavigate } from "react-router-dom";
import "./Options.css";

interface DietaForm {
  nome: string;
  descricao: string;
  refeicoes: Array<{
    nome: string;
    horario: string;
    alimentos: Array<{
      id: number;
      nome: string;
      quantidade: number;
      calorias: number;
    }>;
  }>;
}

const Options: React.FC = () => {
  const [sideComponent, setSideComponent] = useState<
    "new" | "historic" | "profile" | null
  >(null);
  const [minimized, setMinimized] = useState(false);
  const [dietaForm, setDietaForm] = useState<DietaForm>({
    nome: "",
    descricao: "",
    refeicoes: [],
  });
  const navigate = useNavigate();

  // Verificar se o token existe para garantir autenticação
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Função para lidar com o clique no botão de nova dieta
  const handleShowNewDiet = () => {
    console.log("Abrindo nova dieta");
    setSideComponent("new");
    setMinimized(true);
  };

  // Função para lidar com o clique no botão de histórico
  const handleShowHistoric = () => {
    console.log("Abrindo histórico de dietas");
    setSideComponent("historic");
    setMinimized(true);
  };

  // Função para lidar com o clique no botão de perfil
  const handleShowProfile = () => {
    console.log("Abrindo perfil");
    setSideComponent("profile");
    setMinimized(true);
  };

  // Função para voltar ao menu principal
  const handleBackToMenu = () => {
    setSideComponent(null);
    setMinimized(false);
  };

  // Renderiza o componente correto baseado no estado
  const renderSideComponent = () => {
    switch (sideComponent) {
      case "new":
        return (
          <ErrorBoundary>
            <NewDiet />
          </ErrorBoundary>
        );
      case "historic":
        return (
          <div className="side-component-content">
            <h2>Histórico de Dietas</h2>
            <p>Aqui você verá suas dietas salvas.</p>
          </div>
        );
      case "profile":
        return (
          <div className="side-component-content">
            <h2>Perfil do Usuário</h2>
            <p>Gerencie suas informações pessoais aqui.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="options-lateral-container">
      {/* Cartão principal (minimizável) */}
      <div className={`options-box-row ${minimized ? "minimize" : ""}`}>
        <div className="profile-area">
          <div className="user-avatar">
            {/* Avatar animado */}
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="30" r="20" fill="#c20a6f" />
              <circle cx="40" cy="80" r="35" fill="#c20a6f" />
            </svg>
          </div>
          <button className="profile-button" onClick={handleShowProfile}>
            Perfil
          </button>
        </div>

        <div className="options-area">
          <h2 className="options-title">Sistema de Dietas</h2>
          <div className="button-container">
            <button className="option-button" onClick={handleShowNewDiet}>
              Simular Nova Dieta
            </button>
            <button className="option-button" onClick={handleShowHistoric}>
              Histórico de Dietas
            </button>
          </div>
        </div>
      </div>

      {/* Painel lateral (aparece quando um botão é clicado) */}
      {sideComponent && (
        <div className="side-content">
          <button className="back-button" onClick={handleBackToMenu}>
            Voltar ao Menu
          </button>
          {renderSideComponent()}
        </div>
      )}
    </div>
  );
};

export default Options;
