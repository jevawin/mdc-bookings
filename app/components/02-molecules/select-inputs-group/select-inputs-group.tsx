import { Select, type TSelect } from '~/components/01-atoms/select/select.tsx';
import styles from './select-inputs-group.module.css';
import { Text } from '~/components/01-atoms/text/text.tsx';

export type TSelectInputsGroup = {
	items: TSelect[];
	label?: string;
	description?: string;
	isRequired: boolean;
};

export const SelectInputsGroup: React.FC<TSelectInputsGroup> = ({
	items,
	label,
	description,
	isRequired,
}) => {
	const reqOpt = isRequired ? '(Required)' : '(Optional)';

	return (
		<>
			<div className={styles.base}>
				<div className={styles.textWrapper}>
					{label ? (
						<Text weight="200">
							{label}{' '}
							<Text weight="200" color="brand">
								{reqOpt}
							</Text>
						</Text>
					) : null}
					{description ? (
						<Text weight="100">{description}</Text>
					) : null}
				</div>
				<fieldset className={styles.inputsContainer}>
					{items.map((item) => {
						return (
							<Select
								isRequired
								key={item.label}
								label={item.label}
								labelPosition={item.labelPosition}
								options={item.options}
								className={item.className}
							/>
						);
					})}
				</fieldset>
			</div>
		</>
	);
};
