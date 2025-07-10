import { InputFormField, DropDown, Badges, Tooltip } from "@components";
import { SearchIcon, HeartIcon, CartIcon, UserIcon, USER_DROPDOWN_ITEMS } from "@constants";
import { useAuthContext } from "@context/auth-hook";
import { useSearchProduct, useGetCurrentCart, useGetCurrentWishlist } from "@hooks";
import { useCallback, useState, useEffect } from "react";
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
    const [isOpen, setIsOpen] = useState(false);

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

    useEffect(() => {
        if (inputValue.length > 0) {
            setIsOpen(true);
        }
        else {
            setIsOpen(false);
        }

    }, [inputValue]);

    return (
        <header className="app-header">
            <div
                className="app-header__wrapper"
                onClick={() => setIsOpen(false)}
                style={{ display: isOpen ? 'block' : 'none' }}
            ></div>
            <div id="top-header" className="app-header__top">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                <a className="app-header__top__shop-link" href="#">ShopNow</a>
            </div>

            <div className="app-header__container">
                <div className="app-header__container__logo">
                    <Link to="/" className="app-header__container__logo__link">
                        <img src="/logo.svg" alt="Logo" />
                    </Link>
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
                        suffix={SearchIcon}
                    />

                    {isOpen && inputValue.length > 0 && (
                        <div className="app-header__container__controls__search-dropdown">
                            {loading ? (
                                <p className="app-header__container__controls__search-dropdown__search-status">Searching...</p>
                            ) : (
                                searchValue.length > 0 ? (
                                    <ul className="app-header__container__controls__search-dropdown__search-results">
                                        {searchValue.map((product, index) => (
                                            <li key={index} className="app-header__container__controls__search-dropdown__search-results__search-item">
                                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="app-header__container__controls__search-dropdown__search-status">No results found</p>
                                )
                            )}
                        </div>
                    )}

                    <Tooltip content="My Wishlist" position="bottom" className="app-header__container__controls__tooltip">
                        <Badges notification={isAuthenticated ? wishlistCount : 0} onClick={handleWishlistClick} className="app-header__container__controls__tooltip__badge">
                            {HeartIcon}
                        </Badges>
                    </Tooltip>

                    <Tooltip content="My Cart" position="bottom" className="app-header__container__controls__tooltip">
                        <Badges notification={isAuthenticated ? cartItemCount : 0} onClick={handleCartClick} className="app-header__container__controls__tooltip__badge">
                            {CartIcon}
                        </Badges>
                    </Tooltip>

                    {isAuthenticated && (
                        <DropDown
                            label={UserIcon}
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