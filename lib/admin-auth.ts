import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "gd-admin-session";

function getAdminPassword() {
  return process.env.ADMIN_PANEL_PASSWORD ?? "gulerdogadan123";
}

function getSessionToken() {
  return createHmac("sha256", getAdminPassword())
    .update("guler-dogadan-admin")
    .digest("hex");
}

export function validateAdminPassword(password: string) {
  return password === getAdminPassword();
}

export function createAdminSessionValue() {
  return getSessionToken();
}

export function isValidAdminSession(sessionValue: string | undefined) {
  if (!sessionValue) return false;

  const expected = getSessionToken();
  const actualBuffer = Buffer.from(sessionValue);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}