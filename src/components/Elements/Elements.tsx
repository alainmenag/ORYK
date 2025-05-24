
import Image from 'next/image';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

export default async function Card(attrs: any)
{
  return (
		<>
			{Object.keys(attrs).map((attr, $index) => {
				if (attr === 'list')
				{
					return (
						<ul key={$index} className='list'>
							{Array.isArray(attrs[attr]) && attrs[attr].map((item: any, idx: number) => (
								<li key={ idx } className='item'>
									{ item.icon ? (
										<Icon src={ item.icon } width="20" height="20" alt="Icon" />
									) : null}
									<span className='text'>{ item.description }</span>
								</li>
							))}
						</ul>
					);
				}
				else if (attr === 'price' && attrs[attr])
				{
					return (
						<div key={$index} className="price">
							<span className="prefix">
							{ typeof attrs[attr] == 'object' && attrs[attr].length == 1 ? 'STARTING AT ' : null }
							{ typeof attrs[attr] == 'object' && attrs[attr].length > 1 ? 'BETWEEN ' : null }
							</span>
							<span className="symbol">$</span>
							<span className="value">{ attrs[attr].join(' - ') }</span>
						</div>
					);
				}
				else if (attr === 'image' && attrs[attr])
				{
					return (
						<Image className='image' key={$index} src={ attrs[attr] } width="300" height="300" alt={ attrs.alt || "Image" } />
					);
				}
				else if (typeof attrs[attr] === 'string')
				{
					return (
							<Text key={$index} className={`${attr}`} {...attrs}>{ attrs[attr] }</Text>
					);
				}
			})}
		</>
  );
}
