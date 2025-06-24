
import type { CartEntity, DeletedCartEntity } from "@domain/entities";
import type { AddNewCartRequest } from "../../models/cart/cart.resquest";

export abstract class ICartRepo {
    abstract getCurrentCart(cartId: string): Promise<CartEntity>;
    abstract getCurrentCartInfor(userId: string): Promise<CartEntity>;
    abstract addNewCart(cart: AddNewCartRequest): Promise<CartEntity>;
    abstract updateCart(merge: boolean, {
        id,
        products
    }: CartEntity): Promise<CartEntity>;
    abstract deleteCart(cartId: string): Promise<DeletedCartEntity>;
}