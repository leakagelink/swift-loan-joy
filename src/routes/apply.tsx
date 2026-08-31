import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, FileUp } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "New Loan Application — Business Standard Loan" },
      { name: "description", content: "Seven-step guided loan application: personal, address, loan details, income, documents, references and review." },
      { property: "og:title", content: "New Loan Application — Business Standard Loan" },
      { property: "og:description", content: "Guided seven-step loan file submission for partners." },
    ],
  }),
  component: ApplyPage,
});

const steps = [
  { n: 1, label: "Personal", fields: 8 },
  { n: 2, label: "Address", fields: 6 },
  { n: 3, label: "Loan Details", fields: 5 },
  { n: 4, label: "Income", fields: 4 },
  { n: 5, label: "Documents", fields: 10 },
  { n: 6, label: "References", fields: 4 },
  { n: 7, label: "Review", fields: 2 },
];

const fieldsByStep: Record<number, { label: string; placeholder: string }[]> = {
  1: [
    { label: "First Name", placeholder: "Enter first name" },
    { label: "Middle Name", placeholder: "Enter middle name" },
    { label: "Last Name", placeholder: "Enter last name" },
    { label: "Date of Birth", placeholder: "DD / MM / YYYY" },
    { label: "Mobile Number", placeholder: "98200 00000" },
    { label: "Email", placeholder: "name@email.com" },
    { label: "PAN Number", placeholder: "ABCDE1234F" },
    { label: "Aadhaar Number", placeholder: "XXXX XXXX 1234" },
  ],
  2: [
    { label: "Address Line 1", placeholder: "Flat / building" },
    { label: "Address Line 2", placeholder: "Street / area" },
    { label: "City", placeholder: "Pune" },
    { label: "State", placeholder: "Maharashtra" },
    { label: "Pincode", placeholder: "411001" },
    { label: "Residence Type", placeholder: "Owned / Rented" },
  ],
  3: [
    { label: "Loan Product", placeholder: "Personal Loan" },
    { label: "Loan Amount", placeholder: "₹ 8,00,000" },
    { label: "Tenure (months)", placeholder: "60" },
    { label: "Preferred Lender", placeholder: "HDFC / ICICI / Bajaj" },
    { label: "Purpose", placeholder: "Debt consolidation" },
  ],
  4: [
    { label: "Employment Type", placeholder: "Salaried" },
    { label: "Company / Firm Name", placeholder: "Enter name" },
    { label: "Monthly Income", placeholder: "₹ 85,000" },
    { label: "Existing EMI", placeholder: "₹ 12,000" },
  ],
  6: [
    { label: "Reference 1 Name", placeholder: "Full name" },
    { label: "Reference 1 Mobile", placeholder: "98200 00000" },
    { label: "Reference 2 Name", placeholder: "Full name" },
    { label: "Reference 2 Mobile", placeholder: "98200 00000" },
  ],
};

const docs = [
  "PAN Card",
  "Aadhaar Card",
  "Latest 3 Salary Slips",
  "12 Month Bank Statement",
  "Form 16 / ITR",
  "Address Proof",
  "Passport Size Photo",
  "Cancelled Cheque",
  "GST Certificate",
  "Property Papers",
];

function ApplyPage() {
  const [active, setActive] = useState(1);
  const progress = Math.round(((active - 1) / steps.length) * 100);

  return (
    <AppShell>
      <PageHeader
        eyebrow="New file"
        title="Loan Application"
        subtitle="Complete all steps to submit the file for login."
      />

      <div className="-mt-5 space-y-4 px-4">
        <div className="card-soft p-4">
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-muted">
              <div
                className="h-full rounded-full brand-gradient transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {steps.map((s) => {
              const done = s.n < active;
              const current = s.n === active;
              return (
                <button
                  key={s.n}
                  onClick={() => setActive(s.n)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left ${
                    current
                      ? "border-primary bg-accent/60"
                      : done
                        ? "border-success/40 bg-success/10"
                        : "border-transparent bg-muted"
                  }`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                      current
                        ? "brand-gradient text-primary-foreground"
                        : done
                          ? "bg-success text-primary-foreground"
                          : "bg-surface text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="size-3" /> : s.n}
                  </span>
                  <span className="flex-1 truncate text-xs font-semibold">{s.label}</span>
                  <span className="rounded-full bg-surface px-1.5 text-[10px] font-bold text-muted-foreground">
                    {s.fields}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-soft space-y-4 p-4">
          <h2 className="text-base font-bold">
            {steps.find((s) => s.n === active)?.label} details
          </h2>

          {active === 5 ? (
            <div className="space-y-2.5">
              {docs.map((d) => (
                <div
                  key={d}
                  className="flex items-center justify-between rounded-xl border border-dashed border-border px-3.5 py-3"
                >
                  <span className="text-sm font-semibold">{d}</span>
                  <span className="flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 text-[11px] font-bold text-primary">
                    <FileUp className="size-3.5" /> Upload
                  </span>
                </div>
              ))}
            </div>
          ) : active === 7 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Review all captured information, then submit for lender login. You will be able to
                track the file in the Loan Process screen.
              </p>
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="mt-0.5 accent-[var(--primary)]" />
                Customer consent taken for bureau pull and lender sharing.
              </label>
              <button className="w-full rounded-2xl brand-gradient py-3.5 text-sm font-bold text-primary-foreground shadow-raised">
                Submit application
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {(fieldsByStep[active] ?? []).map((f) => (
                <label key={f.label} className="block">
                  <span className="text-xs font-bold text-muted-foreground">{f.label} *</span>
                  <input
                    placeholder={f.placeholder}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setActive((a) => Math.max(1, a - 1))}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border py-3 text-sm font-bold text-muted-foreground"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setActive((a) => Math.min(steps.length, a + 1))}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl brand-gradient py-3 text-sm font-bold text-primary-foreground"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
