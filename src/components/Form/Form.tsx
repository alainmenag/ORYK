"use client";

import './Form.scss?v=1.1.4';

import Alert from '@mui/material/Alert';
import Elements from '../Elements/Elements';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckIcon from '@mui/icons-material/Check';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Form(props: any) {
	const router = useRouter();

	const fieldsets = props.fieldsets || [];
	const [state, setState] = useState({
		loading: props.src ? true : false,
		error: '',
		redirect: '',
		dataset: {},
		changes: {},
		access: {
			read: false,
			write: false,
			delete: false,
			...(props.access || {}),
		},
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		if (event.preventDefault) event.preventDefault();

		if (!props.action) return;

		const nativeEvent: any = event.nativeEvent;
		const method = nativeEvent?.submitter?.value === 'delete' ? 'DELETE' : 'POST';

		let changed = null;

		const dataset: any = {}; // loop state.changes
		const ds: any = state.dataset || {};
		const cs: any = state.changes || {};
		//const cs: any = state.dataset || {}; // force entire dataset to be submitted

		for (const key in cs) {
			changed = Date.now(); dataset[key] = ds[key];
		}

		if (method === 'POST' && !changed) return setState({ ...state, error: 'No changes to submit.' });

		setState({ ...state, loading: true, error: '' });

		const res: any = await fetch(props.action, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataset),
		}).then(async (response) => {
			if (response.redirected) return { redirect: response.url };

			const body = await response.text();

			if (!response.ok) throw new Error(body || `HTTP error! status: ${response.status}`);

			const json = JSON.parse(body);

			return {
				error: '',
				changes: {},
				dataset: json.doc || {},
				access: json.access || {}
			};
		}).catch((error) => {
			return { error: error.message };
		});

		if (res.redirect) router.push(res.redirect);

		setState({
			...state,
			...res,
			loading: false,
		});
	};

	const loadData = async (src: any) => {
		setState({ ...state, loading: true, error: '', changes: {} });

		const res = await fetch(src).then(async (response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return { error: null, dataset: json.doc || {}, access: json.access || {} };
		}).catch((error) => {
			return { error: error.message };
		});

		setState({
			...state,
			...res,
			error: res.error || '',
			loading: false,
			changes: {},
		});
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		if (props.src) {
			event.preventDefault();

			loadData(props.src);
		}
	};

	useEffect(() => {
		if (props.src) loadData(props.src);
	}, []);

	const ds: any = state.dataset || {};

	return (
		<form
			className='form'
			onSubmit={handleSubmit}
			onReset={handleReset}
			style={{
				margin: 'auto',
				...(props.style || {}),
			}}
		>

			<nav>
				<div className="side left">
					{props.leave ? (
						<div>
							<IconButton onClick={() => router.push(props.leave)} title="Leave">
								<Badge color="secondary">
									<ExitToAppIcon />
								</Badge>
							</IconButton>
						</div>
					) : null}
					<div className="title">{ds?.title || ds?._id || props.title}</div>
				</div>

				<div className="side right"></div>

			</nav>


			{state.error ? (
				<div>
					<Alert
						severity="error"
						action={<Button
							color="inherit"
							size="small"
							title="Dismiss"
							onClick={() => setState({ ...state, error: '' })}
						>
							<CheckIcon />
						</Button>}
					>{state.error}</Alert>
				</div>
			) : null}

			{fieldsets.map((fieldset: any, i: any) => (
				<fieldset key={i} style={{
					...(fieldset.style || {}),
				}}>
					{fieldset.title ? (
						<legend>{fieldset.title}</legend>
					) : null}
					<Elements
						loading={state.loading}
						data={ds}
						changes={state.changes}
						readOnly={!state.access.write}
					>{fieldset.fields}</Elements>
				</fieldset>
			))}

			<fieldset>
				<Elements
					loading={state.loading}
					data={ds}
					changes={state.changes}
				>{[

					...(props.action ? [
					{
						type: state.loading ? 'spinner' : 'submit',
						label: 'Submit',
						id: 'submit',
						color: 'primary',
						disabled: !state.access.write,
					},
					] : []),

					...(state.access.delete ? [
						{
							type: 'button',
							label: 'Delete',
							value: 'delete',
							id: 'delete',
							color: 'error',
							confirm: true,
							onClick: (event: any) => {
								handleSubmit({
									...event,
									nativeEvent: {
										submitter: {
											value: 'delete',
										},
									},
								});
							}
						},
					] : []),

					...(props.src ? [
						{
							type: 'reset',
							label: 'Reload',
							id: 'reset',
							variant: null,
							confirm: true,
						},
					] : []),

				]}</Elements>
			</fieldset>

		</form>
	);
}
