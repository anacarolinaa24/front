import { useNavigate } from "react-router-dom";
import "./Options.css";
import NewDiet from "../components/NewDiet";
import MyDiet from "../components/MyDiet";

const Options = () => {
  const navigate = useNavigate();

  const goToNewDiet = () => {
    navigate("/NewDiet");
  };

  const goToMyDiet = () => {
    navigate("/MyDiet");
  };

  return (
    <div className="paginaOptions">
      <h1>Escolha a opção desejada</h1>
      <button onClick={goToNewDiet}>Nova Dieta</button>
      <NewDiet />
      <button onClick={goToMyDiet}>Minha Dieta Atual</button>
      <MyDiet />
    </div>
  );
};

export default Options;
