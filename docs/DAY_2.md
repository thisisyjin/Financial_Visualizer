## Today I Learned - Day 2

### 1. 오늘 구현한 내용 요약

#### 1.1 입력 폼 컴포넌트 구현 (`InputForm.tsx`)
- **월 적립금, 예상 연 수익률, 투자 기간** 입력 필드 추가
- 숫자 입력 검증 및 포맷팅 로직 구현 (`formatNumber` 함수)
- 다크 모드에 맞춘 스타일링 적용 (slate 색상 계열)
- 폼 제출 시 유효성 검사 (0보다 큰 값, 투자 기간 최대 50년 제한)

#### 1.2 Zustand 상태 관리 및 복리 계산 로직 (`useFinancialStore.ts`)
- **Zustand 스토어**를 사용한 전역 상태 관리 구현
- **월 복리 계산 알고리즘** 구현:
  - 월 수익률 = 연 수익률 / 100 / 12
  - 매월 적립금 추가 후 복리 계산: `총액 = 총액 * (1 + 월수익률) + 월적립금`
  - 매년 말 스냅샷 데이터 생성 (원금, 이자, 총자산)
- 연도별 스냅샷 데이터 타입 정의 (`YearlySnapshot`)

#### 1.3 Recharts를 사용한 자산 시각화 차트 (`FinancialChart.tsx`)
- **LineChart** 컴포넌트로 연도별 자산 변화 시각화
- 3개 라인: 원금(파란색), 이자(초록색), 총자산(노란색)
- 투자 정보 요약 카드 (월 적립금, 연 수익률, 투자 기간)
- 최종 결과 요약 (총 적립금, 총 이자, 최종 자산)
- 숫자 포맷팅 (천 단위 콤마, 억/만 단위 표시)
- 다크 모드에 맞춘 차트 스타일링

### 2. 주요 코드 구조 및 역할

#### 2.1 Client Component vs Server Component
- **`page.tsx`**: `"use client"` 지시어 추가로 Client Component로 전환
  - 이유: Zustand 스토어와 폼 이벤트 핸들러 사용을 위해 필요
- **`InputForm.tsx`**: Client Component로 구현 (상태 관리 및 이벤트 처리)
- **`FinancialChart.tsx`**: Client Component로 구현 (Zustand 스토어 구독)

#### 2.2 Zustand 스토어 구조
```typescript
interface FinancialStore {
  data: FinancialData | null;        // 입력된 투자 데이터
  snapshots: YearlySnapshot[];        // 연도별 계산 결과
  setData: (data: FinancialData) => void;  // 데이터 설정
  calculate: () => void;              // 복리 계산 실행
  reset: () => void;                  // 초기화
}
```

#### 2.3 복리 계산 알고리즘
- **월 단위 계산**: 연 수익률을 월 수익률로 변환하여 정확도 향상
- **매월 순서**:
  1. 이전 달 총액에 월 수익률 적용 (복리)
  2. 새로운 월 적립금 추가
  3. 매년 말 (12개월마다) 스냅샷 저장

### 3. 새로 배운 개념

#### 3.1 Next.js App Router의 Client Component
- **`"use client"` 지시어**: 컴포넌트를 Client Component로 만듦
- Server Component는 기본값이며, 브라우저 API, 상태 관리, 이벤트 핸들러 사용 시 Client Component 필요
- Client Component는 번들 크기에 영향을 주므로 필요한 부분만 선택적으로 사용

#### 3.2 Zustand 상태 관리
- **간단한 API**: Redux보다 훨씬 간단한 상태 관리 라이브러리
- **`create` 함수**: 스토어 생성 및 타입 안정성 제공
- **구독 패턴**: 컴포넌트에서 `useFinancialStore()`로 스토어 구독
- **액션 함수**: 스토어 내부에 상태 변경 로직을 함께 정의

#### 3.3 Recharts 라이브러리
- **ResponsiveContainer**: 반응형 차트 컨테이너
- **LineChart**: 라인 차트 컴포넌트
- **커스터마이징**: `stroke`, `dot`, `activeDot` 등으로 스타일 조정
- **Tooltip**: 마우스 호버 시 데이터 표시
- **YAxis 포맷팅**: `tickFormatter`로 큰 숫자를 억/만 단위로 변환

#### 3.4 숫자 포맷팅
- **`Intl.NumberFormat`**: 브라우저 내장 API로 로케일별 숫자 포맷팅
- **천 단위 콤마**: `new Intl.NumberFormat("ko-KR").format(value)`
- **억/만 단위 변환**: 차트 Y축에서 가독성 향상을 위한 커스텀 포맷터

### 4. 개발 프로세스

#### 4.1 Feature Branch 전략
- 각 기능별로 `feature/*` 브랜치 생성
- 개발 완료 후 `dev` 브랜치로 머지
- `--no-ff` 옵션으로 머지 커밋 생성하여 히스토리 명확화

#### 4.2 커밋 메시지 컨벤션
- `feat:` 접두사로 기능 추가 표시
- 제목: 간단한 기능 설명
- 본문: 구현한 세부 사항을 불릿 포인트로 나열

### 5. 다음 단계 (향후 개선 사항)
- [ ] GitHub 링크 아이콘을 lucide-react로 교체
- [ ] 입력 폼 유효성 검사 메시지 표시
- [ ] 차트 애니메이션 효과 추가
- [ ] 반응형 디자인 개선 (모바일 최적화)
- [ ] 데이터 내보내기 기능 (CSV, 이미지)
