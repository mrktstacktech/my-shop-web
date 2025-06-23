type ProductsInCartResponse = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountedPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export type CartResponse = {
    id: string;
    products: ProductsInCartResponse[];
    total: number;
    discountedTotal: number;
    userId: string;
    totalProducts: number;
    totalQuantity: number;
}

export type CartListResponse = {
    carts: CartResponse[];
    total: number;
    skip: number;
    limit: number;
};

export type UpdatedCartResponse = CartResponse;

export type DeletedCartResponse = CartResponse & {
    isDeleted: boolean;
    deletedOn: string;
};
