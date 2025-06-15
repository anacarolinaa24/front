import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"; // Alterado para Profile.css

interface UserData {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

const Profile: React.FC = () => { // Alterado para Profile
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserData>>({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/usuario/perfil",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setError("Erro ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3001/api/usuario/perfil",
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData((prev) => ({ ...prev, ...editData } as UserData));
      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return <div>Nenhum dado encontrado</div>;

  return (
    <div className="profile-container">
      <h2>Meu Perfil</h2>

      {isEditing ? (
        <div className="profile-form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={editData.nome || ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, nome: e.target.value }))
              }
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={editData.email || ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="form-group">
            <label>CPF:</label>
            <input type="text" value={editData.cpf || ""} readOnly />
          </div>

          <div className="button-group">
            <button onClick={handleUpdate}>Salvar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <p>
            <strong>Nome:</strong> {userData.nome}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>CPF:</strong> {userData.cpf}
          </p>

          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
};

export default Profile; // Alterado para Profile
