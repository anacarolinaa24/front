import React, { useState, useEffect } from "react";
import "./FoodSelection.css";

interface Food {
  id: number;
  nome: string;
  calorias: number;
}

interface FoodSelectionProps {
  onSelect: (food: Food, quantidade: number) => void;
  onClose: () => void;
  onNewFood: () => void;
}

const FoodSelection: React.FC<FoodSelectionProps> = ({
  onSelect,
  onClose,
  onNewFood,
}) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/alimentos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Erro ao buscar alimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-selection-modal">
      <div className="food-selection-content">
        <h3>Selecionar Alimento</h3>

        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Carregando alimentos...</p>
        ) : (
          <div className="foods-list">
            {filteredFoods.map((food) => (
              <div key={food.id} className="food-item">
                <span>
                  {food.nome} ({food.calorias} kcal)
                </span>
                <div className="food-actions">
                  <input
                    type="number"
                    placeholder="Quantidade (g)"
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    min="0"
                  />
                  <button onClick={() => onSelect(food, quantidade)}>
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onNewFood}>Cadastrar Novo Alimento</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default FoodSelection;
