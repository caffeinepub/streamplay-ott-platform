export type Category = "Movie" | "TvShow" | "WebSeries" | "Sports" | "LiveTV";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  genre: string[];
  language: string[];
  year: number;
  duration: number;
  rating: number;
  thumbnailUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  cast: string[];
  director: string;
  isFeatured: boolean;
  isTrending: boolean;
  isNewRelease: boolean;
  progress?: number;
}

export interface WatchProgress {
  contentId: string;
  progress: number;
}
