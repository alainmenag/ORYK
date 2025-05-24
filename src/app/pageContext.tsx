
'use client';

import { createContext, useContext } from 'react';

export const PageContext = createContext<any>(null);

export function usePage() {
	return useContext(PageContext);
}