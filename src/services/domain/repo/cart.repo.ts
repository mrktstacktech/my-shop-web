
import type { CartEntity, DeletedCartEntity, ProductEntity, ProductsInCartEntity } from "@domain/entities";
import type { AddNewCartRequest } from "../../models/cart/cart.resquest";

export abstract class ICartRepo {
    abstract getCurrentCart(cartId: string): Promise<CartEntity>;
    abstract getCurrentCartInfor(userId: string): Promise<CartEntity>;
    abstract addNewCart(cart: AddNewCartRequest): Promise<CartEntity>;
    abstract updateCart(merge: boolean, id: string, products: ProductsInCartEntity[] | ProductEntity[]): Promise<CartEntity>;
    abstract deleteCart(cartId: string): Promise<DeletedCartEntity>;
    abstract addSingleProductToCart(cartId: string, productId: string, quantity: number): Promise<CartEntity>;
}