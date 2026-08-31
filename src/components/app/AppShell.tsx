import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Calculator, Home, Target, Users, Menu as MenuIcon } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/target", label: "Target", icon: Target },
  { to: "/menu", label: "Menu", icon: MenuIcon },
];

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="brand-gradient sheen grid size-9 place-items-center rounded-xl text-primary-foreground shadow-raised">
        <span className="font-display text-sm font-bold">BS</span>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[15px] font-bold text-primary-deep">
            Business Standard
          </span>
          <span className="block text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
            Loan
          </span>
        </span>
      )}
    </span>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background shadow-raised">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/70 bg-surface/90 px-4 py-3 backdrop-blur-xl">
          <Link to="/">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/calculator"
              aria-label="EMI calculator"
              className="grid size-10 place-items-center rounded-xl border border-primary/25 bg-accent text-primary"
            >
              <Calculator className="size-[18px]" />
            </Link>
            <button
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-xl border border-border text-muted-foreground"
            >
              <Bell className="size-[18px]" />
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-destructive" />
            </button>
            <Link
              to="/login"
              aria-label="Account"
              className="grid size-10 place-items-center rounded-full brand-gradient text-xs font-bold text-primary-foreground"
            >
              SG
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-24">{children}</main>

        <nav className="fixed bottom-0 z-30 w-full max-w-md border-t border-border/70 bg-surface/95 px-3 pt-2 pb-3 backdrop-blur-xl">
          <ul className="grid grid-cols-4">
            {nav.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold transition-colors ${
                      active ? "bg-accent text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="brand-gradient sheen px-5 pt-6 pb-8 text-primary-foreground">
      <div className="flex items-start justify-between gap-3">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-80">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 max-w-[15rem] text-sm opacity-85">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}
