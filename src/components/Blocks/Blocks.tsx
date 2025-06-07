
import Link from 'next/link';
import Image from 'next/image';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

export default async function Blocks(attrs: any) {

	return (
		<>
			{Object.keys(attrs).map((attr, $index) => {

				//console.log(attr, attrs[attr]);

				if (attr === 'list') {
					return (
						<ul key={$index} className='list'>
							{Array.isArray(attrs[attr]) && attrs[attr].map((item: any, idx: number) => (
								<li key={idx} className='item'>
									{item.icon ? (
										<Icon src={item.icon} width="20" height="20" alt="Icon" />
									) : null}
									<span className='text'>{item.description}</span>
								</li>
							))}
						</ul>
					);
				}

				else if (attr === 'actions' && attrs[attr]) {

					return (
						<div key={$index} className='actions'>
							{Array.isArray(attrs[attr]) && attrs[attr].map((action: any, idx: number) => (
								<Link
									key={idx}
									href={action.href || '#'}
									className='action'
								>
									<span className='text'>{action.label}</span>
								</Link>
							))}
						</div>
					);
				}

				else if (attr === 'price' && attrs[attr]) {
					return (
						<div key={$index} className="price">
							<span className="prefix">
								{typeof attrs[attr] == 'object' && attrs[attr].length == 1 ? 'STARTING AT ' : null}
								{typeof attrs[attr] == 'object' && attrs[attr].length > 1 ? 'BETWEEN ' : null}
							</span>
							<span className="symbol">$</span>
							<span className="value">{attrs[attr].join(' - ')}</span>
						</div>
					);
				}

				else if (attr === 'image' && attrs[attr]) {
					return (
						<Image className='image' key={$index} src={attrs[attr]} width="300" height="300" alt={attrs.alt || "Image"} />
					);
				}

				else if (attr === 'title' || attr === 'heading') {
					return (
						<Text key={$index} className={`${attr}`} {...attrs}>{attrs[attr]}</Text>
					);
				}

				else if (attr === 'description') {
					return (
						<Text key={$index} className={`${attr}`} {...attrs}>{attrs[attr]}</Text>
					);
				}

				/*
				else if (typeof attrs[attr] === 'object' && attrs[attr] !== null) {
					return (
						<Text key={$index} className={`${attr}`} {...attrs}>{JSON.stringify(attrs[attr])}</Text>
					);
				}
				*/

				else if (typeof attrs[attr] === 'string') {
					return (
						<Text key={$index} className={`${attr}`} {...attrs}>{attrs[attr]}</Text>
					);
				}

			})}
		</>
	);
}
