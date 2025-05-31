
"use client";

import Link from 'next/link';

import Table from '../../../components/Table/Table';

export default function Page() {
	return (
		<div>
			<Table src="/api/data/users" columns={[
				{
					field: "username",
					sortable: true,
					filter: true,
					cellRenderer: (params: any) => {
						if (!params?.data?._id) return null;

						return <Link href={`/site/users/${ params.data._id }`}>{ params.value }</Link>;
					},
				},
			]} />
		</div>
	);
}
