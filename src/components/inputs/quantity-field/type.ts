export interface QuantityFieldProps {
    maxQuantity?: number;
    className?: string;
    handleIncrement?: () => void;
    handleDecrement?: () => void;
    quantity?: number;
    setQuantity?: (value: number) => void;
}