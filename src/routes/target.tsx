import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, FileText, IndianRupee, Target as TargetIcon } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/target")({
  head: () => ({
    meta: [
      { title: "My Target — Business Standard Loan" },
      { name: "description", content: "Monthly file and disbursement targets, achievement percentage and payout milestones for loan partners." },
      { property: "og:title", content: "My Target — Business Standard Loan" },
      { property: "og:description", content: "Monthly file and disbursement targets with live achievement tracking." },
    ],
  }),
  component: TargetPage,
});

function Ring({ value }: { value: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 110 110" className="size-28">
      <circle cx="55" cy="55" r={r} fill="none" stroke="var(--muted)" strokeWidth="11" />
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`}
        transform="rotate(-90 55 55)"
      />
      <text x="55" y="61" textAnchor="middle" className="fill-foreground font-bold" fontSize="20">
        {value}%
      </text>
    </svg>
  );
}

function TargetPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Performance tracker" title="My Target" />

      <div className="relative z-10 -mt-5 space-y-4 px-4 md:px-6 lg:px-8">
        <div className="card-soft flex items-center justify-between px-4 py-3">
          <button className="grid size-9 place-items-center rounded-xl bg-muted text-muted-foreground">
            <ChevronLeft className="size-4" />
          </button>
          <p className="text-sm font-bold">August 2026</p>
          <button className="grid size-9 place-items-center rounded-xl bg-muted text-muted-foreground">
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="card-soft flex items-center gap-4 p-5">
          <div>
            <div className="flex items-center gap-2">
              <TargetIcon className="size-5 text-primary" />
              <h2 className="text-base font-bold">Overall Status</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Combined progress across file submissions and disbursement targets this month.
            </p>
            <span className="mt-3 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
              On track
            </span>
          </div>
          <Ring value={64} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="card-soft brand-gradient sheen p-4 text-primary-foreground">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="size-4" /> File Target
            </div>
            <p className="mt-3 font-display text-3xl font-bold">
              7 <span className="text-base opacity-70">/ 12</span>
            </p>
            <p className="text-xs opacity-85">Files submitted</p>
            <div className="mt-3 h-1.5 rounded-full bg-primary-foreground/25">
              <div className="h-full w-[58%] rounded-full bg-primary-foreground" />
            </div>
          </div>
          <div className="card-soft gold-gradient sheen p-4 text-gold-foreground">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <IndianRupee className="size-4" /> Disbursement
            </div>
            <p className="mt-3 font-display text-3xl font-bold">₹42L</p>
            <p className="text-xs opacity-85">of {inr(6000000)}</p>
            <div className="mt-3 h-1.5 rounded-full bg-gold-foreground/25">
              <div className="h-full w-[70%] rounded-full bg-gold-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {[
            { v: "7", l: "Files done", tone: "text-primary" },
            { v: "12", l: "Files target", tone: "text-foreground" },
            { v: "70%", l: "Disb. %", tone: "text-gold" },
          ].map((s) => (
            <div key={s.l} className="card-soft border-l-4 border-l-primary p-3">
              <p className={`font-display text-lg font-bold ${s.tone}`}>{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="card-soft space-y-3 p-4">
          <h3 className="text-sm font-bold">Payout milestones</h3>
          {[
            { label: "8 files disbursed", reward: "+₹10,000 bonus", done: false },
            { label: "₹50L disbursement", reward: "+0.15% slab", done: false },
            { label: "5 files disbursed", reward: "+₹5,000 bonus", done: true },
          ].map((m) => (
            <div key={m.label} className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold">{m.label}</p>
                <p className="text-[11px] text-muted-foreground">{m.reward}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  m.done ? "bg-success/15 text-success" : "bg-accent text-primary"
                }`}
              >
                {m.done ? "Unlocked" : "In progress"}
              </span>
            </div>
          ))}
        </div>

        <div className="card-soft bg-accent/60 p-4 text-sm font-semibold text-primary-deep">
          Let&apos;s push harder 💪 — 5 more files this month unlocks your next payout slab.
        </div>
      </div>
    </AppShell>
  );
}
