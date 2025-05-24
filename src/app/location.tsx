
import clientPromise from '@/lib/mongodb';

import { headers } from 'next/headers';

export async function location({ props }: any)
{
	const params = await props.params;
	const query = await props.searchParams;
	const client = await clientPromise;

	const headersList = await headers();
	const hostname = process.env.HOSTNAME || headersList.get('host');
	const pathname = `${ headersList.get('x-pathname') }`;
	const db = client.db('oryk');

	const provider:any = await db.collection('profiles').findOne({
		category: 'providers',
		hosts: hostname,
	}) || {};

	provider.colors = {
		primary: '#E91E63',
		secondary: '#3f51b5',
		light: '#f2f2f2',
		dark: '#0d1128',
		...(provider.colors || {}),
	};

	const page:any = await db.collection('profiles').findOne({
		category: 'pages',
		hosts: hostname,
		slug: pathname,
	}) || {};

	let title = provider.title;

	if (pathname) title = ` ${`${ pathname }`.toUpperCase().split('/').join(' | ')} - ${ provider.title }`;

	if (page?.title) title = `${ page.title } - ${ provider.title }`;

	if (!page?._id) title = `Page Not Found - ${ provider.title }`;

	return { params, query, provider, page, title, hostname, pathname, db };
}
