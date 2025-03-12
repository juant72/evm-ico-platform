export const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN || "encrypia.io";

export const AUTH_PRIVATE_KEY = process.env.AUTH_PRIVATE_KEY;

export const authConfig = {
  domain: domain,
  authUrl: "/api/auth",
  loginRedirect: "/dashboard",
};
