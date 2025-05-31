"use client";

import {
	AllCommunityModule,
	ModuleRegistry,
	themeQuartz,
	InfiniteRowModelModule // Correct import for infinite row model
} from 'ag-grid-community';  // Import from ag-grid-community
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

// Register all necessary modules, including InfiniteRowModelModule
ModuleRegistry.registerModules([AllCommunityModule, InfiniteRowModelModule]);

const myTheme = themeQuartz.withParams({
	wrapperBorder: false,
});

export default function Page(props: any) {
	const src = props?.src || '/api/sample/list';

	const rowSelection:any = useMemo(() => {
		return { mode: 'multiRow' };
	}, []);

	const theme = useMemo(() => {
		return myTheme;
	}, []);

	// Fetching server-side data based on pagination, sorting, and filtering
	const getServerSideData = (params:any) => {
		// Fetch data from the server
		fetch(src, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params),
		})
			.then((response) => {
				return response.ok ? response.json() : null;
			})
			.then(data => {
				if (data) params.successCallback(data.rows, data.totalRowCount); // Pass data to AG-Grid
			})
			.catch(err => {
				console.error('Error fetching data:', err);

				params.failCallback(); // Handle failure case
			});
	};

	// Infinite Row Model DataSource for handling pagination, sorting, and filtering
	const infiniteDatasource = {
		getRows: (params:any) => {
			getServerSideData(params);
		},
	};

	// Event handler for grid initialization
	const onGridReady = (params:any) => {
		const { api } = params;

		api.setGridOption("datasource", infiniteDatasource);
	};

	// Grid options can be defined and passed to AgGridReact
	const gridOptions:any = {
		columnDefs: [
			{ field: "_id", hide: true, },
			...(props?.columns || [])
		],
		defaultColDef: {
			flex: 1,
			minWidth: 100,
			sortable: false,
		},
		animateRows: false,
		rowBuffer: 0,
		rowModelType: "infinite", // tell grid we want virtual row model type
		cacheBlockSize: 25, // how big each page in our page cache will be, default is 100
		cacheOverflowSize: 1,
		maxConcurrentDatasourceRequests: 1,
		infiniteInitialRowCount: 1,
		maxBlocksInCache: 1,
		// debug: true,
	};

	return (
		<div style={{ minHeight: '100vh', height: '100vh' }} className="ag-theme-alpine no-scroll">
			<AgGridReact
				gridOptions={gridOptions}  // Pass gridOptions here
				onGridReady={onGridReady}  // Use onGridReady to initialize datasource
				rowSelection={rowSelection}
				theme={theme}
				overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Loading...</span>"
				overlayNoRowsTemplate="<span class='ag-overlay-no-rows-center'>No rows to show</span>"
			/>
		</div>
	);
}
