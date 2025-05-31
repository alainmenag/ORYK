
"use client"

import React from 'react';

import { useRouter } from 'next/navigation';

import WarningIcon from '@mui/icons-material/Warning';
//import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function Page(
	props: any
) {
	const router = useRouter();

	const [processing, setProcessing] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const takeOwnership = () => {

		setProcessing(true);

		fetch(`/api/site/own`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.redirected) return router.push(response.url);

				if (!response.ok) throw new Error(response.statusText || 'Unknown error');

				return response.json();
			})
			.then(data => {
				setError(null);

				console.log('Ownership taken:', data);
			})
			.catch(error => {
				setError('Failed to take ownership: ' + error.message);
			})
			.finally(() => {
				setProcessing(false);
			});

	};

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: 5,
		}}>

			{error && (
				<Alert severity="error">{error}</Alert>
			)}

			{!props.owner ? (
				<Alert
					severity="warning"
					icon={processing ? <CircularProgress size={20} /> : <WarningIcon />}
					action={
						<Button
							color="inherit"
							size="small"
							disabled={processing}
							onClick={takeOwnership}
						>Take Ownership</Button>
					}
				><b>{props.hostname}</b> is not owned.</Alert>
			) : (
				<div>Owned by <b>{props.owner}</b></div>
			)}

		</div>
	)
}
