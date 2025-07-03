import { useHandleItemQuantity, useUpdateCart } from "@hooks";
// import './style.css'
import { InputFormField } from "@components";
import './style.scss'
import { Link } from "react-router-dom";

const FIX_NUMBER = 2;

export function CartPage() {
    const { productsInCart,
        total,
        stock,
        handleIncreaseQuantity,
        handleDecreaseQuantity
    } = useHandleItemQuantity();

    const { loading, updateCart } = useUpdateCart();

    return (
        <div className="cart-table">
            <div className="cart-table__wrapper">
                <table className="cart-table__wrapper__table">
                    <thead>
                        <tr>
                            <th className="product-header">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className="cart-table__wrapper__table__body">
                        {productsInCart.map((product) => (
                            <tr className={`cart-table__wrapper__table__body__row ${stock[product.id] ? '' : '`cart-table__wrapper__table__body__row--not-stock'}`} key={product.id}>
                                <td className="cart-table__wrapper__table__body__row__product-cell" data-label="Product">
                                    <img src={product.thumbnail} alt={product.title} />
                                    <span>{product.title}</span>
                                </td>
                                <td data-label="Price">${product.price.toFixed(FIX_NUMBER)}</td>
                                <td className="cart-table__wrapper__table__body__row__quantity-cell" data-label="Quantity">
                                    <span>{product.quantity}</span>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleIncreaseQuantity(product.id)} disabled={product.quantity >= stock[product.id]}>+</button>
                                        <button onClick={() => handleDecreaseQuantity(product.id)} disabled={product.quantity <= 0}>-</button>
                                    </div>
                                </td>
                                <td className="cart-table__wrapper__table__body__row__total-cell" data-label="Subtotal">${product.total.toFixed(FIX_NUMBER)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="cart-table__cart-buttons">
                <Link to="/" className="button" onClick={() => console.log("Return to Shop clicked")}>Return to Shop</Link>
                <button className="button" onClick={() => updateCart(productsInCart)} disabled={loading}>
                    {loading ? 
                            <span role="status">Updating...</span>
                        :
                        <span>Update Cart</span>
                    }
                </button>
            </div>

            <div className="cart-table__total-container">
                <div className="cart-table__total-container__input-coupon-container">
                    <InputFormField
                        type="text"
                        id="coupon"
                        name="coupon"
                        placeholder="Coupon Code"
                        className="cart-table__total-container__input-coupon-container__coupon-input"
                        required={false}
                        value=""
                        onChange={() => { }}
                    />
                    <button className="cart-table__total-container__input-coupon-container__button red">Apply Coupon</button>
                </div>
                <div className="cart-table__total-container__cart-summary">
                    <h2>Cart Total</h2>
                    <div className="cart-table__total-container__cart-summary__summary-row">
                        <p>Subtotal:</p>
                        <p>${total.toFixed(FIX_NUMBER)}</p>
                    </div>
                    <div className="cart-table__total-container__cart-summary__summary-row">
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <div className="cart-table__total-container__cart-summary__summary-row total">
                        <p>Total:</p>
                        <p>${total.toFixed(FIX_NUMBER)}</p>
                    </div>
                    <Link to="/check-out" className="cart-table__total-container__cart-summary__button red">Process to checkout</Link>
                </div>
            </div>
        </div>


    )
}