import type React from "react"

export type BadgeType = {
    notification: React.ReactNode;
    styles?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}