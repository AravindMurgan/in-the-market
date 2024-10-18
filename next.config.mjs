/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'lh3.googleusercontent.com',
                pathname:'**'
            },
            {
                protocol:'https',
                hostname:'res.cloudinary.com',
                pathname:'**'
            }

        ]
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'https://in-the-market.vercel.app/:path*',
    //         },
    //     ];
    // }

};

export default nextConfig;
