import type React from "react";

export type CardType = {
    id?: string;
    title: string;
    thumbnail: string;
    description: string;
    price: number;
    discountPercentage?: number;
    className?: string;
    rating?: number;
    stock?: number;
    children?: React.ReactNode;
}