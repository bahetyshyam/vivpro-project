export interface Track {
  track_id: string;
  title: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
  num_bars: number;
  num_sections: number;
  num_segments: number;
  track_class: number;
  user_rating: number | null;
}

export interface TrackResponse {
  count: number;
  page: number;
  limit: number;
  total_pages: number;
  results: Track[];
}
