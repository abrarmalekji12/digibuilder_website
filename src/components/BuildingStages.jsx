import React, { useEffect, useRef, useState } from "react";

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
const HEIGHTS = [26, 78, 78, 78, 64]; // foundation, floor1, floor2, floor3, rooftop

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function handle() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    }
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [ref]);
  return progress;
}

function NodeDot({ color = "#F5A623", size = 8 }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        marginRight: 10,
        flexShrink: 0,
      }}
    />
  );
}

// A real 3D extruded box: front, right, top faces built from CSS 3D transforms
function FloorBox({ w, h, d, colorFront, colorSide, colorTop, litFraction = 0, windows = 6, active }) {
  const litCount = Math.round(litFraction * windows);
  return (
    <div style={{ position: "relative", width: w, height: h, transformStyle: "preserve-3d" }}>
      {/* front face */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: w,
          height: h,
          background: colorFront,
          transform: `translateZ(${d / 2}px)`,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: 7,
          padding: 10,
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.08)",
        }}
      >
        {Array.from({ length: windows }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: 2,
              background: i < litCount ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.18)",
              boxShadow: i < litCount ? "0 0 10px 2px rgba(255,255,255,0.65)" : "none",
              transition: "background 400ms ease, box-shadow 400ms ease",
            }}
          />
        ))}
      </div>
      {/* right side face (darker for depth) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: d,
          height: h,
          background: colorSide,
          transform: `translateX(${w / 2}px) rotateY(90deg)`,
        }}
      />
      {/* top face */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: w,
          height: d,
          background: colorTop,
          transform: `translateY(${-h / 2}px) rotateX(90deg)`,
        }}
      />
    </div>
  );
}

function shade(hex, amt) {
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function BuildingStages() {
  const buildRef = useRef(null);
  const progress = useScrollProgress(buildRef);

  const stageCount = STAGES.length;
  const raw = progress * stageCount;
  const stageIndex = Math.min(stageCount - 1, Math.floor(raw));
  const stageProgress = raw - stageIndex;
  const stage = STAGES[stageIndex];

  const floorBuilt = (i) => {
    if (stageIndex > i) return 1;
    if (stageIndex === i) return stageProgress;
    return 0;
  };

  const cumBelow = [];
  let acc = 0;
  for (let i = 0; i < HEIGHTS.length; i++) {
    cumBelow.push(acc);
    acc += HEIGHTS[i];
  }

  const colors = ["#C7CFD6", "#F5A623", "#EF8332", "#E8622C", "#123B52"];
  const rotY = -38 + progress * 26;

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#FDF8F3",
        color: "#123B52",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        h1, h2, h3, .heading-font { font-family: 'Space Grotesk', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.5); }
        }
        .panel-enter { animation: fadeUp 500ms cubic-bezier(0.16,1,0.3,1); }
        .btn-primary {
          background: linear-gradient(135deg, #F5A623, #E8622C);
          color: white; border: none; padding: 14px 30px; border-radius: 999px;
          font-weight: 600; font-size: 15px; cursor: pointer;
          transition: transform 250ms ease, box-shadow 250ms ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(232,98,44,0.3); }
        .btn-outline {
          background: transparent; color: #123B52; border: 1.5px solid #123B52;
          padding: 14px 30px; border-radius: 999px; font-weight: 600; font-size: 15px; cursor: pointer;
          transition: background 250ms ease, color 250ms ease;
        }
        .btn-outline:hover { background: #123B52; color: white; }
        .scroll-cue { animation: bob 1.8s ease-in-out infinite; }
        @keyframes bob {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "18px 48px",
          background: "rgba(253,248,243,0.85)", backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(18,59,82,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 18 }} className="heading-font">
          <span style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #F5A623, #E8622C, #123B52)", display: "inline-block" }} />
          Digibuilder
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 500 }}>
          <span>Work</span><span>Services</span><span>About</span><span>Contact</span>
        </div>
        <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>Start a Project</button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px", position: "relative" }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.5, color: "#E8622C", marginBottom: 20 }}>
          Digital branding, paired with AI-driven marketing
        </div>
        <h1 className="heading-font" style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 900, margin: 0 }}>
          We build digital presence — floor by floor.
        </h1>
        <p style={{ fontSize: 18, color: "#66727E", maxWidth: 560, margin: "24px 0 36px", lineHeight: 1.6 }}>
          Digibuilder is a hybrid studio: part creative portfolio, part performance marketing agency.
          We design the brand, then build the systems that make it grow.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <button className="btn-primary">See Our Work</button>
          <button className="btn-outline">Explore Services</button>
        </div>
        <div className="scroll-cue" style={{ position: "absolute", bottom: 28, fontSize: 13, color: "#8A96A3" }}>Scroll to build ↓</div>
      </section>

      {/* BUILD SCROLL SECTION — REAL 3D */}
      <div ref={buildRef} style={{ height: "520vh", position: "relative" }}>
        <div
          style={{
            position: "sticky", top: 0, height: "100vh", overflow: "hidden",
            display: "flex", alignItems: "center",
            background: `linear-gradient(180deg, rgba(245,166,35,${0.05 + progress * 0.12}) 0%, #FDF8F3 55%)`,
          }}
        >
          <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, padding: "0 48px" }}>
            {/* 3D SCENE */}
            <div style={{ flex: "0 0 460px", height: 520, perspective: 1800, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div
                style={{
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transform: `rotateX(-24deg) rotateY(${rotY}deg)`,
                  transition: "transform 60ms linear",
                }}
              >
                {/* ground plane */}
                <div
                  style={{
                    position: "absolute",
                    width: 400, height: 400, left: -200, top: -1,
                    transform: "rotateX(90deg)",
                    background:
                      "repeating-linear-gradient(0deg, rgba(138,150,163,0.25) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(138,150,163,0.25) 0 1px, transparent 1px 28px)",
                  }}
                />

                {HEIGHTS.map((h, i) => {
                  const built = floorBuilt(i);
                  const eased = easeOutCubic(built);
                  const finalY = -(cumBelow[i] + h);
                  const riseAmount = 160;
                  const currentY = finalY + riseAmount * (1 - eased);
                  const opacity = Math.min(1, built * 2.2);
                  const front = colors[i];
                  const side = shade(front, -40);
                  const top = shade(front, 30);
                  const litFraction = i === 0 ? 0 : built;

                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: `translate3d(${-FLOOR_DIMS.w / 2}px, ${currentY}px, ${-FLOOR_DIMS.d / 2}px)`,
                        transformStyle: "preserve-3d",
                        opacity,
                        transition: "opacity 300ms ease",
                      }}
                    >
                      <FloorBox
                        w={FLOOR_DIMS.w}
                        h={h}
                        d={FLOOR_DIMS.d}
                        colorFront={front}
                        colorSide={side}
                        colorTop={top}
                        litFraction={litFraction}
                        windows={i === 0 ? 0 : 6}
                      />
                      {/* corner nodes on top edge */}
                      {i > 0 &&
                        [0, FLOOR_DIMS.w].map((cx) =>
                          [0, FLOOR_DIMS.d].map((cz) => (
                            <div
                              key={`${cx}-${cz}`}
                              style={{
                                position: "absolute",
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                background: stage.accent,
                                transform: `translate3d(${cx - 4.5}px, -4.5px, ${cz - 4.5}px)`,
                                boxShadow: built > 0.5 ? `0 0 10px 3px ${stage.accent}99` : "none",
                                animation: i === stageIndex && built > 0.5 ? "glowPulse 2s ease-in-out infinite" : "none",
                              }}
                            />
                          ))
                        )}
                    </div>
                  );
                })}

                {/* rooftop antenna */}
                <div
                  style={{
                    position: "absolute",
                    left: -1,
                    top: -(cumBelow[4] + HEIGHTS[4]) - 40,
                    width: 2,
                    height: 40 * (stageIndex === 4 ? stageProgress : stageIndex > 4 ? 1 : 0),
                    background: "#123B52",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -6,
                      left: -4,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#F5A623",
                      boxShadow: "0 0 18px 5px rgba(245,166,35,0.75)",
                      animation: stageIndex >= 4 ? "glowPulse 1.6s ease-in-out infinite" : "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* TEXT PANEL */}
            <div style={{ flex: 1, maxWidth: 460 }} key={stage.key}>
              <div className="panel-enter">
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.2, color: stage.accent, marginBottom: 14 }}>
                  {stage.label}
                </div>
                <h2 className="heading-font" style={{ fontSize: 34, fontWeight: 700, margin: "0 0 16px" }}>
                  {stage.title}
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#5A6673", marginBottom: 22 }}>{stage.copy}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {stage.bullets.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", fontSize: 15 }}>
                      <NodeDot color={stage.accent} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* progress dots */}
          <div style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 14 }}>
            {STAGES.map((s, i) => (
              <div
                key={s.key}
                style={{ width: 9, height: 9, borderRadius: "50%", background: i <= stageIndex ? "#F5A623" : "rgba(18,59,82,0.15)", transition: "background 300ms ease" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* POST-BUILD REVEAL */}
      <section style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", background: "linear-gradient(180deg, #FDF8F3 0%, #FBEFE0 100%)" }}>
        <h2 className="heading-font" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 0 40px" }}>
          This is what we build.
        </h2>
        <button className="btn-primary">Let's Build Yours</button>
      </section>

      {/* PORTFOLIO TEASER */}
      <section style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.2, color: "#E8622C", marginBottom: 12 }}>SELECTED WORK</div>
        <h2 className="heading-font" style={{ fontSize: 34, fontWeight: 700, marginBottom: 40 }}>A few things we've built recently.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {["Northline Skincare", "Vantage Analytics", "Marlow & Co."].map((name) => (
            <div key={name} style={{ borderRadius: 12, overflow: "hidden", background: "white", boxShadow: "0 8px 30px rgba(18,59,82,0.08)" }}>
              <div style={{ height: 160, background: "linear-gradient(135deg, #F5A623, #E8622C, #123B52)", opacity: 0.85 }} />
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 12, color: "#E8622C", fontWeight: 600, marginBottom: 6 }}>Branding · Web</div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 14, color: "#8A96A3" }}>+150% organic traffic</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button className="btn-outline">View Full Portfolio →</button>
        </div>
      </section>

      <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(18,59,82,0.08)", textAlign: "center", fontSize: 13, color: "#8A96A3" }}>
        © 2026 Digibuilder. All rights reserved.
      </footer>
    </div>
  );
}
