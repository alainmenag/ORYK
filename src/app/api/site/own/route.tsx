
import { ObjectId } from 'mongodb';

//import { getSession } from 'next-auth/react';
import { getMeta } from '../../../../helpers/location';

export async function POST(
	//request: Request
)
{
	const { db, session, hostname } = await getMeta({});

	if (!session?._id) return new Response(null, {
		status: 302,
		headers: {
			'Location': '/access?redirect=' + encodeURIComponent('/site'),
		},
	});

	const provider:any = await db.collection('profiles').findOneAndUpdate({
		category: 'providers',
		hosts: hostname,
	}, {
		$set: {
			touched: new Date(),
		},
		$setOnInsert: {
			created: new Date(),
			updated: new Date(),
			category: 'providers',
			hosts: [hostname],
			owners: [new ObjectId(session._id)],
		},
	}, {
		upsert: true,
		returnDocument: 'after',
	});

	if (provider._id) return new Response(null, {
		status: 302,
		headers: {
			'Location': '/site',
		},
	});

	return new Response(null, {
		status: 502,
	});
}
