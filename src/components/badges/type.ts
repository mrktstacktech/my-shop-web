import type React from "react"
// TODO :fix
export type BadgeType = {
    title: React.ReactNode;
    notification: number;
    styles?: React.CSSProperties;
    className?: string;
    href?: string;
}