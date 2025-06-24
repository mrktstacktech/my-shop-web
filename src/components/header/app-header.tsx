import { InputFormField, DropDown, Badges } from "@components";
import { searchIcon, heartIcon, cartIcon, userIcon, USER_DROPDOWN_ITEMS } from "@constants";
import { useAuthContext } from "@context/auth-hook";
import { useSearchProduct, useGetCurrentCart, useGetCurrentWishlist } from "@hooks";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./components";

const styles = {
    header: "shadow-(--shadow-header) mb-2",
    topHeader: "bg-black text-white text-center p-2",
    container: "flex justify-between items-center px-3 pt-3 pb-1",
    navigation: "flex justify-between items-center space-x-6",
    navItem: "text-gray-800 dark:text-white hover:border-b-1",
    navItemSelected: "border-b-1",
    buttonContainer: "flex items-center align-center relative",
    button: "p-2",
    searchInput: "flex items-center border border-gray-300 w-[250px] rounded-md px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
    modal: "bg-gray-900 text-white p-2 w-48 text-gray-900 opacity-80 hover:bg-gray-800",
};
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
    const { totalWishlistQuantity} = useGetCurrentWishlist();

    const cartItemCount = totalQuantity;
    const wishlistCount = totalWishlistQuantity;
    

    const handleWishlistClick = useCallback(() => {
        navigator("/my-wishlist");
    }, [navigator]);

    const handleCartClick = useCallback(() => {
        navigator("/my-cart"); 
    }, [navigator]);

    return (
        <header className={styles.header}>
            <div id="top-header" className={styles.topHeader}>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a className="underline font-bold ml-3" href="#">ShopNow</a>
            </div>

            <div className={styles.container}>
                <div className="logo-container">
                    <img src="/logo.svg" alt="Logo" className="logo w-40" />
                </div>
                <Navigation />
                <div className={styles.buttonContainer}>
                    <InputFormField
                        type="text"
                        id="search"
                        name="search"
                        placeholder="What are you looking for?"
                        className={`${styles.searchInput}`}
                        required={false}
                        value={inputValue}
                        onChange={(value: string) => onChangeTextSearch(value)}
                        suffix={searchIcon}
                    />
                    {/* TODO: hidden when not focus on input */}
                    {inputValue.length > 0 && (
                        <div className="absolute top-12 left-0 w-[250px] bg-white shadow-lg z-10">
                            {loading
                                ? <p className="p-2 text-gray-500">Searching...</p>
                                : (searchValue.length > 0
                                    ? <ul className="max-h-60 overflow-y-auto">
                                        {searchValue.map((product, index) => (
                                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                                {/* <a href={`/product/${product.id}`}>{product.title}</a> */}
                                                <Link to={`/product/${product.id}`} > {product.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    : <p className="p-2 text-gray-500">No results found</p>)}
                        </div>
                    )}
                    <Badges
                        notification={isAuthenticated ? wishlistCount : 0}
                        onClick={handleWishlistClick}
                    >
                        {heartIcon}
                    </Badges>
                    <Badges
                        notification={isAuthenticated ? cartItemCount : 0}
                        onClick={handleCartClick}
                    >
                        {cartIcon}
                    </Badges>
                    {isAuthenticated && (
                        <DropDown
                            label={userIcon}
                            value=""
                            prefix={null}
                            options={USER_DROPDOWN_ITEMS}
                            className={styles.button}
                            classNameModal={styles.modal}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}