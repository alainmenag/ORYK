
import Form from '../../../../components/Form/Form';

export default async function Page({ params }: any)
{
	const paramsList = await params;

	const _id = paramsList._id;
	
	return (
		<div>
			<Form
				leave="/site/sections"
				src={`/api/data/sections/view/${_id}`}
				action={`/api/data/sections/modify/${_id}`}
				fieldsets={[
					{
						id: 'main',
						fields: [
							{
								id: 'title',
								label: 'Title',
								type: 'text',
								required: true,
								help: 'Ex: Discounts',
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
