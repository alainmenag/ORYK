
import './Slideshow.scss?v=1.0.8a';

import Elements from '../Elements/Elements';

export default async function Slideshow(attrs: any)
{
  return (
		<div className={ `slideshow`} style={{
			width: '100vw',
			minHeight: '100vh',
			color: attrs.color || 'inherit',
			backgroundColor: attrs.background?.color || 'inherit',
			backgroundImage: attrs.background?.image ? `url(${ attrs.background?.image })` : 'none',
		}}>
			<div className="inside">
				<Elements
					title={ attrs.title }
					heading={ attrs.heading }
					description={ attrs.description }
					list={ attrs.list }
					style={ {fontSize: 'auto' }}
				/>
			</div>
		</div>
  );
}
