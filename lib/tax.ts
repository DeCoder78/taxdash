
import { Deduction, Income } from '../types'

const BRACKETS = [
  { upTo: 18200, rate: 0, base: 0 },
  { upTo: 45000, rate: 0.16, base: 0 },
  { upTo: 135000, rate: 0.30, base: 4288 },
  { upTo: 190000, rate: 0.37, base: 30488 },
  { upTo: Infinity, rate: 0.45, base: 50788 },
];

export function estimateIncomeTax(taxableIncome: number) {
  let payable = 0;
  let prev = 0;
  for (const b of BRACKETS) {
    const span = Math.min(taxableIncome, b.upTo) - prev;
    if (span > 0) payable += span * b.rate + (prev === 0 ? b.base : 0);
    prev = b.upTo;
    if (taxableIncome <= b.upTo) break;
  }
  return Math.max(0, Math.round(payable));
}

export function deriveTotals(income: Income[], deductions: Deduction[]) {
  const gross = income.reduce((s, r) => s + r.gross, 0);
  const withheld = income.reduce((s, r) => s + (r.taxWithheld || 0), 0);
  const deductionTotal = deductions.reduce((s, d) => s + d.amount, 0);
  const taxable = Math.max(0, gross - deductionTotal);
  const estTax = estimateIncomeTax(taxable);
  const estReturn = Math.max(0, withheld - estTax);
  return {
    totalBeforeTax: Math.round(gross),
    taxAlreadyWithheld: Math.round(withheld),
    estimatedTaxToPay: Math.max(0, estTax - withheld),
    estimatedReturnAfterDeductions: estReturn
  };
}
