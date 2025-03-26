import { useState } from "react";
import "./Options.css";
import NewDiet from "../pages/NewDiet";
import MyDiet from "../pages/MyDiet";

const Options = () => {
  // Estado para controlar qual componente renderizar
  const [view, setView] = useState<"newdiet" | "mydiet" | null>(null);

  return (
    <div className="container">
      <h1 className="title">Simulação de Dietas</h1>

      {/* Botões para escolher entre nova dieta ou histórico */}
      <div className="button-container">
        <button onClick={() => setView("newdiet")} className="button">
          Nova Dieta
        </button>
        <NewDiet />
        <button onClick={() => setView("mydiet")} className="button">
          Histórico de Dietas
        </button>
        <MyDiet />
      </div>

      <div className="section">
        {/* Renderização condicional com base na escolha */}
        {view === "newdiet" && <NewDiet />}
        {view === "mydiet" && <MyDiet />}
        {!view && <p>Por favor, escolha uma opção acima para continuar.</p>}
      </div>
    </div>
  );
};

export default Options;
