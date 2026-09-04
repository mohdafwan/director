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

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {/* The ferrule mark. Satori has no SVG path support, so the square
              aperture is drawn as a bordered box with two rounded corners —
              visually identical at this size. */}
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              background: `linear-gradient(135deg, ${site.brand.rimLight} 0%, ${site.brand.violet} 12%, #1B1140 52%, ${site.brand.indigo} 72%, ${site.brand.blue} 90%, ${site.brand.rimBlue} 100%)`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 30,
                height: 30,
                background: "#07090C",
                borderRadius: "0 7px 0 7px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#ECF1F6",
              letterSpacing: "0.005em",
              textTransform: "uppercase",
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
