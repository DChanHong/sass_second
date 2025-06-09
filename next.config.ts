import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.coupangcdn.com'
            }
        ]
    }
};

export default nextConfig;
