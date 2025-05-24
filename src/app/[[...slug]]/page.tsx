
// page.tsx

"use server"

import Box from '@mui/material/Box';

import { location } from '../location'

import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Slideshow from '../../components/Slideshow/Slideshow';
import Footer from '../../components/Footer/Footer';

//import FeatureCard from '../../components/FeatureCard';
//import Card from '../../components/Card';
//import Tiers from '../../components/Tiers';

export async function generateMetadata(
	props: any
) {
	const loc: any = await location({ props });

	return {
		title: loc.title,
		description: loc.description,
	};
}

export default async function Page(
	props: any
) {
	const { provider, page, hostname, db } = await location({ props });

	const links: any = {};

	// setup page
	page.title = page?.title || 'Page';
	page.sections = page.sections || [];

	if (!page.sections.length && !provider?._id) page.sections = [{
		template: 'hero',
		title: 'Provider Not Found',
		description: 'There is no provider registered for this hostname.',
		style: {
			textAlign: 'center',
			//backgroundColor: 'red',
		}
	}];

	if (!page.sections.length && !page?._id) page.sections = [{
		template: 'hero',
		title: 'Page Not Found',
		description: 'The page you are looking for does not exist.',
		style: {
			textAlign: 'center',
		}
	}];

	// sections to lookup
	const lookups = [].concat(page.sections, provider.sections);

	// references to sections
	const glossary: any = lookups.length
		? (await db.collection('profiles')
			.find({ category: 'sections', _id: { $in: lookups } })
			.toArray())
			.reduce((acc: any, section: any) => {
				acc[section._id.toString()] = section;

				return acc;
			}, {})
		: {};

	// set page sections
	page.sections = lookups.reduce((acc: any[], section: any) => {
		const match = section && section.buffer ? glossary[section.toString()] : section;

		if (match) acc.push(section.buffer ? glossary[section.toString()] : section);
		return acc;
	}, []);

	if (!page?.sections?.length) page.sections.push({
		template: 'hero',
		title: 'Empty Page',
		description: 'No sections found for this page.',
		style: {
			textAlign: 'center',
		}
	});

	links.nav = (await db.collection('profiles').find({
		category: 'pages',
		hosts: hostname,
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

	links.footer = (await db.collection('profiles').find({
		category: 'pages',
		hosts: hostname,
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

	//console.log('provider', provider);
	//console.log('page', page);
	//console.log('links', links);

	return (
		<>

			<style>
				{`
					:root {
						--color-primary: ${provider.colors?.primary};
						--color-secondary: ${provider.colors?.secondary};
						--color-light: ${provider.colors?.light};
						--color-dark: ${provider.colors?.dark};
					}
				`}
			</style>

			<Header logo={provider.logo} links={links.nav} />

			<main style={{
				backgroundColor: '#ffffff',
			}}>
				{page?.sections?.map((section: any, $index: any) => {
					return (
						<Box component="section" key={$index} className="section" style={{
							width: '100%',
							backgroundColor: section?.background?.color || `rgba(0, 0, 0, ${$index * 0.1})`,
							...(section?.style || {}),
						}}>
							{section.template === 'hero' ? <Hero {...section} /> : null}
							{section.template === 'slideshow' ? <Slideshow {...section} /> : null}
						</Box>
					);
				})}
			</main>

			<Footer logo={provider.logo} links={links.footer} />

		</>
	);
}
