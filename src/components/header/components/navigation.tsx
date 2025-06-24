import { NAV_ITEMS } from "@constants"
import { useEffect, useState } from "react"
import { Link } from "react-router";

const styles = {
    navigation: "flex justify-between items-center space-x-6",
    navItem: "text-gray-800 dark:text-white hover:border-b-1 cursor-pointer",
    navItemSelected: "border-b-1 cursor-pointer",
}
export function Navigation() {
    const [selectedItem, setSelectedItem] = useState<string | undefined>('Home');

    const handleClick = (item: string) => {
        setSelectedItem(item);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentItem = NAV_ITEMS.find(item => item.href === currentPath);
        setSelectedItem(currentItem?.label);
    }, []);
    return (
        <nav className={styles.navigation}>
            {NAV_ITEMS.map((item, index) => (
                <Link key={index}
                    onClick={() => handleClick(item.label)}
                    className={selectedItem == item.label ? styles.navItemSelected : styles.navItem}
                    to={item.href} >{item.label}</Link>
            ))}
        </nav>
    );
}