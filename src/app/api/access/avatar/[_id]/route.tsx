
import { default as Avatar } from 'avatar-builder';

export async function GET(request: Request, { params }: any) {

	const paramsList = await params;
	
	const avatar = Avatar.builder(Avatar.Image.margin(Avatar.Image.circleMask(Avatar.Image.identicon())), 128, 128, { cache: Avatar.Cache.lru() });

	const avatarData = await avatar.create(paramsList._id || 'guest');

	return new Response(avatarData, {
		headers: {
			'Content-Type': 'image/png',
			//'Content-Length': String(buffer.length),
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0',
		},
	});
}
