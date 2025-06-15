import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewDiet.css";

const principaisRefeicoes = [
  "Café da manhã",
  "Almoço",
  "Café da tarde",
  "Lanche da tarde",
  "Jantar",
  "Ceia",
];

const NewDiet: React.FC = () => {
  const [nomeDieta, setNomeDieta] = useState("");
  const [refeicoes, setRefeicoes] = useState<any[]>([]);
  const [alimentos, setAlimentos] = useState<any[]>([]);
  const [refeicaoSelecionada, setRefeicaoSelecionada] = useState<number | null>(
    null
  );
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<number | null>(
    null
  );
  const [quantidade, setQuantidade] = useState(1);
  const [termoBusca, setTermoBusca] = useState("");
  const [alimentosFiltrados, setAlimentosFiltrados] = useState<any[]>([]);
  const [novoAlimento, setNovoAlimento] = useState({ nome: "", calorias: "" });
  const [showNovoAlimentoForm, setShowNovoAlimentoForm] = useState(false);
  const [editingTimeIndex, setEditingTimeIndex] = useState<number | null>(null);

  // Inicializar refeições e buscar alimentos ao carregar
  useEffect(() => {
    const initialRefeicoes = principaisRefeicoes.map((nome) => ({
      nome,
      horario: "",
      alimentos: [],
    }));
    setRefeicoes(initialRefeicoes);
    fetchAlimentos();
  }, []);

  // Filtrar alimentos quando o termo de busca mudar
  useEffect(() => {
    if (termoBusca.trim() === "") {
      setAlimentosFiltrados(alimentos);
    } else {
      const filtrados = alimentos.filter((alimento) =>
        alimento.nome.toLowerCase().includes(termoBusca.toLowerCase())
      );
      setAlimentosFiltrados(filtrados);
    }
  }, [termoBusca, alimentos]);

  // Buscar alimentos da API
  const fetchAlimentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/alimentos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlimentos(response.data);
      setAlimentosFiltrados(response.data);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  // Abrir o formulário de uma refeição
  const handleRefeicaoClick = (index: number) => {
    setRefeicaoSelecionada(index);
    setTermoBusca("");
    setAlimentoSelecionado(null);
    setQuantidade(1);
  };

  // Fechar o formulário de refeição
  const handleFecharFormulario = () => {
    setRefeicaoSelecionada(null);
  };

  // Selecionar um alimento da lista
  const handleAlimentoClick = (alimentoId: number) => {
    setAlimentoSelecionado(alimentoId);
    const alimento = alimentos.find((a) => a.id === alimentoId);
    if (alimento) {
      console.log(`Alimento selecionado: ${alimento.nome}`);
    }
  };

  // Adicionar alimento selecionado à refeição
  const handleAddAlimento = () => {
    if (refeicaoSelecionada === null || alimentoSelecionado === null) return;

    const alimentoObj = alimentos.find((a) => a.id === alimentoSelecionado);
    if (!alimentoObj) return;

    const newRefeicoes = [...refeicoes];
    const refeicao = newRefeicoes[refeicaoSelecionada];

    // Verificar se o alimento já existe na refeição
    const alimentoExistente = refeicao.alimentos.findIndex(
      (a: any) => a.id === alimentoSelecionado
    );

    if (alimentoExistente >= 0) {
      // Atualizar quantidade se já existe
      refeicao.alimentos[alimentoExistente].quantidade = quantidade;
    } else {
      // Adicionar novo alimento
      refeicao.alimentos.push({
        ...alimentoObj,
        quantidade,
      });
    }

    setRefeicoes(newRefeicoes);
    setAlimentoSelecionado(null);
    setQuantidade(1);
    setTermoBusca("");
  };

  // Remover alimento da refeição
  const handleRemoveAlimento = (
    refeicaoIndex: number,
    alimentoIndex: number
  ) => {
    const newRefeicoes = [...refeicoes];
    newRefeicoes[refeicaoIndex].alimentos.splice(alimentoIndex, 1);
    setRefeicoes(newRefeicoes);
  };

  // Atualizar horário da refeição
  const handleHorarioChange = (refeicaoIndex: number, horario: string) => {
    const newRefeicoes = [...refeicoes];
    newRefeicoes[refeicaoIndex].horario = horario;
    setRefeicoes(newRefeicoes);
  };

  // Gerenciar novo alimento
  const handleNovoAlimentoChange = (field: string, value: string) => {
    setNovoAlimento({ ...novoAlimento, [field]: value });
  };

  // Adicionar novo alimento ao banco
  const handleAddNovoAlimento = async () => {
    if (!novoAlimento.nome || !novoAlimento.calorias) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/alimentos",
        {
          nome: novoAlimento.nome,
          calorias: Number(novoAlimento.calorias),
          proteinas: 0,
          carboidratos: 0,
          gorduras: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlimentos([...alimentos, response.data]);
      setNovoAlimento({ nome: "", calorias: "" });
      setShowNovoAlimentoForm(false);
      alert("Alimento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar alimento:", error);
      alert("Erro ao adicionar alimento");
    }
  };

  // Salvar dieta completa
  const handleSaveDiet = async () => {
    if (!nomeDieta.trim()) {
      alert("Por favor, dê um nome para sua dieta");
      return;
    }

    // Verificar refeições com alimentos
    const refeicoesComAlimentos = refeicoes.filter(
      (r) => r.alimentos.length > 0
    );

    if (refeicoesComAlimentos.length === 0) {
      alert("Adicione pelo menos um alimento a uma refeição");
      return;
    }

    // Verificar horários das refeições com alimentos
    const refeicoesSemHorario = refeicoesComAlimentos.filter((r) => !r.horario);
    if (refeicoesSemHorario.length > 0) {
      alert("Defina o horário para todas as refeições que contêm alimentos");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const dietaData = {
        nome: nomeDieta,
        refeicoes: refeicoesComAlimentos.map((refeicao) => ({
          nome: refeicao.nome,
          horario: refeicao.horario,
          alimentos: refeicao.alimentos.map((alimento) => ({
            id: alimento.id,
            quantidade: alimento.quantidade,
          })),
        })),
      };

      const response = await axios.post(
        "http://localhost:3001/api/dietas",
        dietaData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Dieta salva com sucesso!");
        // Limpar formulário
        setNomeDieta("");
        const resetRefeicoes = principaisRefeicoes.map((nome) => ({
          nome,
          horario: "",
          alimentos: [],
        }));
        setRefeicoes(resetRefeicoes);
      }
    } catch (error) {
      console.error("Erro ao salvar dieta:", error);
      alert("Erro ao salvar dieta");
    }
  };

  // Calcular calorias totais de uma refeição
  const calcularCaloriasRefeicao = (refeicaoIndex: number) => {
    if (!refeicoes[refeicaoIndex]) return 0;

    return refeicoes[refeicaoIndex].alimentos.reduce(
      (total: number, alimento: any) => {
        return total + alimento.calorias * alimento.quantidade;
      },
      0
    );
  };

  // Adicione uma função para alternar a visibilidade do seletor de horário
  const toggleTimeSelector = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTimeIndex(editingTimeIndex === index ? null : index);
  };

  // Adicione uma função para fechar o seletor quando o horário for alterado
  const handleTimeChange = (index: number, newTime: string) => {
    handleHorarioChange(index, newTime);
    // Opcionalmente, fechar o seletor após a seleção
    // setEditingTimeIndex(null);
  };

  // Adicione também um efeito para fechar o seletor quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = () => {
      setEditingTimeIndex(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="new-diet-container">
      <h2>Simular Nova Dieta</h2>

      {/* Campo para nome da dieta */}
      <div className="nome-dieta-field">
        <label>Nome da Dieta:</label>
        <input
          type="text"
          value={nomeDieta}
          onChange={(e) => setNomeDieta(e.target.value)}
          placeholder="Digite um nome para sua dieta"
          className="nome-dieta-input"
        />
      </div>

      {/* Lista de botões das refeições */}
      <div className="refeicoes-buttons">
        {refeicoes.map((refeicao, index) => (
          <div key={index} className="refeicao-button-container">
            <button
              type="button"
              className={`refeicao-button ${
                refeicao.alimentos.length > 0 ? "com-alimentos" : ""
              }`}
              onClick={() => handleRefeicaoClick(index)}
            >
              {/* Nome da refeição e horário na mesma linha */}
              <div className="refeicao-nome-horario">
                <span className="refeicao-nome">{refeicao.nome}</span>
                {refeicao.alimentos.length > 0 && (
                  <div className="refeicao-horario">
                    {/* Mostrar o valor do horário se definido */}
                    {refeicao.horario && (
                      <span className="refeicao-horario-valor">
                        {refeicao.horario}
                      </span>
                    )}

                    {/* Emoji do relógio que serve como botão */}
                    <span
                      className="refeicao-horario-icon"
                      onClick={(e) => toggleTimeSelector(index, e)}
                    >
                      🕒
                    </span>

                    {/* Seletor de horário que aparece ao clicar no relógio */}
                    <div
                      className={`refeicao-horario-selector ${
                        editingTimeIndex === index ? "visible" : ""
                      }`}
                    >
                      <input
                        type="time"
                        value={refeicao.horario}
                        onChange={(e) =>
                          handleTimeChange(index, e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        autoFocus={editingTimeIndex === index}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Contagem de alimentos e calorias na linha abaixo */}
              {refeicao.alimentos.length > 0 && (
                <div className="refeicao-alimentos-info">
                  <span className="alimentos-count">
                    {refeicao.alimentos.length} alimento(s)
                  </span>
                  <span className="refeicao-button-info">
                    {calcularCaloriasRefeicao(index)} cal
                  </span>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Formulário de refeição (aparece ao clicar em uma refeição) */}
      {refeicaoSelecionada !== null && (
        <div className="refeicao-form-overlay">
          <div className="refeicao-form">
            <div className="refeicao-form-header">
              <h3>{refeicoes[refeicaoSelecionada].nome}</h3>
              <div className="horario-selector">
                <label>Horário:</label>
                <input
                  type="time"
                  value={refeicoes[refeicaoSelecionada].horario}
                  onChange={(e) =>
                    handleHorarioChange(refeicaoSelecionada, e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                className="close-form-btn"
                onClick={handleFecharFormulario}
              >
                ✕
              </button>
            </div>

            <div className="alimentos-search-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="search-input"
                />

                <button
                  type="button"
                  className="add-alimento-btn"
                  onClick={() => setShowNovoAlimentoForm(true)}
                >
                  Cadastrar Novo Alimento
                </button>
              </div>

              <div className="search-results">
                {alimentosFiltrados.length > 0 ? (
                  <ul className="alimentos-list">
                    {alimentosFiltrados.map((alimento) => (
                      <li
                        key={alimento.id}
                        className={
                          alimentoSelecionado === alimento.id ? "selected" : ""
                        }
                        onClick={() => handleAlimentoClick(alimento.id)}
                      >
                        {alimento.nome} - {alimento.calorias} cal
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-results">Nenhum alimento encontrado</p>
                )}
              </div>

              {alimentoSelecionado !== null && (
                <div className="quantidade-container">
                  <label>Quantidade:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantidade}
                    onChange={(e) =>
                      setQuantidade(parseInt(e.target.value) || 1)
                    }
                  />
                  <button
                    type="button"
                    className="add-to-refeicao-btn"
                    onClick={handleAddAlimento}
                  >
                    Adicionar
                  </button>
                </div>
              )}
            </div>

            <div className="selected-alimentos-section">
              <h4>Alimentos Selecionados</h4>
              {refeicoes[refeicaoSelecionada].alimentos.length > 0 ? (
                <ul className="selected-alimentos-list">
                  {refeicoes[refeicaoSelecionada].alimentos.map(
                    (alimento: any, alimentoIndex: number) => (
                      <li
                        key={alimentoIndex}
                        className="selected-alimento-item"
                      >
                        <div className="alimento-info">
                          <span className="alimento-nome">{alimento.nome}</span>
                          <span className="alimento-calorias">
                            {alimento.calorias * alimento.quantidade} cal
                          </span>
                        </div>
                        <div className="alimento-actions">
                          <span className="alimento-quantidade">
                            Qtd: {alimento.quantidade}
                          </span>
                          <button
                            type="button"
                            className="remove-alimento-btn"
                            onClick={() =>
                              handleRemoveAlimento(
                                refeicaoSelecionada,
                                alimentoIndex
                              )
                            }
                          >
                            Excluir
                          </button>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="no-selected-alimentos">
                  Nenhum alimento selecionado
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para cadastro de novo alimento */}
      {showNovoAlimentoForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cadastrar Novo Alimento</h3>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                value={novoAlimento.nome}
                onChange={(e) =>
                  handleNovoAlimentoChange("nome", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Calorias:</label>
              <input
                type="number"
                value={novoAlimento.calorias}
                onChange={(e) =>
                  handleNovoAlimentoChange("calorias", e.target.value)
                }
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleAddNovoAlimento}>Adicionar</button>
              <button onClick={() => setShowNovoAlimentoForm(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão para salvar dieta */}
      <button type="button" className="save-diet-btn" onClick={handleSaveDiet}>
        Salvar Dieta
      </button>
    </div>
  );
};

export default NewDiet;
