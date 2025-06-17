import { useState, useCallback, useEffect } from "react";
import { ProductRepository } from "../../../services/repositories";
import type { ProductListEntity } from "../../../services/domain/entities";
import { Card } from "../../../components";
import { angleLeftIcon, angleRightIcon } from "../../../constants";

const K_LIMIT_PER_PAGE = 4;

export function FlashSaleProduct() {
    const [products, setProducts] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);

    const fetchBestSellers = useCallback(() => {
        setLoading(true);
        const response = new ProductRepository().getProductSorted(K_LIMIT_PER_PAGE, skip, 'discountPercentage');
        response.then(data => {
            setProducts(data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [skip]);

    useEffect(() => {
        fetchBestSellers();
    }, [fetchBestSellers]);

    return (
        <div>
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">Today</div>
            </div>

            <div className="title-container">
                <h2 className="title">Flash Sale</h2>
                <div>
                    <button className={`arrowButton mr-1`} onClick={() => setSkip(prev => Math.max(prev - K_LIMIT_PER_PAGE, 0))} disabled={skip === 0} >
                        {angleLeftIcon}
                    </button>
                    <button className={`arrowButton`} onClick={() => setSkip(prev => prev + K_LIMIT_PER_PAGE)} disabled={products.length === 0} >
                        {angleRightIcon}
                    </button>
                </div>
            </div>

            {loading
                ? <div className="flex items-center">
                    <p>Loading...</p>
                </div>
                : products.length > 0
                    ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map(product => (
                            <Card
                                key={product.id}
                                title={product.title}
                                thumbnail="/public/item.svg"
                                price={product.price}
                                rating={product.rating}
                                discountPercentage={product.discountPercentage}
                                reviewNumber={product.reviews.length}
                            />
                        ))}
                    </div>
                    : <p className="text-center">No products found.</p>
            }
            <div className="flex justify-center mt-4">
                <button className="button view-button">View All Products</button>
            </div>
        </div>
    )
}