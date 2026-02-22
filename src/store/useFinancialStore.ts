import { create } from "zustand";

export interface FinancialData {
  monthlyDeposit: number;
  annualRate: number;
  years: number;
}

export interface YearlySnapshot {
  year: number;
  totalDeposit: number;
  totalInterest: number;
  totalAmount: number;
}

interface FinancialStore {
  data: FinancialData | null;
  snapshots: YearlySnapshot[];
  setData: (data: FinancialData) => void;
  calculate: () => void;
  reset: () => void;
}

// 복리 계산 함수
function calculateCompoundInterest(
  monthlyDeposit: number,
  annualRate: number,
  years: number
): YearlySnapshot[] {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const snapshots: YearlySnapshot[] = [];

  let totalAmount = 0;
  let totalDeposit = 0;

  for (let month = 1; month <= totalMonths; month++) {
    totalDeposit += monthlyDeposit;
    totalAmount = totalAmount * (1 + monthlyRate) + monthlyDeposit;

    if (month % 12 === 0) {
      const year = month / 12;
      const totalInterest = totalAmount - totalDeposit;
      snapshots.push({
        year,
        totalDeposit,
        totalInterest,
        totalAmount,
      });
    }
  }

  return snapshots;
}

export const useFinancialStore = create<FinancialStore>((set) => ({
  data: null,
  snapshots: [],
  setData: (data) => {
    set({ data });
  },
  calculate: () => {
    const state = useFinancialStore.getState();
    if (!state.data) return;

    const snapshots = calculateCompoundInterest(
      state.data.monthlyDeposit,
      state.data.annualRate,
      state.data.years
    );

    set({ snapshots });
  },
  reset: () => {
    set({ data: null, snapshots: [] });
  },
}));
