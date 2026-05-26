export interface Couple {
  bride: Person
  groom: Person
  weddingDate: string
  weddingTime: string
  venue: Venue
  reception: Venue
  story: StoryItem[]
  hashtag: string
  music?: string
}

export interface Person {
  name: string
  fullName: string
  photo: string
  father: string
  mother: string
  instagram?: string
  bio?: string
}

export interface Venue {
  name: string
  address: string
  city: string
  mapsUrl: string
  time: string
  date?: string       // e.g. "Senin, 15 Juni 2026"
  dresscode?: string
}

export interface StoryItem {
  date: string
  title: string
  description: string
  image?: string
}

export interface GalleryItem {
  id: string
  url: string
  caption?: string
  width: number
  height: number
}

export interface RSVPFormData {
  name: string
  email?: string
  phone?: string
  attendance: 'hadir' | 'tidak_hadir' | 'mungkin'
  guestCount: number
  message?: string
  invitationSlug: string
}

export interface Wish {
  id: string
  name: string
  message: string
  createdAt: string
  avatar?: string
}

export interface GiftAccount {
  type: 'bank' | 'ewallet' | 'qris'
  name: string
  accountName: string
  accountNumber: string
  logo?: string
}

export interface InvitationData {
  slug: string
  guestName: string
  couple: Couple
  gallery: GalleryItem[]
  wishes: Wish[]
  gifts: GiftAccount[]
  template: 'classic' | 'modern' | 'romantic'
}
