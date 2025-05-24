import type { CalendarEvent } from 'calendar-link';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';

import { useEffect, useRef, useState } from 'react';
import { google, outlook, office365, ics } from 'calendar-link';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';

import styles from './add-to-calendar.module.css';

export type TAddToCalendar = {
	event: CalendarEvent;
};

type TTAddToCalendarProps = {
	className?: string;
} & TAddToCalendar;

type TAddToCalendarItem = {
	name: string;
	icon: TIconName;
	url: string;
};

export const AddToCalendar: React.FC<TTAddToCalendarProps> = ({ event }) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const linkRefs = useRef<HTMLAnchorElement[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const items: TAddToCalendarItem[] = [
		{
			name: 'Apple (iCal)',
			icon: 'apple',
			url: ics(event),
		},
		{
			name: 'Google',
			icon: 'google',
			url: google(event),
		},
		{
			name: 'Office 365',
			icon: 'ms-office',
			url: office365(event),
		},
		{
			name: 'Outlook',
			icon: 'outlook',
			url: outlook(event),
		},
	];

	const handleButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		const isEscapeKey = e.key === 'Escape';
		const isArrowDown = e.key === 'ArrowDown';

		if (isEscapeKey && isOpen) {
			e.preventDefault();
			setIsOpen(false);
			return;
		}

		if (isArrowDown && isOpen) {
			linkRefs.current[0]?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		const isEscapeKey = e.key === 'Escape';
		const isArrowDown = e.key === 'ArrowDown';
		const isArrowUp = e.key === 'ArrowUp';

		const links = linkRefs.current;
		const activeIndex = links.findIndex(
			(el) => el === document.activeElement,
		);

		if (isEscapeKey) {
			e.preventDefault();
			buttonRef.current?.focus();
			setIsOpen(false);
			return;
		}

		if (isArrowDown && activeIndex < linkRefs.current.length - 1) {
			e.preventDefault();
			linkRefs.current[activeIndex + 1]?.focus();
			return;
		}

		if (isArrowUp && activeIndex > 0) {
			e.preventDefault();
			linkRefs.current[activeIndex - 1]?.focus();
		}
	};

	const handleBodyClick = (e: MouseEvent) => {
		const button = buttonRef.current;

		if (!button) return;

		const isNotButton = !e.composedPath().includes(button);

		if (isNotButton) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();

		document.body.addEventListener('click', handleBodyClick, {
			signal: controller.signal,
		});

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div className={styles.atc} data-e2e-id="add-to-calendar">
			<Button
				onClick={handleButtonClick}
				onKeyDown={handleButtonKeyDown}
				aria-expanded={isOpen}
				ref={buttonRef}
				className={styles.button}
			>
				<ButtonContent.Text>Add to calendar</ButtonContent.Text>
				<ButtonContent.Icon name="calendar-plus" />
			</Button>

			<menu
				className={styles.menu}
				hidden={!isOpen}
				onKeyDown={handleKeyDown}
			>
				{items.map((item, i) => (
					<li key={item.name}>
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}
							ref={(el) => {
								if (el) linkRefs.current[i] = el;
							}}
						>
							<Text size="100" weight="200" role="presentation">
								{item.name}
							</Text>

							<Icon name={item.icon} size={22} />
						</a>
					</li>
				))}
			</menu>
		</div>
	);
};
