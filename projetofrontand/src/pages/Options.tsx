import React, { useState } from "react";
import NewDiet from "./NewDiet";
import Profile from "./Profile";
import "./Options.css";

const HistoricDiet = () => (
  <div className="side-form">
    <h2>Histórico de Dietas</h2>
    {/* Seu histórico de dietas aqui */}
  </div>
);

const Options: React.FC = () => {
  const [sideComponent, setSideComponent] = useState<
    null | "new" | "historic" | "profile"
  >(null);

  const handleShowNewDiet = () => setSideComponent("new");
  const handleShowHistoric = () => setSideComponent("historic");
  const handleShowProfile = () => setSideComponent("profile");
  const handleBack = () => setSideComponent(null);

  return (
    <div
      className={`options-lateral-container${
        sideComponent ? " with-side" : ""
      }`}
    >
      <div className={`options-box-row${sideComponent ? " minimize" : ""}`}>
        <div className="profile-area">
          <div className="user-avatar">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="45" fill="#2ecc71" />
              <ellipse cx="45" cy="38" rx="20" ry="18" fill="#fff" />
              <ellipse cx="45" cy="70" rx="28" ry="14" fill="#fff" />
            </svg>
          </div>
          <button className="profile-button" onClick={handleShowProfile}>
            Meu Perfil
          </button>
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
          {sideComponent === "new" && <NewDiet />}
          {sideComponent === "historic" && <HistoricDiet />}
          {sideComponent === "profile" && <Profile isSidePanel />}
        </div>
      )}
    </div>
  );
};

export default Options;
