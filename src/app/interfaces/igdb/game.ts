
import { Cover } from "./cover";
import { Genre } from "./genre";
import { Platform } from "./platform";
import { Website } from "./website";

export interface Game {
  id: number;
  age_ratings: number[];
  alternative_names: number[];
  category: number;
  collection: number;
  cover: Cover;
  created_at: number;
  external_games: number[];
  first_release_date: number;
  follows: number;
  game_modes: number[];
  genres: Genre[];
  involved_companies: number[];
  keywords: number[];
  name: string;
  platforms: Platform[];
  player_perspectives: number[];
  rating: number;
  rating_count: number;
  release_dates: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  storyline: string;
  summary: string;
  tags: number[];
  total_rating: number;
  total_rating_count: number;
  updated_at: number;
  url: string;
  websites: Website[];
  checksum: string;
}
