import type { TCopyDetails } from './copy-details.tsx';

export const mockCopyDetailsData: TCopyDetails = {
	id: 'copy-billing',
	label: 'Same as billing address',
	onCopy: () => {
		console.log('Copied data:');
	},
};
