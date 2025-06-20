
import type { CartEntity, CurrentCartIdEntity, DeletedCartEntity } from "@domain/entities";
import type { AddNewCartRequest, UpdateCartRequest } from "../../models/cart/cart.resquest";

export abstract class ICartRepo {
    abstract getCurrentCart(cartId: string): Promise<CartEntity>;
    abstract getCurrentCartId(userId: string): Promise<CurrentCartIdEntity>;
    abstract addNewCart(cart: AddNewCartRequest): Promise<CartEntity>;
    abstract updateCart(cart: UpdateCartRequest): Promise<CartEntity>;
    abstract deleteCart(cartId: string): Promise<DeletedCartEntity>;
}