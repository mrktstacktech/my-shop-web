import { useState } from "react";
import './style.scss';

export function QuantityField(
    { maxQuantity = 10, className = "" }: { maxQuantity?: number; className?: string }
) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className={`quantity-field ${className}`}>
            <button className={`quantity-field__remove-button ${className}__remove-button`} onClick={handleDecrement} disabled={quantity <= 1}></button>
            <input
                type="number"
                min="1"
                max={maxQuantity}
                value={quantity}
                readOnly
                className={`quantity-field__input ${className}__input`}
            />
            <button className={`quantity-field__add-button ${className}__add-button`} onClick={handleIncrement} disabled={quantity >= maxQuantity}></button>
        </div>
    );
}