import type { ProductListEntity } from "../../../services/domain/entities";
import { ProductRepository } from "../../../services/repositories";
import { useCallback, useState, useEffect } from "react";
import { Card } from "../../../components";

export function BestSeller() {
    const [products, setProducts] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBestSellers = useCallback(() => {
        setLoading(true);
        const response = new ProductRepository().getProductSorted(4, 0, 'price');
        response.then(data => {
            setProducts(data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchBestSellers();
    }, [fetchBestSellers]);

    return (
        <div>
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">This month</div>
            </div>

            <div className="title-container">
                <h2 className="title">Best Selling Products</h2>
                <button className="button view-button">View All</button>
            </div>
            {loading ? (
                <div className="flex items-center">
                    <p>Loading...</p>
                </div>
            ) : (
                products.length > 0
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

            )}

        </div>
    )
}