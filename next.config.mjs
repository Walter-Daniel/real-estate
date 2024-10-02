/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'platform-lookaside.fbsbx.com',
              port: '',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'img.icons8.com',
              port: '',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '**',
            },
          ],
    }
};

export default nextConfig;
