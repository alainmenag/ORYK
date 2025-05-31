
import Table from '../../../components/Table/Table';

export default async function Page() {
	return (
		<div>
			<Table src="/api/data/sections" columns={[
				{
					field: "title",
					sortable: true,
					filter: true,
				}
			]} />
		</div>
	);
}
