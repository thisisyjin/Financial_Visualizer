"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFinancialStore } from "@/store/useFinancialStore";

export default function FinancialChart() {
  const { snapshots, data } = useFinancialStore();

  if (snapshots.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-400">
          투자 정보를 입력하고 계산하기 버튼을 눌러주세요.
        </p>
      </div>
    );
  }

  // 차트 데이터 포맷팅
  const chartData = snapshots.map((snapshot) => ({
    year: `${snapshot.year}년`,
    원금: Math.round(snapshot.totalDeposit),
    이자: Math.round(snapshot.totalInterest),
    총자산: Math.round(snapshot.totalAmount),
  }));

  // 숫자 포맷팅 함수 (천 단위 콤마)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR").format(value);
  };

  return (
    <div className="space-y-4">
      {data && (
        <div className="grid grid-cols-3 gap-4 rounded-lg bg-slate-800/50 p-4">
          <div>
            <p className="text-xs text-slate-400">월 적립금</p>
            <p className="mt-1 text-sm font-semibold text-slate-50">
              {formatCurrency(data.monthlyDeposit)}원
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">연 수익률</p>
            <p className="mt-1 text-sm font-semibold text-slate-50">
              {data.annualRate}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">투자 기간</p>
            <p className="mt-1 text-sm font-semibold text-slate-50">
              {data.years}년
            </p>
          </div>
        </div>
      )}

      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => {
                if (value >= 100000000) {
                  return `${(value / 100000000).toFixed(1)}억`;
                } else if (value >= 10000) {
                  return `${(value / 10000).toFixed(0)}만`;
                }
                return value.toString();
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
              }}
              formatter={(value: number) => formatCurrency(value) + "원"}
              labelStyle={{ color: "#cbd5e1", fontWeight: 500 }}
              cursor={{ stroke: "#64748b", strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Legend
              wrapperStyle={{ color: "#cbd5e1", fontSize: "12px" }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="원금"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 3, fill: "#60a5fa" }}
              activeDot={{ r: 5 }}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="이자"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 3, fill: "#34d399" }}
              activeDot={{ r: 5 }}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="총자산"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ r: 4, fill: "#fbbf24" }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {snapshots.length > 0 && (
        <div className="rounded-lg bg-slate-800/30 p-4">
          <p className="mb-2 text-xs font-medium text-slate-300">
            최종 결과 ({snapshots[snapshots.length - 1].year})
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400">총 적립금</p>
              <p className="mt-1 font-semibold text-slate-50">
                {formatCurrency(
                  Math.round(snapshots[snapshots.length - 1].totalDeposit)
                )}
                원
              </p>
            </div>
            <div>
              <p className="text-slate-400">총 이자</p>
              <p className="mt-1 font-semibold text-green-400">
                {formatCurrency(
                  Math.round(snapshots[snapshots.length - 1].totalInterest)
                )}
                원
              </p>
            </div>
            <div>
              <p className="text-slate-400">최종 자산</p>
              <p className="mt-1 font-semibold text-yellow-400">
                {formatCurrency(
                  Math.round(snapshots[snapshots.length - 1].totalAmount)
                )}
                원
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
