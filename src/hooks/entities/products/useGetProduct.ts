import { useState, useCallback, useEffect } from "react";
import type { ProductEntity, ProductListEntity } from "@services/domain/entities";
import { ProductRepository } from "@services/repositories";

export type GetProductOutput = BaseFetchListData<ProductEntity>;

interface BaseFetchListData<T>{
    data: T[];
    loading: boolean;
    error?: string;
    skip: number;
    limit: number;
    setSkip: (value: number) => void;
}

const DEFAULT_LIMIT = 8;

export function useGetProduct(limit = DEFAULT_LIMIT): GetProductOutput {
    const [productList, setProductList] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);

    const fetchProducts = useCallback(() => {
        setLoading(true);
        const response = new ProductRepository().getProductList(limit, skip);
        response.then(data => {
            setProductList(data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [limit, skip]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        data: productList,
        loading,
        skip,
        limit,
        setSkip
    };

}