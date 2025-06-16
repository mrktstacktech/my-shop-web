import type { DropDownType } from "./type";
import React from "react";

const styles = {
    dropdownItem: "flex items-center px-4 py-2 text-sm",
}

export function DropDown(props: DropDownType) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <div className={`dropdown items-center static ${props.className || ""}`} id={props.id}>
            <button onClick={(e) => handleToggle(e)} className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.prefix} {props.label}
            </button>
            { isOpen && (
                <ul className={`dropdown-menu absolute rounded-md right-0 mt-2 z-10 }`}>
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