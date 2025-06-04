import React, { useState } from "react";
import "./Options.css";

const NewDietForm = () => (
  <div className="side-form">
    <h2>Nova Dieta</h2>
    {/* Seu formulário de nova dieta aqui */}
  </div>
);

const HistoricDiet = () => (
  <div className="side-form">
    <h2>Histórico de Dietas</h2>
    {/* Seu histórico de dietas aqui */}
  </div>
);

const Options: React.FC = () => {
  const [sideComponent, setSideComponent] = useState<null | "new" | "historic">(
    null
  );

  const handleShowNewDiet = () => setSideComponent("new");
  const handleShowHistoric = () => setSideComponent("historic");
  const handleBack = () => setSideComponent(null);

  return (
    <div className="options-lateral-container">
      <div className={`options-box-row${sideComponent ? " minimize" : ""}`}>
        {/* ...seu conteúdo do cartão de opções... */}
        <div className="profile-area">
          <div className="user-avatar">
            <svg width="110" height="110" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="45" fill="#2ecc71" />
              <ellipse cx="45" cy="38" rx="20" ry="18" fill="#fff" />
              <ellipse cx="45" cy="70" rx="28" ry="14" fill="#fff" />
            </svg>
          </div>
          <button className="profile-button">Meu Perfil</button>
        </div>
        <div className="options-area">
          <h1 className="options-title">Simulador Online de Dietas</h1>
          <div className="button-container">
            <button onClick={handleShowNewDiet} className="option-button">
              Nova Dieta
            </button>
            <button onClick={handleShowHistoric} className="option-button">
              Histórico de Dietas
            </button>
          </div>
        </div>
      </div>
      {sideComponent && (
        <div className="side-content">
          <button className="back-button" onClick={handleBack}>
            Voltar
          </button>
          {sideComponent === "new" && <NewDietForm />}
          {sideComponent === "historic" && <HistoricDiet />}
        </div>
      )}
    </div>
  );
};

export default Options;
