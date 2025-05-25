import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	
	allowedDevOrigins: [
		'127.0.0.1',
		'localhost',
		'::1',
		process.env.DEV_ENV_IP || 'localhost',
		'oryk.com',
		'dev.oryk.com',
		'www.oryk.com',
	],

	// async rewrites() {
	// 	return [
	// 	  {
	// 	    source: '/storage/:slug*',
	// 	    destination: '/public/storage/:slug*', // Serve images from the public folder
	// 	  },
	// 	  {
	// 	    source: '/audio/:slug*',
	// 	    destination: '/public/audio/:slug*', // Serve audio from the public folder
	// 	  },
	// 	];
	//    },

};

export default nextConfig;
