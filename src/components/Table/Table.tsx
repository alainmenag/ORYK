
"use client";

import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridSortModel, GridFilterModel } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/navigation';

import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';

import {
	Toolbar,
	ToolbarButton,
	ColumnsPanelTrigger,
	FilterPanelTrigger,
	ExportCsv,
	//ExportPrint,
} from '@mui/x-data-grid';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CachedIcon from '@mui/icons-material/Cached';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
//import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

type ServerSideData = {
	event: string,
	src: string;
	error: any;
	rows: GridRowsProp;
	columns: GridColDef[];
	visibility: { [key: string]: boolean };
	rowCount: number;
	pageSize: number;
	page: number;
	loading: boolean;
	filter: any;
	sort: GridSortModel;
	query?: string;
};

//const StyledToolbar = styled(Toolbar)(({ theme }) => ({
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: 'flex',
	//justifyContent: 'space-between',
	//position: 'sticky', // Set it to sticky to keep it in place
	top: 0, // Ensure it sticks to the top
	zIndex: theme.zIndex.appBar, // Make sure it stays above other components
}));

const CustomToolbar = ({ scope }: { scope?: any }) => {
	return (
		<StyledToolbar>

			<Typography fontWeight="medium">{scope.title}</Typography>

			<Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 4 }} />

			<Tooltip title="Columns">
				<ColumnsPanelTrigger render={<ToolbarButton />}>
					<ViewColumnIcon fontSize="small" />
				</ColumnsPanelTrigger>
			</Tooltip>

			<Tooltip title="Filters">
				<FilterPanelTrigger
					render={(props, state) => (
						<ToolbarButton {...props} color="default">
							<Badge badgeContent={state.filterCount} color="primary" variant="dot">
								<FilterListIcon fontSize="small" />
							</Badge>
						</ToolbarButton>
					)}
				/>
			</Tooltip>

			{/* <Tooltip title="Print">
				<ExportPrint
					onClick={() => scope.handleSearch({ event: 'exportPrint' })}
					render={<ToolbarButton />}
				>
					<LocalPrintshopIcon fontSize="small" />
				</ExportPrint>
			</Tooltip> */}

			<Tooltip title="CSV">
				<ExportCsv
					onClick={() => scope.handleSearch({ event: 'exportCsv' })}
					render={<ToolbarButton />}
				>
					<FileDownloadIcon fontSize="small" />
				</ExportCsv>
			</Tooltip>

			<Tooltip title="Reload">
				<ToolbarButton onClick={() => scope.handleSearch({})}>
					<CachedIcon fontSize="small" />
				</ToolbarButton>
			</Tooltip>

			{ scope?.links?.add ? (
			<Tooltip title="Add">
				<ToolbarButton onClick={ () => {

					scope.router.push(scope.links.add);

				} }>
					<AddIcon fontSize="small" />
				</ToolbarButton>
			</Tooltip>
			) : null }

		</StyledToolbar>
	);
};

CustomToolbar.displayName = 'CustomToolbar';

export default function Table({ title, src, columns, callbacks, links }: { title?: string, src: string, columns?: any, callbacks?: any, links?: any }) {

	const router = useRouter();

	const [data, setData] = useState<ServerSideData>({
		event: 'loading',
		error: null,
		src: src,
		rows: [],
		columns: columns || [],
		rowCount: 0,
		page: 0,
		pageSize: 10,
		visibility: columns
			? columns.reduce((acc: Record<string, boolean>, col: any) => {
					acc[col.field] = col.visible;
					return acc;
			  }, {})
			: {},
		loading: true,
		filter: {
			items: [],
			logicOperator: 'and',
			quickFilterValues: [],
			quickFilterLogicOperator: 'and'
		},
		sort: [],
	});

	const handleSearch = async (options: any) => {

		const state = {
			...data,
			...options,
			loading: true,
			error: null,
		};

		setData(state);

		const response: any = await fetch(src, {
			method: 'POST',
			body: JSON.stringify({
				...state,
				rows: null,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let res: any = {}; try {
			res = await response.json();
		} catch (err: any) {
			res.error = err.toString();
		};

		setData({
			...state,
			...res,
			loading: false,
		});
	};

	const handlePageChange = async (params: any) => {
		handleSearch({
			event: 'pageChange',
			page: params.page,
		});
	};

	const handleSortModelChange = (newSortModel: GridSortModel) => {
		handleSearch({
			event: 'sortChange',
			sort: newSortModel,
			page: 0,
		})
	};

	const handleFilterModelChange = (newFilterModel: GridFilterModel) => {
		handleSearch({
			event: 'filterChange',
			filter: newFilterModel,
			page: 0,
		});
	};

	useEffect(() => {
		handleSearch({
			event: 'initialLoad',
			page: 0,
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div style={{ height: '100vh' }}>
			<DataGrid
				columns={data.columns}
				rows={data.rows}
				rowCount={data.rowCount}
				pageSizeOptions={[5, 10, 25, 50, 100]}
				disableRowSelectionOnClick
				//checkboxSelection
				paginationModel={{ page: data.page, pageSize: data.pageSize }}
				filterModel={data.filter}
				loading={data.loading}
				columnVisibilityModel={data.visibility}
				onColumnVisibilityModelChange={(model) => {
					setData((prev) => ({
						...prev,
						visibility: model,
					}));
				}}
				paginationMode="server"
				sortingMode="server"
				filterMode="server"
				onPaginationModelChange={handlePageChange}
				onSortModelChange={handleSortModelChange}
				onFilterModelChange={handleFilterModelChange}
				slots={{
					toolbar: CustomToolbar,
				}}
				slotProps={{
					toolbar: {
						scope: {
							handleSearch: handleSearch,
							title: data.loading ? 'Loading...' : title || '',
							router: router,
							src: data.src,
							callbacks: callbacks || {},
							links: links || {},
						}
					}
				}}
				showToolbar
			/>
		</div>
	);
}
