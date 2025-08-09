
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  if (typeof message === 'string' && message.toLowerCase().includes('add') && message.toLowerCase().includes('deduction')) {
    return NextResponse.json({ reply: 'I would add a deduction here (stub). Soon this will call an action.' })
  }
  return NextResponse.json({ reply: 'Hello! Chatbot wiring is stubbed in this scaffold.' })
}
