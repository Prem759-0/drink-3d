/** @type {import('next').NextConfig} */
const nextConfig = {
  // We remove output: 'export' to let Vercel handle the build dynamically
  // which enables full Next.js features like Image Optimization on Vercel.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
