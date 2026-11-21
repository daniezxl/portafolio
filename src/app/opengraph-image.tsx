import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const dots = Array.from({ length: 40 }, (_, i) => i);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eee4",
          color: "#1a1714",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {dots.map((i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 10, background: "#1d35a3", opacity: i % 2 ? 0.45 : 1 }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#675f57", maxWidth: 900 }}>{site.description}</div>
        </div>
        <div style={{ display: "flex", height: 18, background: "#1d35a3", borderRadius: 2 }} />
      </div>
    ),
    size,
  );
}
