
import Table from '../../../components/Table/Table';

export default async function Page() {
	return (
		<div>
			<Table src="/api/data/variables" columns={[
				{
					field: "name",
					sortable: true,
					filter: true,
				}
			]} />
		</div>
	);
}
