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
            padding: "48px",
            background:
              "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)",
            position: "relative",
          }}
        >
          {/* Mesh gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0))",
              zIndex: 1,
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
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
              >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
              <span
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  letterSpacing: "-0.02em",
                }}
              >
                Blog Sync
              </span>
            </div>

            {/* Main content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "85%",
              }}
            >
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                BLOG POST •{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "52px",
                  fontWeight: "bold",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {heading}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>{siteConfig.url}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <img
                  src="data:image/svg+xml;charset=utf-8,<svg fill='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/></svg>"
                  width="20"
                  height="20"
                  style={{ opacity: 0.8 }}
                />
                <span>{siteConfig.links.github}</span>
              </div>
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
