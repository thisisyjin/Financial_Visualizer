"use client";

import { useState } from "react";

interface InputFormProps {
  onSubmit: (data: {
    monthlyDeposit: number;
    annualRate: number;
    years: number;
  }) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("");
  const [years, setYears] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deposit = parseFloat(monthlyDeposit);
    const rate = parseFloat(annualRate);
    const investmentYears = parseFloat(years);

    if (
      isNaN(deposit) ||
      isNaN(rate) ||
      isNaN(investmentYears) ||
      deposit <= 0 ||
      rate < 0 ||
      investmentYears <= 0 ||
      investmentYears > 50
    ) {
      return;
    }

    onSubmit({
      monthlyDeposit: deposit,
      annualRate: rate,
      years: investmentYears,
    });
  };

  const formatNumber = (value: string): string => {
    const num = value.replace(/[^0-9.]/g, "");
    return num;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="monthlyDeposit"
          className="block text-sm font-medium text-slate-200 mb-2"
        >
          월 적립금 (원)
        </label>
        <input
          id="monthlyDeposit"
          type="text"
          inputMode="numeric"
          value={monthlyDeposit}
          onChange={(e) => setMonthlyDeposit(formatNumber(e.target.value))}
          placeholder="예: 100000"
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50 transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="annualRate"
          className="block text-sm font-medium text-slate-200 mb-2"
        >
          예상 연 수익률 (%)
        </label>
        <input
          id="annualRate"
          type="text"
          inputMode="decimal"
          value={annualRate}
          onChange={(e) => setAnnualRate(formatNumber(e.target.value))}
          placeholder="예: 7.5"
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50 transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="years"
          className="block text-sm font-medium text-slate-200 mb-2"
        >
          투자 기간 (년)
        </label>
        <input
          id="years"
          type="text"
          inputMode="numeric"
          value={years}
          onChange={(e) => setYears(formatNumber(e.target.value))}
          placeholder="예: 10"
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50 transition-colors"
        />
        <p className="mt-1.5 text-xs text-slate-500">
          최대 50년까지 입력 가능합니다.
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-50 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors"
      >
        계산하기
      </button>
    </form>
  );
}
