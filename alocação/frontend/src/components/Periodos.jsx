import { useState } from "react";
import "./cadastros.css";

export default function Periodos() {
  const [periodos, setPeriodos] = useState([
    { id: 1, nome: "1º Período" },
    { id: 2, nome: "2º Período" },
    { id: 3, nome: "3º Período" },
  ]);

  const [form, setForm] = useState({ nome: "" });

  const cadastrar = () => {
    if (!form.nome) {
      alert("Digite o nome do período");
      return;
    }

    setPeriodos([...periodos, { id: Date.now(), nome: form.nome }]);
    setForm({ nome: "" });
  };

  const excluir = (id) => {
    setPeriodos(periodos.filter((p) => p.id !== id));
  };

  return (
    <div className="cad-container">

      <div className="cad-header">
        <span className="back-arrow">← Voltar</span>
        <h1>Gerenciar Cadastros</h1>
        <p>Cadastre professores, disciplinas, salas e horários</p>
      </div>

      <div className="cad-tabs">
        <button>Professores</button>
        <button>Disciplinas</button>
        <button>Salas</button>
        <button>Horários</button>
        <button className="selected">📅 Períodos</button>
      </div>

      <div className="cad-grid">

        <div className="card">
          <h2>Novo Período</h2>

          <label>Nome do Período *</label>
          <input
            name="nome"
            value={form.nome}
            onChange={(e) => setForm({ nome: e.target.value })}
          />

          <button className="btn-cadastrar" onClick={cadastrar}>
            ➕ Cadastrar Período
          </button>
        </div>

        <div className="card">
          <h2>Períodos Cadastrados ({periodos.length})</h2>

          <table>
            <thead>
              <tr>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {periodos.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.nome}</strong></td>
                  <td>
                    <button className="btn-delete" onClick={() => excluir(p.id)}>
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
