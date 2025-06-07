
import { getMeta } from '../../../../../../helpers/location';

import { ObjectId } from 'mongodb';

export async function GET(
	request: Request
	, { params }: any
) {
	const paramList = await params;

	const meta = await getMeta({});

	const { db } = meta;

	const _id = paramList._id;

	const doc = _id && _id.length == 24 && (await db.collection('profiles').findOne({
		_id: new ObjectId(_id)
	}, {
		projection: {
			password: 0, // Exclude password field
		}
	}) || null);

	return new Response(JSON.stringify({
		doc: doc || null,
		access: {
			read: true,
			write: true,
			delete: doc ? true : false,
		}
	}), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
