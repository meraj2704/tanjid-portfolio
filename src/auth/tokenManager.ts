import { getCookie, setCookie, deleteCookie } from "cookies-next";

const ACCESS_TOKEN_KEY = "ej-token";
const REFRESH_TOKEN_KEY = "ej-refresh-token";

// Set tokens (on client or pass req/res on server)
export const setTokens = (
  accessToken: string,
  refreshToken?: string,
  req?: any,
  res?: any
) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, { req, res, path: "/" });
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken, { req, res, path: "/" });
  }
};

// Get access token
export const getAccessToken = (req?: any, res?: any): string | undefined => {
  return getCookie(ACCESS_TOKEN_KEY, { req, res }) as string | undefined;
};

// Get refresh token
export const getRefreshToken = (req?: any, res?: any): string | undefined => {
  return getCookie(REFRESH_TOKEN_KEY, { req, res }) as string | undefined;
};

// Clear tokens
export const clearTokens = (req?: any, res?: any) => {
  deleteCookie(ACCESS_TOKEN_KEY, { req, res, path: "/" });
  deleteCookie(REFRESH_TOKEN_KEY, { req, res, path: "/" });
};