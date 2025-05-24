
/*
module.exports = {
	apps: [
		{
			name: "oryk.com",
			script: "./server.production.sh",
			interpreter: "bash", // Ensures it runs as a bash script
			cwd: "/opt/oryk", // Set to your project directory
			env: {
				NODE_ENV: "production",
			},
			watch: false,
			autorestart: true,
			log_date_format: "YYYY-MM-DD HH:mm Z",
		},
	],
};
*/

module.exports = {
	apps: [
		{
			name: "oryk.com",
			script: "npm",
			args: "start", // Run the start script from package.json
			cwd: "/opt/oryk", // Set to your project directory
			env: {
				NODE_ENV: "production",
			},
			watch: false,
			autorestart: true,
			log_date_format: "YYYY-MM-DD HH:mm Z",
		},
	],
};
