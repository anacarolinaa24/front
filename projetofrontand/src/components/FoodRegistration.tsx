import React, { useState } from "react";
import axios from "axios";
import "./FoodRegistration.css";

interface FoodRegistrationProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const FoodRegistration: React.FC<FoodRegistrationProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [nome, setNome] = useState("");
  const [calorias, setCalorias] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debug

      if (!token) {
        throw new Error("Token não encontrado");
      }

      console.log("Enviando dados:", { nome, calorias }); // Debug

      const response = await axios.post(
        "http://localhost:3001/api/alimentos",
        {
          nome: nome.trim(),
          calorias: Number(calorias),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resposta:", response.data); // Debug
      alert("Alimento cadastrado com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Erro detalhado:", error); // Debug
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Erro ao cadastrar alimento");
      } else {
        setError("Erro ao cadastrar alimento");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-registration-modal">
      <div className="food-registration-content">
        <h3>Cadastrar Novo Alimento</h3>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Alimento:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Calorias (por 100g):</label>
            <input
              type="number"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
              disabled={loading}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodRegistration;
