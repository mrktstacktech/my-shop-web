import { useBillingForm } from "@/hooks";
import { InputFormField } from "@/components";
import "./style.scss";
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
        cartItems,
        loading,
    } = useBillingForm();


    return (
        <form onSubmit={handleSubmit} className="billing-form">
            <div className="billing-form__details">
                <div className="billing-form__details__title">Billing Detail</div>

                <div className="billing-form__details__fields">
                    <InputFormField
                        id="first-name"
                        name="first-name"
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={(value: string) => setFirstName(value)}
                        required={true}
                        className="billing-form__details__fields__field"
                    />
                    <InputFormField
                        id="company-name"
                        name="company-name"
                        label="Company Name"
                        type="text"
                        value={companyName}
                        onChange={(value: string) => setCompanyName(value)}
                        className="billing-form__details__fields__field"
                    />
                    <InputFormField
                        id="street-address"
                        name="street-address"
                        label="Street Address"
                        type="text"
                        value={street}
                        onChange={(value: string) => setStreet(value)}
                        required={true}
                        className="billing-form__details__fields__field"
                    />
                    <InputFormField
                        id="apartment"
                        name="apartment"
                        label="Apartment, floor, etc. (optional)"
                        type="text"
                        value={apartment}
                        onChange={(value: string) => setApartment(value)}
                        required={false}
                        className="billing-form__details__fields__field"
                    />
                    <InputFormField
                        id="city"
                        name="city"
                        label="Town/City"
                        type="text"
                        value={city}
                        onChange={(value: string) => setCity(value)}
                        required={true}
                        className="billing-form__details__fields__field"
                    />
                    <InputFormField
                        id="phone-number"
                        name="phone-number"
                        label="Phone Number"
                        type="text"
                        value={phone}
                        onChange={(value: string) => setPhone(value)}
                        required={true}
                        className="billing-form__details__fields__field"
                    />
                    <InputFormField
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(value: string) => setEmail(value)}
                        required={true}
                        className="billing-form__details__fields__field"
                    />
                </div>
            </div>

            <div className="billing-form__cart">
                <div>
                    {loading ?
                        <p>Loading...</p>
                        :
                        (cartItems && cartItems.length > 0 ? (
                            <table>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td><img src={item.thumbnail} /></td>
                                            <td>{item.title}</td>
                                            <td>${item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No items in the cart.</p>
                        ))}
                </div>

                <div></div>

                <div></div>

                <div>
                    <button type="submit" disabled={payingError ? true : false}>Pay</button>
                </div>
                {!loading && payingError && <p className="error-message">{payingError}</p>}
            </div>
        </form>
    );
}