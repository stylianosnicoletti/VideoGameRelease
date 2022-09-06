export interface AuthToken {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    access_token: string;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    token_type: string;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    expires_in: number;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    refresh_token: string;

    scope: Array<string>;
}
