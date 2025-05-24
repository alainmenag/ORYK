
'use client';

// ResizeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type ResizeContextType = {
	width: number;
	height: number;
};

const ResizeContext = createContext<ResizeContextType | null>(null);

export const ResizeProvider = ({ children }: { children: React.ReactNode }) => {
	const [size, setSize] = useState<ResizeContextType>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		const debounce = (fn: () => void, delay: number) => {
			let timer: ReturnType<typeof setTimeout>;
			return () => {
				clearTimeout(timer);
				timer = setTimeout(fn, delay);
			};
		};

		const debouncedHandleResize = debounce(handleResize, 150);

		window.addEventListener('resize', debouncedHandleResize);
		return () => window.removeEventListener('resize', debouncedHandleResize);
	}, []);

	return (
		<ResizeContext.Provider value={size}>
			{children}
		</ResizeContext.Provider>
	);
};

export const useResize = () => {
	const context = useContext(ResizeContext);
	if (!context) throw new Error('useResize must be used within a ResizeProvider');
	return context;
};
