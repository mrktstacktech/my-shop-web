export * from './auth.request';

export type User = {
    username: string,
    id: string,
    email: string,
    lastName: string,
    firstName: string,
    gender: string,
    image: string,
    accessToken?: string,
    refreshToken?: string,
};
