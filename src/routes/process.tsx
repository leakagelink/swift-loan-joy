import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, FileText, Loader } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { inr, stages } from "@/lib/mock-data";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Loan Process Tracker — Business Standard Loan" },
      { name: "description", content: "Live seven-stage loan journey tracking from lead capture and lender login to sanction, agreement and disbursement." },
      { property: "og:title", content: "Loan Process Tracker — Business Standard Loan" },
      { property: "og:description", content: "Track a loan file from login to disbursement, stage by stage." },
    ],
  }),
  component: ProcessPage,
});

const currentStage = 4;

function ProcessPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="File BSL-10238"
        title="Loan Process"
        subtitle="Imran Qureshi · Business Loan"
      />

      <div className="-mt-5 space-y-4 px-4">
        <div className="card-soft grid grid-cols-3 divide-x divide-border p-4 text-center">
          <div>
            <p className="text-[11px] text-muted-foreground">Amount</p>
            <p className="text-sm font-bold">{inr(2500000)}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Lender</p>
            <p className="text-sm font-bold">HDFC Bank</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">TAT left</p>
            <p className="text-sm font-bold text-gold">2 days</p>
          </div>
        </div>

        <div className="card-soft p-4">
          <h2 className="mb-4 text-base font-bold">Journey</h2>
          <ol className="relative space-y-5 pl-8">
            <span className="absolute top-2 bottom-2 left-[13px] w-0.5 bg-border" />
            {stages.map((s) => {
              const done = s.n < currentStage;
              const active = s.n === currentStage;
              return (
                <li key={s.n} className="relative">
                  <span
                    className={`absolute top-0.5 -left-8 grid size-7 place-items-center rounded-full text-[11px] font-bold ${
                      done
                        ? "bg-success text-primary-foreground"
                        : active
                          ? "brand-gradient text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <Check className="size-3.5" />
                    ) : active ? (
                      <Loader className="size-3.5 animate-spin" />
                    ) : (
                      s.n
                    )}
                  </span>
                  <p className={`text-sm font-bold ${active ? "text-primary" : ""}`}>{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                  {active && (
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-primary">
                      <Clock className="size-3" /> In progress
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="card-soft space-y-2.5 p-4">
          <h2 className="text-base font-bold">Documents on file</h2>
          {[
            { d: "PAN Card", s: "Verified" },
            { d: "GST Certificate", s: "Verified" },
            { d: "12 Month Bank Statement", s: "Under review" },
            { d: "ITR 2 Years", s: "Pending" },
          ].map((x) => (
            <div key={x.d} className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="size-4 text-primary" /> {x.d}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  x.s === "Verified"
                    ? "bg-success/15 text-success"
                    : x.s === "Pending"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-gold/15 text-gold"
                }`}
              >
                {x.s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
