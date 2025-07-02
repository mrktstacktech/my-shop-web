import type { CartEntity } from "../entities";

export abstract class IWishlistRepo {
    abstract addToWishlist(id: string, productId: string): Promise<CartEntity>;
    abstract removeFromWishlist(id: string, productId: string): Promise<CartEntity>;
}