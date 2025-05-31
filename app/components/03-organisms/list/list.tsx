import styles from './list.module.css';

export type TList = {
	tag?: 'ul' | 'ol';
	children?: React.ReactNode;
};
const ListRoot: React.FC<TList> = ({ tag: Tag = 'ul', children, ...rest }) => {
	return (
		<Tag className={styles.base} data-e2e-id="list" {...rest}>
			{children}
		</Tag>
	);
};

type TListItem = {
	children?: React.ReactNode;
};

const ListItem: React.FC<TListItem> = ({ children }) => (
	<li className={styles.listItem}>{children}</li>
);

export const List = {
	Root: ListRoot,
	Item: ListItem,
};
