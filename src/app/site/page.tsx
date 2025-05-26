


export async function generateMetadata(
	props: any
) {
	const { params } = props;
	const slug = params?.slug || [];
	const pagePath = `/${slug.join('/')}`;

	return {
		title: `Page - ${pagePath}`,
		description: `Details for page at path ${pagePath}`,
	};
}
export default async function Page(
	props: any
) {
	const { params } = props;
	const slug = params?.slug || [];
	const pagePath = `/${slug.join('/')}`;

	return (
		<div>
			<h1>Page Details</h1>
			<p>Path: {pagePath}</p>
			<p>This is a placeholder for the page content at {pagePath}.</p>
			{/* Additional components or content can be added here */}
		</div>
	);
}