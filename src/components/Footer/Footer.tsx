
// Footer.tsx

'use client';

import './Footer.scss?v=1.0.8';

import Link from 'next/link';

import Nav from '../Nav/Nav';
import Icon from '../Icon/Icon';

export default function Footer(attrs: any)
{
	return (
		<footer className={`footer`}>

			<div className="inside">
				<div className='container'>
					{ attrs?.links.length ? (
						<div className='side left'>
							
							<Nav links={ attrs.links } />

						</div>
					) : null }
					<div className={ attrs?.links.length ? 'side right' : 'side full' }>
						<Link href="/">
							<Icon src={ attrs.logo || "logo" } className="logo" />
						</Link>
					</div>
				</div>
			</div>

			<div className='copyright'>
				&copy; { new Date().getFullYear() } { attrs?.copyright || 'All rights reserved.' }
			</div>
			
		</footer>
	);
}
