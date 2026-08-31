import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Fingerprint, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { BrandMark } from "@/components/app/AppShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Partner Login — Business Standard Loan" },
      { name: "description", content: "Secure OTP and password login for Business Standard Loan DSA partners and relationship managers." },
      { property: "og:title", content: "Partner Login — Business Standard Loan" },
      { property: "og:description", content: "Secure OTP and password login for loan partners." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"otp" | "password">("otp");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <div className="brand-gradient sheen px-6 pt-12 pb-16 text-primary-foreground">
          <BrandMark />
          <h1 className="mt-8 text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm opacity-85">
            Login to manage your leads, file logins, payouts and disbursements.
          </p>
        </div>

        <div className="-mt-10 flex-1 rounded-t-[2rem] bg-surface px-6 pt-6 pb-10 shadow-raised">
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1">
            {(["otp", "password"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-xl py-2.5 text-sm font-bold transition-colors ${
                  mode === m ? "bg-surface text-primary shadow-soft" : "text-muted-foreground"
                }`}
              >
                {m === "otp" ? "Mobile OTP" : "Password"}
              </button>
            ))}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (mode === "otp" && !sent) setSent(true);
            }}
          >
            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">
                {mode === "otp" ? "Mobile number" : "Partner ID / Email"}
              </span>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                <Smartphone className="size-[18px] text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder={mode === "otp" ? "98200 00000" : "BSL-DSA-4471"}
                />
              </div>
            </label>

            {mode === "password" ? (
              <label className="block">
                <span className="text-xs font-bold text-muted-foreground">Password</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                  <Lock className="size-[18px] text-muted-foreground" />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </label>
            ) : (
              sent && (
                <div>
                  <span className="text-xs font-bold text-muted-foreground">Enter 6-digit OTP</span>
                  <div className="mt-1.5 grid grid-cols-6 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        maxLength={1}
                        inputMode="numeric"
                        aria-label={`OTP digit ${i + 1}`}
                        className="h-12 rounded-xl border border-border bg-background text-center text-lg font-bold outline-none focus:border-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">Resend OTP in 00:28</p>
                </div>
              )
            )}

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl brand-gradient py-3.5 text-sm font-bold text-primary-foreground shadow-raised">
              {mode === "otp" && !sent ? "Send OTP" : "Login securely"}
              <ArrowRight className="size-4" />
            </button>
          </form>

          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3.5 text-sm font-bold text-primary">
            <Fingerprint className="size-4" /> Login with biometrics
          </button>

          <div className="mt-6 flex items-start gap-2 rounded-2xl bg-accent/60 p-3.5">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-[11px] text-primary-deep">
              256-bit encrypted. Your customer data and documents never leave the secured partner
              vault.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New partner?{" "}
            <Link to="/payment" className="font-bold text-primary">
              Register &amp; choose a plan
            </Link>
          </p>
          <p className="mt-4 text-center text-xs">
            <Link to="/" className="font-semibold text-muted-foreground underline">
              Continue to dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
