import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeIndianRupee,
  Building2,
  Car,
  Gift,
  Home as HomeIcon,
  Landmark,
  Search,
  Store,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Standard Loan — DSA Partner App" },
      {
        name: "description",
        content:
          "Manage leads, logins, payouts and the full loan journey for personal, business, home and property loans in one partner app.",
      },
      { property: "og:title", content: "Business Standard Loan — DSA Partner App" },
      {
        property: "og:description",
        content: "Leads, logins, payments, loan process tracking and payouts in one place.",
      },
    ],
  }),
  component: Home,
});

const quickProducts = [
  { icon: BadgeIndianRupee, label: "Personal", to: "/apply" },
  { icon: Building2, label: "Business", to: "/apply" },
  { icon: HomeIcon, label: "Home Loan", to: "/apply" },
  { icon: Store, label: "Self-Emp.", to: "/apply" },
  { icon: Landmark, label: "LAP", to: "/apply" },
  { icon: Car, label: "Auto", to: "/apply" },
];

const benefits = [
  { icon: Zap, title: "Instant Approval", desc: "Within 24 hours for verified leads", tag: "" },
  { icon: Gift, title: "Zero Processing Fee", desc: "Save up to ₹5,000 on processing", tag: "Popular" },
  { icon: TrendingUp, title: "Higher Payout Slabs", desc: "Up to 2.4% on disbursed files", tag: "" },
];

function Home() {
  return (
    <AppShell>
      <section className="brand-gradient sheen px-5 pt-6 pb-20 text-primary-foreground">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-80">
          Good afternoon 👋
        </p>
        <h1 className="mt-1 text-[26px] font-bold">Sanjay Gawai</h1>
        <p className="mt-1 text-sm opacity-85">Partner ID · BSL-DSA-4471 · Pune Region</p>

        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-surface p-1.5 pl-4 shadow-raised">
          <Search className="size-[18px] text-muted-foreground" />
          <input
            placeholder="Search application ID or customer"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button className="rounded-xl brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground">
            Go
          </button>
        </div>
      </section>

      <div className="relative z-10 -mt-14 space-y-5 px-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="card-soft p-4">
            <p className="text-xs font-semibold text-muted-foreground">Payout · This month</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">{inr(184500)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Lifetime {inr(2260000)}</p>
          </div>
          <div className="card-soft p-4">
            <p className="text-xs font-semibold text-muted-foreground">Incentive</p>
            <p className="mt-1 font-display text-2xl font-bold text-gold">{inr(32000)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">2 milestones unlocked</p>
          </div>
        </div>

        <div className="card-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">My Products</h2>
            <Link to="/apply" className="flex items-center gap-1 text-xs font-semibold text-primary">
              New file <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {quickProducts.map((p) => (
              <Link
                key={p.label}
                to={p.to}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-accent/40 px-2 py-3 text-center"
              >
                <p.icon className="size-6 text-primary" strokeWidth={1.7} />
                <span className="text-[11px] font-semibold text-foreground">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="card-soft p-4">
            <p className="text-xs font-semibold text-muted-foreground">File target</p>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-display text-xl font-bold">7 / 12</span>
              <span className="text-sm font-bold text-primary">58%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full w-[58%] rounded-full brand-gradient" />
            </div>
          </div>
          <div className="card-soft p-4">
            <p className="text-xs font-semibold text-muted-foreground">Disbursement</p>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-display text-xl font-bold">₹42L</span>
              <span className="text-sm font-bold text-gold">70%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full w-[70%] rounded-full gold-gradient" />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-bold">Limited Time Benefits</h2>
            <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-gold uppercase">
              Offers
            </span>
          </div>
          <div className="space-y-2.5">
            {benefits.map((b) => (
              <div key={b.title} className="card-soft flex items-center gap-3 p-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <b.icon className="size-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    {b.title}
                    {b.tag && (
                      <span className="rounded-md brand-gradient px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-primary-foreground uppercase">
                        {b.tag}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/payment"
          className="card-soft flex items-center justify-between gap-3 p-4 brand-gradient text-primary-foreground"
        >
          <div>
            <p className="text-sm font-bold">Login Payment Plans</p>
            <p className="text-xs opacity-85">Faster TAT, higher payout slabs</p>
          </div>
          <ArrowUpRight className="size-5" />
        </Link>
      </div>
    </AppShell>
  );
}
