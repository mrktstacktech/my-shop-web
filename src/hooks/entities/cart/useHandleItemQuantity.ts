
import { useEffect, useMemo, useState } from 'react';
import { useGetCurrentCartItems } from './useGetCurrentCartItems';
import type { ProductsInCartEntity } from '@/services/domain/entities/cart.entity';

export function useHandleItemQuantity() {
    const { cart, loading } = useGetCurrentCartItems();
    const products = useMemo(() => cart?.products || [], [cart?.products]);

    const [productsInCart, setProductsInCart] = useState<ProductsInCartEntity[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (products.length > 0) {
            setProductsInCart(products);
        }
    }, [products]);

    useEffect(() => {
        const totalAmount = productsInCart.reduce((acc, product) => acc + product.total, 0);
        setTotal(totalAmount);
    }, [productsInCart]);

    const handleIncreaseQuantity = (productId: string) => {
        const updatedProducts = productsInCart.map(product => {
            if (product.id === productId) {
                return { ...product, quantity: product.quantity + 1, total: (product.quantity + 1) * product.price };
            }
            return product;
        });
        setProductsInCart(updatedProducts);
    }

    const handleDecreaseQuantity = (productId: string) => {
        const updatedProducts = productsInCart.map(product => {
            if (product.id === productId && product.quantity > 0) {
                return { ...product, quantity: product.quantity - 1, total: (product.quantity - 1) * product.price };
            }
            return product;
        }
        );
        setProductsInCart(updatedProducts);
    }
    return {
        productsInCart,
        total,
        loading,
        handleIncreaseQuantity,
        handleDecreaseQuantity
    };
}   