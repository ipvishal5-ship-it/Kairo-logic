"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/site-link";

export interface StageNote {
  num: number;
  text: string;
}

export interface StageItem {
  id: string;
  tag: string;
  headline: string;
  paragraph: string;
  ctaText: string;
  ctaHref: string;
  notes: StageNote[];
  caption: string;
}

export const SHOWCASE_STAGES: StageItem[] = [
  {
    id: "daily-tasks",
    tag: "01 · Daily Tasks",
    headline: "Know who does what, today.",
    paragraph:
      "Tasks are assigned, tracked and handed off automatically, so nothing waits on a reminder.",
    ctaText: "See daily tasks",
    ctaHref: "/technologies/workflow",
    notes: [
      { num: 1, text: "The task arrives from the case record." },
      { num: 2, text: "Finishing it hands the case to the next person." },
    ],
    caption: "Case SA-2291 · step 1 of 3",
  },
  {
    id: "document-approvals",
    tag: "02 · Document Approvals",
    headline: "Approvals that leave a trail.",
    paragraph:
      "Documents move from draft to approved through the right people, with every step recorded.",
    ctaText: "See approvals",
    ctaHref: "/technologies/ecourt-filing",
    notes: [
      { num: 1, text: "Every step carries a name and a timestamp." },
      { num: 2, text: "The approved version is locked." },
    ],
    caption: "Case SA-2291 · step 2 of 3",
  },
  {
    id: "live-visibility",
    tag: "03 · Live Visibility",
    headline: "See the whole picture in real time.",
    paragraph:
      "Give leadership and teams a single live overview of all ongoing work. Spot delays early and know where projects stand without update meetings.",
    ctaText: "See live reporting",
    ctaHref: "/technologies/manufacturing",
    notes: [
      { num: 1, text: "The same case appears here. No reporting step." },
      { num: 2, text: "Blocked work surfaces before the deadline." },
    ],
    caption: "Case SA-2291 · step 3 of 3",
  },
];

export default function ShowcaseStages() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const stages = story.querySelectorAll<HTMLElement>(".stg");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      stages.forEach((x) => x.classList.add("on"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("on", entry.isIntersecting);
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );

    stages.forEach((stage) => observer.observe(stage));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="tech">
      <div className="wrap">
        <div className="thead">
          <h2>See the work come together.</h2>
          <p>
            A closer look at systems built for daily operations, verified approvals, and smooth team coordination.
          </p>
        </div>
        <div className="story" id="story" ref={storyRef}>
          {SHOWCASE_STAGES.map((stage, idx) => (
            <article className="stg" key={stage.id}>
              <div className="cp">
                <span className="tg">{stage.tag}</span>
                <h3 className="hl">{stage.headline}</h3>
                <p>{stage.paragraph}</p>
                <Link className="btn" href={stage.ctaHref}>
                  {stage.ctaText}
                </Link>
                <ol className="note">
                  {stage.notes.map((note) => (
                    <li key={note.num}>
                      <span className="mk">{note.num}</span>
                      {note.text}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="scr">
                {idx === 0 && (
                  <div className="ui">
                    <div className="uh">
                      Today <em>Asha Menon · Thu 5 Nov</em>
                    </div>
                    <div className="tr">
                      <span className="ck tkd" style={{ "--d": "1.2s" } as React.CSSProperties} />
                      <b className="dim" style={{ "--d": "1.2s" } as React.CSSProperties}>
                        Prepare notice draft
                      </b>
                      <span className="cn">SA-2291</span>
                      <span className="tm">11:30</span>
                      <span className="mk">1</span>
                    </div>
                    <div className="tr">
                      <span className="ck" />
                      <b>Upload valuation report</b>
                      <span className="cn">SA-2288</span>
                      <span className="tm">14:00</span>
                      <span />
                    </div>
                    <div className="tr">
                      <span className="ck" />
                      <b>Confirm hearing date</b>
                      <span className="cn">SA-2274</span>
                      <span className="tm">Tomorrow</span>
                      <span />
                    </div>
                    <div className="tr">
                      <span className="ck" />
                      <b>Update borrower record</b>
                      <span className="cn">SA-2269</span>
                      <span className="tm">Fri</span>
                      <span />
                    </div>
                    <div className="ho rev" style={{ "--d": "2.2s" } as React.CSSProperties}>
                      <span className="mk">2</span>
                      <span>
                        Notice draft done. <b>Ravi Iyer</b> now has SA-2291 to review.
                      </span>
                    </div>
                  </div>
                )}

                {idx === 1 && (
                  <div className="ui">
                    <div className="uh">
                      Notice draft <em>SA-2291</em>
                    </div>
                    <div className="ap">
                      <div className="dc">
                        <b>Notice draft</b>
                        <em>v3</em>
                        <div className="sk" style={{ width: "90%" }} />
                        <div className="sk" style={{ width: "100%" }} />
                        <div className="sk" style={{ width: "70%" }} />
                        <div className="sk" style={{ width: "95%" }} />
                        <div className="sk" style={{ width: "55%" }} />
                      </div>
                      <div>
                        <div className="sv rev" style={{ "--d": ".5s" } as React.CSSProperties}>
                          <i />
                          <div>
                            <b>Drafted</b>
                            <span>
                              Asha Menon · 5 Nov, 11:12 <span className="mk" style={{ marginLeft: 6 }}>1</span>
                            </span>
                          </div>
                        </div>
                        <div className="sv rev" style={{ "--d": "1.5s" } as React.CSSProperties}>
                          <i />
                          <div>
                            <b>Reviewed</b>
                            <span>Ravi Iyer · 5 Nov, 12:40</span>
                          </div>
                        </div>
                        <div className="sv rev" style={{ "--d": "2.5s" } as React.CSSProperties}>
                          <i />
                          <div>
                            <b>Approved</b>
                            <span>Meera Shah · 5 Nov, 15:05</span>
                          </div>
                        </div>
                        <div className="rev" style={{ "--d": "3.4s" } as React.CSSProperties}>
                          <span className="lk">
                            Locked · v3 <span className="mk">2</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 2 && (
                  <div className="ui">
                    <div className="uh">
                      Live Operations Radar <em>Illustrative data</em>
                    </div>
                    <div className="tl">
                      <div>
                        <small>Overall Work Status</small>
                        <b>On track</b>
                      </div>
                      <div>
                        <small>Zero Blind Spots</small>
                        <b>Every task owned</b>
                      </div>
                      <div>
                        <small>Early Warnings</small>
                        <b>1 item</b>
                      </div>
                    </div>
                    <div className="vz">
                      <div>
                        <h4>Cases by stage</h4>
                        <div className="br">
                          <span>Drafting</span>
                          <div className="tk">
                            <i style={{ width: "30%", "--d": ".3s" } as React.CSSProperties} />
                          </div>
                          <span>14</span>
                        </div>
                        <div className="br">
                          <span>In review</span>
                          <div className="tk">
                            <i style={{ width: "20%", "--d": ".5s" } as React.CSSProperties} />
                          </div>
                          <span>9</span>
                        </div>
                        <div className="br">
                          <span>Approved</span>
                          <div className="tk">
                            <i style={{ width: "46%", "--d": ".7s" } as React.CSSProperties} />
                          </div>
                          <span>21</span>
                        </div>
                        <div className="br">
                          <span>Filed</span>
                          <div className="tk">
                            <i style={{ width: "78%", "--d": ".9s" } as React.CSSProperties} />
                          </div>
                          <span>36</span>
                        </div>
                      </div>
                      <div className="al">
                        <h4>Needs attention</h4>
                        <div className="rev" style={{ "--d": "1.2s" } as React.CSSProperties}>
                          <span className="mk">1</span>
                          <span>
                            SA-2291 Notice draft
                            <small>Approved 15:05 · ready to file</small>
                          </span>
                        </div>
                        <div className="rev" style={{ "--d": "1.6s" } as React.CSSProperties}>
                          <span className="am" />
                          <span>
                            SA-2274 Hearing date unconfirmed
                            <small>Due tomorrow</small>
                          </span>
                          <span className="mk" style={{ marginLeft: "auto" }}>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p className="cap">{stage.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
