
import clientPromise from '@/lib/mongodb';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//import { ObjectId } from 'mongodb';

import { getMeta } from '../../../../helpers/location';

export async function GET() {
	return new Response(null, { status: 401 });
}

export async function POST(request: Request) {
	const { hostname } = await getMeta({});

	const ts = new Date();
	const client = await clientPromise;
	const db = client.db('oryk');
	const body = await request.json(); // Parse JSON body

	let session: any = {}; if (body.accessToken) try {
		session = jwt.verify(body.accessToken, process.env.JWT_SECRET as string);
	} catch (error: any) {
		session.error = error.message;
	};

	// Pull user and creating if registering
	let user: any = await db.collection('profiles').findOneAndUpdate({
		category: 'users',
		username: body.username,
	}, {
		$set: {
			touched: ts,
		},
		$addToSet: {
			hosts: hostname,
		},
	}, {
		upsert: false,
		returnDocument: 'after',
	});

	// registering
	if (!user && body.email && body.password)
	{
		user = await db.collection('profiles').findOneAndUpdate({
			category: 'users',
			username: body.username,
			password: null,
		}, {
			$set: {},
			$addToSet: {
				hosts: hostname,
			},
			$setOnInsert: {
				created: ts,
				updated: ts,
				category: 'users',
				username: body.username,
				email: body.email,
				password: await bcrypt.hash(body.password, 10),
			},
		}, {
			upsert: true,
			returnDocument: 'after',
		});
	}

	// login
	if (user && user?.password) {
		const isMatch = await bcrypt.compare(body.password, user.password);
		const token = isMatch ? jwt.sign(
			{ _id: user._id },
			process.env.JWT_SECRET as string,
			{ expiresIn: '7d' }
		) : null;

		if (token) return new Response(JSON.stringify({
			accessToken: token,
		}), {
			status: 303,
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': `accessToken=${token}; Path=/; SameSite=Strict; Max-Age=604800`,
				'Location': '/',
			},
		});
	}

	return new Response('Access failed.', {
		status: 401,
		headers: {},
	});
}
