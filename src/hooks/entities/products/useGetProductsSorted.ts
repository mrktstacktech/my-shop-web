import type { GetProductOutput } from "./useGetProduct";
import { useState, useCallback, useEffect } from "react";
import type { ProductListEntity } from "@services/domain/entities";
import { ProductRepository } from "@services/repositories";

const DEFAULT_LIMIT = 4;

export function useGetProductsSorted(limit = DEFAULT_LIMIT, sortFieldName = ''): GetProductOutput {
    const [products, setProducts] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);

    const fetchBestSellers = useCallback(() => {
        setLoading(true);
        const response = new ProductRepository().getProductSorted(limit, skip, sortFieldName);
        response.then(data => {
            setProducts(data);
            return data;
        }).catch(error => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [limit, skip, sortFieldName]);

    useEffect(() => {
        fetchBestSellers();
    }, [fetchBestSellers]);

    return {
        data: products,
        loading,
        skip,
        limit,
        setSkip
    }
}