import type { ButtonType } from "./type";

export function Button(props: ButtonType) { 
    return (
        <a href="#">
            <button
                onClick={props.onClick}
                disabled={props.disabled}
                className={props.className}
                style={props.style}
                type={props.type || 'button'}
            >
                {props.prefix && <span className="icon">{props.prefix}</span>}
                {props.loading ? 'Loading...' : props.label}
                {props.suffix && <span className="icon">{props.suffix}</span>}
            </button>
        </a>
    )
}