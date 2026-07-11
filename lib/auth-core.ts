/**
 * Edge- and Node-safe auth primitives (uses Web Crypto only, no next/headers),
 * so this module can be imported from both middleware and server code.
 */

export const AUTH_COOKIE = "hr_admin";
const SESSION_PAYLOAD = "hr-admin-session-v1";

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "hr-automotive-insecure-dev-secret"
  );
}

/** Whether an admin password has been configured. */
export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

async function hmac(message: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The expected session-cookie value for a logged-in admin. */
export function sessionToken(): Promise<string> {
  return hmac(SESSION_PAYLOAD, secret());
}

/** Constant-time-ish comparison of the provided cookie against the expected token. */
export async function isValidSession(cookieValue?: string): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await sessionToken();
  if (cookieValue.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= cookieValue.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
