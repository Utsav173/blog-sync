import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provided", { status: 400 });
    }

    const heading =
      title.length > 140
        ? title.substring(0, 140).split(" ").slice(0, -1).join(" ") + "..."
        : title;

    const fontBold = await fetch(
      new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "80px",
            background: "#FAFAFA",
            position: "relative",
          }}
        >
          {/* Super subtle grid background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.1,
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color: "#18181B",
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "0.2em",
                }}
              >
                BLOG
              </span>
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#18181B",
                }}
              />
            </div>

            {/* Main content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                maxWidth: "85%",
                marginTop: "-60px", // Pull up the content for better visual balance
              }}
            >
              <div
                style={{
                  color: "#18181B",
                  fontSize: "52px",
                  fontWeight: "bold",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                {heading}
              </div>
              <div
                style={{
                  color: "#71717A",
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                }}
              >
                {new Date()
                  .toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                  .toUpperCase()}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #E4E4E7",
                paddingTop: "24px",
              }}
            >
              <span
                style={{
                  color: "#71717A",
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                }}
              >
                {siteConfig.url}
              </span>
              <div
                style={{
                  width: "16px",
                  height: "1px",
                  backgroundColor: "#18181B",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
