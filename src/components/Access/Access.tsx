
'use client';

import React from 'react';

import Cookies from 'js-cookie'

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import './Access.scss?v=1.1.2';
import { useRouter } from 'next/navigation';

export default function Access(attrs: any)
{
	const router = useRouter();

	const [ form, setForm ] = React.useState({
		state: 'idle',
		register: false,
		success: '',
		info: '',
		error: '',
		username: '',
		password: '',
		newPassword: '',
		email: '',
		accessToken: attrs?.session?.accessToken || '',
	});

	const on:any = {};

	on['submit'] = async (e: any) =>
	{
		e.preventDefault();

		setForm({
			...form,
			success: '',
			info: '',
			error: '',
			state: 'processing',
		});

		let res:any = {}; try {
			res = await (await fetch('/api/access/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})).json();
		} catch(err:any)
		{
			res.stack = err;
			res.error = 'Authorization service is not reachable.';
		};

		setForm({
			...form,
			state: 'idle',
			info: res.info || '',
			error: res.error || '',
			success: res.success || '',
			username: '',
			password: '',
			newPassword: '',
			email: '',
			...res,
		});

		if (res.redirect) router.push('/');
	};

	on['reset'] = async () =>
	{
		setForm({
			...form,
			register: form.register ? false : true,
			success: '',
			info: '',
			error: '',
		});
	};

	on['register'] = async () =>
	{
		setForm({
			...form,
			register: form.register ? false : true,
			success: '',
			info: '',
			error: '',
		});
	};

	on['change'] = async (e: any) =>
	{
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	on['logout'] = async () =>
	{
		Cookies.remove('accessToken');

		setForm({
			...form,
			state: 'idle',
			success: '',
			username: '',
			password: '',
			newPassword: '',
			info: '',
			error: '',
			accessToken: '',
		});

		router.push('/');
	};
		
	return (
		<div className='access' style={{
			padding: '125px 45px',
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
		}}>

			<div className='container'>

				<form style={{
					maxWidth: '420px',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
				}} onSubmit={ on.submit }>

					<h1>Access</h1>

					{ !form.accessToken ? (
						<div>
							<input
								type="text"
								name="username"
								placeholder='Username'
								onChange={ on.change }
								value={ form.username }
								required
							/>
						</div>
					) : null }

					{ form.accessToken ? (
						<div>
							<input
								type="password"
								name="newPassword"
								placeholder='New Password'
								onChange={ on.change }
								disabled={ form.state === 'processing' }
								value={ form.newPassword }
								required
							/>
						</div>
					) : null }

					<div>
						<input
							type="password"
							name="password"
							placeholder='Password'
							onChange={ on.change }
							disabled={ form.state === 'processing' }
							value={ form.password }
							required
						/>
					</div>

					{ form.register ? (
						<div>
							<input
								type="email"
								name="email"
								placeholder='Email'
								onChange={ on.change }
								disabled={ form.state === 'processing' }
								value={ form.email }
								required
							/>
						</div>
					) : null }

					{ form.success ? (
						<div>
							<Alert severity="success">{ form.success }</Alert>
						</div>
					) : null }

					{ form.info ? (
						<div>
							<Alert severity="info">{ form.info }</Alert>
						</div>
					) : null }

					{ form.error ? (
						<div>
							<Alert severity="error">{ form.error }</Alert>
						</div>
					) : null }

					<div style={{
						display: 'flex',
						gap: '5px',
						alignItems: 'center',
					}}>

						{ form.state === 'processing' ? (
							<div style={{
								paddingRight: '5px',
							}}>
								<CircularProgress
									size={ 20 } />
							</div>
						) : null }

						<button
							type="submit"
							disabled={ form.state === 'processing' }
						>Submit</button>

						{ form.state === 'idle' && !form.accessToken ? (
							<button
								type="button"
								onClick={ on.register }
							>{ form.register ? 'Cancel' : 'Register' }</button>
						) : null }

						{ form.accessToken ? (
							<button
								type="button"
								onClick={ on.logout }
							>Logout</button>
						) : null }

					</div>

				</form>

			</div>

		</div>
	);
}
