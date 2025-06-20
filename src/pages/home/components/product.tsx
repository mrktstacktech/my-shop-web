import { Card } from "@components";
import { angleLeftIcon, angleRightIcon } from "@constants";
import { useGetProduct } from "@hooks";

export function ProductList() {
    const { data,
        loading,
        skip,
        setSkip,
        limit } = useGetProduct();

    return (
        <div className="component-container">
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">Our products</div>
            </div>
            <div className="title-container">
                <div className="title">Explore Our Products</div>
                <div>
                    <button className="arrowButton mr-1" onClick={() => setSkip(Math.max(skip - limit, 0))} disabled={skip === 0}>{angleLeftIcon}</button>
                    <button className="arrowButton" onClick={() => setSkip(skip + limit)} disabled={data.length === 0}>{angleRightIcon}</button>
                </div>
            </div>

            {loading ?
                <div className="flex justify-center items-center">
                    <p>Loading...</p>
                </div>
                :
                (data.length === 0 ?
                    <div className="flex justify-center items-center">
                        <p>No products found.</p>
                    </div>
                    :
                    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map(product => (
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
                    </div>)
            }
        </div>
    )
}