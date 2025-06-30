import { EndPoints } from "@constants";
import { server } from "@axios/server.api";
import type { CartEntity, DeletedCartEntity, ProductEntity, ProductsInCartEntity } from "@domain/entities";
import type { ICartRepo } from "@domain/repo/cart.repo";
import type { CartResponse, CartListResponse } from "../models/cart/cart.response";
import type { AddNewCartRequest } from "../models/cart/cart.resquest";

export class CartRepository implements ICartRepo {
    async getCurrentCart(cartId: string): Promise<CartEntity> {
        try {
            const response = await server.get<CartResponse>({
                endpoint: EndPoints.CART,
                params: cartId,
            });
            return response;
        } catch (error) {
            console.error("Error fetching current cart:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async getCurrentCartInfor(userId: string): Promise<CartEntity> {
        try {
            const id = userId || '';
            const response = await server.get<CartListResponse>({
                endpoint: EndPoints.USER_CART,
                params: id,
            });
            return response.carts[0];
        } catch (error) {
            console.error("Error fetching current cart ID:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async addNewCart({
        userId,
        products,
    }: AddNewCartRequest = { userId: '', products: [] }): Promise<CartEntity> {
        try {
            const response = await server.post<CartResponse>({
                endpoint: EndPoints.ADD_NEW_CART,
                body: {
                    userId,
                    products
                },
            });
            return response;
        } catch (error) {
            console.error("Error adding new cart:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async updateCart(merge: boolean, id: string, products: ProductsInCartEntity[] | ProductEntity[]): Promise<CartEntity> {
        try {
            const productList = products.map(product => ({
                id: product.id,
                quantity: 'quantity' in product && typeof (product as ProductsInCartEntity).quantity === 'number' ? (product as ProductsInCartEntity).quantity : 1,
            }));
            const response = await server.put<CartResponse>({
                endpoint: EndPoints.CART,
                params: id,
                body: { 
                    merge: merge,
                    products: productList, // Ensure the products are in the correct format
                 },
            });
            console.log("Cart updated successfully:", response);
            return response;
        } catch (error) {
            console.error("Error updating cart:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async deleteCart(cartId: string): Promise<DeletedCartEntity> {
        try {
            const response = await server.delete<DeletedCartEntity>({
                endpoint: EndPoints.CART,
                params: cartId,
            });
            return response;
        } catch (error) {
            console.error("Error deleting cart:", error);
            throw error; // Re-throw the error for further handling
        }
    }
}