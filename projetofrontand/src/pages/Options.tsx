import React from "react";
import { useNavigate } from "react-router-dom";

const Options: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Simulador Online de Dietas</h1>
      <button onClick={() => navigate("/NewDiet")}>Nova Dieta</button>
      <button onClick={() => navigate("/HistoricDiet")}>
        Histórico de Dietas
      </button>
    </div>
  );
};

export default Options;
