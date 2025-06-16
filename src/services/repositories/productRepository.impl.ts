import type { IProductRepo } from "../domain/repo/product.repo";
import type { ProductListEntity } from "../domain/entities/product.entity";
import { EndPoints } from "../../constants/endpoints";
import { server } from "../axios/server.api";
import type { ProductListResponse } from "../models";

export class ProductRepository implements IProductRepo {
    async getProductList(): Promise<ProductListEntity> {
        try {
            const response = await server.get<ProductListResponse>({
                endpoint: EndPoints.PRODUCTS,
            });
            return response;
        }
        catch (error) {
            console.error("Error fetching product list:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async getProductByCategory(categorySlug: string): Promise<ProductListEntity> {
        // Implementation for fetching products by category slug
        try {
            const response = await server.get<ProductListResponse>({
                endpoint: EndPoints.PRODUCTS,
                params: categorySlug,
            });
            return response;
        }
        catch (error) {
            console.error(`Error fetching products for category ${categorySlug}:`, error);
            throw error; // Re-throw the error for further handling
        }
    }
}