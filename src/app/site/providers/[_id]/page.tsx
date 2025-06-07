
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
							{
								id: 'slug',
								label: 'Slug',
								type: 'text',
								required: true,
								regex: '^/.*$',
								help: 'Ex: /provider',
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
					}
				]}
			/>
		</div>
	);
}
