import type { CategoryListEntity } from "../domain/entities/category.entity";
import type { ICategoryRepo } from "../domain/repo/category.repo";
import { EndPoints } from "../../constants/endpoints";
import { server } from "../axios/server.api";
import type { CategoryListResponse } from "../models/category";

export class CategoryRepository implements ICategoryRepo {
    async getCategoryList(): Promise<CategoryListEntity> {
       try {
            const response = await server.get<CategoryListResponse>({
                endpoint: EndPoints.CATEGORY_LIST,
            });
            return response;
        }
        catch (error) {
            console.error("Error fetching category list:", error);
            throw error; // Re-throw the error for further handling
        }
    }
} 