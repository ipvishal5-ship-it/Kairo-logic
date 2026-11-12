export interface ManufacturingFaqItem {
  question: string;
  answer: string;
}

export interface ScatteredDataItem {
  label: string;
}

export interface ComparisonPanelCopy {
  heading: string;
  items: readonly string[];
}

/**
 * Shared FAQ entries used by both the visible #faq accordion and the
 * schema.org FAQPage JSON-LD script so their text matches verbatim.
 * (Draft copy: tools & setup answers can be updated here.)
 */
export const MANUFACTURING_FAQS: readonly ManufacturingFaqItem[] = [
  {
    question: "What happens to our records if the manager is on leave or leaves?",
    answer:
      "Everything is held in one system with role-based access, not in one person’s Excel files. Another authorised manager or supervisor opens the same records and continues the work.",
  },
  {
    question: "Can Kairologic replace our Excel sheets?",
    answer:
      "Yes. We bring your worker, shift, task and delivery information into one organised system, configured around how your factory actually works.",
  },
  {
    question: "Is this payroll or HR software?",
    answer:
      "No. Kairologic is the operational record behind your workforce: who works where, on which shift, on which task, and what was done. We can discuss how it fits alongside the tools you already use.",
  },
  {
    question: "How long does setup take?",
    answer:
      "We start by mapping your real process, then configure the system and test it with your own team before handover. We will share a clear plan after the first conversation.",
  },
  {
    question: "Does it work for a workforce of 1000 or more?",
    answer:
      "Yes. It is designed for large workforces, where one person can no longer hold every record in a spreadsheet. Any worker, order or delivery stays a few seconds away.",
  },
  {
    question: "Can supervisors use it on a phone?",
    answer:
      "Yes. Details are available on desktop, tablet or smartphone, based on each person’s role.",
  },
];

export const SCATTERED_SECTION_COPY = {
  headingBefore: "Work is done. ",
  headingMark: "Nothing is recorded in one place.",
  body: "Excel sheets, registers, messages and memory. The information is scattered here and there.",
  ctaRecorded: "See it recorded",
  ctaScattered: "See it scattered",
  cardTitle: "One factory record.",
  cardSubtitle: "Every detail, recorded as it happens.",
  chips: [
    "Excel sheets",
    "Paper registers",
    "WhatsApp messages",
    "Shift notes",
    "Phone calls",
    "One person’s memory",
  ] as readonly string[],
} as const;

export const MEMORY_SECTION_COPY = {
  headingBefore: "A factory that ",
  headingMark: "remembers everything.",
  rows: [
    {
      id: "records",
      title: "Records",
      description:
        "Every worker, shift, task and output is recorded as work happens.",
    },
    {
      id: "shifts",
      title: "Shifts",
      description:
        "Shifts and tasks are allocated automatically, with no manual rosters.",
    },
    {
      id: "search",
      title: "Search",
      description:
        "Any worker, order or delivery is 3 seconds away, not 3 folders away.",
    },
    {
      id: "handover",
      title: "Handover",
      description:
        "Role-based access and a full audit trail, so anyone with access can continue the work.",
    },
  ] as const,
} as const;

export const COMPARISON_SECTION_COPY = {
  headingBefore: "Not another HR tool. ",
  headingMark: "A system built around your factory.",
  offTheShelf: {
    heading: "Off-the-shelf software",
    items: [
      "Built around a generic process",
      "Fixed screens and fields",
      "Your workaround ends up in Excel again",
    ],
  } satisfies ComparisonPanelCopy,
  kairologic: {
    heading: "Kairologic",
    items: [
      "Configured around your real process",
      "Your records, templates and workflows",
      "Tested with your team before handover",
    ],
  } satisfies ComparisonPanelCopy,
  industriesLabel: "Built for large workforces in",
  // Draft industry chips — update here as target verticals evolve
  industries: [
    "Manufacturing",
    "Auto components",
    "Textiles",
    "FMCG",
    "Steel",
    "Warehousing",
  ] as readonly string[],
} as const;

export const PROCESS_SECTION_COPY = {
  heading: "Built around your process.",
  sub: "We configure the records, templates and workflows. Then test the setup with your team and make the handover clear.",
  steps: [
    { id: "understand", title: "Understand", caption: "Process mapping" },
    { id: "configure", title: "Configure", caption: "System setup" },
    { id: "handover", title: "Handover", caption: "Team handover" },
  ] as const,
} as const;

export const CLOSING_SECTION_COPY = {
  heading: "Give your factory the system it deserves.",
  body: "Replace the Excel-and-verbal-updates routine, and keep the factory running whoever is away.",
  primaryCta: "Book a live demo",
  secondaryCta: "Talk to our manufacturing team",
} as const;

export const MANUFACTURING_SEO = {
  title: "Factory Workforce Management Software in India | Kairologic",
  description:
    "Stop running your factory on one manager’s Excel sheet. Kairologic keeps every worker, shift and task in one record, so work never depends on one person.",
  path: "/technologies/manufacturing",
} as const;

export function getManufacturingJsonLd(siteUrl: string) {
  const pageUrl = `${siteUrl}${MANUFACTURING_SEO.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Kairologic Manufacturing Suite: factory workforce management",
      serviceType: "Workforce management system for large factories",
      description: MANUFACTURING_SEO.description,
      provider: {
        "@type": "Organization",
        name: "Kairologic Technologies",
      },
      areaServed: "IN",
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: MANUFACTURING_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Technologies",
          item: `${siteUrl}/technologies`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Manufacturing Suite",
          item: pageUrl,
        },
      ],
    },
  ];
}
