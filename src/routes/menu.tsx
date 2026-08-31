import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgePercent,
  Building2,
  Calculator,
  ChevronRight,
  CreditCard,
  FileText,
  HeadphonesIcon,
  Landmark,
  LogOut,
  ScrollText,
  Share2,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Partner Tools — Business Standard Loan" },
      { name: "description", content: "Payouts, lender panel, commission slabs, KYC, support, policies and every other partner tool in one menu." },
      { property: "og:title", content: "Menu & Partner Tools — Business Standard Loan" },
      { property: "og:description", content: "Payouts, lenders, commission slabs, KYC, support and policies." },
    ],
  }),
  component: MenuPage,
});

type Item = { label: string; desc: string; icon: typeof Wallet; to?: string; badge?: string };

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Business",
    items: [
      { label: "Leads", desc: "Full pipeline & funnel", icon: Users, to: "/leads" },
      { label: "Loan Process", desc: "Track a file stage-wise", icon: FileText, to: "/process" },
      { label: "New Application", desc: "Start a fresh loan file", icon: ScrollText, to: "/apply" },
      { label: "EMI Calculator", desc: "Quote EMI instantly", icon: Calculator, to: "/calculator" },
    ],
  },
  {
    title: "Money",
    items: [
      { label: "Payouts & Statements", desc: "Monthly settlement reports", icon: Wallet, badge: "₹1.84L" },
      { label: "Commission Slabs", desc: "Product-wise payout grid", icon: BadgePercent },
      { label: "Login Payment Plans", desc: "Upgrade for faster TAT", icon: CreditCard, to: "/payment" },
    ],
  },
  {
    title: "Network",
    items: [
      { label: "Lender Panel", desc: "42 banks & NBFCs onboarded", icon: Landmark },
      { label: "Branch Locator", desc: "Nearest processing hub", icon: Building2 },
      { label: "Refer a Partner", desc: "Earn ₹2,000 per activation", icon: Share2 },
    ],
  },
  {
    title: "Account & Support",
    items: [
      { label: "KYC & Agreement", desc: "Partner onboarding docs", icon: ShieldCheck, badge: "Verified" },
      { label: "Help & Support", desc: "Chat with your RM", icon: HeadphonesIcon },
      { label: "Rate the App", desc: "Tell us what to improve", icon: Star },
    ],
  },
];

function MenuPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="More" title="Menu" subtitle="Everything else, neatly organised." />

      <div className="relative z-10 -mt-5 space-y-5 px-4 md:px-6 lg:px-8">
        <div className="card-soft flex items-center gap-3 p-4">
          <span className="grid size-12 place-items-center rounded-full brand-gradient text-base font-bold text-primary-foreground">
            SG
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-bold">Sanjay Gawai</p>
            <p className="text-xs text-muted-foreground">BSL-DSA-4471 · Elite DSA</p>
          </div>
          <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold text-gold">
            Tier 3
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="mb-2 px-1 text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
              {g.title}
            </h2>
            <div className="card-soft divide-y divide-border overflow-hidden">
              {g.items.map((it) => {
                const inner = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                      <it.icon className="size-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">{it.label}</span>
                      <span className="block text-xs text-muted-foreground">{it.desc}</span>
                    </span>
                    {it.badge && (
                      <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold text-primary">
                        {it.badge}
                      </span>
                    )}
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </>
                );
                return it.to ? (
                  <Link key={it.label} to={it.to} className="flex items-center gap-3 p-3.5">
                    {inner}
                  </Link>
                ) : (
                  <button key={it.label} className="flex w-full items-center gap-3 p-3.5 text-left">
                    {inner}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        </div>

        <Link
          to="/login"
          className="card-soft flex items-center justify-center gap-2 p-3.5 text-sm font-bold text-destructive"
        >
          <LogOut className="size-4" /> Logout
        </Link>

        <p className="pb-2 text-center text-[11px] text-muted-foreground">
          Business Standard Loan · v2.4.0
        </p>
      </div>
    </AppShell>
  );
}
