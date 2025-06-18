import type { AuthEntity, UserInfoEntity, RefreshTokenEntity } from "../entities";

export abstract class IAuthRepo {
    abstract login(username: string, password: string): Promise<AuthEntity>;
    abstract requestNewToken(refreshToken: string): Promise<RefreshTokenEntity>;
    // abstract register(username: string, password: string): Promise<string>;
    abstract getUserInfo(): Promise<UserInfoEntity>;
}