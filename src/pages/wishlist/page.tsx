import { Card } from "@components";
import { useMoveToBag } from "@hooks";
import './style.css';
import { useState, useEffect } from "react";
import type { ProductsInCartEntity } from "@/services/domain/entities";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
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
        <div className="title-container">
            <h2>Wishlist</h2>
            <button className="button outline" onClick={() => handleMoveAllToBag()}>Move All To Bag</button>
        </div>
        <div className="wishlist-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                products?.length > 0 ? (
                    products.map((product) => (
                        <Card
                            key={product.id}
                            title={product.title}
                            thumbnail="/public/item.svg"
                            price={product.price}
                            className="wishlist"
                            discountPercentage={product.discountedPercentage}
                        />
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )
            )}
        </div>
    </div>
    );
}