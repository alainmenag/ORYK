
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

import { headers, cookies } from 'next/headers';

const pages:any = {};

pages['/access'] = {
	title: 'Access',
	description: 'Access',
	sections: [{
		template: 'access',
	}]
};

pages['/site/provider/404'] = {
	title: 'Provider',
	description: 'Provider',
	sections: [{
		template: 'hero',
		title: 'Provider Not Found',
		description: 'There is no provider registered for this hostname.',
		style: {
			textAlign: 'center',
		},
		actions: [{
			label: 'Site Settings',
			href: '/site',
			//href: `/access?redirect=${ encodeURIComponent('/site/provider') }`,
		}]
	}]
};

pages['/site/page/404'] = {
	title: `404`,
	description: 'Page Not Found',
	sections: [{
		template: 'hero',
		title: 'Page Not Found',
		description: 'The page you are looking for does not exist.',
		style: {
			textAlign: 'center',
		}
	}]
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

export async function getDb({
	//props
}: any)
{
	const client = await clientPromise;

	return client.db('oryk');
}

export async function getMeta({ props }: any)
{
	const params = props?.params ? await props.params : {};
	const query = props?.searchParams ? await props.searchParams : {};

	const headersList = await headers();
	const db = await getDb({ props });

	const hostname = process.env.HOSTNAME || headersList.get('host');
	const pathname = `${ headersList.get('x-pathname') }`;

	const session:any = await getSession();

	const provider:any = await db.collection('profiles').findOne({
		category: 'providers',
		hosts: hostname,
	}) || {
		title: hostname,
	};

	let page:any = pages[pathname] ? pages[pathname] : await db.collection('profiles').findOne({
		category: 'pages',
		hosts: hostname,
		slug: pathname,
	}) || {};

	// force provider page if no provider or page matched
	if (!page.title && !provider._id) page = pages['/site/provider/404'];

	// force NOT FOUND if no page matched
	if (!page.title && !page._id) page = pages['/site/page/404'];

	page.title = page?.title || 'Page';
	page.sections = page.sections || [];

	const title = `${ page.title } | ${ provider.title }`;

	// if a page has no sections
	if (!page.sections.length) page.sections = [{
		template: 'hero',
		title: 'Empty Page',
		description: 'This page has no content.',
		style: {
			textAlign: 'center',
		}
	}];

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

export async function getLocation({ props }: any)
{
	const meta = await getMeta({ props });

	meta.provider.colors = {
		primary: '#757575', // #757575
		secondary: '#CCCCCC',
		light: '#F2F2F2',
		dark: '#333333',
		background: '#000000',
		...(meta.provider.colors || {}),
	};

	const links: any = {};

	// sections to lookup
	const lookups = [].concat(meta.page.sections, meta.provider.sections);

	// references to sections
	const glossary: any = lookups.length
		? (await meta.db.collection('profiles')
			.find({ category: 'sections', _id: { $in: lookups } })
			.toArray())
			.reduce((acc: any, section: any) => {
				acc[section._id.toString()] = section;

				return acc;
			}, {})
		: {};

	// set page sections
	meta.page.sections = lookups.reduce((acc: any[], section: any) => {
		const match = section && section.buffer ? glossary[section.toString()] : section;

		if (match) acc.push(section.buffer ? glossary[section.toString()] : section);
		return acc;
	}, []);

	if (!meta.page?.sections?.length) meta.page.sections.push({
		template: 'hero',
		title: 'Empty Page',
		description: 'No sections found for this page.',
		style: {
			textAlign: 'center',
		}
	});

	links.nav = (await meta.db.collection('profiles').find({
		category: 'pages',
		hosts: meta.hostname,
		place: 'navigator',
		weight: { $ne: -1 }
	}, {
		projection: {
			title: 1,
			slug: 1,
			icon: 1,
			weight: 1,
		}
	}).sort({ weight: 1 }).toArray()).map(({ title, slug, icon, weight, _id }) => ({
		_id: _id.toString(),
		title,
		slug,
		icon,
		weight
	}));

	links.footer = (await meta.db.collection('profiles').find({
		category: 'pages',
		hosts: meta.hostname,
		place: 'quick',
		weight: { $ne: -1 }
	}, {
		projection: {
			title: 1,
			slug: 1,
			icon: 1,
			weight: 1,
		}
	}).sort({ weight: 1 }).toArray()).map(({ title, slug, icon, weight, _id }) => ({
		_id: _id.toString(),
		title,
		slug,
		icon,
		weight
	}));

	return {
		...meta,
		links,
	};
}
