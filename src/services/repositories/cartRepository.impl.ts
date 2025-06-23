import { EndPoints } from "@constants";
import { server } from "@axios/server.api";
import type { CartEntity, DeletedCartEntity, CurrentCartInforEntity } from "@domain/entities";
import type { ICartRepo } from "@domain/repo/cart.repo";
import type { CartResponse, CartListResponse } from "../models/cart/cart.response";
import type { AddNewCartRequest, UpdateCartRequest } from "../models/cart/cart.resquest";

export class CartRepository implements ICartRepo {
    async getCurrentCart(cartId: string): Promise<CartEntity> {
        try {
            const response = await server.get<CartResponse>({
                endpoint: EndPoints.CART,
                params:  cartId ,
            });
            return response;
        } catch (error) {
            console.error("Error fetching current cart:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async getCurrentCartInfor(userId: string): Promise<CurrentCartInforEntity> {
        try {
            const id = userId || '';
            const response = await server.get<CartListResponse>({
                endpoint: EndPoints.USER_CART,
                params: id,
            });
            return {
                id: response.carts[0].id || '',
                totalQuantity: response.carts[0].totalQuantity || 0,
            };
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

    async updateCart({
        id,
        merge,
        products = [],
    }: UpdateCartRequest): Promise<CartEntity> {
        try {
            console.log("Updating cart with ID:", id, "Merge:", merge, "Products:", products);
            const response = await server.put<CartResponse>({
                endpoint: EndPoints.CART,
                params: id,
                body: { merge, products },
            });
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