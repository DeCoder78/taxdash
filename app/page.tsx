
'use client'
import YearTabs from '../components/YearTabs'
import IncomeCard from '../components/IncomeCard'
import DeductionsCard from '../components/DeductionsCard'
import Sidebar from '../components/Sidebar'

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-5">
        <h1 className="h1">Damon’s Personal Tax Dashboard</h1>
        <p className="subtle">Australia • internal tool</p>
        <YearTabs />
      </header>
      <section className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-6"><IncomeCard /></div>
        <div className="col-span-12 lg:col-span-4"><DeductionsCard /></div>
        <div className="col-span-12 lg:col-span-2"><Sidebar /></div>
      </section>
    </main>
  )
}
