import { Card } from "../../../components";
import { useGetProductsSorted } from "../../../hooks";

export function BestSeller() {
    const {
        data: products,
        loading,
    } = useGetProductsSorted(4, 'price');

    return (
        <div className="component-container">
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