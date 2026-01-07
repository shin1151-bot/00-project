
export interface Idol {
  id: string;
  name: string;
  group?: string;
  agency: string;
  debutYear: number;
  description: string;
  popularityScore: number;
  imageUrl: string;
  mvUrl: string;
  communityUrl: string;
  tags: string[];
}

export interface RankingItem {
  rank: number;
  songTitle: string;
  artist: string;
  imageUrl: string;
  score: number;
  trend: 'up' | 'down' | 'same';
  communityUrl?: string;
}

export interface SongRecommendation {
  songTitle: string;
  artist: string;
  reason: string;
  vibe: string;
}

export interface RecommendationResponse {
  recommendations: SongRecommendation[];
}
