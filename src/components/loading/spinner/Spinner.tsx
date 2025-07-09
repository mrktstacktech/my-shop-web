import "./style.scss";

export function Spinner({
    size = "medium",
    color = "primary",
    className = "",
}: {
    size?: "small" | "medium" | "large";
    color?: "primary" | "secondary" | "tertiary";
    className?: string;
}) {
    const sizeClass = size === "small" ? "Spinner--small" : size === "large" ? "Spinner--large" : "Spinner--medium";
    const colorClass = color === "primary" ? "Spinner--primary" : color === "secondary" ? "Spinner--secondary" : "Spinner--tertiary";
    return (
        <div className={`Spinner ${sizeClass} ${colorClass} ${className}`}></div>
    )
}