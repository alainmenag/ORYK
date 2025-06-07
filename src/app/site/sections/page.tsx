
"use client";

import Link from 'next/link';

import Table from '../../../components/Table/Table';

export default function Page() {
	return (
		<div>
			<Table
				title="Sections"
				src="/api/data/sections/search"
				columns={[
					{
						field: '_id',
						headerName: 'ID',
						minWidth: 240,
						visible: true,
						renderCell: (params:any) => (
							<Link href={`/site/sections/${params.value}`} style={{ textDecoration: 'none', color: 'inherit' }}>{params.value}</Link>
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
					'add': '/site/sections/_',
				}}
			/>
		</div>
	);
}
