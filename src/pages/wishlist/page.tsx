import { Card } from "@components";
import { useGetCurrentCartItems, useAddToCart } from "@hooks";
import './style.css';
import { useState, useEffect } from "react";
import type { ProductsInCartEntity } from "@/services/domain/entities";

export function WishListPage() {
    const {
        cart,
        loading
    } = useGetCurrentCartItems();

    const { addToCart } = useAddToCart(cart?.products || []);
    const [products, setProducts] = useState<ProductsInCartEntity[]>([]);

    useEffect(() => {
        setProducts(cart?.products || []);
    }, [cart]);

    const handleMoveAllToBag = () => {
        addToCart();
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