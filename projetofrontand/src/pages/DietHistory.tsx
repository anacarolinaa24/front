import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DietHistory.css";

interface Dieta {
  id: number;
  nome: string;
  dataCriacao: string;
  refeicoes: Array<{
    nome: string;
    horario: string;
    alimentos: Array<{
      id: number;
      nome: string;
      quantidade: number;
      calorias: number;
    }>;
  }>;
}

const DietHistory: React.FC = () => {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDietas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/dietas/historico",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDietas(response.data);
    } catch (error) {
      console.error("Erro ao buscar dietas:", error);
      setError("Erro ao carregar histórico de dietas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDietas();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="diet-history-container">
      <h2>Histórico de Dietas</h2>

      {dietas.length === 0 ? (
        <p>Nenhuma dieta encontrada no histórico</p>
      ) : (
        <div className="dietas-list">
          {dietas.map((dieta) => (
            <div key={dieta.id} className="dieta-card">
              <h3>{dieta.nome}</h3>
              <p className="data-criacao">
                Criada em: {new Date(dieta.dataCriacao).toLocaleDateString()}
              </p>

              <div className="refeicoes-container">
                {dieta.refeicoes.map((refeicao, index) => (
                  <div key={index} className="refeicao-card">
                    <h4>{refeicao.nome}</h4>
                    <p className="horario">Horário: {refeicao.horario}</p>

                    <div className="alimentos-lista">
                      {refeicao.alimentos.map((alimento, i) => (
                        <div key={i} className="alimento-item">
                          <span>{alimento.nome}</span>
                          <span>{alimento.quantidade}g</span>
                          <span>
                            {(
                              (alimento.calorias * alimento.quantidade) /
                              100
                            ).toFixed(2)}{" "}
                            kcal
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="calorias-totais">
                      Total da Refeição:{" "}
                      {refeicao.alimentos
                        .reduce(
                          (total, alimento) =>
                            total +
                            (alimento.calorias * alimento.quantidade) / 100,
                          0
                        )
                        .toFixed(2)}{" "}
                      kcal
                    </div>
                  </div>
                ))}
              </div>

              <div className="calorias-dieta-total">
                Total da Dieta:{" "}
                {dieta.refeicoes
                  .reduce(
                    (total, refeicao) =>
                      total +
                      refeicao.alimentos.reduce(
                        (refTotal, alimento) =>
                          refTotal +
                          (alimento.calorias * alimento.quantidade) / 100,
                        0
                      ),
                    0
                  )
                  .toFixed(2)}{" "}
                kcal
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietHistory;
