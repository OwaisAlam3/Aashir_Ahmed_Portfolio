import type { NextConfig } from 'next';
 
const nextConfig: NextConfig = {
  output: 'export',        // Static HTML export — no server needed
  images: {
    unoptimized: true,     // Required when using output: 'export'
  },
};
 
export default nextConfig;