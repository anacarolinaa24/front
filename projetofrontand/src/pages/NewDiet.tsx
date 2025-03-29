import React, { useState } from "react";
import FoodForm from "../components/FoodForm";
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
  const [dietName, setDietName] = useState("");
  const [meals, setMeals] = useState<Meal[]>([
    { name: "Café da manhã", foods: [] },
    { name: "Almoço", foods: [] },
    { name: "Café da tarde", foods: [] },
    { name: "Lanche da tarde", foods: [] },
    { name: "Jantar", foods: [] },
  ]);
  const [dietSaved, setDietSaved] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [quantity, setQuantity] = useState<number>(0);

  const predefinedFoods: Food[] = [
    { name: "Pão", calories: 80 },
    { name: "Leite", calories: 120 },
    { name: "Ovo", calories: 70 },
    { name: "Frango", calories: 200 },
    { name: "Arroz", calories: 150 },
    { name: "Maçã", calories: 50 },
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const results = predefinedFoods.filter((food) =>
      food.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const addFoodToMeal = (food: Food) => {
    if (selectedMeal && quantity > 0) {
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal.name === selectedMeal.name
            ? {
                ...meal,
                foods: [...meal.foods, { food, quantity }],
              }
            : meal
        )
      );
      setQuantity(0);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const removeFoodFromMeal = (foodName: string) => {
    if (selectedMeal) {
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal.name === selectedMeal.name
            ? {
                ...meal,
                foods: meal.foods.filter(
                  (entry) => entry.food.name !== foodName
                ),
              }
            : meal
        )
      );
    }
  };

  const openForm = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedMeal(null);
  };

  const saveDiet = () => {
    console.log("Dieta salva:", { dietName, meals });
    setDietSaved(true);
  };

  return (
    <div className="container">
      <h2>Simular Dieta</h2>
      <div>
        <input
          type="text"
          placeholder="Digite o nome da dieta"
          value={dietName}
          onChange={(e) => setDietName(e.target.value)}
        />
      </div>

      {meals.map((meal) => (
        <div key={meal.name}>
          <button onClick={() => openForm(meal)}>{meal.name}</button>
          <ul>
            {meal.foods.map(({ food, quantity }, index) => (
              <li key={index} className="food-item">
                <span>
                  {food.name} - {quantity}x ({food.calories * quantity} kcal)
                </span>
                <button
                  className="delete-button"
                  onClick={() => removeFoodFromMeal(food.name)}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {isFormVisible && selectedMeal && (
        <FoodForm
          meal={selectedMeal}
          searchResults={searchResults}
          searchTerm={searchTerm}
          quantity={quantity}
          onSearch={(term) => {
            setSearchTerm(term);
            const results = predefinedFoods.filter((food) =>
              food.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
          }}
          onAddFood={addFoodToMeal}
          onClose={closeForm}
          onQuantityChange={(value) => setQuantity(value)}
        />
      )}

      <button onClick={saveDiet}>Salvar Dieta</button>
      {dietSaved && <p>Dieta salva com sucesso!</p>}
    </div>
  );
};

export default NewDiet;
