import type { TJobsPage } from './jobs-page.tsx';

export const mockJobsPageData: TJobsPage = {
	type: 'open',
	jobs: [
		{
			id: 'SIU79',
			service: 'Deaf intermediary interpreter',
			specialism: 'Medical',
			dateTime: '2025-01-15T11:38:00.000Z',
			location: 'Manchester',
			description:
				'Janet is a lovely person but watch out for her waffle-eating habits. She loves to eat waffles and will often ask you to join her for a waffle party. Janet is also a great cook and loves to make waffles for her friends. If you ever need a waffle buddy, Janet is the one.',
		},
		{
			id: 'SIU80',
			service: 'BSL to English interpreter',
			specialism: 'General',
			dateTime: '2025-11-15T11:38:00.000Z',
			location: 'Stockport',
			description:
				'Mark is a great person to work with. He is very friendly and always has a smile on his face. He loves to help people and is always willing to go the extra mile. Mark is also a great cook and loves to make waffles for his friends. If you ever need a waffle buddy, Mark is the one.',
		},
		{
			id: 'MDC81',
			service: 'Lipspeaker',
			specialism: 'Specialist',
			dateTime: '2025-08-15T11:38:00.000Z',
			location: 'Wigan',
			description:
				"Persephone is mint. She's the life of the party and will make you dance like no one is watching. She's also a great cook and loves to make waffles for her friends. If you ever need a waffle buddy, Persephone is the one.",
		},
	],
};
