
// src/globals.d.ts
export {};

declare global {

	// Add the SVG declaration here
	declare module "*.svg?react" {
		const content: React.FC<React.SVGProps<SVGSVGElement>>;
		export default content;
	}

	interface Window {
		state:any;
	}

}
