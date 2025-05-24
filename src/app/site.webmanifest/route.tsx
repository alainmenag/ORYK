
export async function GET() {
	return new Response(JSON.stringify({
		"name": "ORYK",
		"short_name": "ORYK",
		"description": "My app",
		"start_url": "/",
		"display": "standalone",
		"background_color": "#000000",
		"theme_color": "#000000",
		"icons": [
			// {
			// 	"src": "/icons/icon-192x192.png",
			// 	"sizes": "192x192",
			// 	"type": "image/png"
			// },
			// {
			// 	"src": "/icons/icon-512x512.png",
			// 	"sizes": "512x512",
			// 	"type": "image/png"
			// }
		]
	}
	), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
