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

export type UserInfoEntity = Omit<AuthEntity, 'accessToken' | 'refreshToken'>;