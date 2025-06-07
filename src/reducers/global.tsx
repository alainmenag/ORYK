
export interface State {
	token?: string | null; // jwt token
	updated: number; // timestamp of last update
}

const initialState: State = {
	token: "asdafasfdasdf",
	updated: 0,
};

interface Action {
	type: string;
	payload?: any;
	store?: boolean;
}

// ==========================================================================
// REDUCER
// ==========================================================================

export default function reducer(
	state: State = initialState,
	action: Action
): State
{
	const ts = Date.now();

	switch (action.type)
	{

// ==========================================================================
// REDUCER - TIMESTAMP
// ==========================================================================

		case 'TIMESTAMP':
		{
			//console.log('***** TIMESTAMP:', action);

			return {
				...state,
				updated: ts,
			};
		}

// ==========================================================================
// REDUCER - DEFAULT
// ==========================================================================

		default:
		{
			return state;
		}
	}
}
