import { useBillingForm } from "@/hooks";
import { InputFormField, Radio } from "@/components";
import "./style.scss";
import { Options } from "@/constants";

export function CheckOutPage() {
    const {
        firstName,
        setFirstName,
        companyName,
        setCompanyName,
        street,
        setStreet,
        apartment,
        setApartment,
        city,
        setCity,
        phone,
        setPhone,
        email,
        setEmail,
        handleSubmit,
        payingError,
        error,
        cartItems,
        loading,
        total,
        setPayingMethod,
        isSuccess,
        setVoucher,
        voucher
    } = useBillingForm();


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }} className="billing-form">
            <div className="billing-form__details">
                <div className="billing-form__details__title">Billing Details</div>

                <div className="billing-form__details__fields">
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="first-name"
                            name="first-name"
                            label="First Name"
                            type="text"
                            value={firstName}
                            onChange={(value: string) => setFirstName(value)}
                            required={true}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.firstName && <p className="billing-form__details__fields__group__error-message">{error.firstName}</p>}
                    </div>
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="company-name"
                            name="company-name"
                            label="Company Name (optional)"
                            type="text"
                            value={companyName}
                            onChange={(value: string) => setCompanyName(value)}
                            required={false}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.companyName && <p className="billing-form__details__fields__group__error-message">{error.companyName}</p>}
                    </div>
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="street-address"
                            name="street-address"
                            label="Street Address"
                            type="text"
                            value={street}
                            onChange={(value: string) => setStreet(value)}
                            required={true}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.street && <p className="billing-form__details__fields__group__error-message">{error.street}</p>}
                    </div>
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="apartment"
                            name="apartment"
                            label="Apartment, floor, etc. (optional)"
                            type="text"
                            value={apartment}
                            onChange={(value: string) => setApartment(value)}
                            required={false}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.apartment && <p className="billing-form__details__fields__group__error-message">{error.apartment}</p>}
                    </div>
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="city"
                            name="city"
                            label="Town/City"
                            type="text"
                            value={city}
                            onChange={(value: string) => setCity(value)}
                            required={true}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.city && <p className="billing-form__details__fields__group__error-message">{error.city}</p>}
                    </div>
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="phone-number"
                            name="phone-number"
                            label="Phone Number"
                            type="text"
                            value={phone}
                            onChange={(value: string) => setPhone(value)}
                            required={true}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.phone && <p className="billing-form__details__fields__group__error-message">{error.phone}</p>}
                    </div>
                    <div className="billing-form__details__fields__group">
                        <InputFormField
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(value: string) => setEmail(value)}
                            required={true}
                            className="billing-form__details__fields__group__input-field"
                        />
                        {error.email && <p className="billing-form__details__fields__group__error-message">{error.email}</p>}
                    </div>
                </div>
            </div>

            <div className="billing-form__cart">
                <div className="billing-form__cart__list">
                    {loading ?
                        <p>Loading...</p>
                        :
                        <table>
                            <tbody>
                                {cartItems && cartItems.length > 0 ? (
                                    cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="image"><img src={item.thumbnail} /></td>
                                            <td className="title">{item.title}</td>
                                            <td>${item.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}><p>No items in the cart.</p></td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan={2}>Subtotal</td>
                                    <td className="total">${total}</td>
                                </tr>
                                <tr className="ship">
                                    <td colSpan={2} >Ship</td>
                                    <td className="total">Free</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Total</td>
                                    <td className="total">${total}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>

                <div className="billing-form__cart__payment-method">
                    <Radio
                        options={Options}
                        onChange={setPayingMethod}
                        className="billing-form__cart__payment-method"
                    />
                </div>

                <div className="billing-form__cart__input-coupon">
                    <InputFormField
                        type="text"
                        id="coupon"
                        name="coupon"
                        placeholder="Coupon Code"
                        className="billing-form__cart__input-coupon__coupon-input"
                        required={false}
                        value={voucher}
                        onChange={(value: string) => { setVoucher(value) }}
                    />
                    <button disabled={isSuccess} className="billing-form__cart__input-coupon__button red">Apply Coupon</button>
                </div>

                <div className="billing-form__cart__place-order">
                    {isSuccess ?
                        <p className="success-message">Payment successful! Thank you for your order.</p>
                        :
                        <button type="submit" className="billing-form__cart__place-order__button">
                            {loading ? "Processing..." : "Place Order"}
                        </button>
                    }
                </div>
                {!loading && payingError && <p className="error-message">{payingError}</p>}
            </div>
        </form>
    );
}