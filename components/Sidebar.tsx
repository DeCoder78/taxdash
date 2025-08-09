
'use client'
import Dropzone from './dropzone/Dropzone'

export default function Sidebar() {
  return (
    <div className="card p-4 flex flex-col gap-4 h-full">
      <div>
        <h3 className="font-semibold mb-2">Connections</h3>
        <button className="w-full card card-ghost p-4 text-left subtle hover:ring-2 hover:ring-cyan-300 transition rounded-xl">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 12h10M8 7l8 10" stroke="#7df9ff" strokeWidth="1.5" />
              <rect x="3" y="4" width="8" height="6" rx="2" stroke="#1f2a44" fill="transparent"/>
              <rect x="13" y="14" width="8" height="6" rx="2" stroke="#1f2a44" fill="transparent"/>
            </svg>
            <div>
              <div className="text-sm text-[var(--text)]">Connect a service</div>
              <div className="text-xs subtle">Click to initiate API/MCP hookup</div>
            </div>
          </div>
        </button>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold mb-2">Tax chatbot</h3>
        <div className="card-ghost rounded-xl p-3 text-sm subtle">Coming next: ask questions and apply changes.</div>
      </div>
      <Dropzone />
    </div>
  )
}
