import React, { useState } from "react";

interface Food {
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: { food: Food; quantity: number }[];
}

interface FoodSelectionProps {
  meal: Meal;
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  onClose: () => void;
}

const FoodSelection: React.FC<FoodSelectionProps> = ({
  meal,
  setMeals,
  onClose,
}) => {
  const predefinedFoods: Food[] = [
    { name: "Pão", calories: 80 },
    { name: "Leite", calories: 120 },
    { name: "Ovo", calories: 70 },
    { name: "Frango", calories: 200 },
    { name: "Arroz", calories: 150 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>(predefinedFoods);
  const [foodQuantities, setFoodQuantities] = useState<{
    [key: string]: number;
  }>({});

  const updateQuantity = (foodName: string, quantity: number) => {
    setFoodQuantities((prev) => ({ ...prev, [foodName]: quantity }));
  };

  const addFoodToMeal = (food: Food) => {
    setMeals((prevMeals) =>
      prevMeals.map((m) =>
        m.name === meal.name
          ? {
              ...m,
              foods: [
                ...m.foods,
                { food, quantity: foodQuantities[food.name] || 1 },
              ],
            }
          : m
      )
    );
  };

  const searchFood = (term: string) => {
    setSearchTerm(term);
    setSearchResults(
      predefinedFoods.filter((food) =>
        food.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <div className="food-form">
      <h3>Adicionar Alimentos para {meal.name}</h3>
      <input
        type="text"
        placeholder="Buscar alimento"
        value={searchTerm}
        onChange={(e) => searchFood(e.target.value)}
        className="buscarAlimento"
      />

      <div className="food-list">
        {searchResults.map((food) => (
          <div key={food.name} className="food-item">
            <span className="food-name">
              {food.name} ({food.calories} kcal)
            </span>
            <input
              type="number"
              min="1"
              value={foodQuantities[food.name] || 1}
              onChange={(e) =>
                updateQuantity(food.name, Number(e.target.value))
              }
              className="quantidade"
            />
            <button className="adicionar" onClick={() => addFoodToMeal(food)}>
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <h3 className="calorie-total">
        Total da refeição:{" "}
        {meal.foods.reduce(
          (total, item) => total + item.food.calories * item.quantity,
          0
        )}{" "}
        kcal
      </h3>

      <button className="close-button" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
};

export default FoodSelection;
