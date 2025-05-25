
import { promises as fs } from 'fs';

import path from 'path';

export async function GET() {
	const imagePath = path.join(process.cwd(), 'public/artwork/file-not-found.webp');
	const imageBuffer = await fs.readFile(imagePath);

	return new Response(imageBuffer, {
		headers: {
			'Content-Type': 'image/png',
			//'Content-Type': 'image/svg+xml',
		},
	});
}

export async function POST()
{
	return new Response(null, { status: 404 });
}
