/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "wembleypark.com",
      "storage.cloud.google.com",
      "storage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
