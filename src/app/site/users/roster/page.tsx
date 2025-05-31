
"use client";

import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
	//borderColor: "#9696C8",
	wrapperBorder: false,
	//headerRowBorder: false,
	//rowBorder: { style: "dotted", width: 3 },
	//columnBorder: { style: "dashed" },
});

export default function Page(
	//props: any
) {
	// Row Data: The data to be displayed.
	const [
			rowData
			//, setRowData
		] = useState([
		{ _id: "xyz", username: "user1" },
	]);

	// Column Definitions: Defines the columns to be displayed.
	const [
		colDefs
		//, setColDefs
	]:any = useState([
		{ field: "_id" },
		{ field: "username" },
	]);

	const rowSelection:any = useMemo(() => {
		return {
			mode: 'multiRow'
		};

	}, []);

	const theme = useMemo(() => {
		return myTheme;
	}, []);

	const defaultColDef = useMemo(() => {
		return {
			flex: 1,
		};
	}, []);

	return (
		<div>

			<div style={{ minHeight: '100vh', height: '100vh' }} className="ag-theme-alpine">
				<AgGridReact
					//style={{ width: '100%', height: '100%', border: 'none' }}
					theme={theme}
					rowData={rowData}
					columnDefs={colDefs}
					rowSelection={rowSelection}
					defaultColDef={defaultColDef}
					animateRows={false}
				/>
			</div>

		</div>
	);
}
