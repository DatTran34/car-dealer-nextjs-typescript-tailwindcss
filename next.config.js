/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["links.papareact.com","fakestoreapi.com","fakeimg.pl","carqueryapi.com"]
  },
}

module.exports = nextConfig