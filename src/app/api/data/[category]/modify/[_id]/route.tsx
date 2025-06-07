
import { getMeta } from '../../../../../../helpers/location';

import { ObjectId } from 'mongodb';

export async function DELETE(
	request: Request
	, { params }: any
) {
	const paramList = await params;
	const meta = await getMeta({});

	const { db, hostname } = meta;
	const { category, _id } = paramList;

	const removed = await db.collection('profiles').findOneAndDelete({
		category: category,
		_id: new ObjectId(_id),
		hosts: hostname, // Ensure the host is the one trying to delete
	});

	return new Response(null, {
		status: removed ? 303 : 404,
		headers: {
			...(
				removed ? { 'Location': `/site/${category}` } : {}
			)
		},
	});
};

export async function POST(
	request: Request
	, { params }: any
) {
	const paramList = await params;
	const meta = await getMeta({});
	const data = await request.json();
	const ts = new Date();

	const { db, hostname } = meta;
	const { category, _id } = paramList;

	delete data._id; // Remove _id from the data to avoid conflicts
	delete data.category; // Remove category from the data to avoid conflicts
	delete data.updated;
	delete data.created;
	delete data.hosts;

	const create = _id === '_' || _id.length != 24;

	const doc:any = await db.collection('profiles').findOneAndUpdate({
		category: category,
		_id: create ? new ObjectId(): new ObjectId(_id),
	}, {
		$set: {
			touched: ts,
			...data,
		},
		$addToSet: {
			hosts: hostname,
		},
		$setOnInsert: {
			created: ts,
			updated: ts,
			category: category,
		},
	}, {
		upsert: true,
		returnDocument: 'after',
		projection: {
			password: 0, // Exclude password from the response
		}
	});

	if (create && doc) return new Response(null, {
		status: 303,
		headers: {
			'Location': `/site/${category}/${doc._id}`,
		},
	});

	return new Response(JSON.stringify({
		doc: doc ? doc : null,
		access: {
			read: true,
			write: true,
			delete: true,
		}
	}), {
		status: doc ? 200 : 500,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
