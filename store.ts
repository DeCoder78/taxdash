
'use client'
import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { Deduction, Income, YearLabel } from './types'
import { deriveTotals } from './lib/tax'

const YEARS: YearLabel[] = ['2024-25','2023-24','2022-23','2021-22','2020-21']

type State = {
  year: YearLabel
  years: YearLabel[]
  income: Income[]
  deductions: Deduction[]
  addDeduction: (d: Omit<Deduction,'id'>) => void
  addIncome: (i: Omit<Income,'id'>) => void
  setMainIncomeForYear: (y: YearLabel, gross: number) => void
}

const demoIncome: Income[] = [
  { id: uuid(), date: '2025-07-01', source: 'Main income', gross: 82000, taxWithheld: 18000, year: '2024-25' },
  { id: uuid(), date: '2025-07-15', source: 'Freelance work', gross: 4200, taxWithheld: 0, year: '2024-25' },
]

const demoDeductions: Deduction[] = [
  { id: uuid(), date: '2025-07-10', category: 'Design > PC Hardware', amount: 1299, description: 'GPU upgrade', year: '2024-25' },
  { id: uuid(), date: '2025-07-18', category: 'Utilities > Mobile Phone', amount: 720, description: '60% business use', year: '2024-25' },
]

export const useStore = create<State>((set, get) => ({
  year: '2024-25',
  years: YEARS,
  income: demoIncome,
  deductions: demoDeductions,
  addDeduction: (d) => set({ deductions: [...get().deductions, { ...d, id: uuid() }] }),
  addIncome: (i) => set({ income: [...get().income, { ...i, id: uuid() }] }),
  setMainIncomeForYear: (y, gross) => {
    const now = new Date().toISOString().slice(0,10)
    const list = get().income.slice()
    const idx = list.findIndex(i => i.year === y && i.source === 'Main income')
    if (idx >= 0) { list[idx] = { ...list[idx], gross } }
    else { list.push({ id: uuid(), date: now, source: 'Main income', gross, taxWithheld: 0, year: y }) }
    set({ income: list })
  }
}))

export const useDerived = () => {
  const { income, deductions, year } = useStore()
  const inc = income.filter(i => i.year === year)
  const ded = deductions.filter(d => d.year === year)
  return deriveTotals(inc, ded)
}
