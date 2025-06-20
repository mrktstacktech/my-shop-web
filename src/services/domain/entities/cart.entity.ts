type ProductsInCartEntity = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountedPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export type CartEntity = {
    id: string;
    products: ProductsInCartEntity[];
    total: number;
    discountedTotal: number;
    userId: string;
    totalProducts: number;
    totalQuantity: number;
}

export type DeletedCartEntity = CartEntity & {
    isDeleted: boolean;
    deletedOn: string;
};

export type CurrentCartIdEntity = string;

