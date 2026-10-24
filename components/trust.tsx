"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "./motion-primitives";
import { handleTabKeys } from "./tab-navigation";
const roles = [
  {
    name: "Field team",
    title: "Capture it at the source.",
    text: "Upload property photographs and location during a visit. Keep the evidence with the case.",
    items: [
      "Property photographs",
      "Location linked to the case",
      "Possession records",
    ],
  },
  {
    name: "Legal team",
    title: "Open the case. Find the context.",
    text: "Review legal status and linked documents without chasing a separate folder or email thread.",
    items: [
      "Court and case information",
      "Linked notices and orders",
      "A shared case history",
    ],
  },
  {
    name: "Management",
    title: "Review the position. Move forward.",
    text: "See the case pipeline and outstanding stages, with access aligned to each team’s role.",
    items: [
      "Portfolio dashboards",
      "Stage-wise visibility",
      "Role-based access",
    ],
  },
];
export default function Trust() {
  const [role, setRole] = useState(0);
  const current = roles[role];
  return (
    <section className="section-block field-section" id="trust">
      <div className="page-shell">
        <Reveal className="field-layout">
          <div className="field-visual">
            <Image
              src="/images/field-inspection.webp"
              alt="Illustrative field officer photographing an industrial property on a smartphone"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="field-image-label">
              FIELD INTELLIGENCE · ILLUSTRATIVE SCENE
            </span>
            <div className="field-update">
              <div className="field-update-icon">
                <Check size={21} />
              </div>
              <div>
                <strong>A visit becomes a case update.</strong>
                <span>
                  <MapPin size={14} /> Photo + location + case context
                </span>
              </div>
            </div>
          </div>
          <div className="field-copy">
            <p className="eyebrow">CONNECTED PEOPLE. CLEAR RESPONSIBILITY.</p>
            <h2>
              From the property.
              <br />
              <span className="accent-heading">To the whole team.</span>
            </h2>
            <div
              className="role-tabs"
              role="tablist"
              aria-label="Explore team roles"
              onKeyDown={(event) =>
                handleTabKeys(event, role, roles.length, setRole)
              }
            >
              {roles.map((r, i) => (
                <button
                  role="tab"
                  key={r.name}
                  id={`role-tab-${i}`}
                  aria-controls="role-panel"
                  aria-selected={i === role}
                  tabIndex={i === role ? 0 : -1}
                  onClick={() => setRole(i)}
                >
                  {r.name}
                </button>
              ))}
            </div>
            <div
              id="role-panel"
              role="tabpanel"
              aria-labelledby={`role-tab-${role}`}
              className="role-content"
            >
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <ul>
                {current.items.map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <a className="text-link" href="#contact">
              Plan a pilot <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
        <div className="trust-strip">
          <p>
            <span className="status-dot" /> Role-based access
          </p>
          <p>One controlled case record</p>
          <p>Activity history</p>
          <p>Desktop to mobile</p>
        </div>
      </div>
    </section>
  );
}
