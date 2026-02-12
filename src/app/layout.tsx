import type { Metadata } from "next";
import "./globals.css";

// 폰트는 기본 시스템 폰트를 사용하고, Tailwind의 전역 스타일에서 설정한다.
// App Router에서는 layout이 모든 페이지의 공통 레이아웃의 뿌리가 되므로
// 여기에서 배경색, 텍스트 색, 전역 레이아웃 컨테이너를 잡는다.

export const metadata: Metadata = {
  title: "Snowball Visualizer",
  description: "Compound interest snowball effect visualizer dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
