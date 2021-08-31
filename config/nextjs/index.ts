const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://192.168.1.133:3012"
  : "http://localhost:3007";
