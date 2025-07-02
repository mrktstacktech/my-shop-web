import type { ProductEntity, ProductListEntity } from "@domain/entities/product.entity";

export abstract class IProductRepo {
    abstract getProductList(limit: number, skip: number): Promise<ProductListEntity>;
    abstract getProductByCategory(limit: number, skip: number, categorySlug: string): Promise<ProductListEntity>;
    abstract getProductSorted(limit: number, skip: number, sort: string): Promise<ProductListEntity>;
    abstract searchProduct(query: string): Promise<ProductListEntity>;
    abstract getProductById(id: string): Promise<ProductEntity>;
}