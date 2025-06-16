import { InputFormField } from "../inputs";
import { DropDown } from "../dropdown";
import { NAV_ITEMS, searchIcon, heartIcon, cartIcon, userIcon, USER_DROPDOWN_ITEMS } from "../../constants";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth-hook";


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
    }
        , []);

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
                        onChange={() => { }}
                        suffix={searchIcon}
                    />
                    <button className={styles.button}>
                        {heartIcon}
                    </button>
                    <button className={styles.button}>
                        {cartIcon}
                    </button>
                    {isAuthenticated ? (
                        <DropDown
                            label={userIcon}
                            value=""
                            prefix={null}
                            options={USER_DROPDOWN_ITEMS}
                            className={styles.button}
                            classNameModal={styles.modal}
                        />
                    ) : <div>Not login</div>}
                </div>
            </div>
        </header>
    );
}