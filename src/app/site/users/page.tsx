
"use client";

//import Link from 'next/link';

import Table from '../../../components/Table/Table';

export default function Page() {
	return (
		<div>
			<Table
				title="Users"
				src="/api/data/users/search"
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
						field: 'username',
						headerName: 'Username',
						valueFormatter: (value:any) =>
						{
							return `${value}`;
						}
					},
				]}
				links={{
					'add': '/site/users/_',
				}}
			/>
		</div>
	);
}
