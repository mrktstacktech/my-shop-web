export type SubImageType = {
    src: string;
    alt: string;
    className?: string;
    size? : "large" | "medium" | "small";
    style?: React.CSSProperties;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}