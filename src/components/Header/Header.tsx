
// Header.tsx

'use client';

import './Header.scss?v=1.1.4';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import Nav from '../Nav/Nav';
import Icon from '../Icon/Icon';

export default function Navigator(attrs: any)
{
	const headerRef:any = useRef({});

	const [ mobile, setMobile ] = useState({
		open: false,
		//open: true,
		top: 0,
	});

	useEffect(() =>
	{
		const header = headerRef.current;
		
		if (!header) return;
	
		let timeout: NodeJS.Timeout;
	
		const updateHeader = () =>
		{
			const logo = document.querySelector('.logo');
			const logoRect = logo?.getBoundingClientRect();
			//const headerRect = header.getBoundingClientRect();

			//const lastToUnfit = [ ...document.querySelectorAll('header li[data-level="0"]:not(.unfit):not(.ancestor):not(.active)') ].pop();

			const lastToUnfit = [ ...document.querySelectorAll('header li[data-level="0"]:not(.unfit)') ].pop();

			const lastToUnfitRect:any = lastToUnfit ? lastToUnfit.getBoundingClientRect() : {};

			const nextToFit = [ ...document.querySelectorAll('header li[data-level="0"].unfit') ][0]
			//const nextToFitRect:any = nextToFit ? nextToFit.getBoundingClientRect() : {};

			if (logoRect && logoRect.x <= 15 && lastToUnfit)
			{
				lastToUnfit.classList.add('unfit');
				lastToUnfit.setAttribute('data-min-width', lastToUnfitRect.width);

				updateHeader();
			}
			else if (nextToFit)
			{
				const minWidth = nextToFit.getAttribute('data-min-width');
				const minWidthNum = minWidth ? parseFloat(minWidth) : 0;

				if (logoRect && logoRect.x > (minWidthNum + 15))
				{
					nextToFit.classList.remove('unfit');
					nextToFit.removeAttribute('data-min-width');

					updateHeader();
				}
			}

			if (nextToFit)
			{
				header.setAttribute('data-mobile', nextToFit.getAttribute('data-min-width') ? true : (mobile.open || false));
			}
		};
	
		const observer = new ResizeObserver(() =>
		{
			clearTimeout(timeout);

			timeout = setTimeout(updateHeader); // debounce
		});
	
		observer.observe(header);

		updateHeader();

		return () =>
		{
			clearTimeout(timeout);

			observer.disconnect(); // keep this
		};
	}, [ mobile.open ]);

	return (
		<header
			data-open={ mobile.open }
			data-mobile="false"
			className="header"
			ref={ headerRef }
		>
			<div className="inner-header-wrapper">
				<div className='nav-container'>
					<div className="nav-wrapper">

						<div className='logo'>
							<Link href="/" className='branding'>
								<Icon src={ attrs.logo || '/icons/oryk-logo.svg?v=1.1.4' } />
							</Link>
							<Link href="/access" className='avatar'>
								<Icon
									src={ `/api/access/avatar/${ attrs?.session?._id || 'guest' }?v=1.1.4` }
								/>
							</Link>
						</div>

						<Nav links={ attrs.links } />

						<div className='button'>
							<div className="menu-icon" onClick={ () =>
							{
								const top = window.scrollY;
								const open = !mobile.open;
								const header = headerRef.current;
								const scroll = header.getAttribute('data-top') || 0;

								header.setAttribute('data-top', open ? top : 0);

								setTimeout(() =>
								{
									window.scrollTo({ top: scroll });
								});

								setMobile({ ...mobile, open: open });
							} }>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>

					</div>

				</div>
				<div>
				</div>
			</div>
		</header>
	);
}
