import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator — Business Standard Loan" },
      { name: "description", content: "Calculate monthly EMI, total interest and payable amount for personal, business, home and property loans." },
      { property: "og:title", content: "EMI Calculator — Business Standard Loan" },
      { property: "og:description", content: "Instant EMI, interest and eligibility calculation." },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(10.5);
  const [years, setYears] = useState(5);

  const { emi, interest, total } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi: Math.round(e), total: Math.round(e * n), interest: Math.round(e * n - amount) };
  }, [amount, rate, years]);

  const rows: { label: string; value: number; min: number; max: number; step: number; set: (v: number) => void; fmt: string }[] = [
    { label: "Loan amount", value: amount, min: 50000, max: 10000000, step: 50000, set: setAmount, fmt: inr(amount) },
    { label: "Interest rate", value: rate, min: 7, max: 24, step: 0.1, set: setRate, fmt: `${rate.toFixed(1)}%` },
    { label: "Tenure", value: years, min: 1, max: 30, step: 1, set: setYears, fmt: `${years} yrs` },
  ];

  return (
    <AppShell>
      <PageHeader eyebrow="Tools" title="EMI Calculator" subtitle="Quote instantly on the call." />

      <div className="relative z-10 -mt-5 space-y-4 px-4">
        <div className="card-soft brand-gradient sheen p-5 text-center text-primary-foreground">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80">Monthly EMI</p>
          <p className="mt-1 font-display text-4xl font-bold">{inr(emi)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-xl bg-primary-foreground/12 p-3">
              <p className="text-[11px] opacity-80">Total interest</p>
              <p className="text-sm font-bold">{inr(interest)}</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/12 p-3">
              <p className="text-[11px] opacity-80">Total payable</p>
              <p className="text-sm font-bold">{inr(total)}</p>
            </div>
          </div>
        </div>

        <div className="card-soft space-y-5 p-5">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">{r.label}</span>
                <span className="text-sm font-bold text-primary">{r.fmt}</span>
              </div>
              <input
                type="range"
                aria-label={r.label}
                min={r.min}
                max={r.max}
                step={r.step}
                value={r.value}
                onChange={(e) => r.set(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
            </div>
          ))}
        </div>

        <div className="card-soft p-4 text-xs text-muted-foreground">
          Indicative only. Final EMI depends on lender ROI, processing fee and insurance loading.
        </div>
      </div>
    </AppShell>
  );
}
