
export type YearLabel = '2024-25'|'2023-24'|'2022-23'|'2021-22'|'2020-21';

export type Deduction = {
  id: string;
  date: string; // ISO
  category: string;
  amount: number;
  description?: string;
  year: YearLabel;
};

export type Income = {
  id: string;
  date: string;
  source: 'Main income' | 'Freelance work';
  gross: number;
  taxWithheld?: number;
  year: YearLabel;
};

export type DashboardTotals = {
  totalBeforeTax: number;
  taxAlreadyWithheld: number;
  estimatedTaxToPay: number;
  estimatedReturnAfterDeductions: number;
}
