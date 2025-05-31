
import React from 'react';

import { Panel } from 'primereact/panel';

import { getLocation } from '../../helpers/location';

import PageSession from './page.session';
import PageOwner from './page.owner';
import PageMetadata from './page.metadata';
import PageSecurity from './page.security';
import PageEnvironment from './page.environment';

export default async function Page(
	props: any
) {
	const location: any = await getLocation({ props });

	const { hostname, provider, session } = location;

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '5px',
		}}>

			<Panel header="Session">
				<PageSession exp={session.exp} _id={session._id} />
			</Panel>

			<Panel header="Owner">
				<PageOwner hostname={hostname} owner={provider.owners ?provider.owners.join(', ') : null} />
			</Panel>

			<Panel header="Metadata">
				<PageMetadata />
			</Panel>

			<Panel header="Security">
				<PageSecurity />
			</Panel>

			<Panel header="Environment">
				<PageEnvironment />
			</Panel>

		</div>
	)
}
