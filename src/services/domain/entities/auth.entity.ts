export interface AuthEntity {
    username: string,
    id: string,
    email: string,
    lastName: string,
    firstName: string,
    gender: string,
    image: string,
    accessToken: string,
    refreshToken: string,
}

export interface RefreshTokenEntity {
    refreshToken: string,
    accessToken: string,
}

export type UserInfoEntity = Omit<AuthEntity, 'accessToken' | 'refreshToken'> & {
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
};

export type UpdateUserInfoEntity = {
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    address?: {
        street?: string,
        city?: string,
        state?: string,
        country?: string
    },
    currentPassword?: string,
    newPassword?: string,
}