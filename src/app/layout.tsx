
import { Geist, Geist_Mono } from "next/font/google";

import Script from "next/script";

import { Providers } from '../helpers/providers';

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
