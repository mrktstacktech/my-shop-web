export type CardType = {
    productId: string;
    title: React.ReactNode;
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