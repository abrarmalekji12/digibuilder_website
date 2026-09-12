import { useEffect, useRef, useState } from "react";
import "./BuildingStages.css";

const STAGES = [
  {
    key: "foundation",
    label: "01 / FOUNDATION",
    title: "Strategy & Research",
    copy: "Before a single line is drawn, we study your market, your audience, and your competitors. Every floor above depends on what we pour here.",
    bullets: ["Brand audit", "Audience research", "Positioning & messaging"],
    accent: "#8A96A3",
  },
  {
    key: "floor1",
    label: "02 / FIRST FLOOR",
    title: "Branding & Identity",
    copy: "Logo, color, voice, and visual system — the structural frame your audience will recognize instantly.",
    bullets: ["Logo & visual identity", "Brand guidelines", "Voice & tone"],
    accent: "#F5A623",
  },
  {
    key: "floor2",
    label: "03 / SECOND FLOOR",
    title: "Content & Creative",
    copy: "The windows and walls — the content that lets people see in and understand what you stand for.",
    bullets: ["Web & UI design", "Copywriting", "Photo & video content"],
    accent: "#EF8332",
  },
  {
    key: "floor3",
    label: "04 / THIRD FLOOR",
    title: "Digital Marketing & Ads",
    copy: "Wiring the building for signal — SEO, paid media, and social systems that carry your brand outward.",
    bullets: ["SEO & content marketing", "Paid social & search", "Email & CRM systems"],
    accent: "#E8622C",
  },
  {
    key: "rooftop",
    label: "05 / ROOFTOP",
    title: "Growth & Results",
    copy: "The lights turn on. A brand that stands on its own, visible from every angle — and built to keep growing.",
    bullets: ["Analytics & optimization", "Ongoing growth strategy", "Reporting & scale"],
    accent: "#123B52",
  },
];

const FLOOR_DIMS = { w: 220, d: 220 };
const HEIGHTS = [26, 78, 78, 78, 64];
const FLOOR_COLORS = ["#C7CFD6", "#F5A623", "#EF8332", "#E8622C", "#123B52"];
const CUMULATIVE_HEIGHTS = HEIGHTS.map((_, index) =>
  HEIGHTS.slice(0, index).reduce((sum, height) => sum + height, 0),
);
const PORTFOLIO_ITEMS = ["Northline Skincare", "Vantage Analytics", "Marlow & Co."];
const CORNERS = [0, FLOOR_DIMS.w].flatMap((x) => [0, FLOOR_DIMS.d].map((z) => [x, z]));

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = null;

    const update = () => {
      frameId = null;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const nextProgress = Math.min(1, Math.max(0, -rect.top / total));
      setProgress((current) => (Math.abs(current - nextProgress) < 0.0005 ? current : nextProgress));
    };

    const scheduleUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [ref]);

  return progress;
}

function NodeDot({ color = "#F5A623", size = 8 }) {
  return <span className="node-dot" style={{ width: size, height: size, background: color }} />;
}

function FloorBox({ w, h, d, colorFront, colorSide, colorTop, litFraction = 0, windows = 6 }) {
  const litCount = Math.round(litFraction * windows);

  return (
    <div className="floor-box" style={{ width: w, height: h }}>
      <div
        className="floor-face floor-front"
        style={{ width: w, height: h, background: colorFront, transform: `translateZ(${d / 2}px)` }}
      >
        {Array.from({ length: windows }, (_, index) => {
          const isLit = index < litCount;
          return (
            <span
              key={index}
              className="window-light"
              style={{
                background: isLit ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.18)",
                boxShadow: isLit ? "0 0 10px 2px rgba(255,255,255,0.65)" : "none",
              }}
            />
          );
        })}
      </div>
      <div
        className="floor-face"
        style={{
          width: d,
          height: h,
          background: colorSide,
          transform: `translateX(${w / 2}px) rotateY(90deg)`,
        }}
      />
      <div
        className="floor-face"
        style={{
          width: w,
          height: d,
          background: colorTop,
          transform: `translateY(${-h / 2}px) rotateX(90deg)`,
        }}
      />
    </div>
  );
}

function shade(hex, amount) {
  const value = parseInt(hex.slice(1), 16);
  const clamp = (channel) => Math.max(0, Math.min(255, channel));
  const red = clamp((value >> 16) + amount);
  const green = clamp(((value >> 8) & 0x00ff) + amount);
  const blue = clamp((value & 0x0000ff) + amount);
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}

export default function BuildingStages() {
  const buildRef = useRef(null);
  const progress = useScrollProgress(buildRef);
  const rawStage = progress * STAGES.length;
  const stageIndex = Math.min(STAGES.length - 1, Math.floor(rawStage));
  const stageProgress = rawStage - stageIndex;
  const stage = STAGES[stageIndex];
  const rotationY = -38 + progress * 26;
  const antennaProgress = stageIndex === STAGES.length - 1 ? stageProgress : 0;

  return (
    <div className="building-stages">
      <nav className="site-nav">
        <div className="nav-inner">
          <div className="brand heading-font">
            <span className="brand-mark" aria-hidden="true" />
            Digibuilder
          </div>
          <div className="nav-links" aria-label="Primary navigation">
            <span>Work</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <button className="btn-primary nav-cta">Start a Project</button>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">Digital branding, paired with AI-driven marketing</div>
        <h1 className="hero-title heading-font">We build digital presence — floor by floor.</h1>
        <p className="hero-copy">
          Digibuilder is a hybrid studio: part creative portfolio, part performance marketing agency. We design the
          brand, then build the systems that make it grow.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">See Our Work</button>
          <button className="btn-outline">Explore Services</button>
        </div>
        <div className="scroll-cue">Scroll to build ↓</div>
      </section>

      <div ref={buildRef} className="build-scroll">
        <div
          className="build-sticky"
          style={{
            background: `linear-gradient(180deg, rgba(245,166,35,${0.05 + progress * 0.12}) 0%, #FDF8F3 55%)`,
          }}
        >
          <div className="build-inner">
            <div className="scene-wrap" aria-hidden="true">
              <div className="building-scene" style={{ "--rot-y": `${rotationY}deg` }}>
                <div className="ground-plane" />

                {HEIGHTS.map((height, index) => {
                  const built = stageIndex > index ? 1 : stageIndex === index ? stageProgress : 0;
                  const eased = easeOutCubic(built);
                  const finalY = -(CUMULATIVE_HEIGHTS[index] + height);
                  const currentY = finalY + 160 * (1 - eased);
                  const opacity = Math.min(1, built * 2.2);
                  const front = FLOOR_COLORS[index];

                  return (
                    <div
                      key={STAGES[index].key}
                      className="floor-position"
                      style={{
                        transform: `translate3d(${-FLOOR_DIMS.w / 2}px, ${currentY}px, ${-FLOOR_DIMS.d / 2}px)`,
                        opacity,
                      }}
                    >
                      <FloorBox
                        w={FLOOR_DIMS.w}
                        h={height}
                        d={FLOOR_DIMS.d}
                        colorFront={front}
                        colorSide={shade(front, -40)}
                        colorTop={shade(front, 30)}
                        litFraction={index === 0 ? 0 : built}
                        windows={index === 0 ? 0 : 6}
                      />

                      {index > 0 &&
                        CORNERS.map(([x, z]) => (
                          <div
                            key={`${x}-${z}`}
                            className="corner-node"
                            style={{
                              background: stage.accent,
                              transform: `translate3d(${x - 4.5}px, -4.5px, ${z - 4.5}px)`,
                              boxShadow: built > 0.5 ? `0 0 10px 3px ${stage.accent}99` : "none",
                              animation:
                                index === stageIndex && built > 0.5 ? "glowPulse 2s ease-in-out infinite" : "none",
                            }}
                          />
                        ))}
                    </div>
                  );
                })}

                <div
                  className="rooftop-antenna"
                  style={{
                    left: -1,
                    top: -(CUMULATIVE_HEIGHTS[4] + HEIGHTS[4]) - 40,
                    height: 40 * antennaProgress,
                  }}
                >
                  <div
                    className="antenna-light"
                    style={{ animation: stageIndex === 4 ? "glowPulse 1.6s ease-in-out infinite" : "none" }}
                  />
                </div>
              </div>
            </div>

            <div
              key={stage.key}
              className="stage-panel panel-enter"
              style={{ "--stage-accent": stage.accent }}
            >
              <div className="stage-label">{stage.label}</div>
              <h2 className="stage-title heading-font">{stage.title}</h2>
              <p className="stage-copy">{stage.copy}</p>
              <div className="stage-bullets">
                {stage.bullets.map((bullet) => (
                  <div key={bullet} className="stage-bullet">
                    <NodeDot color={stage.accent} />
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="progress-dots" aria-hidden="true">
            {STAGES.map((item, index) => (
              <div
                key={item.key}
                className="progress-dot"
                style={{ background: index <= stageIndex ? "#F5A623" : "rgba(18,59,82,0.15)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <section className="post-build">
        <h2 className="heading-font">This is what we build.</h2>
        <button className="btn-primary">Let's Build Yours</button>
      </section>

      <section className="portfolio">
        <div className="section-kicker">SELECTED WORK</div>
        <h2 className="portfolio-title heading-font">A few things we've built recently.</h2>
        <div className="portfolio-grid">
          {PORTFOLIO_ITEMS.map((name) => (
            <article key={name} className="portfolio-card">
              <div className="portfolio-art" aria-hidden="true" />
              <div className="portfolio-content">
                <div className="portfolio-meta">Branding · Web</div>
                <div className="portfolio-name">{name}</div>
                <div className="portfolio-result">+150% organic traffic</div>
              </div>
            </article>
          ))}
        </div>
        <div className="portfolio-action">
          <button className="btn-outline">View Full Portfolio →</button>
        </div>
      </section>

      <footer className="site-footer">© 2026 Digibuilder. All rights reserved.</footer>
    </div>
  );
}
