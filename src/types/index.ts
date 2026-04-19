export interface Project {
  id: string
  title: string
  slug: string
  category: Category
  client?: string
  date: string
  location: string
  coordinates: { lat: string; lng: string; display: string }
  excerpt: string
  coverImage: string
  coverVideo?: string
  gallery: MediaItem[]
  story?: string
  featured: boolean
  brand: 'fep' | 'paloma' | 'both'
  seaState?: string
  wind?: string
}

export interface Production {
  id: string
  title: string
  slug: string
  type: 'film' | 'drone' | 'bts' | 'commercial'
  client?: string
  date: string
  vimeoUrl?: string
  coverImage: string
  description: string
  equipment: string[]
  featured: boolean
}

export interface Print {
  id: string
  title: string
  slug: string
  shopifyProductId?: string
  shopifyHandle?: string
  image: string
  detailCrops: string[]
  story: string
  location: string
  coordinates: { lat: string; lng: string; display: string }
  dateTaken: string
  camera?: string
  edition: {
    isLimited: boolean
    total: number
    sold: number
  }
  category: Category
  relatedProject?: string
  sizes: PrintSize[]
  price: { from: number; currency: string }
}

export interface PrintSize {
  label: string
  widthCm: number
  heightCm: number
  papers: string[]
  frames: string[]
}

export interface Exhibition {
  id: string
  title: string
  slug: string
  description: string
  prints: string[]
  startDate: string
  endDate: string
  isActive: boolean
  coverImage: string
  curatorNote?: string
}

export interface MediaItem {
  type: 'image' | 'video' | 'vimeo'
  src: string
  caption?: string
  alt: string
  layout: 'full' | 'half' | 'third' | 'hero'
}

export type Category = 'sailing' | 'adventure' | 'lifestyle' | 'feature-films' | 'publications'

export interface Location {
  start: number
  coords: string
}
