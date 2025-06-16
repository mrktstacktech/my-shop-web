import type { ProductListEntity } from "../entities/product.entity";

export abstract class IProductRepo {
    abstract getProductList(): Promise<ProductListEntity>;
    // abstract getProductById(id: string): Promise<ProductListEntity>;
    abstract getProductByCategory(categorySlug: string): Promise<ProductListEntity>;
}