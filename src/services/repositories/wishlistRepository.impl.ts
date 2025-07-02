import { IWishlistRepo } from "@domain/repo/wishlist.repo";
import { server } from "@axios/server.api";
import { EndPoints } from "@constants";
import type { CartResponse } from "../models/cart/cart.response";
import type { CartEntity } from "../domain/entities";

export class WishlistRepository implements IWishlistRepo {
    async addToWishlist(id: string, productId: string): Promise<CartEntity> {
        try {
            const response = await server.put<CartResponse>({
                endpoint: EndPoints.CART,
                params: id,
                body: {
                    merge: true,
                    products: [
                        {
                            id: productId,
                            quantity: 1,
                        }
                    ],
                },
            });
            console.log("Updated cart response:", response);
            return response;
        } catch (error) {
            console.error("Error updating cart:", error);
            throw error; 
        }
    }

    async removeFromWishlist(id: string, productId: string): Promise<CartEntity> {
        try {
            const response = await server.put<CartResponse>({
                endpoint: EndPoints.CART,
                params: id,
                body: {
                    merge: true,
                    products: [
                        {
                            id: productId,
                            quantity: 0,
                        }
                    ],
                },
            });
            return response;
        } catch (error) {
            console.error("Error updating cart:", error);
            throw error; 
        }
    }
}