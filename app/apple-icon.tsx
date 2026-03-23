import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #059669, #10b981)",
          borderRadius: 36,
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "white",
            letterSpacing: -4,
          }}
        >
          IP
        </span>
      </div>
    ),
    { ...size },
  );
}
