
import { useEffect, useState } from 'react';
import type { ProductsInCartEntity } from '@/services/domain/entities/cart.entity';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { ProductRepository } from '@/services/repositories';

export function useHandleItemQuantity() {
    const products = useSelector((state: RootState) => state.root.cart.currentCartItems) as ProductsInCartEntity[];

    const [productsInCart, setProductsInCart] = useState<ProductsInCartEntity[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [stock, setStock] = useState<Record<string, number>>({});
    const [productLoading, setProductLoading] = useState<boolean>(true);

    const getProductById = new ProductRepository().getProductById;

    useEffect(() => {
        try {
            setProductLoading(true);

            const fetchStock = async () => {
                const stockMap: Record<string, number> = {};
                for (const product of products) {
                    if (!stockMap[product.id]) {
                        const productData = await getProductById(product.id);
                        stockMap[product.id] = productData.stock;
                    }
                }
                setStock(stockMap);
            };
            fetchStock();
        }
        catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setProductLoading(false);
        }
    }, [products, getProductById]);

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
                const availableStock = stock[productId] || 0;
                if (product.quantity >= availableStock) {
                    return product;
                }
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
        productLoading,
        total,
        stock,
        handleIncreaseQuantity,
        handleDecreaseQuantity
    };
}   