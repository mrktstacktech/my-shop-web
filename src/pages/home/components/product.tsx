import { Card, CardSkeleton } from "@components";
import { AngleLeftIcon, AngleRightIcon } from "@constants";
import { useGetProduct, useUpdateCart } from "@hooks";
import { Link } from "react-router-dom";

export function ProductList() {
    const { data,
        loading,
        skip,
        setSkip,
        limit } = useGetProduct();

    const { updateCart } = useUpdateCart();

    return (
        <div className="component-container product-list">
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">Our products</div>
            </div>
            <div className="title-container product-list__title">
                <div className="title">Explore Our Products</div>
                <div className="product-list__title__buttons">
                    <button className="arrowButton mr-1" onClick={() => setSkip(Math.max(skip - limit, 0))} disabled={skip === 0}>{AngleLeftIcon}</button>
                    <button className="arrowButton" onClick={() => setSkip(skip + limit)} disabled={data.length === 0}>{AngleRightIcon}</button>
                </div>
            </div>

            {loading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 product-list__products">
                    {[...Array(8)].map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
                :
                (data.length === 0 ?
                    <div className="flex justify-center items-center">
                        <p>No products found.</p>
                    </div>
                    :
                    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 product-list__products">
                        {data.map(product => (
                            <Card
                                key={product.id}
                                title={<Link to={`/product/${product.id}`} key={product.id} className="sale__products__product-link">{product.title}</Link>}
                                thumbnail="/public/item.svg"
                                price={product.price}
                                rating={product.rating}
                                discountPercentage={product.discountPercentage}
                                reviewNumber={product.reviews.length}
                                onClick={() => updateCart([product])}
                                productId={product.id}
                            />
                        ))}
                    </div>)
            }

            <div className="flex justify-center mt-4 product-list__view-all">
                <button className="button view-button">View All Products</button>
            </div>
        </div>
    )
}