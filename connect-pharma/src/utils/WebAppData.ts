/*  format message exchanged with telegram bot  */
export type WebAppData = {
    message: string,
    email: string,
    tel: string,
    hasEmail?: boolean,
    frontendUrl?: string,
    step: WebAppDataStep
}

export enum WebAppDataStep {
    CREATE_ACOUNT = 'CREATE_ACOUNT',
    LOGIN = 'LOGIN',
}