import type { TLinkButton } from './link-button.tsx';

export const mockLinkButtonData: TLinkButton = {
	text: 'Link button',
	onClick: () => {
		alert('Link button clicked');
	},
	icon: 'warning',
};
