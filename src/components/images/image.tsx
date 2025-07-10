import type { ImageType } from "./type";
import { useState } from "react";
import { Spinner } from "@/components";

export function Image(props: ImageType) {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <div className={`flex items-center justify-center ${props.classNameBackground || ''}`}>
            {loading && (
                <Spinner
                    className="flex items-center justify-center absolute w-20"
                    size={props.size || "medium"}
                    color={props.color || "primary"}
                />
            )}
            <img
                src={props.src}
                alt={props.alt}
                className={props.className}
                style={{ display: loading ? 'none' : 'block', ...props.style }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
            {props.children}
        </div>
    );
}