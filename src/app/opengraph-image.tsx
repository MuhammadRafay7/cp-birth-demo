import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}: practitioner-formulated daily wellness protocols`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#F3EEE4",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 0,
            width: 380,
            height: 500,
            borderTopLeftRadius: 190,
            borderTopRightRadius: 190,
            background: "#7A9B76",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <img src={logoSrc} alt="" width={411} height={120} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 64, lineHeight: 1.08, color: "#1A1A1A", fontFamily: "serif" }}>
              Daily wellness, rooted in midwifery care.
            </div>
            <div style={{ fontSize: 28, color: "#4A6347" }}>
              8 practitioner-formulated protocols in 30-day supplies
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
