import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./HistoricDiet.css";

interface Food {
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: { food: Food; quantity: number }[];
}

interface Diet {
  dietName: string;
  meals: Meal[];
}

const HistoricDiet: React.FC = () => {
  const location = useLocation();
  const diet: Diet | undefined = location.state?.diet;

  // Adicionar busca do histórico
  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await api.get("/dietas");
        setDiets(response.data);
      } catch (error) {
        console.error("Erro ao buscar dietas:", error);
      }
    };

    fetchDiets();
  }, []);

  if (!diet) {
    return <h2 className="historic-title">Nenhuma dieta foi salva ainda.</h2>;
  }

  return (
    <div className="historic-container">
      <h2 className="historic-title">Histórico da Dieta</h2>
      <h3 className="diet-name">{diet.dietName}</h3>

      <div className="meal-list">
        {diet.meals.map((meal) => (
          <div key={meal.name} className="meal-block">
            <h3>{meal.name}</h3>
            <ul className="final-food-list">
              {meal.foods.map(({ food, quantity }) => (
                <li key={food.name} className="food-item">
                  {food.name} - {quantity}x ({food.calories * quantity} kcal)
                </li>
              ))}
            </ul>
            <h4 className="calorie-total">
              Total:{" "}
              {meal.foods.reduce(
                (total, item) => total + item.food.calories * item.quantity,
                0
              )}{" "}
              kcal
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricDiet;
