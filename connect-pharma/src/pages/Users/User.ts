export type User = {
    id?: string | undefined,
    name: string,
    username: string,
    email?: string,
    roles?: string[],
    tel?: string,
    authProvider?: string,
    uid?: string | null
} | null