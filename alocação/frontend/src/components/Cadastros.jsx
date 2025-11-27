import { useState } from "react";
import "./cadastros.css";

function Cadastros() {
  const [aba, setAba] = useState("disciplinas");

  // ---------------------------
  // DADOS DAS ABAS
  // ---------------------------

  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  // FORMULÁRIOS
  const [formDisc, setFormDisc] = useState({
    codigo: "",
    nome: "",
    curso: "",
    periodo: "",
    cargaHoraria: "",
  });

  const [formProf, setFormProf] = useState({
    nome: "",
    email: "",
    telefone: "",
    departamento: "",
  });

  const [formSala, setFormSala] = useState({
    numero: "",
    capacidade: "",
    tipo: "",
  });

  const [formHorario, setFormHorario] = useState({
    dia: "",
    inicio: "",
    fim: "",
  });

  const [formPeriodo, setFormPeriodo] = useState({
    nome: "",
    ano: "",
  });

  // HANDLE CHANGE GENÉRICO
  const handleChange = (e, setForm, form) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // CADASTRAR
  // ---------------------------

  const cadastrarDisciplina = () => {
    if (!formDisc.codigo || !formDisc.nome || !formDisc.curso) {
      return alert("Preencha código, nome e curso!");
    }

    setDisciplinas([...disciplinas, formDisc]);
    setFormDisc({ codigo: "", nome: "", curso: "", periodo: "", cargaHoraria: "" });
  };

  const cadastrarProfessor = () => {
    if (!formProf.nome || !formProf.email) {
      return alert("Nome e e-mail são obrigatórios!");
    }

    setProfessores([...professores, formProf]);
    setFormProf({ nome: "", email: "", telefone: "", departamento: "" });
  };

  const cadastrarSala = () => {
    if (!formSala.numero || !formSala.capacidade) {
      return alert("Número e capacidade são obrigatórios!");
    }

    setSalas([...salas, formSala]);
    setFormSala({ numero: "", capacidade: "", tipo: "" });
  };

  const cadastrarHorario = () => {
    if (!formHorario.dia || !formHorario.inicio || !formHorario.fim) {
      return alert("Preencha dia, início e fim!");
    }

    setHorarios([...horarios, formHorario]);
    setFormHorario({ dia: "", inicio: "", fim: "" });
  };

  const cadastrarPeriodo = () => {
    if (!formPeriodo.nome || !formPeriodo.ano) {
      return alert("Preencha nome e ano!");
    }

    setPeriodos([...periodos, formPeriodo]);
    setFormPeriodo({ nome: "", ano: "" });
  };

  // ---------------------------
  // EXCLUIR
  // ---------------------------

  const excluir = (lista, setLista, index) => {
    const nova = [...lista];
    nova.splice(index, 1);
    setLista(nova);
  };

  // ===============================================================
  // INTERFACE
  // ===============================================================

  return (
    <div className="cad-container">
      <div className="cad-header">
        <h1>Gerenciar Cadastros</h1>
        <p>Cadastre professores, disciplinas, salas, horários e períodos</p>
      </div>

      <div className="cad-tabs">
        <button onClick={() => setAba("professores")} className={aba === "professores" ? "selected" : ""}>👨‍🏫 Professores</button>
        <button onClick={() => setAba("disciplinas")} className={aba === "disciplinas" ? "selected" : ""}>📘 Disciplinas</button>
        <button onClick={() => setAba("salas")} className={aba === "salas" ? "selected" : ""}>🏫 Salas</button>
        <button onClick={() => setAba("horarios")} className={aba === "horarios" ? "selected" : ""}>⏱ Horários</button>
        <button onClick={() => setAba("periodos")} className={aba === "periodos" ? "selected" : ""}>📅 Períodos</button>
      </div>

      <div className="cad-grid">

        {/* ------------------------------------------------------
           ABAS
        ------------------------------------------------------ */}

        {/* --------- DISCIPLINAS --------- */}
        {aba === "disciplinas" && (
          <>
            <div className="card">
              <h2>Nova Disciplina</h2>

              <label>Código *</label>
              <input name="codigo" value={formDisc.codigo}
                onChange={(e) => handleChange(e, setFormDisc, formDisc)} />

              <label>Nome *</label>
              <input name="nome" value={formDisc.nome}
                onChange={(e) => handleChange(e, setFormDisc, formDisc)} />

              <label>Curso *</label>
              <input name="curso" value={formDisc.curso}
                onChange={(e) => handleChange(e, setFormDisc, formDisc)} />

              <label>Período</label>
              <input name="periodo" value={formDisc.periodo}
                onChange={(e) => handleChange(e, setFormDisc, formDisc)} />

              <label>Carga Horária</label>
              <input name="cargaHoraria" value={formDisc.cargaHoraria}
                onChange={(e) => handleChange(e, setFormDisc, formDisc)} />

              <button className="btn-cadastrar" onClick={cadastrarDisciplina}>Cadastrar</button>
            </div>

            <div className="card">
              <h2>Disciplinas ({disciplinas.length})</h2>

              <table>
                <thead>
                  <tr><th>Código</th><th>Nome</th><th>Curso</th><th></th></tr>
                </thead>
                <tbody>
                  {disciplinas.map((d, i) => (
                    <tr key={i}>
                      <td>{d.codigo}</td>
                      <td>{d.nome}</td>
                      <td>{d.curso}</td>
                      <td>
                        <button className="btn-delete" onClick={() => excluir(disciplinas, setDisciplinas, i)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --------- PROFESSORES --------- */}
        {aba === "professores" && (
          <>
            <div className="card">
              <h2>Novo Professor</h2>

              <label>Nome *</label>
              <input name="nome" value={formProf.nome}
                onChange={(e) => handleChange(e, setFormProf, formProf)} />

              <label>Email *</label>
              <input name="email" value={formProf.email}
                onChange={(e) => handleChange(e, setFormProf, formProf)} />

              <label>Telefone</label>
              <input name="telefone" value={formProf.telefone}
                onChange={(e) => handleChange(e, setFormProf, formProf)} />

              <label>Departamento</label>
              <input name="departamento" value={formProf.departamento}
                onChange={(e) => handleChange(e, setFormProf, formProf)} />

              <button className="btn-cadastrar" onClick={cadastrarProfessor}>Cadastrar</button>
            </div>

            <div className="card">
              <h2>Professores ({professores.length})</h2>

              <table>
                <thead>
                  <tr><th>Nome</th><th>Email</th><th>Depto</th><th></th></tr>
                </thead>
                <tbody>
                  {professores.map((p, i) => (
                    <tr key={i}>
                      <td>{p.nome}</td>
                      <td>{p.email}</td>
                      <td>{p.departamento}</td>
                      <td>
                        <button className="btn-delete" onClick={() => excluir(professores, setProfessores, i)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --------- SALAS --------- */}
        {aba === "salas" && (
          <>
            <div className="card">
              <h2>Nova Sala</h2>

              <label>Número *</label>
              <input name="numero" value={formSala.numero}
                onChange={(e) => handleChange(e, setFormSala, formSala)} />

              <label>Capacidade *</label>
              <input name="capacidade" value={formSala.capacidade}
                onChange={(e) => handleChange(e, setFormSala, formSala)} />

              <label>Tipo</label>
              <input name="tipo" value={formSala.tipo}
                onChange={(e) => handleChange(e, setFormSala, formSala)} />

              <button className="btn-cadastrar" onClick={cadastrarSala}>Cadastrar</button>
            </div>

            <div className="card">
              <h2>Salas ({salas.length})</h2>

              <table>
                <thead>
                  <tr><th>Número</th><th>Capacidade</th><th>Tipo</th><th></th></tr>
                </thead>
                <tbody>
                  {salas.map((s, i) => (
                    <tr key={i}>
                      <td>{s.numero}</td>
                      <td>{s.capacidade}</td>
                      <td>{s.tipo}</td>
                      <td>
                        <button className="btn-delete" onClick={() => excluir(salas, setSalas, i)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --------- HORÁRIOS --------- */}
        {aba === "horarios" && (
          <>
            <div className="card">
              <h2>Novo Horário</h2>

              <label>Dia *</label>
              <input name="dia" value={formHorario.dia}
                onChange={(e) => handleChange(e, setFormHorario, formHorario)} />

              <label>Início *</label>
              <input name="inicio" type="time" value={formHorario.inicio}
                onChange={(e) => handleChange(e, setFormHorario, formHorario)} />

              <label>Fim *</label>
              <input name="fim" type="time" value={formHorario.fim}
                onChange={(e) => handleChange(e, setFormHorario, formHorario)} />

              <button className="btn-cadastrar" onClick={cadastrarHorario}>Cadastrar</button>
            </div>

            <div className="card">
              <h2>Horários ({horarios.length})</h2>

              <table>
                <thead>
                  <tr><th>Dia</th><th>Início</th><th>Fim</th><th></th></tr>
                </thead>
                <tbody>
                  {horarios.map((h, i) => (
                    <tr key={i}>
                      <td>{h.dia}</td>
                      <td>{h.inicio}</td>
                      <td>{h.fim}</td>
                      <td>
                        <button className="btn-delete" onClick={() => excluir(horarios, setHorarios, i)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --------- PERÍODOS --------- */}
        {aba === "periodos" && (
          <>
            <div className="card">
              <h2>Novo Período</h2>

              <label>Nome *</label>
              <input name="nome" value={formPeriodo.nome}
                onChange={(e) => handleChange(e, setFormPeriodo, formPeriodo)} />

              <label>Ano *</label>
              <input name="ano" value={formPeriodo.ano}
                onChange={(e) => handleChange(e, setFormPeriodo, formPeriodo)} />

              <button className="btn-cadastrar" onClick={cadastrarPeriodo}>Cadastrar</button>
            </div>

            <div className="card">
              <h2>Períodos ({periodos.length})</h2>

              <table>
                <thead>
                  <tr><th>Nome</th><th>Ano</th><th></th></tr>
                </thead>
                <tbody>
                  {periodos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.nome}</td>
                      <td>{p.ano}</td>
                      <td>
                        <button className="btn-delete" onClick={() => excluir(periodos, setPeriodos, i)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Cadastros;
