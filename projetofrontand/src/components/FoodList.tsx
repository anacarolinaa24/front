import React from "react";

interface Food {
  name: string;
  calories: number;
}

interface FoodListProps {
  foods: { food: Food; quantity: number }[];
}

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <div>
      <h4>Itens adicionados:</h4>
      <ul>
        {foods.map(({ food, quantity }, index) => (
          <li key={index}>
            {food.name} - {quantity}x ({food.calories * quantity} kcal)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
