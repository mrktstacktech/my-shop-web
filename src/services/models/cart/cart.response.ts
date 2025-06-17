import type { ProductResponse } from "../product/product.response";

export interface CartListResponse {
    id: string;
    products: ProductResponse[];
    total: number;
    discountedTotal: number;
    userId: string;
    totalProducts: number;
    totalQuantity: number;
}
