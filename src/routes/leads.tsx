import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, Plus, Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { inr, leads } from "@/lib/mock-data";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Business Standard Loan" },
      { name: "description", content: "Track every loan lead from capture to disbursement with stage filters, bureau score and quick call actions." },
      { property: "og:title", content: "Leads — Business Standard Loan" },
      { property: "og:description", content: "Track every loan lead from capture to disbursement." },
    ],
  }),
  component: Leads,
});

const filters = ["All", "New", "Docs Pending", "Login", "Sanctioned", "Disbursed", "Rejected"] as const;

const stageTone: Record<string, string> = {
  New: "bg-info/10 text-info",
  Contacted: "bg-muted text-muted-foreground",
  "Docs Pending": "bg-gold/15 text-gold",
  Login: "bg-accent text-primary",
  Sanctioned: "bg-success/15 text-success",
  Disbursed: "bg-primary/12 text-primary",
  Rejected: "bg-destructive/10 text-destructive",
};

function Leads() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      leads.filter(
        (l) =>
          (filter === "All" || l.stage === filter) &&
          (q.trim() === "" ||
            `${l.name} ${l.id} ${l.phone} ${l.product}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [filter, q],
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="Pipeline"
        title="Leads"
        subtitle="Every enquiry, one funnel view."
        right={
          <Link
            to="/apply"
            className="flex items-center gap-1.5 rounded-xl bg-surface px-3 py-2 text-xs font-bold text-primary shadow-raised"
          >
            <Plus className="size-4" /> New Lead
          </Link>
        }
      />

      <div className="relative z-10 -mt-5 space-y-4 px-4 md:px-6 lg:px-8">
        <div className="card-soft flex items-center gap-2 px-4 py-3">
          <Search className="size-[18px] text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, mobile or App ID"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                filter === f
                  ? "border-transparent brand-gradient text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {f} ({f === "All" ? leads.length : leads.filter((l) => l.stage === f).length})
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {list.map((l) => (
            <div key={l.id} className="card-soft p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-bold">{l.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.id} · {l.city}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${stageTone[l.stage]}`}>
                  {l.stage}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-muted/60 p-3 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Amount</p>
                  <p className="text-sm font-bold">{inr(l.amount)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Bureau</p>
                  <p className="text-sm font-bold text-primary">{l.score}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Updated</p>
                  <p className="text-sm font-bold">{l.updated}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold text-muted-foreground">{l.product}</p>
                <div className="flex gap-2">
                  <a
                    href={`tel:${l.phone.replace(/\s/g, "")}`}
                    className="grid size-9 place-items-center rounded-xl border border-border text-primary"
                    aria-label={`Call ${l.name}`}
                  >
                    <Phone className="size-4" />
                  </a>
                  <Link
                    to="/process"
                    className="rounded-xl brand-gradient px-3.5 py-2 text-xs font-bold text-primary-foreground"
                  >
                    Track
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <p className="card-soft p-6 text-center text-sm text-muted-foreground">
              No leads match this filter.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
