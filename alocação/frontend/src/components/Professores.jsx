import { useState } from "react";
import "./cadastros.css";

export default function Professores() {
  const [professores, setProfessores] = useState([
    { id: 1, nome: "Ana Silva", area: "Banco de Dados" },
    { id: 2, nome: "Carlos Almeida", area: "Programação" },
    { id: 3, nome: "Marcos Santos", area: "Engenharia de Software" },
  ]);

  const [form, setForm] = useState({ nome: "", area: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const cadastrar = () => {
    if (!form.nome || !form.area) {
      alert("Preencha todos os campos");
      return;
    }

    setProfessores([
      ...professores,
      { id: Date.now(), nome: form.nome, area: form.area },
    ]);

    setForm({ nome: "", area: "" });
  };

  const excluir = (id) => {
    setProfessores(professores.filter((p) => p.id !== id));
  };

  return (
    <div className="cad-container">

      <div className="cad-header">
        <span className="back-arrow">← Voltar</span>
        <h1>Gerenciar Cadastros</h1>
        <p>Cadastre professores, disciplinas, salas e horários</p>
      </div>

      <div className="cad-tabs">
        <button className="selected">👨‍🏫 Professores</button>
        <button>📘 Disciplinas</button>
        <button>🏫 Salas</button>
        <button>⏱ Horários</button>
        <button>📅 Períodos</button>
      </div>

      <div className="cad-grid">
        <div className="card">
          <h2>Novo Professor</h2>

          <label>Nome *</label>
          <input name="nome" value={form.nome} onChange={handleChange} />

          <label>Área *</label>
          <input name="area" value={form.area} onChange={handleChange} />

          <button className="btn-cadastrar" onClick={cadastrar}>
            ➕ Cadastrar Professor
          </button>
        </div>

        <div className="card">
          <h2>Professores Cadastrados ({professores.length})</h2>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Área</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {professores.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.nome}</strong></td>
                  <td>{p.area}</td>
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
