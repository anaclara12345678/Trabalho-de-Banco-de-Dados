import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './components/dashboard'
import AlocacaoForm from './components/AlocacaoForm'

// TELAS DE CADASTRO
import Cadastros from './components/Cadastros'
import Professores from "./components/professores";
import Salas from "./components/Salas";
import Horarios from "./components/Horarios";
import Periodos from "./components/Periodos";


export default function App(){
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/alocacao" element={<AlocacaoForm />} />

          {/* ROTAS DE CADASTROS */}
          <Route path="/cadastros" element={<Cadastros />} />
          <Route path="/cadastros/professores" element={<Professores />} />
          <Route path="/cadastros/salas" element={<Salas />} />
          <Route path="/cadastros/horarios" element={<Horarios />} />
          <Route path="/cadastros/periodos" element={<Periodos />} />

        </Routes>
      </main>
    </div>
  )
}
