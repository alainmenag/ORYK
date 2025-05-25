
import { promises as fs } from 'fs';

import path from 'path';

import giticon from 'giticon';

export async function GET(request: Request, { params }: any) {

	const paramsList:any = await params;
	
	const fallback = path.join(process.cwd(), 'src/svgs/noun-user-7562779.svg');
	const uid = paramsList._id || 'guest';
	
	let buffer:any = null;

	if (uid === 'guest') {
		buffer = await fs.readFile(fallback);
	} else {
		//buffer = await (Avatar.squareBuilder(264, { imageType: 'svg' })).create(uid);
		buffer = giticon(uid, {
			//background: [240, 240, 240, 255],
			background: [0, 0, 0, 0],
			margin:     0.2,
			size:       40,
			saturation: 0.7,
			brightness: 0.5
		});
	}

	return new Response(buffer, {
		headers: {
			//'Content-Type': 'image/png',
			'Content-Type': 'image/svg+xml',
			//'Content-Length': String(buffer.length),
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0',
		},
	});
}
