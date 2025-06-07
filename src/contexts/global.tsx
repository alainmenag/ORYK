
"use client";

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import React from 'react';

import reducers from '../reducers/global';

const store = createStore(reducers);

interface GlobalContextProps {
	children: React.ReactNode;
}

export default function GlobalContext({ children }: GlobalContextProps)
{
	return <Provider store={store}>{children}</Provider>;
}
