import { useGetCategories } from "./useGetCategories";
import { useCallback, useEffect, useState } from "react";
import type { CategoryEntity } from "@services/domain/entities";

export function useCategoryPagination() {
    const { data, loading } = useGetCategories();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [paginatedData, setPaginatedData] = useState<CategoryEntity[]>([]);

    const calculateTotalPages = useCallback(() => {
        if (data.length > 0) {
            setTotalPages(Math.ceil(data.length / pageSize));
        }
    }, [data, pageSize]);

    const paginateData = useCallback(() => {
        if (data.length > 0) {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setPaginatedData(data.slice(startIndex, endIndex));
        }
    }, [data, page, pageSize]);

    const getNextPage = useCallback(() => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    }, [page, totalPages]);

    const getPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    }, [page]);

    useEffect(() => {
        calculateTotalPages();
        paginateData();
    }, [data, page, pageSize, calculateTotalPages, paginateData]);

    return {
        paginatedData,
        loading,
        totalPages,
        currentPage: page,
        setPage,
        setPageSize,
        getNextPage,
        getPreviousPage
    };
}