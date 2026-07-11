import "server-only";
import { cookies } from "next/headers";
import { AUTH_COOKIE, sessionToken, isValidSession, adminConfigured } from "./auth-core";

export { adminConfigured };

/** True if the current request carries a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  const value = cookies().get(AUTH_COOKIE)?.value;
  return isValidSession(value);
}

/** Verify a submitted password against ADMIN_PASSWORD. */
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
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
