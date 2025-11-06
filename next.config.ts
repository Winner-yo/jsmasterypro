import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the turbopack root to this project directory so Next.js doesn't
  // incorrectly infer the workspace root when there are multiple lockfiles
  // on the machine (for example a package-lock.json in the user's home).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
