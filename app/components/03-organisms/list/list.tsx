import {
	Text,
	type TTextSizes,
	type TTextWeights,
} from '~/components/01-atoms/text/text.tsx';
import styles from './list.module.css';

export type TList = { tag?: 'ul' | 'ol' };

type TListRoot = {
	tag?: 'ul' | 'ol';
	children?: React.ReactNode;
};
const ListRoot: React.FC<TListRoot> = ({
	tag: Tag = 'ul',
	children,
	...rest
}) => {
	return (
		<Tag className={styles.list} data-e2e-id="list" {...rest}>
			{children}
		</Tag>
	);
};

type TListItem = {
	children?: React.ReactNode;
	size?: TTextSizes;
	weight?: TTextWeights;
};

const ListItem: React.FC<TListItem> = ({ children, size, weight }) => (
	<Text tag="li" className={styles.listItem} size={size} weight={weight}>
		{children}
	</Text>
);

export const List = {
	Root: ListRoot,
	Item: ListItem,
};
