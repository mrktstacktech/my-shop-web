import { useState, useCallback } from 'react';
import type { ProductListEntity } from '@services/domain/entities';
import { ProductRepository } from '@services/repositories';


export function useSearchProduct() {
    const [inputValue, setInputValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const fetchSearchResults = useCallback((value: string) => {
        setLoading(true);
        if (value.length > 0) {
            new ProductRepository().searchProduct(value).then(data => {
                setSearchValue(data);
            }).catch(error => {
                console.error("Error fetching search results:", error);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setSearchValue([]);
        }
    }, []);

    const onChangeTextSearch = useCallback((text: string) => {
        setInputValue(text);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout to debounce
        const timeout = setTimeout(() => {
            fetchSearchResults(text);
        }, 500);

        setDebounceTimeout(timeout);
    }, [debounceTimeout, fetchSearchResults]);

    return {
        inputValue,
        setInputValue,
        searchValue,
        loading,
        onChangeTextSearch
    }
}