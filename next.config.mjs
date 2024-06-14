/** @type {import('next').NextConfig} */
const nextConfig = {
    //swcMinify: true,
    eslint: { 
        ignoreDuringBuilds: true, 
      }, 
      swcMinify:false
};

export default nextConfig;