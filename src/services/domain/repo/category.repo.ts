import type { CategoryListEntity } from "../entities/category.entity";

export abstract class ICategoryRepo {
    abstract getCategoryList(): Promise<CategoryListEntity>;
}