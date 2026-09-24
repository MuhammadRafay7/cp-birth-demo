import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}: a peaceful, family-centered birth center in ${siteConfig.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [logo, photo] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo.png")),
    readFile(join(process.cwd(), "public/images/newborn-detail.jpg")),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F3EEE4" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            padding: 64,
          }}
        >
          <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={411} height={120} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 64, lineHeight: 1.05, color: "#1A1A1A", fontWeight: 700 }}>
              You&rsquo;re in safe hands.
            </div>
            <div style={{ fontSize: 30, color: "#4A6347" }}>
              {`Midwife-led birth care in ${siteConfig.region}`}
            </div>
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${photo.toString("base64")}`}
          alt=""
          width={480}
          height={630}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
