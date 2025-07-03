import { useState, useEffect } from "react";
import './style.scss';

export function QuantityField({
    maxQuantity = 10,
    className = "",
    setValue,
}: {
    maxQuantity?: number;
    className?: string;
    setValue?: (value: number) => void;
} = {}) {
    // TODO: remove, using props from parent component
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (setValue) setValue(quantity);
    }, [quantity, setValue]);

    return (
        <div className={`quantity-field ${className}`}>
            <button
                className={`quantity-field__remove-button ${className}__remove-button`}
                onClick={handleDecrement}
                disabled={quantity <= 1}
            ></button>
            <input
                type="number"
                min="1"
                max={maxQuantity}
                value={quantity}
                readOnly
                className={`quantity-field__input ${className}__input`}
            />
            <button
                className={`quantity-field__add-button ${className}__add-button`}
                onClick={handleIncrement}
                disabled={quantity >= maxQuantity}
            ></button>
        </div>
    );
}
