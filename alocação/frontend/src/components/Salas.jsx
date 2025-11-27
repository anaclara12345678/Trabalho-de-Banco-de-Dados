import { useState } from "react";
import "./cadastros.css";

export default function Salas() {
  const [salas, setSalas] = useState([
    { codigo: "A101", capacidade: 40 },
    { codigo: "B202", capacidade: 60 },
    { codigo: "Lab-3", capacidade: 32 },
  ]);

  const [form, setForm] = useState({ codigo: "", capacidade: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const cadastrar = () => {
    if (!form.codigo || !form.capacidade) {
      alert("Preencha todos os campos");
      return;
    }
    setSalas([...salas, form]);
    setForm({ codigo: "", capacidade: "" });
  };

  const excluir = (codigo) => {
    setSalas(salas.filter((s) => s.codigo !== codigo));
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
        <button className="selected">🏫 Salas</button>
        <button>⏱ Horários</button>
        <button>📅 Períodos</button>
      </div>

      <div className="cad-grid">

        <div className="card">
          <h2>Nova Sala</h2>

          <label>Código *</label>
          <input name="codigo" value={form.codigo} onChange={handleChange} />

          <label>Capacidade *</label>
          <input name="capacidade" value={form.capacidade} onChange={handleChange} />

          <button className="btn-cadastrar" onClick={cadastrar}>
            ➕ Cadastrar Sala
          </button>
        </div>

        <div className="card">
          <h2>Salas Cadastradas ({salas.length})</h2>

          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Capacidade</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {salas.map((s) => (
                <tr key={s.codigo}>
                  <td><strong>{s.codigo}</strong></td>
                  <td>{s.capacidade}</td>
                  <td>
                    <button className="btn-delete" onClick={() => excluir(s.codigo)}>
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
