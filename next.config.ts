import type { NextConfig } from "next";

const nextConfig: NextConfig = {

	turbopack: {
		// ...
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
	   },

	// Enable Turbopack
	// experimental: {
	// 	turbopack: true,
	// },

	allowedDevOrigins: [
		'127.0.0.1',
		'localhost',
		'::1',
		process.env.DEV_ENV_IP || 'localhost',
		'oryk.com',
		'dev.oryk.com',
		'www.oryk.com',
	],

	// Uncomment if you need rewrites
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
	// },

	webpack(config) {
		// Custom Webpack configuration for .svg files
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},

};

export default nextConfig;
