import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/app/AuthLayout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Become a Partner — Business Standard Loan" },
      {
        name: "description",
        content:
          "Register as a Business Standard Loan DSA partner: submit your details, KYC and start logging loan files.",
      },
      { property: "og:title", content: "Become a Partner — Business Standard Loan" },
      {
        property: "og:description",
        content: "Register as a DSA partner and start logging loan files.",
      },
    ],
  }),
  component: SignupPage,
});

const fields = [
  { label: "Full name", placeholder: "Sanjay Gawai", type: "text", half: true },
  { label: "Mobile number", placeholder: "98200 00000", type: "tel", half: true },
  { label: "Email", placeholder: "sanjay@example.com", type: "email", half: true },
  { label: "City", placeholder: "Pune", type: "text", half: true },
  { label: "PAN number", placeholder: "ABCDE1234F", type: "text", half: true },
  { label: "Aadhaar number", placeholder: "XXXX XXXX 1234", type: "text", half: true },
  { label: "Create password", placeholder: "••••••••", type: "password", half: false },
];

const types = ["DSA Partner", "Connector", "Employee / RM"] as const;

function SignupPage() {
  const [type, setType] = useState<(typeof types)[number]>("DSA Partner");

  return (
    <AuthLayout
      title="Become a partner"
      subtitle="Register in 2 minutes, complete KYC and start logging loan files with 42+ lenders."
    >
      <div>
        <span className="text-xs font-bold text-muted-foreground">Partner type</span>
        <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-xl px-1 py-2.5 text-[11px] font-bold transition-colors sm:text-xs ${
                type === t ? "bg-surface text-primary shadow-soft" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {fields.map((f) => (
          <label key={f.label} className={f.half ? "block" : "block sm:col-span-2"}>
            <span className="text-xs font-bold text-muted-foreground">{f.label} *</span>
            <input
              type={f.type}
              placeholder={f.placeholder}
              className="mt-1.5 w-full min-w-0 rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
        ))}

        <label className="flex items-start gap-2 text-xs text-muted-foreground sm:col-span-2">
          <input type="checkbox" className="mt-0.5 accent-[var(--primary)]" />I agree to the partner
          agreement, payout terms and data privacy policy.
        </label>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl brand-gradient py-3.5 text-sm font-bold text-primary-foreground shadow-raised sm:col-span-2">
          Create account <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="mt-6 flex items-start gap-2 rounded-2xl bg-accent/60 p-3.5">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-[11px] text-primary-deep">
          Your KYC documents are verified by our onboarding desk within 24 working hours.
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already a partner?{" "}
        <Link to="/login" className="font-bold text-primary">
          Login instead
        </Link>
      </p>
    </AuthLayout>
  );
}
