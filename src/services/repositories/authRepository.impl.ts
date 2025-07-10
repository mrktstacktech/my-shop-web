import { EndPoints } from "@constants";
import { server } from "@axios/server.api";
import type { AuthEntity, UserInfoEntity, RefreshTokenEntity, UpdateUserInfoEntity } from "@domain/entities";
import type { IAuthRepo } from "@domain/repo/auth.repo";
import type { GetUserResponse, LoginResponse, RefreshTokenResponse } from "../models/auth";

export class AuthRepository implements IAuthRepo {
    async login(username: string, password: string): Promise<AuthEntity> {
        try {
            const response = await server.post<LoginResponse>({
                endpoint: EndPoints.LOGIN,
                body: { username, password },
            });
            return {
                accessToken: response.accessToken ?? '',
                refreshToken: response.refreshToken ?? '',
                ...response
            }
        }
        catch (error) {
            // alert(error);
            console.error("Login error:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async requestNewToken(refreshToken: string): Promise<RefreshTokenEntity> {
        try {
            const response = await server.post<RefreshTokenResponse>({
                endpoint: EndPoints.REFRESH_TOKEN,
                body: {
                    refreshToken: refreshToken
                },
            });
            return response;
        }
        catch (error) {
            // alert(error);
            console.error("Error requesting new token:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async getUserInfo(): Promise<UserInfoEntity> {
        try {
            const response = await server.get<GetUserResponse>({
                endpoint: EndPoints.GET_USER_INFO,
            });
            return {
                id: response.id,
                username: response.username,
                email: response.email,
                lastName: response.lastName,
                firstName: response.firstName,
                gender: response.gender,
                image: response.image,
                phone: response.phone,
                company: {
                    name: response.company.name,
                    country: response.company.address.country,
                },
                address: {
                    street: response.address.address,
                    city: response.address.city,
                    state: response.address.state,
                    country: response.address.country,
                },
            };
        }
        catch (error) {
            // alert(error);
            console.log("Error fetching user info:", error);
            throw error; // Re-throw the error for further handling}
        }
    }

    async updateUserInfo(userInfo: UpdateUserInfoEntity): Promise<UserInfoEntity> 
    {
        try {
            const response = await server.put<GetUserResponse>({
                endpoint: EndPoints.SINGLE_USER,
                params: { id: userInfo.id },
                body: userInfo,
            });
            return {
                id: response.id,
                username: response.username,
                email: response.email,
                lastName: response.lastName,
                firstName: response.firstName,
                gender: response.gender,
                image: response.image,
                phone: response.phone,
                company: {
                    name: response.company.name,
                    country: response.company.address.country,
                },
                address: {
                    street: response.address.address,
                    city: response.address.city,
                    state: response.address.state,
                    country: response.address.country,
                },
            };
        }
        catch (error) {
            // alert(error);
            console.error("Error updating user info:", error);
            throw error; // Re-throw the error for further handling
        }
    }
}