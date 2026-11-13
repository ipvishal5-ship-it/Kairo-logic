export interface ProductFaqItem {
  question: string;
  answer: string;
}

/**
 * General pre-sales & delivery FAQs for the /faq page.
 */
export const GENERAL_FAQS: readonly ProductFaqItem[] = [
  {
    question: "How does Kairologic build a system around our workflow?",
    answer:
      "We start with a 30-minute conversation about what your team does every day, with no forms or jargon. We map where records, responsibilities and reporting connect, configure a platform around your process, and validate it with your team before handover.",
  },
  {
    question: "Do you build from scratch or configure existing platforms?",
    answer:
      "We configure proven platforms (Kairologic Ops, Kairologic Lex, and Manufacturing Suite) around your exact workflow instead of coding from scratch. That means faster rollout, lower risk, and zero forced workarounds in Excel.",
  },
  {
    question: "Can Kairologic run offline or on our own office computers?",
    answer:
      "Kairologic Lex runs entirely in your web browser with zero software installation, so your team can open and prepare filings on any PC, laptop, or tablet. Kairologic Ops and Manufacturing Suite also run seamlessly in the browser.",
  },
  {
    question: "What happens after the system is handed over?",
    answer:
      "We hand over only after your own people confirm the setup matches how they actually work, and ongoing support continues as your operations grow.",
  },
  {
    question: "What devices or IT setup does our team need?",
    answer:
      "Kairologic Lex runs straight from your web browser, so you can upload documents, trigger OCR, and download portal dossiers on any desktop or tablet without installing anything. Kairologic Ops and Kairologic Manufacturing run equally well across all modern web browsers.",
  },
  {
    question: "How do pricing and rollout work?",
    answer:
      "Because every setup is configured around your workflow rather than sold as a rigid template, we share a clear rollout plan and pricing after a 30-minute discovery call covering your team size and requirements.",
  },
];

/**
 * Shared FAQ entries for Kairologic Ops (/technologies/workflow) used by both
 * the visible #faq accordion and schema.org FAQPage JSON-LD.
 */
export const OPS_FAQS: readonly ProductFaqItem[] = [
  {
    question:
      "What happens to case records if a team member is away or changes role?",
    answer:
      "Every case, document and update lives in one shared workspace with role-based access, not in one person’s spreadsheets or inbox. Another authorised team member can open the case and pick up from the exact next step.",
  },
  {
    question:
      "Can Kairologic Ops replace our scattered spreadsheets and email threads?",
    answer:
      "Yes. Spreadsheets, email threads, shared folders, property photos and status updates converge into one case record, so your team opens a case and sees the full picture.",
  },
  {
    question:
      "How does it handle statutory recovery and DM/CMM timelines?",
    answer:
      "Case information feeds directly into document templates and keeps the next action in view, so management can see where cases stand and where attention is needed before deadlines slip.",
  },
  {
    question: "Who can view or edit sensitive case files?",
    answer:
      "Access is defined by role. Each person sees and acts only on the cases, documents and approvals aligned to their responsibility.",
  },
  {
    question: "Do we have to change our existing process to fit the software?",
    answer:
      "No. We start by mapping your real process, then configure records, templates and workflows around how your team already works, instead of forcing you into fixed screens.",
  },
  {
    question: "How does onboarding and handover work?",
    answer:
      "We understand your process, configure the workspace around it, and test the setup with your team using real workflows so the handover is clear from day one.",
  },
];

/**
 * Shared FAQ entries for Kairologic Lex (/technologies/ecourt-filing) used by
 * both the visible #faq accordion and schema.org FAQPage JSON-LD.
 */
export const LEX_FAQS: readonly ProductFaqItem[] = [
  {
    question: "Do we need to install any heavy software or PDF drivers on our computers?",
    answer:
      "No installation is required. Kairologic Lex is an instant web service: open your browser, drop your case files, and the cloud engine carries out merging, high-accuracy OCR, Bates stamping, compression, and splitting on demand.",
  },
  {
    question:
      "Does text recognition (OCR) and document processing happen in the cloud?",
    answer:
      "Yes. The heavy document processing and OCR engine run server-side in the cloud. It accurately converts non-searchable scans into crisp, searchable text without stressing your local machine's memory or CPU.",
  },
  {
    question: "What happens to typed PDFs versus scanned pages?",
    answer:
      "Selective OCR detects pages that already have a text layer and leaves them untouched, while converting scanned pages into searchable text at the court-recommended 300 DPI resolution.",
  },
  {
    question: "Will splitting a large filing cut a document mid-way?",
    answer:
      "No. Kairologic Lex divides the output into portal-ready parts cleanly so individual documents are never split mid-way.",
  },
  {
    question: "What steps run when we click RUN?",
    answer:
      "One click runs the complete routine unattended: merging PDFs, scans and photos, adding an index cover page, running selective OCR, compressing to portal limits, paginating every page, applying the bank seal, and splitting into portal-ready parts.",
  },
  {
    question:
      "How do we verify the output before uploading to the e-court portal?",
    answer:
      "Automated pre-flight and post-flight page-count checks run alongside structured inspection logs detailing file sizes, page splits and any anomalies before you upload.",
  },
];

export function buildFaqPageJsonLd(faqs: readonly ProductFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildProductPageJsonLd(opts: {
  siteUrl: string;
  path: string;
  name: string;
  serviceType: string;
  description: string;
  breadcrumbName: string;
  faqs: readonly ProductFaqItem[];
}) {
  const pageUrl = `${opts.siteUrl}${opts.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: opts.name,
      serviceType: opts.serviceType,
      description: opts.description,
      provider: {
        "@type": "Organization",
        name: "Kairologic Technologies",
      },
      areaServed: "IN",
      url: pageUrl,
    },
    buildFaqPageJsonLd(opts.faqs),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Technologies",
          item: `${opts.siteUrl}/technologies`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: opts.breadcrumbName,
          item: pageUrl,
        },
      ],
    },
  ];
}

