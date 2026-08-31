import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building, Check, CreditCard, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { inr, loginPlans } from "@/lib/mock-data";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Login Payment Plans — Business Standard Loan" },
      { name: "description", content: "Choose a file login plan and pay via UPI, card, netbanking or wallet to unlock faster TAT and higher payout slabs." },
      { property: "og:title", content: "Login Payment Plans — Business Standard Loan" },
      { property: "og:description", content: "Pay file login fees via UPI, card, netbanking or wallet." },
    ],
  }),
  component: PaymentPage,
});

const methods = [
  { id: "upi", label: "UPI / QR", desc: "GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "card", label: "Debit / Credit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "netbanking", label: "Netbanking", desc: "58 banks supported", icon: Building },
  { id: "wallet", label: "Partner Wallet", desc: `Balance ${inr(2400)}`, icon: Wallet },
];

function PaymentPage() {
  const [plan, setPlan] = useState("growth");
  const [method, setMethod] = useState("upi");
  const selected = loginPlans.find((p) => p.id === plan)!;
  const gst = Math.round(selected.price * 0.18);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Membership"
        title="Login Payment"
        subtitle="Pick a plan, pay once, start logging files."
      />

      <div className="relative z-10 -mt-5 space-y-5 px-4">
        <div className="space-y-3">
          {loginPlans.map((p) => {
            const active = plan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? "border-primary bg-accent/50 shadow-raised"
                    : "border-border bg-surface shadow-soft"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[15px] font-bold">{p.name}</p>
                    <p className="text-[11px] font-semibold tracking-wide text-gold uppercase">
                      {p.tag}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-primary">{inr(p.price)}</p>
                    <p className="text-[11px] text-muted-foreground">{p.period}</p>
                  </div>
                </div>
                <ul className="mt-3 grid gap-1.5">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="size-3.5 text-primary" /> {perk}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div>
          <h2 className="mb-2 text-base font-bold">Payment method</h2>
          <div className="space-y-2.5">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`card-soft flex w-full items-center gap-3 p-3.5 text-left ${
                  method === m.id ? "border-primary" : ""
                }`}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
                  <m.icon className="size-5" strokeWidth={1.8} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                <span
                  className={`size-4 rounded-full border-2 ${
                    method === m.id ? "border-primary bg-primary" : "border-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="card-soft space-y-2 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{selected.name}</span>
            <span className="font-semibold">{inr(selected.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-semibold">{inr(gst)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
            <span>Total payable</span>
            <span className="text-primary">{inr(selected.price + gst)}</span>
          </div>
        </div>

        <button className="w-full rounded-2xl brand-gradient py-4 text-sm font-bold text-primary-foreground shadow-raised">
          Pay {inr(selected.price + gst)} securely
        </button>

        <p className="flex items-center justify-center gap-2 pb-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-primary" /> PCI-DSS compliant · Instant invoice on
          email
        </p>
      </div>
    </AppShell>
  );
}
