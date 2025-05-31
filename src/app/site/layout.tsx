
'use client';

import { useEffect, useState } from 'react';
import React from 'react';

import './site.scss?v=1.1.2';

import Nav from '../../components/Nav/Nav';

import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function SiteLayout({ children }: { children: React.ReactNode })
{
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
	// Assuming the component is now rendered
		setIsLoaded(true);
	}, []);

	return <div id="site" className={isLoaded ? '' : 'loading'} style={{
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
					{
						title: 'Home',
						slug: '/',
					},
					/*
					{
						title: 'Site',
						slug: '/site',
					},
					{
						title: 'Users',
						slug: '/site/users',
					},
					{
						title: 'Roster',
						slug: '/site/users/roster',
					},
					{
						title: 'Pages',
						slug: '/site/pages',
					},
					{
						title: 'Sections',
						slug: '/site/sections',
					},
					{
						title: 'Variables',
						slug: '/site/variables',
					},
					*/
					{
						title: 'Setup',
						slug: '/site/setup',
					},
				] } />
			</SplitterPanel>

			<SplitterPanel
				className="flex align-items-center justify-content-center"
				size={75}
				minSize={50}
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
