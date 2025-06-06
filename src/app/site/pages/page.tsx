
"use client";

import Link from 'next/link';

import Table from '../../../components/Table/Table';

export default function Page() {
	return (
		<div>
			<Table
				title="Pages"
				src="/api/data/pages/search"
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
						field: 'title',
						headerName: 'Title',
						valueFormatter: (value:any) =>
						{
							return `${value}`;
						}
					},
					{
						field: 'slug',
						headerName: 'Slug',
						renderCell: (params:any) => (
							<Link href={params.value} style={{ textDecoration: 'none', color: 'inherit' }}>{params.value}</Link>
						)
					},
				]}
				links={{
					'add': '/site/pages/_',
				}}
			/>
		</div>
	);
}
