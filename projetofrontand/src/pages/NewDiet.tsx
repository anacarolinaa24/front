import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodSelection from "../components/FoodSelection";
import "./NewDiet.css";

interface Food {
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: { food: Food; quantity: number }[];
}

const NewDiet: React.FC = () => {
  const navigate = useNavigate();
  const [dietName, setDietName] = useState("");
  const [meals, setMeals] = useState<Meal[]>([
    { name: "Café da manhã", foods: [] },
    { name: "Almoço", foods: [] },
    { name: "Café da tarde", foods: [] },
    { name: "Lanche da tarde", foods: [] },
    { name: "Jantar", foods: [] },
  ]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isAddingFood, setIsAddingFood] = useState(false);

  const openForm = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsAddingFood(true);
  };

  const closeForm = () => {
    setIsAddingFood(false);
  };

  const saveDiet = () => {
    if (dietName.trim() === "") {
      alert("Por favor, insira um nome para a dieta.");
      return;
    }
    navigate("/historic-diet", { state: { diet: { dietName, meals } } });
  };

  return (
    <div className="container">
      <h2>Simular Dieta</h2>
      <input
        type="text"
        placeholder="Digite o nome da dieta"
        value={dietName}
        onChange={(e) => setDietName(e.target.value)}
        className="diet-input"
      />

      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.name} className="meal-block">
            <button onClick={() => openForm(meal)} className="meal-button">
              {meal.name}
            </button>

            {/* Formulário sobreposto */}
            {isAddingFood && selectedMeal?.name === meal.name && (
              <div className="food-overlay">
                <div className="food-card">
                  <FoodSelection
                    meal={meal}
                    setMeals={setMeals}
                    onClose={closeForm}
                  />
                </div>
              </div>
            )}

            {/* Lista de alimentos adicionados */}
            <ul className="final-food-list">
              {meal.foods.map(({ food, quantity }) => (
                <li key={food.name} className="food-item">
                  <span className="food-name">
                    {food.name} - {quantity}x ({food.calories * quantity} kcal)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Exibe apenas a soma final */}
      <h2 className="diet-total">
        Total de calorias da dieta:{" "}
        {meals.reduce(
          (total, meal) =>
            total +
            meal.foods.reduce(
              (subtotal, item) => subtotal + item.food.calories * item.quantity,
              0
            ),
          0
        )}{" "}
        kcal
      </h2>

      <button onClick={saveDiet} className="save-button">
        Salvar Simulação
      </button>
    </div>
  );
};

export default NewDiet;
