import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header(){
  const nav = useNavigate()
  return (
    <header className="header-hero text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><span className="text-3xl">📅</span> Sistema de Alocação de Salas</h1>
          <p className="text-slate-200">Gestão completa de professores, disciplinas e horários</p>
        </div>
        <div>
          <button onClick={()=>nav('/cadastros')} className="btn-yellow px-4 py-2 rounded font-semibold text-black">⚙️ Gerenciar Cadastros</button>
        </div>
      </div>
    </header>
  )
}
