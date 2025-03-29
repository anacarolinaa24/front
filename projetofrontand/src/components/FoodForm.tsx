import React from "react";
import "./FoodForm.css";

interface Food {
  name: string;
  calories: number;
}

interface FoodFormProps {
  meal: { name: string; foods: { food: Food; quantity: number }[] };
  searchResults: Food[];
  searchTerm: string;
  quantity: number;
  onSearch: (term: string) => void;
  onAddFood: (food: Food) => void;
  onClose: () => void;
  onQuantityChange: (value: number) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({
  meal,
  searchResults,
  searchTerm,
  quantity,
  onSearch,
  onAddFood,
  onClose,
  onQuantityChange,
}) => {
  return (
    <div className="form-overlay">
      <div className="form-content">
        <h3>Adicionar Alimentos para {meal.name}</h3>
        <input
          type="text"
          placeholder="Buscar alimento"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <ul>
          {searchResults.map((food) => (
            <li key={food.name}>
              {food.name} ({food.calories} kcal)
              <button onClick={() => onAddFood(food)}>Adicionar</button>
            </li>
          ))}
        </ul>
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
        />
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default FoodForm;
