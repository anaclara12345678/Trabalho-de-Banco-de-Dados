import React, { useState, useEffect } from 'react';

// Recebe a cor via "props" para ficar igual ao App.js
function GradeProfessor({ corCabecalho = '#0056b3' }) {
    const [professores, setProfessores] = useState([]);
    const [professorId, setProfessorId] = useState('');
    const [grade, setGrade] = useState([]);
    const [aviso, setAviso] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/professores')
            .then(res => res.json())
            .then(data => setProfessores(data))
            .catch(err => console.error("Erro ao buscar professores:", err));
    }, []);

    const buscarGrade = () => {
        if (!professorId) {
            setAviso('Por favor, selecione um professor.');
            setGrade([]);
            return;
        }

        fetch(`http://localhost:3000/grade-professor/${professorId}`)
            .then(res => res.json())
            .then(data => {
                setGrade(data);
                if (data.length === 0) {
                    setAviso('Nenhuma aula encontrada para este professor.');
                } else {
                    setAviso('');
                }
            })
            .catch(err => setAviso('Erro ao conectar com o servidor.'));
    };

    return (
        <div className="card border-0 shadow-sm">
            {/* Cabeçalho do Card com a cor personalizada */}
            <div className="card-header text-white py-3" style={{ backgroundColor: corCabecalho }}>
                <h5 className="mb-0">Filtros de Pesquisa</h5>
            </div>
            
            <div className="card-body p-4">
                {/* Linha de Pesquisa */}
                <div className="row g-3 align-items-end mb-4">
                    <div className="col-md-9">
                        <label className="form-label fw-bold text-secondary">Professor</label>
                        <select 
                            className="form-select form-select-lg"
                            value={professorId}
                            onChange={(e) => setProfessorId(e.target.value)}
                        >
                            <option value="">Selecione um professor...</option>
                            {professores.map((prof) => (
                                <option key={prof.id_professor} value={prof.id_professor}>
                                    {prof.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        {/* Botão Amarelo */}
                        <button className="btn btn-warning w-100 btn-lg fw-bold text-dark" onClick={buscarGrade}>
                            Pesquisar
                        </button>
                    </div>
                </div>

                {/* Avisos */}
                {aviso && <div className="alert alert-info border-0 bg-light text-primary">{aviso}</div>}

                {/* Tabela de Resultados */}
                {grade.length > 0 && (
                    <div className="mt-4">
                        {/* Título dos resultados usando a mesma cor para combinar */}
                        <h6 className="mb-3 fw-bold" style={{ color: corCabecalho }}>Resultados Encontrados ({grade.length})</h6>
                        <div className="table-responsive bg-white rounded shadow-sm">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light text-secondary">
                                    <tr>
                                        <th className="py-3 ps-3">DIA</th>
                                        <th className="py-3">HORÁRIO</th>
                                        <th className="py-3">DISCIPLINA</th>
                                        <th className="py-3">SALA</th>
                                        <th className="py-3">PERÍODO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grade.map((aula, index) => (
                                        <tr key={index}>
                                            {/* Texto do dia usando a cor principal */}
                                            <td className="ps-3 fw-bold" style={{ color: corCabecalho }}>{aula.dia_semana}</td>
                                            <td>{aula.hora_inicio.slice(0, 5)} - {aula.hora_fim.slice(0, 5)}</td>
                                            <td className="fw-bold">{aula.disciplina}</td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    {aula.sala_numero} ({aula.bloco})
                                                </span>
                                            </td>
                                            <td>{aula.ano}/{aula.semestre}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GradeProfessor;