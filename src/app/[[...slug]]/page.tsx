
// page.tsx

"use server"

import Box from '@mui/material/Box';

import { getMeta, getLocation } from '../location';

import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Slideshow from '../../components/Slideshow/Slideshow';
import Footer from '../../components/Footer/Footer';
import Access from '../../components/Access/Access';

//import FeatureCard from '../../components/FeatureCard';
//import Card from '../../components/Card';
//import Tiers from '../../components/Tiers';

export async function generateMetadata(
	props: any
) {
	const location: any = await getMeta({ props });

	return {
		title: location.title,
		description: location.description,
	};
}

export default async function Page(
	props: any
) {
	const {
		provider,
		page,
		session,
		links,
	} = await getLocation({ props });

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
						--background: ${provider.colors?.background};
					}
				`}
			</style>

			<Header session={ session } logo={ provider?.logo } links={links.nav} />

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
							{section.template === 'hero' ? <Hero session={ session } {...section} /> : null}
							{section.template === 'slideshow' ? <Slideshow session={ session } {...section} /> : null}
							{section.template === 'access' ? <Access session={ session } {...section} /> : null}
						</Box>
					);
				})}
			</main>

			<Footer session={ session } logo={ provider?.logo } links={links.footer} />

		</>
	);
}
