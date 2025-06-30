import { InputFormField, DropDown, Badges } from "@components";
import { searchIcon, heartIcon, cartIcon, userIcon, USER_DROPDOWN_ITEMS } from "@constants";
import { useAuthContext } from "@context/auth-hook";
import { useSearchProduct, useGetCurrentCart, useGetCurrentWishlist } from "@hooks";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./components";
import "./style.scss";

export function AppHeader() {
    const navigator = useNavigate();
    const { isAuthenticated } = useAuthContext();
    const {
        inputValue,
        searchValue,
        loading,
        onChangeTextSearch
    } = useSearchProduct();

    const { totalQuantity } = useGetCurrentCart();
    const { totalWishlistQuantity } = useGetCurrentWishlist();

    const cartItemCount = totalQuantity;
    const wishlistCount = totalWishlistQuantity;

    const handleWishlistClick = useCallback(() => {
        navigator("/my-wishlist");
    }, [navigator]);

    const handleCartClick = useCallback(() => {
        navigator("/my-cart");
    }, [navigator]);

    return (
        //TODO: follow BEM naming convention for class names
        <header className="app-header">
            <div id="top-header" className="app-header__top">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                <a className="app-header__top__shop-link" href="#">ShopNow</a>
            </div>

            <div className="app-header__container">
                <div className="app-header__container__logo">
                    <img src="/logo.svg" alt="Logo" />
                </div>

                <Navigation />

                <div className="app-header__container__controls">
                    <InputFormField
                        type="text"
                        id="search"
                        name="search"
                        placeholder="What are you looking for?"
                        className="app-header__container__controls__search-input"
                        required={false}
                        value={inputValue}
                        onChange={onChangeTextSearch}
                        suffix={searchIcon}
                    />

                    {inputValue.length > 0 && (
                        <div className="app-header__container__controls__search-dropdown">
                            {loading ? (
                                <p className="app-header__search-status">Searching...</p>
                            ) : (
                                searchValue.length > 0 ? (
                                    <ul className="app-header__search-results">
                                        {searchValue.map((product, index) => (
                                            <li key={index} className="app-header__search-item">
                                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="app-header__search-status">No results found</p>
                                )
                            )}
                        </div>
                    )}

                    <Badges notification={isAuthenticated ? wishlistCount : 0} onClick={handleWishlistClick} className="app-header__container__controls__badge">
                        {heartIcon}
                    </Badges>

                    <Badges notification={isAuthenticated ? cartItemCount : 0} onClick={handleCartClick} className="app-header__container__controls__badge">
                        {cartIcon}
                    </Badges>

                    {isAuthenticated && (
                        <DropDown
                            label={userIcon}
                            value=""
                            prefix={null}
                            options={USER_DROPDOWN_ITEMS}
                            className="app-header__container__controls__dropdown-button"
                        />
                    )}
                </div>
            </div>
        </header>
    );
}