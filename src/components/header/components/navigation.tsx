import { NAV_ITEMS } from "@constants"
import { useEffect, useState } from "react"
import { Link } from "react-router";
import './style.scss'
import { BarIcon, CloseIcon } from "@constants";

export function Navigation() {
    const [selectedItem, setSelectedItem] = useState<string | undefined>('Home');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = (item: string) => {
        setSelectedItem(item);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentItem = NAV_ITEMS.find(item => item.href === currentPath);
        setSelectedItem(currentItem?.label);
    }, [window.location.pathname]);

    return (
        <>
            <button className={`bar-button ${isOpen ? "bar-button--open" : "bar-button--close"}`} onClick={() => setIsOpen(true)}>
                {BarIcon}
            </button>
            <div className={`navigation-container ${isOpen ? "navigation-container--open" : "navigation-container--close"}`} onClick={() => setIsOpen(false)}>
                <div className="navigation-container__logo">
                    <img src="/public/logo.svg" alt="Logo" />
                </div>
                <button className="navigation-container__close-button" onClick={() => setIsOpen(true)}>
                    {CloseIcon}
                </button>
                <nav className={`navigation-container__navigation ${isOpen ? 'navigation-container__navigation--open' : 'navigation-container__navigation--close'}`}>
                    {NAV_ITEMS.map((item, index) => (
                        <div className="navigation-container__navigation__item">
                            {item.icon}
                            <Link key={index}
                                onClick={() => handleClick(item.label)}
                                className={selectedItem == item.label ? `navigation-container__navigation__item__itemSelected` : `navigation-container__navigation__item__itemNotSelected`}
                                to={item.href} >{item.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
}