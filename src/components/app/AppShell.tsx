import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Calculator,
  Home,
  Target,
  Users,
  Menu as MenuIcon,
  FilePlus2,
  Activity,
} from "lucide-react";
import type { ReactNode } from "react";
import brandLogo from "@/assets/bsl-logo.png";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/target", label: "Target", icon: Target },
  { to: "/menu", label: "Menu", icon: MenuIcon },
];

const deskNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/apply", label: "Apply", icon: FilePlus2 },
  { to: "/process", label: "Process", icon: Activity },
  { to: "/target", label: "Target", icon: Target },
  { to: "/menu", label: "Menu", icon: MenuIcon },
];

export function BrandMark({
  compact = false,
  tone = "dark",
}: {
  compact?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span
        className={`grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl p-1 shadow-raised ${
          tone === "light" ? "bg-white/12 backdrop-blur-sm" : "bg-accent/70"
        }`}
      >
        <img
          src={brandLogo}
          alt="Business Standard Loan logo"
          width={1024}
          height={1024}
          loading="lazy"
          className="size-full object-contain"
        />
      </span>
      {!compact && (
        <span className="min-w-0 leading-none">
          <span
            className={`block truncate font-display text-[15px] font-bold ${
              tone === "light" ? "text-primary-foreground" : "text-primary-deep"
            }`}
          >
            Business Standard
          </span>
          <span
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase ${
              tone === "light" ? "text-gold-soft" : "text-gold"
            }`}
          >
            Loan
          </span>
        </span>
      )}
    </span>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background shadow-raised md:max-w-3xl lg:max-w-6xl lg:shadow-none">
        <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 bg-surface/90 px-4 py-3 backdrop-blur-xl md:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-8">
            <Link to="/" className="min-w-0">
              <BrandMark />
            </Link>
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {deskNav.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                        isActive(item.to)
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2">
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

        <main className="flex-1 pb-24 lg:pb-12">{children}</main>

        <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border/70 bg-surface/95 px-3 pt-2 pb-3 backdrop-blur-xl md:max-w-3xl lg:hidden">
          <ul className="grid grid-cols-4">
            {nav.map((item) => {
              const active = isActive(item.to);
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
    <div className="brand-gradient sheen px-5 pt-6 pb-8 text-primary-foreground md:px-6 md:pt-8 md:pb-10 lg:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-80">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-1 max-w-[15rem] text-sm opacity-85 sm:max-w-xl">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
    </div>
  );
}
