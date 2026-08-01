import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  const disallow = ["/admin", "/api/"];
  return {
    rules: [
      // Everyone is welcome except the admin/API area.
      { userAgent: "*", allow: "/", disallow },
      // Explicitly welcome the AI answer-engine and search crawlers so HR
      // Automotive can surface in AI results (ChatGPT, Claude, Perplexity,
      // Google AI, Bing/Copilot, Apple, Amazon, etc.).
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "GoogleOther",
          "Applebot",
          "Applebot-Extended",
          "Amazonbot",
          "Bingbot",
          "CCBot",
          "Meta-ExternalAgent",
          "DuckAssistBot",
        ],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
