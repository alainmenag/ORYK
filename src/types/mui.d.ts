// types/mui.d.ts
import { GridToolbarProps } from '@mui/x-data-grid';

declare module '@mui/x-data-grid' {
	// Add a comment or any dummy reference to avoid the unused import warning
	//type _GridToolbarPropsType = GridToolbarProps; // Reference here

	this.GridToolbarProps = GridToolbarProps;

	interface GridToolbarProps {
		scope?: any;
	}
}
