import type { User } from ".";

export type LoginResponse = User;

export type RegisterResponse = User

export type GetUserResponse = User;

export type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};