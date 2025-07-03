import type React from "react";

type Option = {
    label: React.ReactNode;
    value: string;
}
export type RadioProps = {
    options: Option[];
    setCheckedValue?: (value: string) => void;
    disabled?: boolean;
    onChange?: (value: string) => void;
    label?: string;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    type?: "radio" | "checkbox";
};