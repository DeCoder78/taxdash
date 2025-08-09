
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { borderRadius: { 'xl2': '1.25rem' } } },
  plugins: [],
}
export default config
