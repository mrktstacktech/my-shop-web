import { Card } from "@components";
import { useGetProductsSorted, useAddToCart } from "@hooks";
import { Link } from "react-router-dom";

export function BestSeller() {
    const {
        data: products,
        loading,
    } = useGetProductsSorted(4, 'price');

    const { addToCart } = useAddToCart();

    return (
        <div className="component-container best-seller">
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">This month</div>
            </div>

            <div className="title-container best-seller__title">
                <h2 className="title">Best Selling Products</h2>
                <button className="button view-button best-seller__title__view-all-inline">View All</button>
            </div>
            {loading ? (
                <div className="flex items-center">
                    <p>Loading...</p>
                </div>
            ) : (
                products.length > 0
                    ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 best-seller__products">
                        {products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="best-seller__products__product-link">
                                <Card
                                    key={product.id}
                                    title={product.title}
                                    thumbnail="/public/item.svg"
                                    price={product.price}
                                    rating={product.rating}
                                    discountPercentage={product.discountPercentage}
                                    reviewNumber={product.reviews.length}
                                    className="best-seller__products__product-card"
                                    onClick={() => addToCart([product])}
                                />
                            </Link>
                        ))}
                    </div>
                    : <p className="text-center">No products found.</p>

            )}

            <div className="flex justify-center mt-4 best-seller__view-all">
                <button className="button view-button">View All Products</button>
            </div>

        </div>
    )
}