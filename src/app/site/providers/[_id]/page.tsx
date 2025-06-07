
import Form from '../../../../components/Form/Form';

export default async function Page({ params }: any)
{
	const paramsList = await params;

	const _id = paramsList._id;
	
	return (
		<div>
			<Form
				leave="/site/providers"
				src={`/api/data/providers/view/${_id}`}
				action={`/api/data/providers/modify/${_id}`}
				fieldsets={[
					{
						id: 'main',
						fields: [
							{
								id: 'title',
								label: 'Title',
								type: 'text',
								required: true,
								help: 'Ex: Hotel California',
							},
						],
					},
					{
						id: 'details',
						fields: [
							{
								id: 'description',
								label: 'Description',
								type: 'textarea',
							},
						],
					},
					{
						id: 'colors',
						title: 'Colors',
						fields: [
							{
								id: 'colors.primary',
								label: 'Primary',
								type: 'color',
							},
							{
								id: 'colors.secondary',
								label: 'Secondary',
								type: 'color',
							},
						],
					}
				]}
			/>
		</div>
	);
}
