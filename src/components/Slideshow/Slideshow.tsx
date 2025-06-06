
import './Slideshow.scss?v=1.1.4';

import Blocks from '../Blocks/Blocks';

export default async function Slideshow(attrs: any) {
	const style: any = {
		width: '100vw',
		minHeight: '100vh',
		color: attrs.color || 'inherit',
		backgroundColor: attrs.background?.color || 'inherit',
	};

	if (`${attrs?.background?.image}`.indexOf('/') > -1) style.backgroundImage = `url(${attrs.background?.image})`;
	if (`${attrs?.background?.image}`.indexOf('(') > -1) style.background = attrs.background.image;


	return (
		<div className={`slideshow`} style={style}>
			<div className="inside">
				<Blocks
					title={attrs.title}
					heading={attrs.heading}
					description={attrs.description}
					list={attrs.list}
					style={{ fontSize: 'auto' }}
				/>
			</div>
		</div>
	);
}
