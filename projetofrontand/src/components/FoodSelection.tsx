import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Food {
  name: string;
  calories: number;
}

interface SelectedFood {
  food: Food;
  quantity: number;
}

const FoodSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mealName = location.state?.mealName || "Refeição";

  const predefinedFoods: Food[] = [
    { name: "Pão", calories: 80 },
    { name: "Leite", calories: 120 },
    { name: "Ovo", calories: 70 },
    { name: "Frango", calories: 200 },
    { name: "Arroz", calories: 150 },
    { name: "Maçã", calories: 50 },
  ];

  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);

  const addFood = (food: Food, quantity: number) => {
    setSelectedFoods((prevSelected) => [...prevSelected, { food, quantity }]);
  };

  const saveFoods = () => {
    navigate("/", { state: { mealName, foods: selectedFoods } });
  };

  return (
    <div>
      <h2>Seleção de Alimentos para {mealName}</h2>
      <ul>
        {predefinedFoods.map((food) => (
          <li key={food.name}>
            {food.name} ({food.calories} kcal)
            <input
              type="number"
              placeholder="Quantidade"
              onChange={
                (e) => addFood(food, Number(e.target.value) || 1) // Valor padrão se não for definido
              }
            />
            <button onClick={() => addFood(food, 1)}>Adicionar</button>
          </li>
        ))}
      </ul>
      <button onClick={saveFoods}>Salvar</button>
    </div>
  );
};

export default FoodSelection;
