type ProductInCartRequest = {
    id: string;
    quantity: number;
}

export type AddNewCartRequest = {
    userId: string;
    products: ProductInCartRequest[];
}

export type UpdateCartRequest = {
    id: string;
    merge: boolean;
    products?: ProductInCartRequest[];
}