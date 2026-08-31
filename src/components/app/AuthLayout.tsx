import type { ReactNode } from "react";
import { BadgeCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { BrandMark } from "@/components/app/AppShell";

const highlights = [
  { icon: TrendingUp, title: "Payout up to 2.4%", desc: "On every disbursed file" },
  { icon: BadgeCheck, title: "42+ lender panel", desc: "Personal, business, home & LAP" },
  { icon: ShieldCheck, title: "Secured vault", desc: "256-bit encrypted document storage" },
];

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[1.1fr_minmax(0,520px)]">
      {/* Brand panel */}
      <div className="brand-gradient sheen px-6 pt-10 pb-16 text-primary-foreground sm:px-10 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:px-14 lg:pb-10">
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg">
          <BrandMark tone="light" />
          <h1 className="mt-8 text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-2 max-w-md text-sm opacity-85 sm:text-base">{subtitle}</p>

          <ul className="mt-8 hidden gap-3 lg:grid">
            {highlights.map((h) => (
              <li key={h.title} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                <h.icon className="mt-0.5 size-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold">{h.title}</span>
                  <span className="block text-xs opacity-80">{h.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form panel */}
      <div className="-mt-10 rounded-t-[2rem] bg-surface px-5 pt-6 pb-12 shadow-raised sm:px-8 lg:mt-0 lg:flex lg:min-h-screen lg:items-center lg:rounded-none lg:px-12 lg:shadow-none">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
