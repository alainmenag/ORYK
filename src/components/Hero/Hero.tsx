
import './Hero.scss?v=1.1.2';

import Elements from '../Elements/Elements';

export default async function Hero(attrs: any) {

	//console.log(attrs);

	return (
		<div className='container'>
			<div
				className={`hero ${attrs.mirror ? 'mirror' : ''}`.trim()}
				style={{
					color: attrs.color || 'inherit',
				}}
			>
				{attrs.image ? (
					<div className='side left'
						style={{
							backgroundImage: attrs.backgroundImage ? `url(${attrs.backgroundImage})` : 'none',
							backgroundSize: 'cover',
						}}>
						<div className='inside' style={{
							backdropFilter: 'blur(15px)',
						}}>
							<Elements
								alt={attrs.alt}
								image={attrs.image}
							/>
						</div>
					</div>
				) : null}
				<div className='side right'>
					<div className='inside'>
						<Elements
							title={attrs.title}
							heading={attrs.heading}
							description={attrs.description}
							list={attrs.list}
							price={attrs.price}
							actions={attrs.actions}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
