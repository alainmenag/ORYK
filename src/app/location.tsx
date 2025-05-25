
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

import { headers, cookies } from 'next/headers';

const pages:any = {};

pages['/404'] = {
	title: `404`,
	description: 'Page Not Found',
};

pages['/access'] = {
	title: 'Access',
	description: 'Access',
	sections: [
		{
			template: 'access',
		},
	]
};

export async function getSession()
{
	const cookieStore = await cookies();

	let session:any = {
		accessToken: cookieStore.get('accessToken')?.value,
	}; if (session.accessToken) try {
		const decoded:any = jwt.verify(session.accessToken, process.env.JWT_SECRET as string);

		session = {
			...session,
			...(decoded || {})
		}
	} catch (error:any) {
		session.error = error.message;
	};

	return session;
}

export async function getLocation({ props }: any)
{
	const params = await props.params;
	const query = await props.searchParams;
	const client = await clientPromise;

	const headersList = await headers();

	const db = client.db('oryk');

	const hostname = process.env.HOSTNAME || headersList.get('host');
	const pathname = `${ headersList.get('x-pathname') }`;

	const session:any = await getSession();

	const provider:any = await db.collection('profiles').findOne({
		category: 'providers',
		hosts: hostname,
	}) || {
		title: hostname,
	};

	provider.colors = {
		primary: '#E91E63',
		secondary: '#3f51b5',
		light: '#f2f2f2',
		dark: '#0d1128',
		background: '#E91E63',
		...(provider.colors || {}),
	};

	const page:any = pages[pathname] ? pages[pathname] : await db.collection('profiles').findOne({
		category: 'pages',
		hosts: hostname,
		slug: pathname,
	}) || pages['/404'];

	let title = provider.title;

	if (page?.title) title = `${ page.title } | ${ provider.title }`;

	return {
		db,
		params,
		query,
		provider,
		page,
		title,
		hostname,
		pathname,
		session: session,
	};
}
