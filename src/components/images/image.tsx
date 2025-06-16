import type { ImageType } from "./type";

export function Image(props: ImageType) {
    return (
        <div className={`flex items-center justify-center ${props.classNameBackground || ''}`}>
            <img
                src={props.src}
                alt={props.alt}
                className={props.className}
                style={props.style}
            />
            {props.children}
        </div>
    );
}