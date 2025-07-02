import type { GetProductOutput } from "./useGetProduct";
import { useState, useCallback, useEffect } from "react";
import type { ProductListEntity } from "@services/domain/entities";
import { ProductRepository } from "@services/repositories";

const DEFAULT_LIMIT = 4;

export function useGetProductByCategory(limit = DEFAULT_LIMIT, categorySlug = ''): GetProductOutput {
    const [products, setProducts] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);

    const fetchProductByCategory = useCallback(() => {
        setLoading(true);
        const response = new ProductRepository().getProductByCategory(limit, skip, categorySlug);
        response.then(data => {
            setProducts(data);
            console.log("Fetched products by category:", data);
            return data;
        }).catch(error => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [limit, skip, categorySlug]);

    useEffect(() => {
        fetchProductByCategory();
    }, [fetchProductByCategory]);

    return {
        data: products,
        loading,
        skip,
        limit,
        setSkip
    }
}