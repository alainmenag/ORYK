
'use client';

import React from 'react';

import Form from '../../components/Form/Form';

import './Access.scss?v=1.1.4';

export default function Access() {

	const [state, setState] = React.useState({
		register: false,
	});

	return (
		<div className='access' style={{
			padding: '125px 45px',
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
		}}>

			<div className='container'>

				<Form
					style={{ maxWidth: '420px' }}
					action={`/api/access/login`}
					title="Access"
					access={{ read: true, write: true, delete: false }}
					fieldsets={[

						{
							id: 'main',
							fields: [
								{
									id: 'username',
									label: 'Username',
									type: 'text',
									required: true,
								},
							],
						},

						{
							id: 'password',
							fields: [
								{
									id: 'password',
									label: 'Password',
									type: 'password',
									required: true,
								},
							],
						},

						...(
							state.register ? [{
								id: 'actions',
								style: { flexDirection: 'column' },
								fields: [
									{
										id: 'email',
										label: 'Email',
										type: 'email',
										required: true,
									},
									{
										id: 'cancel',
										label: 'Cancel',
										type: 'button',
										onClick: () => setState({ ...state, register: false }),
									},
								],
							}] : []
						),

						...(
							!state.register ? [{
								id: 'actions',
								fields: [
									{
										id: 'signup',
										label: 'Sign Up',
										type: 'button',
										onClick: () => setState({ ...state, register: true }),
									},
								],
							}] : []
						),

					]}
				/>

			</div>

		</div>
	);
}
