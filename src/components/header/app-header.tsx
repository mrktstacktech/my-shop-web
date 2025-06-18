import { InputFormField } from "../inputs";
import { DropDown } from "../dropdown";
import { NAV_ITEMS, searchIcon, heartIcon, cartIcon, userIcon, USER_DROPDOWN_ITEMS } from "../../constants";
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../../context/auth-hook";
import { ProductRepository } from "../../services/repositories";
import type { ProductListEntity } from "../../services/domain/entities";

const styles = {
    header: "shadow-(--shadow-header)",
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
    const [selectedItem, setSelectedItem] = useState('Home');
    const { isAuthenticated } = useAuthContext();
    const [inputValue, setInputValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<ProductListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const fetchSearchResults = useCallback((value: string) => {
        setLoading(true);
        if (value.length > 0) {
            new ProductRepository().searchProduct(value).then(data => {
                setSearchValue(data);
            }).catch(error => {
                console.error("Error fetching search results:", error);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setSearchValue([]);
        }
    }, []);

    const onChangeTextSearch = useCallback((text: string) => {
        setInputValue(text);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout to debounce
        const timeout = setTimeout(() => {
            fetchSearchResults(text);
        }, 500);

        setDebounceTimeout(timeout);
    }, [debounceTimeout, fetchSearchResults]);

    const handleClick = (item: string) => {
        setSelectedItem(item);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentItem = NAV_ITEMS.find(item => item.href === currentPath);
        if (currentItem) {
            setSelectedItem(currentItem.label);
        } else {
            setSelectedItem('Home'); // Default to Home if no match found
        }
    }, []);

    return (
        <header className={styles.header}>
            <div id="top-header" className={styles.topHeader}>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a className="underline font-bold ml-3" href="#">ShopNow</a>
            </div>

            <div className={styles.container}>
                <div className="logo-container">
                    <img src="/logo.svg" alt="Logo" className="logo w-40" />
                </div>
                <nav className={styles.navigation}>
                    {NAV_ITEMS.map((item, index) => (
                        <a key={index} onClick={() => handleClick(item.label)} className={selectedItem == item.label ? styles.navItemSelected : styles.navItem} href={item.href}>{item.label}</a>
                    ))}
                </nav>
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
                    {inputValue.length > 0 && (
                        <div className="absolute top-12 left-0 w-[250px] bg-white shadow-lg z-10">
                            {loading
                                ? <p className="p-2 text-gray-500">Searching...</p>
                                : (searchValue.length > 0
                                    ? <ul className="max-h-60 overflow-y-auto">
                                        {searchValue.map((product, index) => (
                                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                                <a href={`/product/${product.id}`}>{product.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    : <p className="p-2 text-gray-500">No results found</p>)}
                        </div>
                    )}
                    <button className={styles.button}>
                        {heartIcon}
                    </button>
                    <button className={styles.button}>
                        {cartIcon}
                    </button>
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