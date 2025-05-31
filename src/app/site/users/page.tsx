
import Table from '../../../components/Table/Table';

export default async function Page() {
	return (
		<div>
			<Table src="/api/data/users" columns={[
				{
					field: "username",
					sortable: true,
					filter: true,
				}
			]} />
		</div>
	);
}
