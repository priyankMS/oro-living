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
          background: "#4B4D41",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontFamily: "serif",
            fontSize: 20,
            color: "#FCE3C5",
          }}
        >
          O
        </div>
      </div>
    ),
    { ...size },
  );
}
