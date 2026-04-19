import type { Print } from '@/types'

const standardFrames = ['unframed', 'black oak', 'natural oak', 'white', 'aluminium']

const standardPapers = [
  'Hahnemuhle Photo Rag 308gsm',
  'Hahnemuhle Baryta FB 350gsm',
  'Fuji Crystal Archive Lustre',
]

export const prints: Print[] = [
  {
    id: 'overhead-raven',
    title: 'Overhead, Raven',
    slug: 'overhead-raven',
    image: '/images/hero-aerial.jpg',
    detailCrops: ['/images/raven-drone-368.jpg', '/images/raven-drone-23.jpg'],
    story:
      'Shot from 120 metres directly above during the Atlantic crossing. The geometry of the deck plan, the curve of the sails and the deep blue of mid-ocean. A single frame that captures the scale of a 111-foot yacht against open water.',
    location: 'Mid-Atlantic, RORC Transatlantic Race',
    coordinates: {
      lat: '22.4500',
      lng: '-32.8000',
      display: '22.4500°N 32.8000°W',
    },
    dateTaken: '2024-01-15',
    camera: 'DJI Mavic 3 Pro',
    edition: {
      isLimited: true,
      total: 25,
      sold: 17,
    },
    category: 'sailing',
    relatedProject: 'baltic-111-raven',
    sizes: [
      {
        label: '60 x 40 cm',
        widthCm: 60,
        heightCm: 40,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '90 x 60 cm',
        widthCm: 90,
        heightCm: 60,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '120 x 80 cm',
        widthCm: 120,
        heightCm: 80,
        papers: [standardPapers[0], standardPapers[1]],
        frames: standardFrames,
      },
    ],
    price: { from: 850, currency: 'GBP' },
  },
  {
    id: 'black-sails',
    title: 'Black Sails',
    slug: 'black-sails',
    image: '/images/raven-rorc-side.jpg',
    detailCrops: ['/images/raven-side.jpg', '/images/raven-bow.jpg'],
    story:
      'Raven under her black carbon racing sails, heeled hard during the RORC Transatlantic. The dark sails against dark water, the spray frozen in the air. This is what offshore racing looks like when you are standing on a chase boat 30 metres away.',
    location: 'Atlantic Ocean, off Lanzarote',
    coordinates: {
      lat: '28.9500',
      lng: '-13.6000',
      display: '28.9500°N 13.6000°W',
    },
    dateTaken: '2024-01-08',
    camera: 'Sony A1, 70-200mm f/2.8 GM II',
    edition: {
      isLimited: true,
      total: 15,
      sold: 3,
    },
    category: 'sailing',
    relatedProject: 'rorc-transatlantic',
    sizes: [
      {
        label: '60 x 40 cm',
        widthCm: 60,
        heightCm: 40,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '90 x 60 cm',
        widthCm: 90,
        heightCm: 60,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '120 x 80 cm',
        widthCm: 120,
        heightCm: 80,
        papers: [standardPapers[0], standardPapers[1]],
        frames: standardFrames,
      },
    ],
    price: { from: 1200, currency: 'GBP' },
  },
  {
    id: 'first-light-atlantic',
    title: 'First Light, Atlantic',
    slug: 'first-light-atlantic',
    image: '/images/raven-yachtingworld.jpg',
    detailCrops: ['/images/raven-drone-473.jpg'],
    story:
      'First light on day eight of the crossing. The sun rose behind us and lit the foresail in gold for about four minutes. I was already on deck for the watch change and had the camera in hand. Published in Yachting World, February 2024.',
    location: 'Mid-Atlantic, 800nm west of Cape Verde',
    coordinates: {
      lat: '18.2000',
      lng: '-35.5000',
      display: '18.2000°N 35.5000°W',
    },
    dateTaken: '2024-01-16',
    camera: 'Sony A1, 24-70mm f/2.8 GM II',
    edition: {
      isLimited: true,
      total: 25,
      sold: 5,
    },
    category: 'sailing',
    relatedProject: 'rorc-transatlantic',
    sizes: [
      {
        label: '60 x 40 cm',
        widthCm: 60,
        heightCm: 40,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '90 x 60 cm',
        widthCm: 90,
        heightCm: 60,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '120 x 80 cm',
        widthCm: 120,
        heightCm: 80,
        papers: [standardPapers[0], standardPapers[1]],
        frames: standardFrames,
      },
    ],
    price: { from: 650, currency: 'GBP' },
  },
  {
    id: 'carbon-and-sea',
    title: 'Carbon & Sea',
    slug: 'carbon-and-sea',
    image: '/images/raven-drone-453.jpg',
    detailCrops: ['/images/raven-drone-406.jpg', '/images/raven-dji-0371.jpg'],
    story:
      'The carbon fibre deck of Raven from above, the hull cutting a clean line through Atlantic blue. The contrast between the engineered precision of the yacht and the chaos of the ocean surface. Limited to 10 prints, the smallest edition in the collection.',
    location: 'Atlantic Ocean, RORC Transatlantic Race',
    coordinates: {
      lat: '20.1000',
      lng: '-40.3000',
      display: '20.1000°N 40.3000°W',
    },
    dateTaken: '2024-01-18',
    camera: 'DJI Mavic 3 Pro',
    edition: {
      isLimited: true,
      total: 10,
      sold: 1,
    },
    category: 'sailing',
    relatedProject: 'rorc-transatlantic',
    sizes: [
      {
        label: '60 x 40 cm',
        widthCm: 60,
        heightCm: 40,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '90 x 60 cm',
        widthCm: 90,
        heightCm: 60,
        papers: standardPapers,
        frames: standardFrames,
      },
      {
        label: '120 x 80 cm',
        widthCm: 120,
        heightCm: 80,
        papers: [standardPapers[0], standardPapers[1]],
        frames: standardFrames,
      },
    ],
    price: { from: 1500, currency: 'GBP' },
  },
]
