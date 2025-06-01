import { Radio, type TRadio } from '~/components/01-atoms/radio/radio';
import styles from './form-inputs-group.module.css';
import { Text } from '~/components/01-atoms/text/text';

export type TFormInputsGroup = {
	items: TRadio[];
	label?: string;
	isRequired?: boolean;
};

export const FormInputsGroup: React.FC<TFormInputsGroup> = ({
	items,
	label,
	isRequired,
}) => {
	return (
		<>
			<div className={styles.base}>
				{label ? <Text weight="200">{label}</Text> : null}
				<fieldset className={styles.inputsContainer}>
					{items.map((item) => {
						return <Radio {...item} />;
					})}
				</fieldset>
			</div>
		</>
	);
};
