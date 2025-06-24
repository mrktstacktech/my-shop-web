import type React from "react"
// TODO :fix
export type BadgeType = {
    notification: number;
    styles?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}