
// Nav.tsx

'use client';

import React from 'react';
import Link from 'next/link';

import Icon from '../Icon/Icon';

import { usePathname } from 'next/navigation';

function renderLinks(links: any[], pathname: string, level: number): React.ReactNode
{
	return links.map((link: any) =>
	{
		//if (link.weight == -1) return null;

		const isActive = pathname === link.slug;
		const isPath = link.slug != '/' ? pathname.includes(link.slug) : false;

		const className = `${isPath && isPath != isActive ? 'ancestor' : ''} ${isActive ? 'active' : ''}`.trim();

		return (
			<li
				key={link._id}
				data-level={ level || 0 }
				className={`${ className }`}
			>

				<Link
					href={link.slug}
					className={`${ className }`}
				>
					{ isActive || isPath ? <Icon className="tic" src="keyboard-arrow-right" /> : null}
					{ link.icon ? (<Icon className="img" { ...link.icon } />) : null }
					<span>{link.title}</span>
					{ link.children && link.children.length > 0 ? <Icon src="arrow-drop-down" /> : null }
				</Link>

				{link.children && link.children.length > 0 && (
					<ul>
						{ renderLinks(link.children, pathname, (level || 0) + 1) }
					</ul>
				)}

			</li>
		);
	});
}

function buildTreeFromSlugs(items: any[]): any[]
{
	const root: any[] = [];
	const map = new Map<string, any>();

	// First, map all items
	for (const item of items)
	{
		map.set(item.slug, { ...item, children: [] });
	}

	for (const item of items)
	{
		const segments = item.slug.split('/').filter(Boolean);

		if (!segments.length || segments.length === 1)
		{
			// Top-level
			root.push(map.get(item.slug)!);
		}
		else
		{
			// Remove last segment to get parent slug
			const parentSlug = '/' + segments.slice(0, -1).join('/');
			const parent = map.get(parentSlug);
			
			if (parent)
			{
				parent.children?.push(map.get(item.slug)!);
			}
		}
	}

	return root;
}

function deepSanitize(links: any[]): any[]
{
	return links.map(link => ({
		_id: link._id.toString(),
		title: link.title.toString(),
		slug: link.slug.toString(),
		icon: link.icon,
		children: link.children ? deepSanitize(link.children) : [],
		weight: link.weight,
	}));
}

export default function Nav({ links }: { links: any[] })
{
	const pathname = usePathname();

	links = links.map((link: any) => ({
		_id: link._id?.toString() ?? '',
		title: link.title?.toString() ?? '',
		slug: link.slug?.toString() ?? '',
		icon: link.icon,
		weight: link.weight,
	}));

	const sanitizedLinks = deepSanitize(links);
	
	links = buildTreeFromSlugs(sanitizedLinks);

	return (
		<nav className='navbar'>
			<ul>
				{ renderLinks(links, pathname, 0) }
			</ul>
		</nav>
	);
}
