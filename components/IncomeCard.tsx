
'use client'
import { useStore } from '../store'
import { useDerived } from '../store'
import { useState } from 'react'

export default function IncomeCard() {
  const { income, year, setMainIncomeForYear } = useStore()
  const derived = useDerived()
  const inc = income.filter(i => i.year === year)
  const main = inc.find(i => i.source === 'Main income')
  const [editing, setEditing] = useState(false)
  const [tmp, setTmp] = useState(main?.gross?.toString() ?? '0')
  const format = (n:number)=> n.toLocaleString('en-AU',{style:'currency',currency:'AUD'})
  return (
    <div className="card p-6 flex flex-col">
      <h2 className="h2 mb-4">Income</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span>Main income — {main ? new Date(main.date).toLocaleDateString('en-AU') : '—'}</span>
          {!editing ? (
            <div className="flex items-center gap-3">
              <span className="mono">{format(main?.gross ?? 0)}</span>
              <button className="btn" onClick={()=>{ setEditing(true); setTmp((main?.gross ?? 0).toString())}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="#7df9ff"/></svg>
                Edit
              </button>
            </div>
          ) : (
            <form className="flex items-center gap-2" onSubmit={e=>{
              e.preventDefault();
              const v = parseFloat(tmp || '0')
              setMainIncomeForYear(year, isFinite(v) ? v : 0)
              setEditing(false)
            }}>
              <input className="input mono w-40 text-right" value={tmp} onChange={e=>setTmp(e.target.value)} />
              <button className="btn" type="submit">Save</button>
              <button className="btn" type="button" onClick={()=>setEditing(false)}>Cancel</button>
            </form>
          )}
        </div>
        {inc.filter(i=>i.source!=='Main income').map(i => (
          <div key={i.id} className="flex justify-between">
            <span>{i.source} — {new Date(i.date).toLocaleDateString('en-AU')}</span>
            <span className="mono">{format(i.gross)}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6 text-lg font-semibold">
        <div>Total before tax: <span className="mono">{format(derived.totalBeforeTax)}</span></div>
        <div>Tax already withheld: <span className="mono">{format(derived.taxAlreadyWithheld)}</span></div>
        <div>Estimated tax to pay: <span className="mono">{format(derived.estimatedTaxToPay)}</span></div>
        <div>Estimated return after deductions: <span className="mono">{format(derived.estimatedReturnAfterDeductions)}</span></div>
      </div>
    </div>
  )
}
