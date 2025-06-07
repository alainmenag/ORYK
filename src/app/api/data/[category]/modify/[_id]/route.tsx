
import {
	getMeta,
	//getSession,
} from '../../../../../../helpers/location';

import { ObjectId } from 'mongodb';

const messages:any = {
	'DuplicateKey': 'A document with that key already exists.',
};

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

	if (!meta?.session?._id) return new Response(null, { status: 401 });

	const { db, hostname } = meta;
	const { category, _id } = paramList;


	console.log('Modify:', category, _id, data);


	//return new Response(null, { status: 401 });



	delete data._id; // Remove _id from the data to avoid conflicts
	delete data.category; // Remove category from the data to avoid conflicts
	delete data.updated;
	delete data.created;
	delete data.hosts;
	delete data.owners;

	const create = _id === '_' || _id.length != 24;

	// might have to pre-fetch for given host

	// compound key: slug, hostname

	let doc: any = null; try {
		doc = await db.collection('profiles').findOneAndUpdate({
			_id: create ? new ObjectId() : new ObjectId(_id),
			owners: meta.session._id,
			//hosts: hostname, // Ensure the host is the one trying to modify
		}, {
			$set: {
				touched: ts,
				...data,
			},
			// $addToSet: {
			// 	hosts: hostname,
			// },
			$setOnInsert: {
				created: ts,
				updated: ts,
				category: category,
				hosts: [hostname],
				owners: [meta.session._id], // Ensure the owner is the session user
			},
		}, {
			upsert: true,
			returnDocument: 'after',
			projection: {
				password: 0, // Exclude password from the response
			}
		});
	} catch (err: any)
	{
		//console.log(err.keyPattern);

		return new Response(messages[err.codeName || 'DatabaseError'] || err.message, {
			status: 500,
		});
	};

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
