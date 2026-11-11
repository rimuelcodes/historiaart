export type ArtworkCategory = 'all' | 'paintings' | 'sculptures' | 'digital' | 'jewelry' | 'prints';

export interface Artwork {
  id: string;
  catalogId: string;
  title: string;
  artist: string;
  artistDates: string;
  year: number | string;
  medium: string;
  dimensions: string;
  heightCm: number;
  widthCm: number;
  provenance: string;
  valuationPHP: string;
  valuationNumeric: number;
  category: 'paintings' | 'sculptures' | 'digital' | 'jewelry' | 'prints';
  image: string;
  aspectRatio: string; // e.g. "4/3", "1/1", "3/4"
  isTondo?: boolean;
  curatorialNote: string;
  exhibitionHistory: string[];
  featured?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  dates: string;
  movement: string;
  bio: string;
  notableWork: string;
  catalogCount: number;
  imagePreview: string;
  rosterType: 'canonical' | 'contemporary';
}

export interface Sanctuary {
  id: string;
  name: string;
  type: string;
  location: string;
  address: string;
  hours: string;
  curator: string;
  phone: string;
  status: string;
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  category: 'exhibitions' | 'fairs';
  curator: string;
  description: string;
  featuredArtists: string[];
  image: string;
  status: 'CURRENT ON VIEW' | 'RECENT ARCHIVE' | 'SCHEDULED SALON';
  isFlagship?: boolean;
}

export type PageView = 'home' | 'exhibitions' | 'artists' | 'about' | 'contact';
