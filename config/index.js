const dev = process.env.NODE_ENV !== "production";

export const SITE_DOMAIN = dev ? "http://localhost:3000" : "";
