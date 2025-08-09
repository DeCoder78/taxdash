
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ ok: false, error: 'no file' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const uploadDir = path.join(process.cwd(), 'uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
  const dest = path.join(uploadDir, `${Date.now()}-${file.name}`)
  fs.writeFileSync(dest, buffer)

  return NextResponse.json({ ok: true, path: dest, summary: `Stored ${file.name}; parsing scheduled.` })
}
