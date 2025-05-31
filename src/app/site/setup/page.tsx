
import React from 'react';
import { Panel } from 'primereact/panel';

export default function Page() {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '5px',
		}}>

			<Panel header="Owner">
				<p className="m-0">
					Check..
				</p>
			</Panel>

			<Panel header="Metadata">
				<p className="m-0">
					Check..
				</p>
			</Panel>

			<Panel header="Security">
				<p className="m-0">
					Check..
				</p>
			</Panel>

			<Panel header="Environment">
				<p className="m-0">
					Check..
				</p>
			</Panel>

		</div>
	)
}
