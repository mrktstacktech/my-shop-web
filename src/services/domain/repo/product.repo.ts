import type { ProductListEntity } from "@domain/entities/product.entity";

export abstract class IProductRepo {
    abstract getProductList(limit: number, skip: number): Promise<ProductListEntity>;
    abstract getProductByCategory(categorySlug: string): Promise<ProductListEntity>;
    abstract getProductSorted(limit: number, skip: number, sort: string): Promise<ProductListEntity>;
    abstract searchProduct(query: string): Promise<ProductListEntity>;
}