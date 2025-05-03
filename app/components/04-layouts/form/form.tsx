import type { FormProps } from 'react-router';

import clsx from 'clsx';
import { Form as ReactForm, useNavigation } from 'react-router';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';

import styles from './form.module.css';

export type TForm = React.PropsWithChildren<{
	id: string;
	title: string;
	submitButtonText?: string;
}>;

type TFormProps = TForm & FormProps;

export const Form: React.FC<TFormProps> = ({
	id,
	title,
	method,
	submitButtonText,
	className,
	children,
	...rest
}) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<ReactForm
			id={id}
			title={title}
			name={title}
			method={method}
			className={clsx(styles.form, className)}
			data-e2e-id="form"
			{...rest}
		>
			{children}

			<Button
				type="submit"
				variant="primary"
				className={styles.button}
				aria-disabled={isSubmitting}
			>
				<ButtonContent.Text>
					{submitButtonText ?? 'Submit'}
				</ButtonContent.Text>
			</Button>

			{isSubmitting ? (
				<span className="srOnly" aria-live="assertive">
					Submitting form
				</span>
			) : null}
		</ReactForm>
	);
};
