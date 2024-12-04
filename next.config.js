/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Add this line
      // You can add other domains here if needed
    ],
  },
};

export default config;
