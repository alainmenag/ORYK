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
	]
};

export default nextConfig;
