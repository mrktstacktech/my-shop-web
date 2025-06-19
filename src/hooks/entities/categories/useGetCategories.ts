import { useCallback, useEffect, useState } from 'react';
import type { CategoryListEntity } from '../../../services/domain/entities';
import { CategoryRepository } from '../../../services/repositories';

export function useGetCategories() {
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<CategoryListEntity>([]);

    const fetchCategories = useCallback(() => {
        setLoading(true);
        const response = new CategoryRepository().getCategoryList();
        response.then(data => {
            setList(data);
        }).catch(error => {
            console.error("Error fetching categories:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        data: list,
        loading
    }
}