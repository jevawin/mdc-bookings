import type { TCallout } from '~/components/02-molecules/callout/callout.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { Callout } from '~/components/02-molecules/callout/callout.tsx';
import { Segment } from '~/components/04-layouts/segment/segment.tsx';

import styles from './hero.module.css';

export type THero = {
	id: string;
	title: string;
	bodyText?: React.ReactNode;
	callout?: TCallout;
};

type THeroRoot = {
	id: string;
	title?: string;
	children?: React.ReactNode;
};

const HeroRoot: React.FC<THeroRoot> = ({ id, title, children }) => {
	const titleId = `${id}-title`;

	return (
		<Segment.Root id={id} className={styles.hero} data-e2e-id="hero">
			<Segment.Container className={styles.container}>
				<div className={styles.inner}>
					{title ? (
						<Text tag="h1" size="500" weight="300" id={titleId}>
							{title}
						</Text>
					) : null}

					{children ? (
						<div className={styles.content}>{children}</div>
					) : null}
				</div>
			</Segment.Container>
		</Segment.Root>
	);
};

type THeroContent = {
	children: React.ReactNode;
};

const HeroContent: React.FC<THeroContent> = ({ children }) => (
	<div className={styles.content}>{children}</div>
);

type THeroBodyText = {
	children: React.ReactNode;
};

const HeroBodyText: React.FC<THeroBodyText> = ({ children }) => {
	return <div className={styles.bodyText}>{children}</div>;
};

type THeroCallout = TCallout;

const HeroCallout: React.FC<THeroCallout> = (props) => <Callout {...props} />;

export const Hero = {
	Root: HeroRoot,
	Content: HeroContent,
	BodyText: HeroBodyText,
	Callout: HeroCallout,
};
