export interface Platform {
    id: number;
    alternative_name: string;
    category: number;
    created_at: number;
    name: string;
    platform_logo: number;
    slug: string;
    updated_at: number;
    url: string;
    versions: number[];
    websites: number[];
    checksum: string;
    generation?: number;
    platform_family?: number;
    abbreviation: string;
    summary: string;
}