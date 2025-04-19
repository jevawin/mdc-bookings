import styles from './foo.module.css';

export type TFoo = {
	title: string;
	bodyText?: string;
};

export const Foo: React.FC<TFoo> = ({ title, bodyText }) => {
	return (
		<div className={styles.base} data-e2e-id="foo">
			{title}

			{bodyText ? <p>{bodyText}</p> : null}
		</div>
	);
};
