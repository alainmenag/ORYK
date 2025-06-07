
import Form from '../../../../components/Form/Form';

export default async function Page({ params }: any)
{
	const paramsList = await params;

	const _id = paramsList._id;
	
	return (
		<div>
			<Form
				src={`/api/data/pages/view/${_id}`}
				action={`/api/data/pages/modify/${_id}`}
				fieldsets={[
					{
						id: 'main',
						fields: [
							{
								id: 'title',
								label: 'Title',
								type: 'text',
								required: true,
								help: 'Ex: My Page',
							},
							{
								id: 'slug',
								label: 'Slug',
								type: 'text',
								required: true,
								regex: '^/.*$',
								help: 'Ex: /path/to/page',
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
