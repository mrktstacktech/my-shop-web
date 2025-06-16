export type User = Partial<{
    username: string,
    id: string,
    email: string,
    lastName: string,
    firstName: string,
    gender: string,
    image: string,
    accessToken: string,
    refreshToken: string,
}>;

export type Login = {
    username: string;
    password: string;
}