import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(150deg, #6b7154 0%, #4B4D41 55%, #302f27 100%)",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#FCE3C5", textTransform: "uppercase", display: "flex" }}>
          OROLiving
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            fontFamily: "serif",
            color: "#FBF8F2",
            maxWidth: 900,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
