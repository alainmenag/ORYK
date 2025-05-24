import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: [
		'127.0.0.1',
		'localhost',
		'::1',
		process.env.DEV_ENV_IP || 'localhost',
	]
};

export default nextConfig;
