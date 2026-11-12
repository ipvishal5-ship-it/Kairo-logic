"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PLATFORMS = [
  {
    name: "SARFAESI Operations",
    href: "/technologies/workflow",
    description:
      "When statutory recovery work is drowning in manual filings and timelines.",
  },
  {
    name: "Kairologic Lex",
    href: "/technologies/ecourt-filing",
    description:
      "When litigation teams are chasing cause lists and hearing updates across courts.",
  },
  {
    name: "Manufacturing Suite",
    href: "/technologies/manufacturing",
    description:
      "When a large plant is still run on folders, Excel sheets and verbal updates.",
  },
] as const;

const PROCESS_STEPS = [
  {
    num: "01",
    title: "You describe the work",
    description:
      "A 30-minute conversation about what your team does daily, with no forms or jargon. Just the real process, pain points included.",
  },
  {
    num: "02",
    title: "We map it to a system",
    description:
      "We identify where records, responsibilities and reporting connect, and where software removes friction instead of adding it.",
  },
  {
    num: "03",
    title: "Configure, don’t rebuild",
    description:
      "Our platforms are configured to your workflow, not coded from scratch. That means faster rollout and lower risk.",
  },
  {
    num: "04",
    title: "Validate with your team",
    description:
      "We hand over only after your own people confirm the system matches how they actually work, and support continues.",
  },
] as const;

const OUTCOME_STATS = [
  {
    word: "Hours",
    label: "of manual filing & lookup eliminated weekly",
  },
  {
    word: "Zero",
    label: "missed statutory or delivery deadlines, by design",
  },
  {
    word: "One",
    label: "system of record instead of scattered folders",
  },
  {
    word: "Live",
    label: "visibility for management, every day",
  },
] as const;

/**
 * Part 2 of /need-a-solution: Platforms selector (#platforms), scroll-linked
 * 4-step workflow (.st), outcome words (.sx), and Closing band (.cb).
 */
export default function NeedSolutionPart2() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lnRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePlatform, setActivePlatform] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ln = lnRef.current;
    if (!root || !ln) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // In-view highlight sweeps for <mark> inside Part 2 ([data-in])
    const markTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-in]"));
    const markIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            markIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    markTargets.forEach((el) => markIo.observe(el));

    // Scroll progress --q & .sp.on state (rAF-throttled)
    const updateSteps = () => {
      const r = ln.getBoundingClientRect();
      const vh = window.innerHeight;
      const q = rm
        ? 1
        : Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height + vh * 0.1)));
      ln.style.setProperty("--q", String(q));
      stepRefs.current.forEach((el, i) => {
        if (el) el.classList.toggle("on", q >= i / 4 - 0.02);
      });
    };

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateSteps();
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    updateSteps();

    return () => {
      markIo.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* C) PLATFORMS */}
      <section className="pf" id="platforms">
        <div className="wrap">
          <div data-in>
            <h2>
              One of these platforms <mark>probably already fits.</mark>
            </h2>
            <p className="cap">
              They are configured, living systems, not demos. Pick the closest
              match and see the product walkthrough.
            </p>
          </div>

          <div className="pfg">
            <div id="rows">
              {PLATFORMS.map((platform, idx) => (
                <Link
                  key={platform.name}
                  className="rw"
                  href={platform.href}
                  data-l={idx}
                  onMouseEnter={() => setActivePlatform(idx)}
                  onFocus={() => setActivePlatform(idx)}
                  onMouseLeave={() => setActivePlatform(null)}
                  onBlur={() => setActivePlatform(null)}
                >
                  <h3>{platform.name}</h3>
                  <p>{platform.description}</p>
                  <span>See the platform →</span>
                </Link>
              ))}
            </div>

            <div
              className="lg hv"
              id="lg"
              aria-hidden="true"
              data-l={activePlatform !== null ? String(activePlatform) : undefined}
            >
              <svg viewBox="0 0 80 80">
                <path
                  className="bd"
                  fill="#102A43"
                  d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8z"
                />
                <path
                  className="kk"
                  fill="#102A43"
                  d="M28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
                />
                <path className="nd" fill="#16876D" d="M27 33h14v14H27z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* D) STEPS */}
      <section className="st">
        <div className="wrap">
          <div data-in>
            <h2>
              Nothing quite fits? <mark>That is our favourite brief.</mark>
            </h2>
            <p className="cap" style={{ marginTop: "22px" }}>
              Our approach is to make the system fit the work it serves. If your
              problem sits between two platforms or outside them entirely, we
              shape a workspace around it.
            </p>
          </div>

          <div className="ln" id="ln" ref={lnRef}>
            <div className="rail">
              <b />
            </div>
            <div className="nodeS" />
            <div className="sg">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  className="sp"
                  key={step.num}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                >
                  <em>{step.num}</em>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E) STATS */}
      <section className="sx">
        <div className="wrap">
          <div className="sxg">
            {OUTCOME_STATS.map((stat) => (
              <div key={stat.word}>
                <b>{stat.word}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F) CLOSING BAND */}
      <section className="cb">
        <div className="wrap">
          <div data-in>
            <h2>
              What should <mark>work better?</mark>
            </h2>
            <p className="cap">
              Tell us about the work your team manages and where you want to
              improve it.
            </p>
          </div>
          <Link className="btn" href="/contact">
            Tell us about your project
          </Link>
        </div>
      </section>
    </div>
  );
}

