"use client";

import InputForm from "@/components/InputForm";
import FinancialChart from "@/components/FinancialChart";
import { useFinancialStore } from "@/store/useFinancialStore";
import { Github } from "lucide-react";

export default function Home() {
  const { setData, calculate } = useFinancialStore();

  const handleFormSubmit = (data: {
    monthlyDeposit: number;
    annualRate: number;
    years: number;
  }) => {
    setData(data);
    calculate();
  };

  return (
    // 이 컴포넌트는 페이지 단위 레이아웃을 담당한다.
    // 헤더 - 메인 콘텐츠 - 푸터 구조를 만들고,
    // 메인 내부의 그리드 영역에 이후 입력 폼과 차트 컴포넌트를 배치할 예정이다.
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-lg font-semibold tracking-tight">
            <span className="text-slate-50">Snowball</span>
            <span className="text-slate-400"> Effect</span>
          </div>
          <a
            href="https://github.com/thisisyjin/Financial_Visualizer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:border-slate-500 hover:bg-slate-900 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="mb-10">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Snowball Visualizer
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              매월 적립금과 예상 수익률을 입력하면, 복리로 자산이 어떻게 증가하는지 시각적으로 확인할 수 있는 대시보드입니다.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
            {/* 입력 폼 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-medium text-slate-200 sm:text-base">
                투자 정보 입력
              </h2>
              <InputForm onSubmit={handleFormSubmit} />
            </div>

            {/* 차트 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-medium text-slate-200 sm:text-base">
                자산 시각화
              </h2>
              <FinancialChart />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 text-xs text-slate-500 sm:h-14 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Snowball Visualizer</span>
          <span className="hidden sm:inline">
            Built with Next.js, Tailwind CSS, Zustand, Recharts
          </span>
        </div>
      </footer>
    </div>
  );
}
