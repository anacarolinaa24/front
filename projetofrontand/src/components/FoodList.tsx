import React from "react";
import "./FoodList.css";

interface Food {
  name: string;
  calories: number;
}

interface FoodListProps {
  meals: { name: string; foods: { food: Food; quantity: number }[] }[];
}

const FoodList: React.FC<FoodListProps> = ({ meals }) => {
  return (
    <div>
      <h4>Dietas Simuladas:</h4>
      {meals.map((meal) => (
        <div key={meal.name} className="meal-container">
          <h3>{meal.name}</h3>
          <ul>
            {meal.foods.map(({ food, quantity }) => (
              <li key={food.name} className="food-item">
                <span>
                  {food.name} - {quantity}x ({food.calories * quantity} kcal)
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
