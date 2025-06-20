import type { CategoryListEntity } from "@domain/entities/category.entity";

export abstract class ICategoryRepo {
    abstract getCategoryList(): Promise<CategoryListEntity>;
}