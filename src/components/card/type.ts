export type CardType = {
    productId: string;
    title: string;
    thumbnail: string;
    description?: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    reviewNumber?: number;
    className?: string;
    onClick?: () => void;
}