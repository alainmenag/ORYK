
"use client"

import React from 'react';

import { useRouter } from 'next/navigation';

import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function Page(
	props: any
) {
	const router = useRouter();

	return (
		<div>
			
			{ props?.exp && (
				<p>
					Session for <b>{props._id}</b> expires at <b>{new Date(props.exp * 1000).toLocaleString()}</b>
				</p>
			)}
			
			{ !props?.exp && (
				<Alert
					severity="warning"
					icon={<WarningIcon />}
					action={
						<Button
							color="inherit"
							size="small"
							onClick={() => {
								router.push('/access?redirect=' + encodeURIComponent('/site'));
							}}
						>Login</Button>
					}
				>{`You're not logged in.`}</Alert>
			)}

		</div>
	)
}
