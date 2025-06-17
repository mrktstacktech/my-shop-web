import type { IProductRepo } from "../domain/repo/product.repo";
import type { ProductListEntity } from "../domain/entities/product.entity";
import { EndPoints } from "../../constants/endpoints";
import { server } from "../axios/server.api";
import type { ProductListResponse } from "../models";

export class ProductRepository implements IProductRepo {
    async getProductList(limit = 0, skip = 0): Promise<ProductListEntity> {
        try {
            const response = await server.get<ProductListResponse>({
                endpoint: EndPoints.PRODUCTS,
                params: { limit, skip },
            });
            return response.products;
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
            return response.products;
        }
        catch (error) {
            console.error(`Error fetching products for category ${categorySlug}:`, error);
            throw error; // Re-throw the error for further handling
        }
    }

    async getProductSorted(limit = 0, skip = 0, sort = ''): Promise<ProductListEntity> {
        // Implementation for fetching products sorted by rating
        try {
            const response = await server.get<ProductListResponse>({
                endpoint: EndPoints.PRODUCTS,
                params: { limit, skip, sortBy: sort, order: 'desc' },
            });
            return response.products;
        }
        catch (error) {
            console.error("Error fetching products sorted by rating:", error);
            throw error; // Re-throw the error for further handling
        }

    }

    async searchProduct(query: string): Promise<ProductListEntity> {
        // Implementation for searching products by query
        try {
            const response = await server.get<ProductListResponse>({
                endpoint: EndPoints.PRODUCT_SEARCH,
                params: { q: query },
            });
            return response.products;
        }
        catch (error) {
            console.error(`Error searching products with query "${query}":`, error);
            throw error; // Re-throw the error for further handling
        }
    }
}