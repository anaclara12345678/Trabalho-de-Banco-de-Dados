import React, {useEffect, useState} from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [counts,setCounts] = useState({prof:0,disc:0,salas:0,aloc:0})
  useEffect(()=>{
    (async ()=>{
      try{
        const prof = await api.get('/professores')
        const disc = await api.get('/disciplinas')
        const salas = await api.get('/salas')
        const aloc = await api.get('/alocacoes')
        setCounts({prof:prof.length, disc:disc.length, salas:salas.length, aloc:aloc.length})
      }catch(e){ console.error(e) }
    })()
  },[])
  return (
    <div>
      <div className="flex justify-center gap-4 mb-6">
        <Link to="/alocacao" className="px-6 py-2 bg-sky-800 text-white rounded">Nova Alocação</Link>
        <Link to="/alocacao" className="px-6 py-2 border rounded">Ver Alocações</Link>
      </div>

      <div className="card-blue bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold text-white bg-sky-800 p-4 -m-6 mb-6">Nova Alocação</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-2">Form preview</div>
          <div className="p-2">Form preview</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-6 rounded shadow text-center"><div className="text-3xl font-bold text-sky-800">{counts.prof}</div><div>Professores</div></div>
        <div className="bg-white p-6 rounded shadow text-center"><div className="text-3xl font-bold text-sky-800">{counts.disc}</div><div>Disciplinas</div></div>
        <div className="bg-white p-6 rounded shadow text-center"><div className="text-3xl font-bold text-amber-400">{counts.salas}</div><div>Salas</div></div>
        <div className="bg-white p-6 rounded shadow text-center"><div className="text-3xl font-bold text-amber-400">{counts.aloc}</div><div>Alocações</div></div>
      </div>
    </div>
  )
}
