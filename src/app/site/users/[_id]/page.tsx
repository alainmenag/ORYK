
import Form from '../../../../components/Form/Form';

export default async function Page({ params }: any)
{
	const paramsList = await params;

	const _id = paramsList._id;
	
	return (
		<div>
			<Form
				leave="/site/users"
				src={`/api/data/users/view/${_id}`}
				action={`/api/data/users/modify/${_id}`}
				fieldsets={[
					{
						id: 'main',
						fields: [
							{
								id: 'title',
								label: 'Title',
								type: 'text',
								required: false,
								help: 'Ex: CEO, Founder, etc.',
							},
							{
								id: 'username',
								label: 'Username',
								type: 'text',
								required: true,
								help: 'Ex: silly-rabbit',
							},
						],
					},
					{
						id: 'personal',
						title: 'Name',
						fields: [
							{
								id: 'fn',
								label: 'First',
								type: 'text',
							},
							{
								id: 'mn',
								label: 'Middle',
								type: 'text',
							},
							{
								id: 'ln',
								label: 'Last',
								type: 'text',
							},
						],
					},
					{
						id: 'contact',
						title: 'Contact',
						fields: [
							{
								id: 'email',
								label: 'Email',
								type: 'email',
							},
						],
					},
					{
						id: 'details',
						title: 'Details',
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
