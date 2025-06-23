
import type { CartEntity, CurrentCartInforEntity, DeletedCartEntity } from "@domain/entities";
import type { AddNewCartRequest, UpdateCartRequest } from "../../models/cart/cart.resquest";

export abstract class ICartRepo {
    abstract getCurrentCart(cartId: string): Promise<CartEntity>;
    abstract getCurrentCartInfor(userId: string): Promise<CurrentCartInforEntity>;
    abstract addNewCart(cart: AddNewCartRequest): Promise<CartEntity>;
    abstract updateCart(cart: UpdateCartRequest): Promise<CartEntity>;
    abstract deleteCart(cartId: string): Promise<DeletedCartEntity>;
}