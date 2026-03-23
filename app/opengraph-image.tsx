import { ImageResponse } from "next/og";
import { portfolio } from "@/config/portfolio";

export const runtime = "edge";
export const alt = portfolio.metadata.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { author, ogImage } = portfolio;

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0c10 0%, #0f1218 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #10b981, #0d9488)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.2em",
              color: "#10b981",
              textTransform: "uppercase",
            }}
          >
            {ogImage.roleLabel}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#e8eaed",
              letterSpacing: "-0.02em",
              gap: "16px",
            }}
          >
            <span>{author.firstName}</span>
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #0d9488)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {author.lastName}
            </span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#6b7280",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {ogImage.tagline}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: "32px",
            color: "#6b7280",
            fontSize: 16,
          }}
        >
          {ogImage.footerLinks.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
