export type LoanProduct = {
  id: string;
  name: string;
  short: string;
  rate: string;
  max: string;
};

export const products: LoanProduct[] = [
  { id: "personal", name: "Personal Loan", short: "Salaried & self-employed", rate: "10.5%", max: "₹25L" },
  { id: "business", name: "Business Loan", short: "MSME & working capital", rate: "13.0%", max: "₹75L" },
  { id: "home-salaried", name: "Home Loan — Salaried", short: "Purchase & balance transfer", rate: "8.4%", max: "₹5Cr" },
  { id: "home-self", name: "Home Loan — Self Employed", short: "Income program based", rate: "8.9%", max: "₹5Cr" },
  { id: "lap", name: "Loan Against Property", short: "Residential & commercial", rate: "9.2%", max: "₹10Cr" },
  { id: "auto", name: "Auto Loan", short: "New & used vehicles", rate: "9.6%", max: "₹40L" },
];

export type Lead = {
  id: string;
  name: string;
  phone: string;
  product: string;
  amount: number;
  city: string;
  stage: "New" | "Contacted" | "Docs Pending" | "Login" | "Sanctioned" | "Disbursed" | "Rejected";
  score: number;
  updated: string;
};

export const leads: Lead[] = [
  { id: "BSL-10241", name: "Rahul Sharma", phone: "98200 11245", product: "Personal Loan", amount: 800000, city: "Pune", stage: "New", score: 782, updated: "12 min ago" },
  { id: "BSL-10240", name: "Sneha Patil", phone: "99303 44120", product: "Home Loan — Salaried", amount: 4500000, city: "Mumbai", stage: "Docs Pending", score: 745, updated: "1 hr ago" },
  { id: "BSL-10238", name: "Imran Qureshi", phone: "90045 78210", product: "Business Loan", amount: 2500000, city: "Nagpur", stage: "Login", score: 711, updated: "3 hr ago" },
  { id: "BSL-10233", name: "Deepa Nair", phone: "88991 20456", product: "Loan Against Property", amount: 9000000, city: "Thane", stage: "Sanctioned", score: 803, updated: "Yesterday" },
  { id: "BSL-10229", name: "Arjun Mehta", phone: "70123 55677", product: "Auto Loan", amount: 1200000, city: "Nashik", stage: "Disbursed", score: 768, updated: "2 days ago" },
  { id: "BSL-10221", name: "Kavita Joshi", phone: "94220 90011", product: "Personal Loan", amount: 400000, city: "Pune", stage: "Contacted", score: 690, updated: "2 days ago" },
  { id: "BSL-10218", name: "Sameer Rao", phone: "93711 43219", product: "Business Loan", amount: 1800000, city: "Aurangabad", stage: "Rejected", score: 612, updated: "4 days ago" },
];

export const stages = [
  { n: 1, title: "Lead Captured", desc: "Basic KYC & requirement captured from the customer." },
  { n: 2, title: "Documents Collected", desc: "Aadhaar, PAN, bank statements & income proof uploaded." },
  { n: 3, title: "Login to Lender", desc: "File logged in with the selected bank / NBFC." },
  { n: 4, title: "Credit & Underwriting", desc: "Bureau pull, FOIR & eligibility assessment in progress." },
  { n: 5, title: "Sanction Letter", desc: "Terms, ROI and tenure approved by the credit team." },
  { n: 6, title: "Agreement & Legal", desc: "Agreement signing, legal & technical clearance." },
  { n: 7, title: "Disbursement", desc: "Amount credited to the customer's account." },
];

export const loginPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    period: "per login",
    tag: "Pay as you go",
    perks: ["1 file login", "Standard TAT (72 hrs)", "Email support", "Basic payout slab"],
  },
  {
    id: "growth",
    name: "Growth Partner",
    price: 3999,
    period: "per month",
    tag: "Most popular",
    perks: ["15 file logins", "Priority TAT (24 hrs)", "Dedicated RM", "+0.25% payout boost", "Lead marketplace access"],
  },
  {
    id: "elite",
    name: "Elite DSA",
    price: 11999,
    period: "per quarter",
    tag: "Best value",
    perks: ["Unlimited logins", "Same-day TAT", "Senior RM + credit desk", "+0.60% payout boost", "Co-branded marketing kit"],
  },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
