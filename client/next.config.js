/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
      typedRoutes:true,
      serverActions: true,
    },
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.unsplash.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
    
  };
  
  module.exports = nextConfig;