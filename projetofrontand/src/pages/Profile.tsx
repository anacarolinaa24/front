import { useState, useEffect } from "react";
import "./Profile.css";
import api from "../services/api";
import { FaPencilAlt } from "react-icons/fa";

interface ProfileData {
  nome: string;
  usuario: string;
  email: string;
  cpf: string;
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

const Profile = ({
  isSidePanel,
  onClose,
}: {
  isSidePanel?: boolean;
  onClose?: () => void;
}) => {
  const [profile, setProfile] = useState<ProfileData>({
    nome: "",
    usuario: "",
    email: "",
    cpf: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(
          `/usuarios/${localStorage.getItem("userId")}`
        );
        const userData = response.data;
        setProfile((prev) => ({
          ...prev,
          ...userData,
          senhaAtual: "",
          novaSenha: "",
          confirmarSenha: "",
        }));
      } catch (error) {
        setErrorMessage("Erro ao carregar dados do usuário");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile.nome || !profile.usuario) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      setSuccessMessage("");
      return;
    }

    if (showChangePassword && (!profile.novaSenha || !profile.confirmarSenha)) {
      setErrorMessage("Preencha todos os campos de senha");
      setSuccessMessage("");
      return;
    }

    if (showChangePassword && profile.novaSenha !== profile.confirmarSenha) {
      setErrorMessage("As senhas não coincidem");
      setSuccessMessage("");
      return;
    }

    try {
      const updateData = {
        nome: profile.nome,
        usuario: profile.usuario,
        ...(showChangePassword && {
          senhaAtual: profile.senhaAtual,
          novaSenha: profile.novaSenha,
        }),
      };

      const response = await api.put(
        `/usuarios/${localStorage.getItem("userId")}`,
        updateData
      );

      if (response.status === 200) {
        setSuccessMessage("Perfil atualizado com sucesso!");
        setEditMode(false);
        setShowChangePassword(false);
        setTimeout(() => {
          setSuccessMessage("");
          if (onClose) onClose();
        }, 1500);
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao atualizar perfil"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setShowChangePassword(false);
    setErrorMessage("");
    setSuccessMessage("");
    (async () => {
      try {
        const response = await api.get(
          `/usuarios/${localStorage.getItem("userId")}`
        );
        const userData = response.data;
        setProfile((prev) => ({
          ...prev,
          ...userData,
          senhaAtual: "",
          novaSenha: "",
          confirmarSenha: "",
        }));
      } catch (error) {
        setErrorMessage("Erro ao carregar dados do usuário");
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Meu Perfil</h2>

      <div className="form-group editable-group">
        <label htmlFor="nome">
          Nome:
          {!editMode && !showChangePassword && (
            <button
              type="button"
              className="edit-pencil"
              title="Editar"
              onClick={() => setEditMode(true)}
            >
              <FaPencilAlt />
            </button>
          )}
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={profile.nome}
          onChange={handleChange}
          required
          disabled={!editMode || showChangePassword}
        />
      </div>

      <div className="form-group editable-group">
        <label htmlFor="usuario">
          Nome de Usuário:
          {!editMode && !showChangePassword && (
            <button
              type="button"
              className="edit-pencil"
              title="Editar"
              onClick={() => setEditMode(true)}
            >
              <FaPencilAlt />
            </button>
          )}
        </label>
        <input
          id="usuario"
          name="usuario"
          type="text"
          value={profile.usuario}
          onChange={handleChange}
          required
          disabled={!editMode || showChangePassword}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          disabled
          className="disabled-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
        <input
          id="cpf"
          name="cpf"
          type="text"
          value={profile.cpf}
          disabled
          className="disabled-input"
        />
      </div>

      {/* Campo de senha atual só aparece ao editar dados (não ao alterar senha) */}
      {!showChangePassword && editMode && (
        <div className="form-group">
          <label htmlFor="senhaAtual">Senha Atual:</label>
          <input
            id="senhaAtual"
            name="senhaAtual"
            type="password"
            value={profile.senhaAtual}
            onChange={handleChange}
            placeholder="Senha atual para salvar alterações"
            required
          />
        </div>
      )}

      {!showChangePassword && (
        <button
          type="button"
          onClick={() => {
            setShowChangePassword(true);
            setEditMode(true);
          }}
          className="change-password-button"
        >
          Alterar senha
        </button>
      )}

      {showChangePassword && (
        <div className="senha-group">
          <h3>Nova Senha</h3>
          <div className="form-group">
            <label htmlFor="novaSenha">Nova Senha:</label>
            <input
              id="novaSenha"
              name="novaSenha"
              type="password"
              value={profile.novaSenha}
              onChange={handleChange}
              placeholder="Digite a nova senha"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              value={profile.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite novamente a nova senha"
              required
            />
          </div>
        </div>
      )}

      <div className="button-group">
        {(editMode || showChangePassword) && (
          <>
            <button type="submit">Salvar Alterações</button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default Profile;
