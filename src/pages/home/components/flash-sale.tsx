import { Card } from "../../../components";
import { angleLeftIcon, angleRightIcon } from "../../../constants";
import { useGetProductsSorted } from "../../../hooks";
import { Clock } from "../../../components";

const K_SORT_FIELD_NAME = 'discountPercentage';

export function FlashSaleProduct() {
    const {
        data: products,
        loading,
        limit,
        skip,
        setSkip
    } = useGetProductsSorted(4, K_SORT_FIELD_NAME);

    return (
        <div className="component-container">
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">Today</div>
            </div>

            <div className="title-container">
                <div className="flex items-end gap-5">
                    <h2 className="title w-full">Flash Sale</h2>
                    <Clock targetTime={new Date(Date.now() + 3600000)} />
                </div>
                <div>
                    <button className={`arrowButton mr-1`} onClick={() => setSkip(Math.max(skip - limit, 0))} disabled={skip === 0} >
                        {angleLeftIcon}
                    </button>
                    <button className={`arrowButton`} onClick={() => setSkip(skip + limit)} disabled={products.length === 0} >
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