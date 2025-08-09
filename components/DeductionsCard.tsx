
'use client'
import { useStore } from '../store'
import { useState } from 'react'

export default function DeductionsCard() {
  const { deductions, year, addDeduction } = useStore()
  const ded = deductions.filter(d => d.year === year)
  const [form, setForm] = useState({ date: '', category:'', amount: '', description:'' })
  return (
    <div className="card p-6 flex flex-col">
      <h2 className="h2 mb-4">Deductions</h2>
      <div className="space-y-2 text-sm max-h-64 overflow-auto pr-1">
        {ded.map(d => (
          <div key={d.id} className="flex justify-between">
            <span>{d.category} — {new Date(d.date).toLocaleDateString('en-AU')}</span>
            <span className="mono">${d.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <form className="mt-4 grid grid-cols-4 gap-2" onSubmit={e=>{
        e.preventDefault()
        addDeduction({ date: form.date || new Date().toISOString().slice(0,10), category: form.category || 'General', amount: parseFloat(form.amount||'0'), description: form.description, year })
        setForm({ date:'', category:'', amount:'', description:'' })
      }}>
        <input className="input" placeholder="Date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
        <input className="input col-span-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input className="input" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
        <input className="input col-span-3" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button className="btn">Add</button>
      </form>
    </div>
  )
}
