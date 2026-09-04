import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Default social card, generated at build time.
 *
 * Deliberately typographic and on-brand rather than a stock photo: it carries
 * the signal-orange accent, the technical grid and the five-verb spine, so a
 * shared link is recognisable at thumbnail size.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07090C",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* technical grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #131A22 1px, transparent 1px), linear-gradient(to bottom, #131A22 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", width: 14, height: 14, background: "#FF6A13" }} />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              color: "#ECF1F6",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              color: "#ECF1F6",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            Your machines already know. We make them tell you.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#A8B6C4",
              lineHeight: 1.4,
              maxWidth: "820px",
            }}
          >
            Industrial IoT · Automation · PLC &amp; SCADA · Industrial Software
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {["CONNECT", "AUTOMATE", "MONITOR", "ANALYSE", "OPTIMISE"].map((word, i) => (
            <div key={word} style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 17,
                  letterSpacing: "0.16em",
                  color: i === 0 ? "#FF6A13" : "#6D7C8B",
                }}
              >
                {word}
              </div>
              {i < 4 && <div style={{ display: "flex", width: 26, height: 1, background: "#2C3945" }} />}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
