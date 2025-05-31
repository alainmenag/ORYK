
import { getMeta } from '../../../../helpers/location';

export async function POST(
	request: Request
	, { params }: any
)
{
	const paramsList:any = await params;

	const meta = await getMeta({});
	const { db } = meta;

	//if (!meta.session) return new Response('Unauthorized', { status: 401 });

	const body = await request.json();
	// { startRow: 0, endRow: 25, sortModel: [], filterModel: {} }
	//sortModel: [ { sort: 'desc', colId: 'username' } ],

	const sort = body.sortModel.reduce((acc:any, sort:any) => {
		acc[sort.colId] = sort.sort === 'asc' ? 1 : -1;
			return acc;
		}
	, {});

	const users = await db.collection('profiles').find({
		category: paramsList.category,
	}, {
		projection: {
			password: 0, // Exclude password field
		}
	}).sort(sort).skip(body.startRow).limit(body.endRow - body.startRow).toArray();

	if (!users.length) return new Response(null, {
		status: 404,
	});

	return new Response(JSON.stringify({
		rows: users
	}), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
