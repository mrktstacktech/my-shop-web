import { useEffect, useState } from "react";
import { ProductRepository } from "@services/repositories/productRepository.impl";
import type { ProductEntity } from "@/services/domain/entities";

export function useGetSingleProductById(id: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<ProductEntity>(
        {
            id: '',
            title: '',
            description: '',
            category: '',
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            tags: [],
            brand: '',
            sku: '',
            weight: 0,
            dimensions: {
                length: 0,
                width: 0,
                height: 0,
            },
            warrantyInformation: '',
            shippingInformation: '',
            availabilityStatus: '',
            reviews: [],
            returnPolicy: '',
            minimumOrderQuantity: 0,
            meta: {
                createdAt: '',
                updatedAt: '',
                barcode: '',
                qrCode: '',
            },
            thumbnails: '',
            images: []
        }
    );
    const [isFound, setIsFound] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productRepo = new ProductRepository();
                const product = await productRepo.getProductById(id);
                if (product) {
                    setProduct(product);
                } else {
                    setIsFound(false);
                }
            } catch (error) {
                setIsFound(false);
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { isFound, loading, product };
}