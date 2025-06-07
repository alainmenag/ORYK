
import Form from '../../../../components/Form/Form';

export default async function Page({ params }: any)
{
	const paramsList = await params;

	const _id = paramsList._id;
	
	return (
		<div>
			<Form
				leave="/site/variables"
				src={`/api/data/variables/view/${_id}`}
				action={`/api/data/variables/modify/${_id}`}
				fieldsets={[
					{
						id: 'main',
						fields: [
							{
								id: 'title',
								label: 'Key',
								type: 'text',
								required: true,
								help: 'Ex: color',
							},
						],
					},
					{
						id: 'details',
						fields: [
							{
								id: 'description',
								label: 'Value',
								type: 'textarea',
								help: 'Ex: blue',
							},
						],
					}
				]}
			/>
		</div>
	);
}
