import type { DropDownType } from "./type";
import './style.scss'
import { useAuthContext } from "@/context/auth-hook";
import { useState } from "react";
const styles = {
    dropdownItem: "flex items-center px-4 py-2 text-sm",
}

export function DropDown(props: DropDownType) {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuthContext();

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleLogout = (label: string) => {
        if (label === 'Logout') {
            logout();
            window.location.href = '/';
        }
        setIsOpen(false);
    }

    return (
        <div className={`dropdown items-center static ${props.className || ""}`} id={props.id}>
            <div onClick={() => setIsOpen(false)} className={`dropdown__wrapper`} style={{display: isOpen ? 'block' : 'none'}}></div>
            <button onClick={handleOpen} className={`dropdown__button  btn btn-secondary dropdown-toggle flex ${isOpen ? `dropdown__button--open` : `dropdown__button--close`} `} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.prefix} {props.label}
            </button>
            { isOpen && (
                <ul className={`dropdown__menu absolute rounded-md right-0 mt-2 z-10 }`}>
                {props.options.map((option, idx) => (
                    <li onClick={() => handleLogout(option.label)} key={idx} >
                        <a className={`${styles.dropdownItem} ${props.classNameModal || ''}`} href={option.href}><span className="pr-1">{option.icon}</span> {option.label}</a>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}