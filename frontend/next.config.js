/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    imageSizes: [1920, 1280, 800],
    domains: ["seeklogo.com", "cryptologos.cc", "www.pngall.com"],
  },
};

module.exports = nextConfig;
