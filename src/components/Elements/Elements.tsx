import React, {
	//ReactNode
} from 'react';

import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface ElementsProps {
	children?: any;
	loading?: boolean;
	data?: any;
	changes?: any;
	readOnly?: boolean;
}

const Elements: React.FC<ElementsProps> = (props:any) =>
{
	const { children, loading = false, readOnly = false } = props;

	const elements: any = children || [];
	const data = props.data || {};
	const changes = props.changes || {};

	const loaders:any = {
		text: { variant: 'text', width: '100%', height: '60px' },
		password: { variant: 'text', width: '100%', height: '60px' },
		number: { variant: 'text', width: '100%', height: '60px' },
		textarea: { variant: 'text', width: '100%', height: '120px' },
		fallback: { variant: 'text', width: '100%' }
	};

	return (
		<>
			{elements.map(function (element: any, index: number) {

				if (loading) {
					return (
						<div key={index} className="element">
							<Skeleton
								{...loaders[element.type] || loaders.fallback}
								sx={{
									transform: 'none',
								}}
							/>
						</div>
					);
				}

				else if (['text', 'password', 'number', 'textarea'].includes(element.type)) {
					return (
						<div key={index} className="element">
							<TextField
								id={element.id}
								label={element.label || ''}
								variant={element.variant || 'filled'}
								name={element.id}
								type={element.type}
								placeholder={element.placeholder || ''}
								required={element.required}
								multiline={element.type === 'textarea'}
								//min={element.min || ''}
								//max={element.max || ''}
								//step={element.step || ''}
								//pattern={element.pattern || null}
								//defaultValue={element.defaultValue || ''}
								helperText={element.help || ''}
								disabled={readOnly || element.disabled || false}
								autoComplete={element.autoComplete || 'off'}
								autoFocus={element.autoFocus || false}
								className={element.className || ''}
								aria-label={element['aria-label'] || ''}
								aria-describedby={element['aria-describedby'] || ''}
								aria-required={element['aria-required'] || false}
								aria-invalid={element['aria-invalid'] || false}
								aria-errormessage={element['aria-errormessage'] || ''}
								aria-autocomplete={element['aria-autocomplete'] || 'none'}
								aria-controls={element['aria-controls'] || ''}
								aria-activedescendant={element['aria-activedescendant'] || ''}
								aria-haspopup={element['aria-haspopup'] || false}
								defaultValue={data[element.id] || ''}
								onChange={ (event:any) =>
								{
									const value = event.target.value;

									// test if regex
									if (element.regex && !new RegExp(element.regex).test(value))
									{
										return event.target.value = '';
									}

									data[element.id] = value;
									
									changes[element.id] = Date.now();
								}}
							/>
						</div>
					);
				}

				else if (['button', 'reset', 'submit', 'delete'].includes(element.type)) {
					return (
						<div key={ index } className="element">
							<Button
								variant={ element.variant === null ? null : element.variant || 'contained' }
								type={ element.type || 'button' }
								color={ element.color || 'primary' }
								value={ element.value || null }
								onClick={ element.onClick || null }
							>
									{(element.label || `Button ${ element.id }`).trim().toUpperCase()}
							</Button>
						</div>
					);
				}

				else {
					return (
						<div key={ index } className="element text-center">No element match.</div>
					);
				}

			})}
		</>
	);
};

export default Elements;
