export type ImageType = {
    src: string;
    alt?: string;
    className?: string;
    classNameBackground?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    size?: "small" | "medium" | "large";
    color?: "primary" | "secondary" | "tertiary";
}
