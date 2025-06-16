import type React from "react";

export type CarouselType = {
    id?: string;
    images: React.ReactNode[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
    onSlideChange?: (currentIndex: number) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    preButton?: React.ReactNode;
    nextButton?: React.ReactNode;
    showIndicators?: boolean;
}