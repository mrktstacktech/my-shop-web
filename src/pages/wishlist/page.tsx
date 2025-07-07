import { Card } from "@components";
import { useMoveToBag } from "@hooks";
import './style.scss';
import { useState, useEffect } from "react";
import type { ProductsInCartEntity } from "@/services/domain/entities";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Link } from "react-router-dom";
export function WishListPage() {
    const loading = false;
    const cart = useSelector((state: RootState) => state.root.cart.currentWishlistItems);

    const { moveToBag } = useMoveToBag(cart || []);
    const [products, setProducts] = useState<ProductsInCartEntity[]>([]);

    useEffect(() => {
        setProducts(cart || []);
    }, [cart]);

    const handleMoveAllToBag = () => {
        moveToBag();
        setProducts([]);
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-page__title-container">
                <h2>Wishlist</h2>
                <button className="wishlist-page__title-container__button" onClick={() => handleMoveAllToBag()}>Move All To Bag</button>
            </div>
            <div className="wishlist-page__wishlist-container">
                {loading ? (
                    <p className="wishlist-page__wishlist-container--loading">Loading...</p>
                ) : (
                    products?.length > 0 ? (
                        products.map((product) => (
                            <Card
                                key={product.id}
                                title={<Link to={`/product/${product.id}`} key={product.id} className="sale__products__product-link">{product.title}</Link>} thumbnail="/public/item.svg"
                                price={product.price}
                                className="wishlist-page__wishlist-container__card"
                                discountPercentage={product.discountedPercentage}
                                productId={product.id}
                            />
                        ))
                    ) : (
                        <p className="wishlist-page__wishlist-container--empty">Your wishlist is empty.</p>
                    )
                )}
            </div>
        </div>
    );
}