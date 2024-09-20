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
              hostname: 'a0.muscache.com',
              port: '',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'img.icons8.com',
              port: '',
              pathname: '**',
            },
          ],
    }
};

export default nextConfig;
