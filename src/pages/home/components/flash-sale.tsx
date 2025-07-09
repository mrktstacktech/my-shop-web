import { Card, Clock, CardSkeleton } from "@components";
import { AngleLeftIcon, AngleRightIcon } from "@constants";
import { useGetProductsSorted, useUpdateCart } from "@hooks";
import { Link } from "react-router-dom";

const K_SORT_FIELD_NAME = 'discountPercentage';

export function FlashSaleProduct() {
    const {
        data: products,
        loading,
        limit,
        skip,
        setSkip
    } = useGetProductsSorted(4, K_SORT_FIELD_NAME);

    const { updateCart } = useUpdateCart();

    return (
        <div className="component-container sale">
            <div className="subtitle-container sale__subtitle">
                <div className="red-block"></div>
                <div className="subtitle">Today</div>
            </div>

            <div className="title-container sale__title">
                <div className="flex items-end gap-5 sale__title-content">
                    <h2 className="title w-full">Flash Sale</h2>
                    <Clock targetTime={new Date(Date.now() + 3600000)} />
                </div>
                <div className="sale__title__buttons">
                    <button className={`arrowButton mr-1`} onClick={() => setSkip(Math.max(skip - limit, 0))} disabled={skip === 0} >
                        {AngleLeftIcon}
                    </button>
                    <button className={`arrowButton`} onClick={() => setSkip(skip + limit)} disabled={products.length === 0} >
                        {AngleRightIcon}
                    </button>
                </div>
            </div>

            {loading
                ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sale__products">
                    {[...Array(4)].map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
                : products.length > 0
                    ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sale__products">
                        {products.map(product => (
                            // <Link to={`/product/${product.id}`} key={product.id} className="sale__products__product-link">
                            <Card
                                key={product.id}
                                title={<Link to={`/product/${product.id}`} key={product.id} className="sale__products__product-link">{product.title}</Link>}
                                thumbnail="/public/item.svg"
                                price={product.price}
                                rating={product.rating}
                                discountPercentage={product.discountPercentage}
                                reviewNumber={product.reviews.length}
                                className="sale__products__product-card"
                                onClick={() => updateCart([product])}
                                productId={product.id}
                            />
                            // </Link>
                        ))}
                    </div>
                    : <p className="text-center">No products found.</p>
            }
            <div className="flex justify-center mt-4 sale__view-all">
                <button className="button view-button">View All Products</button>
            </div>
        </div>
    )
}