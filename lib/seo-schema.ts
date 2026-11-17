import { SITE_CONFIG } from "./site-config";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: "Kairologic Technologies",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.svg`,
    description:
      "Kairologic Technologies designs and configures operational systems, document workflows, and connected business information.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Business Workflow Automation",
      "Document Processing Systems",
      "SARFAESI Operations & Case Tracking",
      "eCourt Legal Filing Automation",
      "Manufacturing Operations & Production Tracking",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_CONFIG.url}/contact`,
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: "Kairologic Technologies",
    description:
      "Business systems, document workflows and connected information. Technology built around your work.",
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function getHomePageJsonLd() {
  return [
    getOrganizationJsonLd(),
    getWebsiteJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Kairologic Operational Platforms",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Kairologic Ops: SARFAESI Operations Workspace",
          url: `${SITE_CONFIG.url}/technologies/workflow`,
          description:
            "Case progress, borrower notifications, statutory recovery steps, and team handoffs with zero lost records.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kairologic Lex: Cloud E-Court Filing Automation",
          url: `${SITE_CONFIG.url}/technologies/ecourt-filing`,
          description:
            "Automated document preparation, OCR, court seal application, pagination, and file size splitting for e-court filing.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Kairologic Manufacturing Suite",
          url: `${SITE_CONFIG.url}/technologies/manufacturing`,
          description:
            "Shop-floor stage tracking, recipe execution, batch traceability, and dispatch logging.",
        },
      ],
    },
  ];
}

export function getTechnologiesPageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_CONFIG.url}/technologies#webpage`,
      url: `${SITE_CONFIG.url}/technologies`,
      name: "Our Technologies | Kairologic Technologies",
      description:
        "Business information, document workflows and team reporting, configured around the way your organization operates.",
      isPartOf: {
        "@id": `${SITE_CONFIG.url}/#website`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Technologies",
          item: `${SITE_CONFIG.url}/technologies`,
        },
      ],
    },
  ];
}

export function getNeedSolutionPageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/need-a-solution#webpage`,
      url: `${SITE_CONFIG.url}/need-a-solution`,
      name: "Need a Solution | Kairologic Technologies",
      description:
        "Every organisation we work with started with the same sentence: 'there must be a better way to do this.' See how we configure workflows around real operations.",
      isPartOf: {
        "@id": `${SITE_CONFIG.url}/#website`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Need a solution",
          item: `${SITE_CONFIG.url}/need-a-solution`,
        },
      ],
    },
  ];
}

export function getContactPageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${SITE_CONFIG.url}/contact#webpage`,
      url: `${SITE_CONFIG.url}/contact`,
      name: "Contact Kairologic Technologies",
      description:
        "Get in touch with Kairologic Technologies to discuss your workflow, document automation, or request a focused walkthrough.",
      isPartOf: {
        "@id": `${SITE_CONFIG.url}/#website`,
      },
      mainEntity: {
        "@type": "Organization",
        name: "Kairologic Technologies",
        url: SITE_CONFIG.url,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: `${SITE_CONFIG.url}/contact`,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: `${SITE_CONFIG.url}/contact`,
        },
      ],
    },
  ];
}
