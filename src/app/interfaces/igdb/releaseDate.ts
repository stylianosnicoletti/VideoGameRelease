
import { Game } from "./game";
import { Platform } from "./platform";

export interface ReleaseDate {
    id: number;
    category: number;
    created_at: number;
    date: number;
    game: Game;
    human: string;
    m: number;
    platform: Platform;
    region: number;
    updated_at: number;
    y: number;
    checksum: string;
}