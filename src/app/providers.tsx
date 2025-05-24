
'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import createEmotionCache from '@emotion/cache';
import { ReactNode } from 'react';

const clientSideEmotionCache = createEmotionCache({ key: 'css', prepend: true });
const theme = createTheme(); // You can customize it

export function Providers({ children }: { children: ReactNode }) {
	return (
		<CacheProvider value={ clientSideEmotionCache }>
			<ThemeProvider theme={ theme }>
				{ children }
			</ThemeProvider>
		</CacheProvider>
	);
}
