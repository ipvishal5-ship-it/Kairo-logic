export const sources = [
  "Excel Sheets",
  "Scattered Software",
  "Email Threads",
  "Shared Folders",
  "Phone & WhatsApp",
  "Status Meetings",
];

export const excelProblems = [
  { n: "01", t: "Data Limits", d: "Large sheets need constant scrolling to review one case." },
  { n: "02", t: "Documents Elsewhere", d: "Supporting files are not available with the case data." },
  { n: "03", t: "Collaboration", d: "Working together over email is neither seamless nor clean." },
  { n: "04", t: "Location Is Manual", d: "Property locations are searched and shared separately." },
  { n: "05", t: "Limited Visibility", d: "The real position depends on individual updates and meetings." },
  { n: "06", t: "Time Lost", d: "Time goes to collecting and verifying data instead of recovery." },
];

export const caseChips = [
  "Borrower & Loan",
  "Legal Status",
  "Court Info (Sec 14)",
  "Possession",
  "Documents",
  "Geo-Location",
];

export const caseRecord = {
  id: "Case #2026-0148",
  borrower: "ABC Industries",
  property: "Industrial Unit, Mumbai",
  stage: "Section 14 Order Received",
  next: "Physical Possession",
  docs: [
    "Demand Notice.pdf",
    "Possession Notice.pdf",
    "Sec 14 Application.pdf",
    "Order.pdf",
    "Title Documents.pdf",
    "Property Map.pdf",
  ],
};

export const documents = [
  { tag: "Section 13(2)", t: "Demand Notice", d: "First notice to the borrower, demanding repayment." },
  { tag: "Section 13(4)", t: "Possession Notice", d: "Notice of possession of the secured property." },
  { tag: "At Possession", t: "Inventory", d: "List of items found at the property at the time of possession." },
  { tag: "At Possession", t: "Panchnama", d: "Written record of the possession, signed by witnesses." },
];

export const pipeline = [
  { stage: "Filing", value: 19 },
  { stage: "Order Pending", value: 31 },
  { stage: "Possession Pending", value: 46 },
  { stage: "Auction & Sale", value: 22 },
  { stage: "Completed / Closed", value: 130 },
];

export const vintage = [
  { year: "FY20", multiple: 1.63 },
  { year: "FY21", multiple: 1.5 },
  { year: "FY22", multiple: 1.38 },
  { year: "FY23", multiple: 1.11 },
  { year: "FY24", multiple: 0.83 },
  { year: "FY25", multiple: 0.63 },
];

export const routes = [
  { name: "SARFAESI enforcement", value: 48, fill: "#4f7cff" },
  { name: "Settlement / OTS", value: 22, fill: "#22d3aa" },
  { name: "IBC / NCLT", value: 14, fill: "#f5a623" },
  { name: "Restructuring", value: 9, fill: "#8a97a8" },
  { name: "Sale of loans/assets", value: 7, fill: "#5b6b7f" },
];

export const arcStats = [
  { label: "Dues Acquired", value: "₹4,850 Cr", note: "Principal + interest taken over" },
  { label: "Acquisition Cost", value: "₹1,120 Cr", note: "23% of dues acquired" },
  { label: "Cumulative Recovery", value: "₹1,465 Cr", note: "1.31× of acquisition cost" },
  { label: "SRs Outstanding", value: "₹740 Cr", note: "Across 42 trusts" },
];

export const trustAlerts = [
  { t: "SR Maturity < 36 Months", d: "3 trusts · ₹112 Cr SRs still to redeem" },
  { t: "Behind Resolution Plan", d: "9 trusts · ₹186 Cr shortfall vs plan" },
  { t: "SR Rating Downgrades", d: "2 trusts · in the latest half-year review" },
  { t: "Mgmt Fee Unrealised", d: "₹4.2 Cr pending over 180 days" },
];

export const roles = [
  { t: "Role-Based Access", d: "Each user sees and edits only what their role allows. Management, functional team and field staff have separate access levels." },
  { t: "Data Security", d: "Case data, documents and photographs stay in one controlled system, with an activity history of who changed what." },
  { t: "Mobile Field Updates", d: "Field staff upload property photographs and location from their phone during site visits." },
];

export const devices = [
  { t: "Desktop / Laptop", d: "Full dashboard experience with drill-down capabilities." },
  { t: "Smartphone", d: "Key KPIs and alerts on the go, from anywhere in India." },
  { t: "Tablet", d: "Board presentations and reviews without printing or PDF exports." },
];

export const rollout = [
  { n: "01", t: "Pilot", d: "Start with a small set of live cases." },
  { n: "02", t: "Data Entry Ownership", d: "Assign responsibility for keeping case data updated." },
  { n: "03", t: "Train the Team", d: "Short training for functional and field teams." },
  { n: "04", t: "Review", d: "Management review after the pilot to decide on full rollout." },
];
