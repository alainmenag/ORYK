import React, {
	//ReactNode
	useState,
} from 'react';

import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';

//import { Chrome } from '@uiw/react-color';
interface ElementsProps {
	children?: any;
	loading?: boolean;
	data?: any;
	changes?: any;
	readOnly?: boolean;
}

const Elements: React.FC<ElementsProps> = (props: any) => {
	const { children, loading = false, readOnly = false } = props;

	const elements: any = children || [];
	const data = props.data || {};
	const changes = props.changes || {};

	//const [ states, setStates ] = useState<any>({});

	const [reconfirm, setReconfirm] = useState('');

	const loaders: any = {
		text: { variant: 'text', width: '100%', height: '60px' },
		password: { variant: 'text', width: '100%', height: '60px' },
		number: { variant: 'text', width: '100%', height: '60px' },
		textarea: { variant: 'text', width: '100%', height: '120px' },
		fallback: { variant: 'text', width: '100%' }
	};

	return (
		<>
			{elements.map(function (element: any, index: number) {

				if (element.type === 'spinner') {
					return (
						<div key={index} className="element">
							<CircularProgress />
						</div>
					);
				}

				else if (loading) {
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

				else if ([
					'text',
					'password',
					'number',
					'textarea',
					'email',
					'color',
				].includes(element.type)) {

					let value = data[element.id] || '';

					// If nested object, resolve the value
					if (element.id.includes('.'))
					{
						const keys = element.id.split('.');

						value = keys.reduce((acc:any, key:any) => acc && acc[key], data);
					}
					
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
								defaultValue={value}
								onChange={(event: any) => {
									const value = event.target.value;

									// test if regex
									if (element.regex && !new RegExp(element.regex).test(value)) {
										return event.target.value = '';
									}

									data[element.id] = value;

									changes[element.id] = Date.now();
								}}
							/>
						</div>
					);
				}

				/*
				else if (['color'].includes(element.type)) {
					return (
						<div key={index} className="element no-scroll" style={{
							position: 'relative',
						}}>
							<Chrome
								style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}
								color={states[element.id] || '#333333'}
								onChange={(color) =>
								{
									setStates({
										...states,
										[element.id]: color.hex,
									});
								}}
							/>
						</div>
					);
				}
					*/

				else if (['button', 'reset', 'submit'].includes(element.type)) {
					const label = reconfirm === element.id ? 'CONFIRM' : (element.label || `Button ${element.id}`).trim().toUpperCase();

					let variant = element.variant === null ? null : element.variant || 'contained';

					if (reconfirm == element.id) variant = 'outlined';

					return (
						<div key={index} className="element">
							<ButtonGroup
								//disableElevation
								sx={{ width: '100%' }}
							>

								<Button
									variant={variant}
									type={element.type || 'button'}
									color={element.color || 'primary'}
									value={element.value || null}
									sx={{ width: '100%' }}
									onClick={(event) => {
										if (element.confirm && reconfirm != element.id) {
											event.preventDefault();

											setReconfirm(element.id);

											return;
										}

										setReconfirm('');

										if (element.onClick) element.onClick();
									}}
								>{label}</Button>

								{reconfirm == element.id ? (
									<Button
										variant={'contained'}
										type={element.type || 'button'}
										color={element.color || 'primary'}
										value={element.value || null}
										onClick={() => {
											setReconfirm('');
										}}
									>No</Button>
								) : null}

							</ButtonGroup>
						</div>
					);
				}

				else {
					return (
						<div key={index} className="element text-center">No element match.</div>
					);
				}

			})}
		</>
	);
};

export default Elements;
