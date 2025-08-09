
'use client'
import { useState } from 'react'

export default function Dropzone() {
  const [files, setFiles] = useState<File[]>([])

  function onFiles(newFiles: FileList | null) {
    if (!newFiles) return
    const accepted = Array.from(newFiles).filter(f =>
      /(\.pdf|\.png|\.jpg|\.jpeg)$/i.test(f.name)
    )
    if (accepted.length) {
      setFiles(prev => [...accepted, ...prev])
      accepted.forEach(async f => {
        const fd = new FormData()
        fd.append('file', f)
        await fetch('/api/ingest', { method: 'POST', body: fd })
      })
    }
  }

  return (
    <div className="card p-3">
      <label htmlFor="dz" className="block text-center text-sm cursor-pointer">
        <div className="border-2 border-dashed rounded-xl p-6 subtle hover:border-cyan-400">
          drag and drop files
          <div className="text-xs mt-1">(PDF, PNG, JPG)</div>
        </div>
        <input id="dz" type="file" accept=".pdf,.png,.jpg,.jpeg" multiple className="hidden" onChange={e=>onFiles(e.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 text-xs space-y-1 max-h-32 overflow-auto">
          {files.map((f, i)=>(
            <li key={i} className="flex justify-between">
              <span className="truncate">{f.name}</span>
              <span className="subtle">{(f.size/1024/1024).toFixed(2)} MB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
