import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "white",
            letterSpacing: -1,
          }}
        >
          IP
        </span>
      </div>
    ),
    { ...size }
  );
}
