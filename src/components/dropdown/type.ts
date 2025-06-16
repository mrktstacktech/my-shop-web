import React from "react";

export type DropDownType = {
    id?: string;
    label: React.ReactNode;
    value: string | number;
    options: Array<{
        label: string;
        href: string;
        icon: React.ReactNode;
    }>;
    disabled?: boolean;
    description?: string;
    selected?: boolean;
    hidden?: boolean;
    onChange?: () => void;
    onClick?: () => void;
    className?: string;
    prefix: React.ReactNode;
    suffix?: React.ReactNode;
    classNameModal?: string;
}