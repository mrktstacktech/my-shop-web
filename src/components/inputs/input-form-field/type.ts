import React from 'react';
import type { ReactNode } from 'react';

export type InputFormFieldType = {
    label?: string;
    name: string;
    type: string;
    id: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    onClick?: () => void;
    required?: boolean;
    className?: string;
    style?: React.CSSProperties;
    errorText?: string;
    hintText?: string;
    isMultiline?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    ref?: React.RefObject<HTMLTextAreaElement | null>
}