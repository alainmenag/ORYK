
"use client";

import Table from '../../../components/Table/Table';

export default function Page() {
	return (
		<div>
			<Table
				title="Variables"
				src="/api/data/variables/search"
				columns={[
					{
						field: '_id',
						headerName: 'ID',
						minWidth: 240,
						visible: false,
						valueFormatter: (value:any) =>
						{
							return `${value}`;
						}
					},
					{
						field: 'name',
						headerName: 'Name',
						valueFormatter: (value:any) =>
						{
							return `${value}`;
						}
					},
				]}
				links={{
					'add': '/site/variables/_',
				}}
			/>
		</div>
	);
}
