import { EndPoints } from "../../constants/endpoints";
import { server } from "../axios/server.api";
import type { AuthEntity, UserInfoEntity } from "../domain/entities";
import type { IAuthRepo } from "../domain/repo/auth.repo";
import type { GetUserResponse, LoginResponse } from "../models/auth/auth.reponse";

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
            alert(error);
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
            alert(error);
            throw error; // Re-throw the error for further handling
        }
    }

}