import type { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCheckValidationItem } from "@/hooks/entities";

export function usePayForCart() {
    const [loading, setLoading] = useState<boolean>(false);
    const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const cartItems = useSelector((state: RootState) => state.root.cart.currentCartItems);
    const { isValid } = useCheckValidationItem();

    const handlePayForCart = useCallback(() => {
        try {
            setLoading(true);
            if (!cartItems || cartItems.length === 0) {
                setError("Cart is empty. Cannot proceed to payment.");
                return;
            }

            cartItems.forEach(item => {
                const isItemValid = isValid(item.id);
                if (!isItemValid) {
                    setUnavailableItems(prev => [...prev, item.title]);

                }
            });

            if (unavailableItems.length > 0) {
                setError(`${unavailableItems.join(', ')} are out of stock now.`);
                console.error(error);
                return;
            }
            else {
                setError('');
                console.log("Proceeding to payment for the following items:", cartItems);
            }
        } catch (err) {
            console.error("Error during payment processing:", err);
            setError("An error occurred while processing the payment. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [cartItems, isValid, error, unavailableItems]);

    useEffect(() => {
        handlePayForCart();
    }, [cartItems, handlePayForCart]);

    return {
        loading,
        cartItems,
        error,
        handlePayForCart
    }

}