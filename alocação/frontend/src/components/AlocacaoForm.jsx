import React, {useEffect, useState} from 'react'
import api from '../services/api'

export default function AlocacaoForm(){
  const [professores,setProfessores] = useState([])
  const [disciplinas,setDisciplinas] = useState([])
  const [salas,setSalas] = useState([])
  const [horarios,setHorarios] = useState([])
  const [periodos,setPeriodos] = useState([])
  const [form,setForm] = useState({ professor_id:'', disciplina_id:'', sala_id:'', horario_id:'', periodo_id:'', observacoes:'' })

  useEffect(()=>{ load() },[])
  async function load(){
    setProfessores(await api.get('/professores'))
    setDisciplinas(await api.get('/disciplinas'))
    setSalas(await api.get('/salas'))
    setHorarios(await api.get('/horarios'))
    setPeriodos(await api.get('/periodos'))
  }

  async function submit(){
    try{
      await api.post('/alocacoes', form)
      alert('Alocação criada')
      setForm({ professor_id:'', disciplina_id:'', sala_id:'', horario_id:'', periodo_id:'', observacoes:'' })
    }catch(err){
      alert('Erro: ' + (err.message || err))
    }
  }

  return (
    <div>
      <div className="card-blue bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold text-white bg-sky-800 p-4 -m-6 mb-6">Nova Alocação</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Professor *</label>
            <select className="w-full border p-2 rounded" value={form.professor_id} onChange={e=>setForm({...form, professor_id:e.target.value})}>
              <option value="">Selecione o professor</option>
              {professores.map(p=> <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm">Disciplina *</label>
            <select className="w-full border p-2 rounded" value={form.disciplina_id} onChange={e=>setForm({...form, disciplina_id:e.target.value})}>
              <option value="">Selecione a disciplina</option>
              {disciplinas.map(d=> <option key={d.id} value={d.id}>{d.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm">Sala *</label>
            <select className="w-full border p-2 rounded" value={form.sala_id} onChange={e=>setForm({...form, sala_id:e.target.value})}>
              <option value="">Selecione a sala</option>
              {salas.map(s=> <option key={s.id} value={s.id}>{s.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm">Horário *</label>
            <select className="w-full border p-2 rounded" value={form.horario_id} onChange={e=>setForm({...form, horario_id:e.target.value})}>
              <option value="">Selecione o horário</option>
              {horarios.map(h=> <option key={h.id} value={h.id}>{h.dia} {h.inicio}-{h.fim}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm">Período Letivo *</label>
            <select className="w-full border p-2 rounded" value={form.periodo_id} onChange={e=>setForm({...form, periodo_id:e.target.value})}>
              <option value="">Selecione o período</option>
              {periodos.map(p=> <option key={p.id} value={p.id}>{p.ano}/{p.semestre}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm">Observações</label>
            <textarea className="w-full border p-2 rounded" value={form.observacoes} onChange={e=>setForm({...form, observacoes:e.target.value})}></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-amber-400 px-4 py-2 rounded" onClick={submit}>Cadastrar Alocação</button>
        </div>
      </div>
    </div>
  )
}
