
import { Geist, Geist_Mono } from "next/font/google";

import Script from "next/script";

import { Providers } from '../helpers/providers';

// import 'primereact/resources/primereact.min.css';
// import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'primereact/resources/primereact.min.css'; // for PrimeReact core styles
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // for theme
import 'primeicons/primeicons.css'; // for PrimeIcons (if you need icons)

//import 'ag-grid-community/styles/ag-grid.css'; // Import ag-Grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Import theme styles

import "../styles/globals.scss";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" style={{
			backgroundColor: '#000000',
		}}>
			<head>

				<link rel="icon" href="/favicon.ico" />
				<link rel="manifest" href="/site.webmanifest" />

				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />

				<style>
					{`
						:root {
							--desktop: 1024px;
							--tablet: 768px;
							--mobile: 480px;
						}

						.loading {
							visibility: hidden;
						}
					`}
				</style>

			</head>
			<body
				className={ `${ geistSans.variable } ${ geistMono.variable } antialiased` }
			>
				
				<Providers>{ children }</Providers>

				<Script
					src="/vendor/jquery-3.7.1.min.js?v=1.1.2"
					strategy="afterInteractive"
				/>

				<Script
					src="/vendor/utterscroll-master/jquery-scrollable.js?v=1.1.2"
					strategy="afterInteractive"
				/>

				<Script
					src="/vendor/utterscroll-master/debiki-utterscroll.js?v=1.1.2"
					strategy="afterInteractive"
				/>

			</body>
		</html>
	);

}
