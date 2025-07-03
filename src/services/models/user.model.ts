export type User = Partial<{
    username: string,
    id: string,
    email: string,
    lastName: string,
    firstName: string,
    gender: string,
    image: string,
    phone: string,
    company: {
        name: string,
        country: string
    },
    address: {
        street: string,
        city: string,
        state: string,
        country: string
    }
    accessToken: string,
    refreshToken: string,
}>;

export type Login = {
    username: string;
    password: string;
}