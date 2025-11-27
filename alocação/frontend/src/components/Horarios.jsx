import { useState } from "react";
import "./cadastros.css";

export default function Horarios() {
  const [horarios, setHorarios] = useState([
    { id: 1, inicio: "07:00", fim: "08:40" },
    { id: 2, inicio: "08:55", fim: "10:35" },
  ]);

  const [form, setForm] = useState({ inicio: "", fim: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const cadastrar = () => {
    if (!form.inicio || !form.fim) {
      alert("Preencha todos os campos");
      return;
    }
    setHorarios([...horarios, { id: Date.now(), ...form }]);
    setForm({ inicio: "", fim: "" });
  };

  const excluir = (id) => {
    setHorarios(horarios.filter((h) => h.id !== id));
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
        <button className="selected">⏱ Horários</button>
        <button>📅 Períodos</button>
      </div>

      <div className="cad-grid">

        <div className="card">
          <h2>Novo Horário</h2>

          <label>Início *</label>
          <input type="time" name="inicio" value={form.inicio} onChange={handleChange} />

          <label>Fim *</label>
          <input type="time" name="fim" value={form.fim} onChange={handleChange} />

          <button className="btn-cadastrar" onClick={cadastrar}>
            ➕ Cadastrar Horário
          </button>

        </div>

        <div className="card">
          <h2>Horários Cadastrados ({horarios.length})</h2>

          <table>
            <thead>
              <tr>
                <th>Início</th>
                <th>Fim</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {horarios.map((h) => (
                <tr key={h.id}>
                  <td><strong>{h.inicio}</strong></td>
                  <td>{h.fim}</td>
                  <td>
                    <button className="btn-delete" onClick={() => excluir(h.id)}>
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
