import type { AuthEntity, UserInfoEntity } from "../entities";

export abstract class IAuthRepo {
    abstract login(username: string, password: string): Promise<AuthEntity>;

    // abstract register(username: string, password: string): Promise<string>;

    abstract getUserInfo(): Promise<UserInfoEntity>;
}