
import { getMeta } from '../../../../../helpers/location';

export async function GET(
	request: Request
	, { params }: any
) {
	const data = {
		rows: [{
			id: 1,
			name: 'John Doe',
			age: 30,
			city: 'New York',
			category: params.category, // Example category from params
			hosts: 'example.com', // Example host
		}], // Your data
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function POST(
	request: Request
	, { params }: any
) {
	const paramsList: any = await params;

	const meta = await getMeta({});
	const { db } = meta;

	//if (!meta.session) return new Response('Unauthorized', { status: 401 });

	const body = await request.json();
	const payload: any = {
		rowCount: 0,
		rows: [],
		page: body.page,
	};

	const sort = body?.sort.reduce((acc: any, sort: any) => {
		acc[sort.field] = sort.sort === 'asc' ? 1 : -1;
		return acc;
	}, {}) || {};

	const filter = body.filter.items.reduce((acc: any, filter: any) => {
		if (filter.operator === 'contains' && filter.value) {
			acc[filter.field] = { $regex: filter.value, $options: 'i' }; // Case-insensitive regex
		} else if (filter.operator === 'equals') {
			acc[filter.field] = filter.value;
		}
		else if (filter.operator === 'doesNotContain' && filter.value) {
			acc[filter.field] = { $not: { $regex: filter.value, $options: 'i' } }; // Case-insensitive regex
		} else if (filter.operator === 'doesNotEqual') {
			acc[filter.field] = { $ne: filter.value };
		} else if (filter.operator === 'startsWith' && filter.value) {
			acc[filter.field] = { $regex: `^${filter.value}`, $options: 'i' }; // Starts with
		} else if (filter.operator === 'endsWith' && filter.value) {
			acc[filter.field] = { $regex: `${filter.value}$`, $options: 'i' }; // Ends with
		} else if (filter.operator === 'isEmpty') {
			acc[filter.field] = { $eq: '' }; // Is empty
		} else if (filter.operator === 'isNotEmpty') {
			acc[filter.field] = { $ne: '' }; // Is not empty
		} else if (filter.operator === 'isAnyOf' && filter.value) {
			acc[filter.field] = { $in: filter.value }; // Is any of
		}
		return acc;
	}, {});

	const pageSize = body.pageSize || 10;
	const page = body.page || 0;

	const aggregate = [
		{ $match: { ...filter, category: paramsList.category, hosts: meta.hostname } },
		{ $project: { password: 0 } },
		{ $addFields: { id: '$_id' } },
		{
			$facet: {
				data: [
					...(Object.keys(sort).length ? [{ $sort: sort }] : []),
					{ $skip: page * pageSize },
					{ $limit: pageSize },
				],
				rowCount: [
					{ $count: 'count' }
				]
			}
		},
	];

	const docs = await db.collection('profiles').aggregate(aggregate).toArray();

	payload.rowCount = docs[0]?.rowCount[0]?.count || 0;
	payload.rows = docs[0]?.data || [];

	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
