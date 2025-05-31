
"use client";

import { useEffect, useState } from 'react';

export default function Page(
	//props: any
) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// This will run only on the client side
		setIsMounted(true);
		// You can also perform other client-side operations here
	}, []);

	if (!isMounted) {
		// Render nothing or a loading state until the component is mounted
		return null;
	}

	return (
		<style>{`
			html {
				visibility: visible !important;
			}
		`}</style>
	);
}
