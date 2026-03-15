import { useEffect, useMemo, useRef, useState } from "react";

const concernOptions = [
  {
    id: "spec",
    label: "스펙 수준이 적절한지 모르겠어요",
    previewTitle: "지금은 지원 가능성 판단이 중요해요",
    previewText:
      "현재 준비 수준을 기준으로 지원 가능성을 먼저 확인하는 전략이 필요합니다.",
    focus: "지원 가능성 판단",
    actionTitle: "입사 가능성 분석하기",
    actionDescription:
      "현재 준비 상태를 기준으로 지원 가능성을 먼저 점검해보세요.",
  },
  {
    id: "start",
    label: "어디서부터 시작해야 할지 모르겠어요",
    previewTitle: "지금은 시작 기준 정리가 중요해요",
    previewText:
      "현재 단계에 맞는 준비 순서를 먼저 정리하는 전략이 필요합니다.",
    focus: "준비 순서 정리",
    actionTitle: "취업 준비 가이드 보기",
    actionDescription:
      "지금 단계에서 무엇부터 시작해야 하는지 순서대로 확인해보세요.",
  },
  {
    id: "jobs",
    label: "지원할 공고를 찾기 어려워요",
    previewTitle: "지금은 공고 탐색 기준 정리가 중요해요",
    previewText:
      "조건에 맞는 공고를 빠르게 좁히는 기준이 필요합니다.",
    focus: "공고 탐색 기준 정리",
    actionTitle: "맞춤 채용 공고 확인하기",
    actionDescription:
      "조건에 맞는 공고를 더 빠르게 찾을 수 있도록 기준을 정리해보세요.",
  },
];

const userStatusOptions = [
  "졸업 예정 / 취업 준비 중",
  "커리어 방향 탐색 중",
  "재직 중, 이직 준비 중",
];

const prepStageOptions = [
  "아직 준비 시작 단계",
  "이력서 / 경력 정리 중",
  "지원 진행 중",
  "면접 준비 중",
];

const empathyCards = [
  {
    title: "어떤 공고에 지원해야 할지 모르겠어요",
    body: "비슷해 보이는 공고는 많지만, 나에게 맞는 기회를 고르는 건 어렵습니다.",
  },
  {
    title: "지원해도 될지 판단하기 어려워요",
    body: "스펙이 부족한지, 경험이 맞는지, 지원 가능성을 혼자 판단하기 어렵습니다.",
  },
  {
    title: "공고를 찾고 비교하는 데 시간이 너무 많이 들어요",
    body: "검색하고, 조건을 따지고, 가능성을 따져보는 과정이 반복되면서 쉽게 지치게 됩니다.",
  },
];

const problemBlocks = [
  {
    title: "공고 선택의 어려움",
    detail: "내 경험과 목표에 맞는 공고를 추리기 위한 기준이 먼저 필요합니다.",
  },
  {
    title: "지원 가능성 판단의 어려움",
    detail: "내 현재 수준으로 어디까지 지원해볼 수 있는지 가늠할 기준이 부족합니다.",
  },
  {
    title: "준비 우선순위 설정의 어려움",
    detail: "이력서, 포트폴리오, 면접 준비 중 무엇부터 해야 할지 막막해집니다.",
  },
];

const analysisStatuses = [
  "현재 상태 분석 중",
  "준비 단계 정리 중",
  "우선 행동 추천 중",
];

function useInView(options = { threshold: 0.2, once: true }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once !== false) observer.disconnect();
        } else if (options.once === false) {
          setIsInView(false);
        }
      },
      { threshold: options.threshold ?? 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.once, options.threshold]);

  return [ref, isInView];
}

function SectionBlock({ title, description, children, center = false }) {
  return (
    <section className="relative">
      <div className={`space-y-5 ${center ? "text-center" : ""}`}>
        <div className={`space-y-3 ${center ? "text-center" : ""}`}>
          <h2 className="text-[29px] font-bold leading-[1.18] tracking-[-0.04em] text-slate-950">
            {title}
          </h2>
          <p className="text-[15px] leading-7 text-slate-600">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function IntroEmpathyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % empathyCards.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      <div className="relative min-h-[210px] overflow-hidden rounded-[30px] border border-pink-100 bg-white/96 p-5 shadow-soft">
        {empathyCards.map((card, index) => {
          const active = index === activeIndex;
          return (
            <div
              key={card.title}
              className={`absolute inset-0 flex flex-col justify-center p-5 transition-all duration-700 ${
                active
                  ? "translate-y-0 opacity-100"
                  : index < activeIndex
                    ? "-translate-y-6 opacity-0"
                    : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mb-4 h-11 w-11 rounded-[18px] bg-pink-50" />
              <h3 className="text-[24px] font-semibold leading-9 tracking-[-0.04em] text-slate-950">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.body}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        {empathyCards.map((card, index) => (
          <span
            key={card.title}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === activeIndex ? "w-8 bg-pink-500" : "w-2 bg-pink-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileLandingHero({ onPrimaryClick }) {
  return (
    <section className="relative px-5 pt-5">
      <div className="relative overflow-hidden rounded-[36px] border border-white/90 bg-white/95 p-5 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(255,61,151,0.18),_transparent_72%)]" />
        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700 ring-1 ring-pink-100">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              취팡
            </div>
            <div className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-400">
              AI 전략 프리뷰
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-pink-600">
                막막함을 줄이고, 판단 기준을 먼저 세우는 취업 준비
              </p>
              <h1 className="text-[36px] font-bold leading-[1.05] tracking-[-0.05em] text-slate-950">
                취업에도
                <br />
                전략이 필요해요
              </h1>
              <p className="text-[15px] leading-7 text-slate-600">
                취팡 AI가 당신의 상황을 분석해 지금 필요한 취업 전략을 제안합니다.
              </p>
              <p className="text-[15px] leading-7 text-slate-500">
                막막하게 공고를 찾고, 지원 가능성을 고민하고, 어디서부터 준비해야 할지 헤매는 시간을 줄여보세요.
              </p>
            </div>

            <div className="rounded-[28px] border border-pink-100 bg-[linear-gradient(135deg,rgba(255,240,247,0.92),rgba(255,255,255,0.98))] p-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>스크롤하면서 바로 체험하는 전략 흐름</span>
                <span className="inline-flex items-center gap-2 font-medium text-pink-600">
                  <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                  인터랙션 연결됨
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {["고민", "상태", "전략"].map((item, index) => (
                  <div key={item} className="flex flex-1 items-center gap-2">
                    <div
                      className={`flex h-11 flex-1 items-center justify-center rounded-2xl text-xs font-semibold ${
                        index === 1
                          ? "bg-pink-500 text-white shadow-lg shadow-pink-100"
                          : "bg-white text-slate-500 ring-1 ring-slate-100"
                      }`}
                    >
                      {item}
                    </div>
                    {index < 2 ? <div className="h-px flex-1 bg-pink-200" /> : null}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onPrimaryClick}
              className="flex w-full items-center justify-center rounded-2xl bg-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition active:scale-[0.98]"
            >
              내 취업 전략 확인하기
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              아래로 이어지는 흐름 속에서 내 상황이 바로 반영됩니다
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionProblemBlock({ title, detail, open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[26px] border border-white/80 bg-white/92 p-5 text-left shadow-soft transition active:scale-[0.99]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[15px] font-semibold text-slate-900">{title}</span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
            open ? "rotate-45 bg-pink-500 text-white" : "bg-pink-50 text-pink-500"
          }`}
        >
          +
        </span>
      </div>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="text-sm leading-6 text-slate-600">{detail}</p>
        </div>
      </div>
    </button>
  );
}

function ConcernSelector({ selectedConcern, onSelect, onNext }) {
  const selectedOption = concernOptions.find((option) => option.id === selectedConcern);

  return (
    <div className="space-y-4">
      {concernOptions.map((option, index) => {
        const active = option.id === selectedConcern;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`w-full rounded-[28px] border p-5 text-left transition-all duration-300 active:scale-[0.99] ${
              active
                ? "border-pink-300 bg-[linear-gradient(135deg,rgba(255,240,247,0.96),rgba(255,255,255,0.98))] shadow-float"
                : "border-white/80 bg-white/92 shadow-soft"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition ${
                  active
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "border-slate-200 text-slate-300"
                }`}
              >
                {active ? "✓" : index + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-[15px] font-semibold leading-6 text-slate-950">{option.label}</h3>
                <p className="text-xs leading-5 text-slate-500">
                  선택한 고민이 아래 전략 미리 보기와 추천 행동에 연결됩니다.
                </p>
              </div>
            </div>
          </button>
        );
      })}

      <div className={`grid transition-all duration-300 ${selectedOption ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {selectedOption ? (
            <div className="rounded-[30px] border border-pink-200 bg-[linear-gradient(180deg,rgba(255,245,250,1),rgba(255,255,255,0.98))] p-5 shadow-float">
              <div className="flex items-center gap-2 text-xs font-semibold text-pink-600">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                지금 선택한 고민에 맞춘 전략 흐름
              </div>
              <h3 className="mt-3 text-[22px] font-semibold leading-8 tracking-[-0.03em] text-slate-950">
                {selectedOption.previewTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{selectedOption.previewText}</p>
              <button
                type="button"
                onClick={onNext}
                className="mt-4 inline-flex items-center justify-center rounded-2xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition active:scale-[0.98]"
              >
                다음으로 내 상황 선택하기
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PersonalizationQuestion({ title, options, value, onChange }) {
  return (
    <div className="space-y-3 rounded-[28px] border border-white/80 bg-white/92 p-5 shadow-soft">
      <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full px-4 py-3 text-sm transition ${
                active
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-100"
                  : "bg-slate-50 text-slate-600 ring-1 ring-slate-100 active:bg-pink-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LiveSummaryPanel({ concernLabel, selectedUserStatus, selectedPrepStage }) {
  const rows = [
    { label: "선택한 고민", value: concernLabel || "선택 전" },
    { label: "현재 상황", value: selectedUserStatus || "선택 전" },
    { label: "준비 상태", value: selectedPrepStage || "선택 전" },
  ];

  return (
    <div className="overflow-hidden rounded-[30px] border border-pink-100 bg-[linear-gradient(180deg,rgba(255,242,248,0.95),rgba(255,255,255,0.98))] p-5 shadow-float">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[21px] font-semibold tracking-[-0.03em] text-slate-950">
            지금까지 입력한 정보가 이렇게 쌓이고 있어요
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            이 정보를 바탕으로 AI가 지금 필요한 전략과 첫 행동을 정리합니다.
          </p>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-pink-600 ring-1 ring-pink-100">
          실시간 반영
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="rounded-[22px] bg-white/90 px-4 py-3 ring-1 ring-pink-50">
            <p className="text-[11px] text-slate-400">{row.label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisPreview({
  triggered,
  onActionClick,
  selectedConcern,
  selectedUserStatus,
  selectedPrepStage,
  resetSignal,
}) {
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisDone, setAnalysisDone] = useState(false);

  useEffect(() => {
    setAnalysisStep(0);
    setAnalysisDone(false);
  }, [resetSignal]);

  useEffect(() => {
    if (!triggered) return undefined;

    setAnalysisStep(0);
    setAnalysisDone(false);

    const timers = [
      setTimeout(() => setAnalysisStep(1), 800),
      setTimeout(() => setAnalysisStep(2), 1600),
      setTimeout(() => {
        setAnalysisStep(3);
        setAnalysisDone(true);
      }, 2400),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [triggered, resetSignal]);

  const concern = concernOptions.find((option) => option.id === selectedConcern);
  const progress = analysisDone ? 100 : analysisStep * 30 + 12;

  return (
    <div className="space-y-4">
      <div className="rounded-[30px] border border-white/80 bg-white/92 p-5 shadow-soft">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>AI 분석 진행</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-pink-50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-300 via-pink-500 to-fuchsia-500 transition-all duration-700"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="mt-4 space-y-2">
          {analysisStatuses.map((status, index) => {
            const active = analysisStep >= index + 1 || (index === 0 && triggered);
            return (
              <div
                key={status}
                className={`flex items-center gap-3 rounded-[20px] px-3 py-3 text-sm transition ${
                  active ? "bg-pink-50 text-pink-700" : "bg-slate-50 text-slate-400"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-pink-500" : "bg-slate-300"}`} />
                {status}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[30px] border border-pink-200 bg-[linear-gradient(180deg,rgba(255,245,250,1),rgba(255,255,255,0.98))] p-5 shadow-float">
        {analysisDone ? (
          <>
            <p className="text-sm font-semibold text-pink-600">AI가 정리한 현재 전략</p>
            <h3 className="mt-2 text-[25px] font-semibold leading-9 tracking-[-0.04em] text-slate-950">
              지금은 {concern?.focus || "취업 전략 정리"}부터 먼저 잡는 것이 좋아요
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {selectedUserStatus && selectedPrepStage
                ? `현재 ${selectedUserStatus} 상태에서 ${selectedPrepStage} 단계라면, 먼저 확인해야 할 포인트를 정리해두는 것이 좋습니다.`
                : "선택한 정보가 아직 일부만 입력되어 있어서, 우선은 기본 전략 방향을 중심으로 보여드리고 있어요."}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {concern
                ? "지금의 고민에 맞는 우선 전략부터 가볍게 시작해보세요."
                : "고민과 현재 상태를 더 입력하면 훨씬 구체적인 흐름으로 확장됩니다."}
            </p>
            <button
              type="button"
              onClick={onActionClick}
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition active:scale-[0.98]"
            >
              추천 행동 보기
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-pink-600">입력한 상황을 읽고 있어요</p>
            <h3 className="mt-2 text-[24px] font-semibold leading-9 tracking-[-0.04em] text-slate-950">
              지금 필요한 전략을 조용히 정리하는 중입니다
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              스크롤 흐름 안에서 바로 분석이 이어지고, 마지막에는 첫 행동 추천까지 연결됩니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function PersonalizedActionCard({
  selectedConcern,
  selectedUserStatus,
  selectedPrepStage,
  onPrimaryClick,
}) {
  const concern = concernOptions.find((option) => option.id === selectedConcern) || concernOptions[1];

  return (
    <div className="rounded-[32px] border border-pink-200 bg-[linear-gradient(145deg,rgba(255,244,249,0.98),rgba(255,255,255,0.98))] p-5 shadow-float">
      <p className="text-sm font-semibold text-pink-600">지금 바로 시작할 첫 행동</p>
      <h3 className="mt-2 text-[28px] font-semibold leading-10 tracking-[-0.04em] text-slate-950">
        {concern.actionTitle}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{concern.actionDescription}</p>
      <div className="mt-5 rounded-[24px] bg-white/95 p-4 ring-1 ring-pink-100">
        <p className="text-[11px] text-slate-400">개인화 요약</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {selectedUserStatus && selectedPrepStage
            ? `현재는 ${selectedUserStatus} 상태이며, ${selectedPrepStage} 단계에 맞는 우선 행동이 중요합니다.`
            : "현재 상황이 모두 선택되면 지금보다 더 세밀한 추천으로 연결됩니다."}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          지금의 고민에 맞춰 바로 실행 가능한 첫 단계부터 시작해보세요.
        </p>
      </div>
      <button
        type="button"
        onClick={onPrimaryClick}
        className="mt-5 flex w-full items-center justify-center rounded-2xl bg-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition active:scale-[0.98]"
      >
        {concern.actionTitle}
      </button>
    </div>
  );
}

function StickyMobileCTA({ visible, label, onClick }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="rounded-[28px] border border-white/80 bg-white/92 p-3 shadow-soft backdrop-blur">
          <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-center rounded-[20px] bg-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition active:scale-[0.99]"
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomSheetModal({ open, onClose, onRestart }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 w-full" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-md px-4 pb-4">
        <div className="animate-sheet-up rounded-[34px] border border-white/80 bg-white p-6 shadow-soft">
          <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-pink-100" />
          <p className="text-sm font-semibold text-pink-600">다음 연결 화면</p>
          <h3 className="mt-2 text-[28px] font-semibold leading-10 tracking-[-0.04em] text-slate-950">
            실제 서비스에서는 여기서 상세 전략 화면으로 연결됩니다
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            현재 랜딩 페이지는 온보딩 직전의 경험을 미리 보여주는 형태입니다. 이후 화면에서는 맞춤 전략, 준비 우선순위, 추천 공고 흐름으로 자연스럽게 이어질 수 있습니다.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-100 px-4 py-4 text-sm font-semibold text-slate-700"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="rounded-2xl bg-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-100"
            >
              처음부터 다시 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const concernSectionRef = useRef(null);
  const personalizationSectionRef = useRef(null);
  const analysisSectionRef = useRef(null);
  const actionSectionRef = useRef(null);

  const [selectedConcern, setSelectedConcern] = useState("");
  const [selectedUserStatus, setSelectedUserStatus] = useState("");
  const [selectedPrepStage, setSelectedPrepStage] = useState("");
  const [openProblem, setOpenProblem] = useState(-1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [analysisRequested, setAnalysisRequested] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  const [analysisViewportRef, analysisInView] = useInView({ threshold: 0.35, once: false });

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 320);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (analysisInView) setAnalysisRequested(true);
  }, [analysisInView]);

  const selectedConcernData = useMemo(
    () => concernOptions.find((option) => option.id === selectedConcern),
    [selectedConcern],
  );

  const allSelected = Boolean(selectedConcern && selectedUserStatus && selectedPrepStage);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReset = () => {
    setSelectedConcern("");
    setSelectedUserStatus("");
    setSelectedPrepStage("");
    setAnalysisRequested(false);
    setSheetOpen(false);
    setResetSignal((value) => value + 1);
    setTimeout(() => scrollToRef(concernSectionRef), 80);
  };

  const stickyLabel = allSelected
    ? "맞춤 전략 확인하기"
    : selectedConcern
      ? "내 상황 입력 이어서 하기"
      : "내 취업 전략 확인하기";

  const handleStickyClick = () => {
    if (!selectedConcern) {
      scrollToRef(concernSectionRef);
      return;
    }

    if (!allSelected) {
      scrollToRef(personalizationSectionRef);
      return;
    }

    setAnalysisRequested(true);
    scrollToRef(analysisSectionRef);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-950">
      <div className="mx-auto max-w-md pb-28">
        <MobileLandingHero onPrimaryClick={() => scrollToRef(concernSectionRef)} />

        <main className="relative px-5 pb-12 pt-8">
          <div className="pointer-events-none absolute left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-pink-100 via-pink-200/70 to-transparent" />

          <div className="relative space-y-16">
            <SectionBlock
              title="이런 고민, 한 번쯤 해보셨을 거예요"
              description="지치기 쉬운 취업 준비 과정에서 가장 먼저 필요한 건, 내 상황을 이해받고 있다는 감각입니다."
            >
              <IntroEmpathyCarousel />
            </SectionBlock>

            <SectionBlock
              title="문제는 의지가 아니라, 판단 기준이 없다는 점입니다"
              description="취업 준비가 힘든 이유는 게을러서가 아니라, 수많은 선택지 속에서 무엇을 먼저 봐야 하는지 알기 어렵기 때문입니다."
            >
              <div className="space-y-3">
                {problemBlocks.map((block, index) => (
                  <AccordionProblemBlock
                    key={block.title}
                    title={block.title}
                    detail={block.detail}
                    open={openProblem === index}
                    onClick={() => setOpenProblem((current) => (current === index ? -1 : index))}
                  />
                ))}
              </div>
            </SectionBlock>

            <SectionBlock
              title="지금 가장 필요한 도움은 무엇인가요?"
              description="현재 고민을 선택하면, 바로 아래에서 전략 예시가 자연스럽게 이어집니다."
            >
              <div ref={concernSectionRef} className="scroll-mt-24">
                <ConcernSelector
                  selectedConcern={selectedConcern}
                  onSelect={setSelectedConcern}
                  onNext={() => scrollToRef(personalizationSectionRef)}
                />
              </div>
            </SectionBlock>

            <SectionBlock
              title="복잡한 입력 없이, 지금 상태만 알려주세요"
              description="몇 가지 선택만으로 현재 상황에 맞는 전략 방향을 정리할 수 있어요."
            >
              <div ref={personalizationSectionRef} className="space-y-4 scroll-mt-24">
                <PersonalizationQuestion
                  title="현재 어떤 상황인가요?"
                  options={userStatusOptions}
                  value={selectedUserStatus}
                  onChange={setSelectedUserStatus}
                />
                <PersonalizationQuestion
                  title="현재 준비 상태는 어느 정도인가요?"
                  options={prepStageOptions}
                  value={selectedPrepStage}
                  onChange={setSelectedPrepStage}
                />
                <LiveSummaryPanel
                  concernLabel={selectedConcernData?.label}
                  selectedUserStatus={selectedUserStatus}
                  selectedPrepStage={selectedPrepStage}
                />
                <button
                  type="button"
                  onClick={() => {
                    setAnalysisRequested(true);
                    scrollToRef(analysisSectionRef);
                  }}
                  className="flex w-full items-center justify-center rounded-[22px] bg-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition active:scale-[0.99]"
                >
                  AI 전략 미리 보기
                </button>
              </div>
            </SectionBlock>

            <SectionBlock
              title="AI가 지금 필요한 전략을 정리하고 있어요"
              description="선택한 고민과 현재 상태를 바탕으로 준비 방향과 첫 행동을 분석합니다."
            >
              <div ref={analysisSectionRef} className="scroll-mt-24">
                <div ref={analysisViewportRef}>
                  <AnalysisPreview
                    triggered={analysisRequested || analysisInView}
                    onActionClick={() => scrollToRef(actionSectionRef)}
                    selectedConcern={selectedConcern}
                    selectedUserStatus={selectedUserStatus}
                    selectedPrepStage={selectedPrepStage}
                    resetSignal={resetSignal}
                  />
                </div>
              </div>
            </SectionBlock>

            <SectionBlock
              title="지금 바로 시작할 수 있는 첫 행동을 제안해요"
              description="전략은 읽고 끝나는 것이 아니라, 바로 실행 가능한 한 걸음으로 이어져야 합니다."
            >
              <div ref={actionSectionRef} className="scroll-mt-24">
                <PersonalizedActionCard
                  selectedConcern={selectedConcern}
                  selectedUserStatus={selectedUserStatus}
                  selectedPrepStage={selectedPrepStage}
                  onPrimaryClick={() => setSheetOpen(true)}
                />
              </div>
            </SectionBlock>

            <section className="rounded-[34px] border border-pink-100 bg-[linear-gradient(180deg,rgba(255,246,250,1),rgba(255,255,255,1))] p-6 text-center shadow-float">
              <h2 className="text-[32px] font-bold leading-[1.18] tracking-[-0.05em] text-slate-950">
                막막한 취업 준비,
                <br />
                이제 전략적으로 시작해보세요
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                몇 가지 선택만으로 지금 내 상황에 맞는 취업 전략과 첫 행동을 바로 확인할 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (allSelected) {
                    setSheetOpen(true);
                  } else {
                    scrollToRef(concernSectionRef);
                  }
                }}
                className="mt-5 flex w-full items-center justify-center rounded-[22px] bg-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition active:scale-[0.99]"
              >
                내 취업 전략 확인하기
              </button>
              <p className="mt-3 text-xs text-slate-400">지금 바로 1분 안에 시작할 수 있어요</p>
            </section>
          </div>
        </main>
      </div>

      <StickyMobileCTA visible={showSticky} label={stickyLabel} onClick={handleStickyClick} />
      <BottomSheetModal
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onRestart={handleReset}
      />
    </div>
  );
}
