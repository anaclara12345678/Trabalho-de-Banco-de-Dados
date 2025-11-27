import React from 'react';
import GradeProfessor from './components/GradeProfessor';

function App() {
  // CONFIGURAÇÃO DE COR: Mude aqui se quiser mais escuro ou mais claro
  // Sugestões: 
  // #0056b3 (Azul mais escuro, padrão corporativo)
  // #004085 (Azul marinho bem escuro)
  // #0d6efd (O azul claro que estava antes)
  const COR_PRINCIPAL = '#0056b3'; 

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* 1. Navbar Superior */}
      {/* Note que tirei o bg-primary e coloquei style */}
      <nav className="navbar navbar-dark" style={{ backgroundColor: COR_PRINCIPAL }}>
        <div className="container">
          <div className="d-flex flex-column">
             <span className="navbar-brand mb-0 h1 fw-bold">Sistema de Alocação de Salas</span>
             <small className="text-white-50">Gestão completa de professores, disciplinas e horários</small>
          </div>
          <button className="btn btn-warning fw-bold text-dark">
             Gerenciar Cadastros
          </button>
        </div>
      </nav>

      {/* 2. Faixa Azul de Título */}
      <div className="text-white py-4 mb-4 shadow-sm" style={{ backgroundColor: COR_PRINCIPAL }}>
        <div className="container">
          <a href="/" className="text-white text-decoration-none mb-2 d-inline-block">← Voltar</a>
          <h3 className="fw-normal">Consultar Grade Horária</h3>
          <p className="mb-0 opacity-75">Pesquise os horários de aulas por professor</p>
        </div>
      </div>
      
      {/* 3. Conteúdo Principal */}
      <div className="container pb-5">
        <div className="row">
            <div className="col-12">
                <GradeProfessor corCabecalho={COR_PRINCIPAL} />
            </div>
        </div>
      </div>

    </div>
  );
}
export default App;