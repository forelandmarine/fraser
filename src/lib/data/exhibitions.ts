import type { Exhibition } from '@/types'

export const exhibitions: Exhibition[] = [
  {
    id: 'southern-light',
    title: 'Southern Light',
    slug: 'southern-light',
    description:
      'Seven photographs from the Raven campaign, available as first-time limited edition prints. Each image was selected from over 12,000 frames shot across three weeks at sea. When the exhibition closes, three of these images will be permanently retired and no further prints will be produced.',
    prints: [
      'overhead-raven',
      'black-sails',
      'first-light-atlantic',
      'carbon-and-sea',
    ],
    startDate: '2025-11-01',
    endDate: '2026-05-15',
    isActive: true,
    coverImage: '/images/hero-aerial.jpg',
    curatorNote:
      'The Raven campaign produced some of the strongest sailing photography I have seen in years. These seven images stand on their own as fine art, independent of their subject. The decision to retire three prints at close is deliberate. Scarcity is part of the work.',
  },
]
