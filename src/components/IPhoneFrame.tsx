import React, { useState } from "react";

interface IPhoneFrameProps {
  /** Screenshot path, e.g. "/screenshots/brew-bliss/01-home.png" */
  src?: string;
  alt: string;
  /** Optional custom screen content (used instead of `src`) */
  children?: React.ReactNode;
  /** Background colour of the status-bar strip (match the top of the shot) */
  statusBg?: string;
  /** "dark" icons for light backgrounds, "light" icons for dark ones */
  statusTone?: "dark" | "light";
  /** Background colour of the bottom safe-area strip */
  bottomBg?: string;
  className?: string;
}

const STATUS_BAR_HEIGHT = 34;
// breathing room under the app (like the bottom safe-area on a real iPhone)
const BOTTOM_SAFE_AREA = 18;

/**
 * A pure-CSS iPhone-style frame: titanium bezel, dynamic island, side
 * buttons, status bar, bottom safe area and a soft glass reflection.
 *
 * Phone screenshots usually don't include a status bar, so we draw one on
 * top - that keeps the dynamic island from covering the app's own header,
 * and the screenshot is shown uncropped (no content cut at the edges).
 */
export default function IPhoneFrame({
  src,
  alt,
  children,
  statusBg = "#fdf9f3",
  statusTone = "dark",
  bottomBg = "#fdf9f3",
  className = "",
}: IPhoneFrameProps) {
  const [failed, setFailed] = useState(false);
  const ink = statusTone === "dark" ? "#1a1a1a" : "#ffffff";

  const button = (
    top: string,
    height: number,
    side: "left" | "right",
  ): React.CSSProperties => ({
    position: "absolute",
    top,
    height,
    width: 3,
    ...(side === "left" ? { left: -2.5 } : { right: -2.5 }),
    borderRadius: side === "left" ? "3px 0 0 3px" : "0 3px 3px 0",
    background: "linear-gradient(90deg,#2a2a2e,#505055,#2a2a2e)",
  });

  return (
    <div
      className={`relative mx-auto w-[210px] sm:w-[240px] ${className}`}
      // matches a 9:16 phone screenshot + status bar + bottom safe area
      style={{ aspectRatio: "512 / 1000" }}
    >
      {/* side buttons: action, volume up, volume down, power */}
      <span style={button("15%", 26, "left")} />
      <span style={button("23%", 46, "left")} />
      <span style={button("33%", 46, "left")} />
      <span style={button("28%", 74, "right")} />

      {/* titanium frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 42,
          padding: 3,
          background:
            "linear-gradient(145deg,#8a8a90 0%,#303034 28%,#58585e 52%,#1b1b1e 100%)",
          boxShadow:
            "0 30px 60px -15px rgba(0,0,0,0.85), 0 0 60px rgba(255,90,0,0.08)",
        }}
      >
        {/* black bezel */}
        <div
          className="h-full w-full bg-black"
          style={{ borderRadius: 39, padding: 7 }}
        >
          {/* screen */}
          <div
            className="relative flex h-full w-full flex-col overflow-hidden"
            style={{ borderRadius: 32, background: "#0b0b0b" }}
          >
            {/* status bar */}
            <div
              className="relative z-10 flex shrink-0 items-center justify-between"
              style={{
                height: STATUS_BAR_HEIGHT,
                padding: "0 15px 0 17px",
                background: statusBg,
                color: ink,
              }}
            >
              <span
                className="font-inter"
                style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.2 }}
              >
                9:41
              </span>
              <span className="flex items-center" style={{ gap: 4 }}>
                {/* signal */}
                <svg width="13" height="9" viewBox="0 0 13 9" fill={ink}>
                  <rect x="0" y="6" width="2" height="3" rx="0.6" />
                  <rect x="3.6" y="4" width="2" height="5" rx="0.6" />
                  <rect x="7.2" y="2" width="2" height="7" rx="0.6" />
                  <rect x="10.8" y="0" width="2" height="9" rx="0.6" />
                </svg>
                {/* wifi */}
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path
                    d="M1 3.2a7.2 7.2 0 0 1 10 0M3 5.3a4.3 4.3 0 0 1 6 0"
                    stroke={ink}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle cx="6" cy="7.6" r="1.1" fill={ink} />
                </svg>
                {/* battery */}
                <svg width="19" height="9" viewBox="0 0 19 9" fill="none">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="15.5"
                    height="8"
                    rx="2.4"
                    stroke={ink}
                    strokeOpacity="0.5"
                  />
                  <rect
                    x="2"
                    y="2"
                    width="12.5"
                    height="5"
                    rx="1.3"
                    fill={ink}
                  />
                  <rect
                    x="17"
                    y="3"
                    width="1.6"
                    height="3"
                    rx="0.8"
                    fill={ink}
                    fillOpacity="0.5"
                  />
                </svg>
              </span>
            </div>

            {/* dynamic island */}
            <div
              className="absolute left-1/2 z-20 bg-black"
              style={{
                top: 7.5,
                width: 58,
                height: 20,
                borderRadius: 999,
                transform: "translateX(-50%)",
              }}
            />

            {/* screen content */}
            <div className="relative min-h-0 flex-1">
              {children ? (
                children
              ) : src && !failed ? (
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={() => setFailed(true)}
                  className="h-full w-full object-cover object-top select-none"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#1c1c1c] to-[#0b0b0b] px-6 text-center">
                  <span className="text-3xl">☕</span>
                  <p className="font-inter text-[11px] text-gray-500">
                    Screenshot coming soon
                  </p>
                </div>
              )}
            </div>

            {/* bottom safe area: keeps the app's nav bar clear of the screen edge */}
            <div
              className="shrink-0"
              style={{ height: BOTTOM_SAFE_AREA, background: bottomBg }}
            />

            {/* glass reflection */}
            <div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background:
                  "linear-gradient(125deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0) 38%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
