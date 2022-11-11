import { PlatformId } from "../../enums/platformId";

export interface FilterPlatform {

    Name: string;

    PlatformId: PlatformId;

    IsChecked?: boolean;

    CustomSlug: string;
}