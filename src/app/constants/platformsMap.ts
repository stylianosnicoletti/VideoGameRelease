import { PlatformId } from "../enums/platformId";

/*
Maps platform route path id to Platform Details.
*/
export const PlatformsMap = {

    All: {
        Title: "All",

    },
    Windows: {
        Title: "Windows",
        PlatformIds: [PlatformId.Windows]
    },
    Linux: {
        Title: "Linux",
        PlatformIds: [PlatformId.Linux]
    },
    PS5: {
        Title: "PlayStation 5",
        PlatformIds: [PlatformId.PS5]
    },
    XSX: {
        Title: "Xbox Series X",
        PlatformIds: [PlatformId.XSX]
    },
    NX: {
        Title: "Nintendo Switch",
        PlatformIds: [PlatformId.NX]
    },
    Android: {
        Title: "Android",
        PlatformIds: [PlatformId.Android]
    },
    IOS: {
        Title: "iOS",
        PlatformIds: [PlatformId.IOS]
    },
}