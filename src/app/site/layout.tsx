
import React from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import './site.scss?v=1.1.4';

import Nav from '../../components/Nav/Nav';

const pages:any = {};

pages['/'] = {
	title: 'Home',
	slug: '/',
};

pages['/site'] = {
	title: 'Site',
	slug: '/site',
};

pages['/site/providers'] = {
	title: 'Providers',
	slug: '/site/providers',
};

pages['/site/users'] = {
	title: 'Users',
	slug: '/site/users',
};

pages['/site/pages'] = {
	title: 'Pages',
	slug: '/site/pages',
};

pages['/site/sections'] = {
	title: 'Sections',
	slug: '/site/sections',
};

pages['/site/variables'] = {
	title: 'Variables',
	slug: '/site/variables',
};

export default function SiteLayout({ children }: { children: React.ReactNode })
{
	return <div id="site" style={{
		backgroundColor: '#f2f2f2',
	}}>

		<Splitter style={{
			minHeight: '100vh',
			backgroundColor: '#f2f2f2',
		}}>

			<SplitterPanel
				id="navigator"
				className="flex align-items-center justify-content-center"
				size={25}
				minSize={15}
			>
				<Nav links={ [
					...Object.values(pages),
				] } />
			</SplitterPanel>

			<SplitterPanel
				className="flex align-items-center justify-content-center"
				size={75}
				minSize={50}
				style={{
					overflowY: 'auto',
				}}
			>
				<div style={{
					width: '100%',
					padding: '5px',
				}}>
					{children}
				</div>
			</SplitterPanel>

		</Splitter>

	</div>;
}
