
"use client";

import Link from 'next/link';

import Table from '../../../components/Table/Table';

export default function Page() {
	return (
		<div>
			<Table
				title="Providers"
				src="/api/data/providers/search"
				columns={[
					{
						field: '_id',
						headerName: 'ID',
						minWidth: 240,
						visible: true,
						renderCell: (params:any) => (
							<Link href={`/site/providers/${params.value}`} style={{ textDecoration: 'none', color: 'inherit' }}>{params.value}</Link>
						)
					},
					{
						field: 'title',
						headerName: 'Title',
						valueFormatter: (value:any) =>
						{
							return `${value}`;
						}
					},
				]}
				links={{
					'add': '/site/providers/_',
				}}
			/>
		</div>
	);
}
