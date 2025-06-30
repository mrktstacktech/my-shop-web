import type { DropDownType } from "./type";
import React from "react";
import './style.scss'

const styles = {
    dropdownItem: "flex items-center px-4 py-2 text-sm",
}

export function DropDown(props: DropDownType) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`dropdown items-center static${props.className || ""}`} id={props.id}>
            <button onClick={handleToggle} className={`dropdown__button  btn btn-secondary dropdown-toggle flex ${isOpen ? `dropdown__button--open` : `dropdown__button--close`} `} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.prefix} {props.label}
            </button>
            { isOpen && (
                <ul className={`dropdown__menu absolute rounded-md right-0 mt-2 z-10 }`}>
                {props.options.map((option, idx) => (
                    <li key={idx} >
                        <a className={`${styles.dropdownItem} ${props.classNameModal || ''}`} href={option.href}><span className="pr-1">{option.icon}</span> {option.label}</a>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}