import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

const SECRET = process.env.JWT_SECRET || "super-secret-key";

// Sign token
export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

// Verify token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// Clear token (server-side)
export function clearToken() {
  const cookieStore = cookies();
  // Overwrite the cookie with maxAge 0 to delete it
  setCookie("portfolio-token", "", { maxAge: 0 });
}
