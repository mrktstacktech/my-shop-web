import { useHandleItemQuantity, useAddToCart } from "@hooks";
import './style.css'
import { InputFormField } from "@components";

const FIX_NUMBER = 2;

export function CartPage() {
    const {productsInCart,
            total,
            loading,
            handleIncreaseQuantity,
            handleDecreaseQuantity 
        } = useHandleItemQuantity();

    const { addToCart } = useAddToCart(productsInCart);

    return (
        <div className="cart-container">
            <div className="cart-table-wrapper">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="loading-cell">Loading...</td>
                            </tr>
                        ) : (
                            productsInCart.map((product) => (
                                <tr key={product.id}>
                                    <td className="product-cell">
                                        <img src={product.thumbnail} alt={product.title} />
                                        <span>{product.title}</span>
                                    </td>
                                    <td>${product.price.toFixed(FIX_NUMBER)}</td>
                                    <td className="quantity-cell">
                                        <span>{product.quantity}</span>
                                        <div className="quantity-controls">
                                            <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                            <button onClick={() => handleDecreaseQuantity(product.id)} disabled={product.quantity <= 0}>-</button>
                                        </div>
                                    </td>
                                    <td className="total-cell">${product.total.toFixed(FIX_NUMBER)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="cart-buttons">
                <a href="/" className="button outline" onClick={() => console.log("Return to Shop clicked")}>Return to Shop</a>
                <button className="button outline" onClick={() => addToCart()}>Update Cart</button>
            </div>

            <div className="total-container">
                <div className="input-coupon-container">
                    <InputFormField
                        type="text"
                        id="coupon"
                        name="coupon"
                        placeholder="Coupon Code"
                        className="coupon-input"
                        required={false}
                        value=""
                        onChange={() => {}}
                    />
                    <button className="button red">Apply Coupon</button>
                </div>
                <div className="cart-summary">
                    <h2>Cart Total</h2>
                    <div className="summary-row">
                        <p>Subtotal:</p>
                        <p>${total.toFixed(FIX_NUMBER)}</p>
                    </div>
                    <div className="summary-row">
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <div className="summary-row total">
                        <p>Total:</p>
                        <p>${total.toFixed(FIX_NUMBER)}</p>
                    </div>
                    <button className="button red">Process to checkout</button>
                </div>
            </div>
        </div>


    )
}