import { EndPoints } from "@constants";
import { server } from "@axios/server.api";
import type { AuthEntity, UserInfoEntity, RefreshTokenEntity } from "@domain/entities";
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
            return response;
        }
        catch (error) {
            // alert(error);
            console.log("Error fetching user info:", error);
            throw error; // Re-throw the error for further handling}
        }
    }
}