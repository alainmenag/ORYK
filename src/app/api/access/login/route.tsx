
import clientPromise from '@/lib/mongodb';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ObjectId } from 'mongodb';

import { getMeta } from '../../../../helpers/location';

export async function GET()
{
	return new Response(null, { status: 401 });
}

export async function POST(request: Request)
{

	const { hostname } = await getMeta({});

	const client = await clientPromise;
	const db = client.db('oryk');
	const body = await request.json(); // Parse JSON body
	const response:any = {};

	let session:any = {}; if (body.accessToken) try {
		session = jwt.verify(body.accessToken, process.env.JWT_SECRET as string);
	} catch (error:any) {
		session.error = error.message;
	};

	// Pull user and creating if registering
	const user:any = await db.collection('profiles').findOneAndUpdate({
		category: 'users',
		...(
			session._id
			? { _id: new ObjectId(session._id) }
			: { username: body.username }
		)
	}, {
		$set: {
			touched: new Date(),
		},
		$addToSet: {
			hosts: hostname,
		},
		$setOnInsert: {
			created: new Date(),
			updated: new Date(),
			category: 'users',
			username: body.username,
			email: body.email,
			password: await bcrypt.hash(body.password, 10),
		},
	}, {
		upsert: body.register ? true : false,
		returnDocument: 'after',
	});

	if (user?.password)
	{
		const isMatch = await bcrypt.compare(body.password, user.password);
		const token = isMatch ? jwt.sign(
			{ _id: user._id },
			process.env.JWT_SECRET as string,
			{ expiresIn: '7d' }
		) : null;

		if (token)
		{
			response.register = false;
			response.accessToken = token;
			//response.cookie = `accessToken=${ token }; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`;
			//response.cookie = `accessToken=${ token }; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`;
			response.cookie = `accessToken=${ token }; Path=/; SameSite=Strict; Max-Age=604800`;
			//response.cookie = `accessToken=${ token }; Path=/; Max-Age=604800`;
		}
		
		if (token && !body.newPassword)
		{
			response.redirect = '/';
		}
		
		if (token && body.newPassword)
		{
			await db.collection('profiles').updateOne({
				category: 'users',
				_id: user._id,
			}, {
				$set: {
					updated: new Date(),
					password: await bcrypt.hash(body.newPassword, 10),
				},
			});
		}
	}

	if (!response.accessToken) response.error = 'Invalid credentials.';
	if (response.accessToken) response.success = 'Success.';

	return new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': response.cookie,
		},
	});
}
