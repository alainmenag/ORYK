'use client';

import React, { useState, useEffect, useRef } from 'react';

const ResizableText: React.FC<{ children: any, props: any } & any> = ({ children, ...props }) =>
{
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [ fontSize, setFontSize ] = useState(15); // Starting font size

	let style = { ...props?.style };

	if (props?.style?.fontSize === 'auto') style = {
		...style,
		fontSize: `${ fontSize }px`,
		whiteSpace: 'normal', // allows text wrapping
		width: '100%', // Ensures the container width is fully responsive
		lineHeight: '1', // Adjust line height for better readability
		//overflow: 'hidden', // Prevent overflow
	 };

	// Function to update the font size based on the container width
	const updateFontSize = (containerWidth: number) =>
	{
		const newFontSize = Math.max(12, Math.min(containerWidth / 7, 100)); // min and max font sizes
		setFontSize(newFontSize);
	};

	useEffect(() =>
	{
		const container = containerRef.current;

		if (!container || !props?.style?.fontSize) return;

		const resizeObserver = new ResizeObserver((entries) =>
		{
			for (const entry of entries) {
				if (entry.contentRect) {
					updateFontSize(entry.contentRect.width);
				}
			}
		});

		resizeObserver.observe(container);

		// Clean up observer on unmount
		return () => {
			resizeObserver.disconnect();
		};
	}, [ props?.style?.fontSize ]);

	return (
		<div
			ref={ containerRef }
			style={ style }
			className={ props?.className }
		>{ children }</div>
	);
};

export default ResizableText;
