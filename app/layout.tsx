
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Tax Dashboard',
  description: 'Internal dashboard for AU personal tax tracking',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-neutral-100">{children}</body>
    </html>
  )
}
