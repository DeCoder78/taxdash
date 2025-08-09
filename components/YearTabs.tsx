
'use client'
import { useStore } from '../store'

export default function YearTabs() {
  const years = useStore(s => s.years)
  const year = useStore(s => s.year)
  const setYear = (y: any) => useStore.setState({ year: y })
  const colors: Record<string,string> = {
    '2024-25':'from-cyan-400 to-cyan-300',
    '2023-24':'from-amber-400 to-amber-300',
    '2022-23':'from-fuchsia-400 to-fuchsia-300',
    '2021-22':'from-sky-400 to-sky-300',
    '2020-21':'from-rose-500 to-rose-400'
  }
  return (
    <div className="flex gap-3 mt-4">
      {years.map(y => (
        <button
          key={y}
          onClick={() => setYear(y)}
          className={`pill bg-gradient-to-b ${colors[y]} text-black ${y===year?'ring-2 ring-cyan-300':''}`}
        >
          {y}
        </button>
      ))}
    </div>
  )
}
