import { useParams } from 'react-router-dom';
import { useGetSingleProductById } from '@hooks';
import { StarRating } from '@/components';
// import { HeartIcon } from '@/constants';
import './style.scss';
import { TruckIcon, ReloadIcon } from '@/constants/icon';
import { QuantityField } from '@/components';
import { useGetProductByCategory, useAddSingleProductToCart } from '@hooks';
import { Card, ProductDetailSkeleton } from '@/components';
import { Link } from 'react-router-dom';
import { ProductImage, WishlistUpdateButton, CardSkeleton } from '@/components';
import { useEffect, useState } from 'react';

export function ProductDetailPage() {
    const params = useParams();
    const { isFound, loading, product } = useGetSingleProductById(params.id || '');
    const { data: relatedProducts, loading: relatedLoading } = useGetProductByCategory(4, product?.category || '');
    const productImages = [
        product?.images[0],
        product?.images[0],
        product?.images[0],
        product?.images[0],
        "/public/item.svg"
    ];

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        console.log("quantity", quantity);
    }, [quantity]);

    const { addSingleProductToCart } = useAddSingleProductToCart();

    return (
        <div className="product-detail-page">
            {loading ? <div>
                <ProductDetailSkeleton />
            </div>
                : (isFound ?
                    <div className="product-detail-page__product-detail">
                        <ProductImage
                            images={productImages}
                            className="product-detail-page__product-detail__thumbnail"
                        />

                        <div className="product-detail-page__product-detail__info">
                            <div className="product-detail-page__product-detail__info__title">{product?.title}</div>
                            <div className="product-detail-page__product-detail__info__rating-stock">
                                <div>
                                    <StarRating rating={product?.rating || 0} reviewNumber={product?.reviews.length} />
                                </div>
                                <div>
                                    {product?.stock > 0 ? (
                                        <span>In Stock</span>
                                    ) : (
                                        <span>Out of Stock</span>
                                    )}
                                </div>
                            </div>
                            <div className="product-detail-page__product-detail__info__price">
                                ${product?.price.toFixed(2)}
                            </div>
                            <div className="product-detail-page__product-detail__info__description">
                                {product?.description}
                            </div>
                            <div className="product-detail-page__product-detail__info__actions">
                                <div className='product-detail-page__product-detail__info__actions__quantity'>
                                    <QuantityField
                                        className='product-detail-page__product-detail__info__actions__quantity'
                                        maxQuantity={product.stock}
                                        quantity={quantity}
                                        setQuantity={setQuantity}
                                    />
                                </div>
                                <button onClick={() => addSingleProductToCart(product.id, quantity)} className='product-detail-page__product-detail__info__actions__buy-button' disabled={product?.stock <= 0 ? true : false}>Buy now</button>
                                {/* <button className='product-detail-page__product-detail__info__actions__heart-button' >{HeartIcon}</button> */}
                                <WishlistUpdateButton productId={product?.id || ''} className='product-detail-page__product-detail__info__actions__heart-button' />
                            </div>
                            <div className="product-detail-page__product-detail__info__delivery">
                                <div className="product-detail-page__product-detail__info__delivery__title">
                                    <div className="product-detail-page__product-detail__info__delivery__title__icon">{TruckIcon}</div>
                                    <div className="product-detail-page__product-detail__info__delivery__title__text">
                                        <h4>Free Delivery</h4>
                                        <p>Enter your postal code for Delivery Availability</p>
                                    </div>
                                </div>
                                <div className="product-detail-page__product-detail__info__delivery__title">
                                    <div className="product-detail-page__product-detail__info__delivery__title__icon">{ReloadIcon}</div>
                                    <div className="product-detail-page__product-detail__info__delivery__title__text">
                                        <h4>Return Delivery</h4>
                                        <p>Free 30 Days Delivery Returns. Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="product-detail-page__not-found">
                        <p>Product not found.</p>
                    </div>
                )
            }

            <div className="product-detail-page__related-products">
                <div className="product-detail-page__related-products__header">
                    <div className="product-detail-page__related-products__header__red-block"></div>
                    <div className="product-detail-page__related-products__header__title">Related Items</div>
                </div>

                <div className="product-detail-page__related-products__list-container">
                    {relatedLoading ?
                        <div className="product-detail-page__related-products__list-container__list">
                            {[...Array(4)].map((_, index) => (
                                <CardSkeleton key={index} />
                            ))}
                        </div>
                        : (
                            <div className="product-detail-page__related-products__list-container__list">
                                {relatedProducts.map(product => (
                                    <Card
                                        title={<Link to={`/product/${product.id}`} key={product.id} className="sale__products__product-link">{product.title}</Link>} thumbnail={product.images[0]}
                                        price={product.price}
                                        rating={product.rating}
                                        discountPercentage={product.discountPercentage}
                                        reviewNumber={product.reviews.length}
                                        productId={product.id}
                                    />
                                ))}
                            </div>
                        )}
                </div>
            </div>

        </div>

    );
}