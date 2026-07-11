import "server-only";
import { cookies } from "next/headers";
import { AUTH_COOKIE, sessionToken, isValidSession, adminConfigured } from "./auth-core";

export { adminConfigured };

/** True if the current request carries a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  const value = cookies().get(AUTH_COOKIE)?.value;
  return isValidSession(value);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verify submitted credentials against ADMIN_USERNAME / ADMIN_PASSWORD. */
export function checkCredentials(username: string, password: string): boolean {
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) return false;
  // Username is optional — defaults to "admin" if ADMIN_USERNAME isn't set.
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const passOk = safeEqual(password, expectedPass);
  const userOk = safeEqual(username.trim(), expectedUser);
  return userOk && passOk;
}

export async function createSession(): Promise<void> {
  const token = await sessionToken();
  cookies().set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function destroySession(): void {
  cookies().delete(AUTH_COOKIE);
}
