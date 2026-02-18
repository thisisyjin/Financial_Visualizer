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
  const [errors, setErrors] = useState<{
    monthlyDeposit?: string;
    annualRate?: string;
    years?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    const deposit = parseFloat(monthlyDeposit);
    if (!monthlyDeposit || isNaN(deposit) || deposit <= 0) {
      newErrors.monthlyDeposit = "월 적립금을 올바르게 입력해주세요.";
    }

    const rate = parseFloat(annualRate);
    if (!annualRate || isNaN(rate) || rate < 0) {
      newErrors.annualRate = "예상 연 수익률을 올바르게 입력해주세요.";
    }

    const investmentYears = parseFloat(years);
    if (!years || isNaN(investmentYears) || investmentYears <= 0) {
      newErrors.years = "투자 기간을 올바르게 입력해주세요.";
    } else if (investmentYears > 50) {
      newErrors.years = "투자 기간은 최대 50년까지 입력 가능합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const deposit = parseFloat(monthlyDeposit);
    const rate = parseFloat(annualRate);
    const investmentYears = parseFloat(years);

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
          onChange={(e) => {
            setMonthlyDeposit(formatNumber(e.target.value));
            if (errors.monthlyDeposit) {
              setErrors((prev) => ({ ...prev, monthlyDeposit: undefined }));
            }
          }}
          placeholder="예: 100000"
          className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-colors ${
            errors.monthlyDeposit
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
              : "border-slate-700 focus:border-slate-600 focus:ring-slate-600/50"
          }`}
        />
        {errors.monthlyDeposit && (
          <p className="mt-1.5 text-xs text-red-400">{errors.monthlyDeposit}</p>
        )}
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
          onChange={(e) => {
            setAnnualRate(formatNumber(e.target.value));
            if (errors.annualRate) {
              setErrors((prev) => ({ ...prev, annualRate: undefined }));
            }
          }}
          placeholder="예: 7.5"
          className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-colors ${
            errors.annualRate
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
              : "border-slate-700 focus:border-slate-600 focus:ring-slate-600/50"
          }`}
        />
        {errors.annualRate && (
          <p className="mt-1.5 text-xs text-red-400">{errors.annualRate}</p>
        )}
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
          onChange={(e) => {
            setYears(formatNumber(e.target.value));
            if (errors.years) {
              setErrors((prev) => ({ ...prev, years: undefined }));
            }
          }}
          placeholder="예: 10"
          className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-colors ${
            errors.years
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
              : "border-slate-700 focus:border-slate-600 focus:ring-slate-600/50"
          }`}
        />
        {errors.years ? (
          <p className="mt-1.5 text-xs text-red-400">{errors.years}</p>
        ) : (
          <p className="mt-1.5 text-xs text-slate-500">
            최대 50년까지 입력 가능합니다.
          </p>
        )}
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
