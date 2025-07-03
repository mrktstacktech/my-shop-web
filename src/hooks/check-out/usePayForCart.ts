import type { RootState } from "@/store/store";
import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function usePayForCart() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const cartItems = useSelector((state: RootState) => state.root.cart.currentCartItems);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);
        setTotal(totalAmount);
    }, [cartItems]);

    const handlePayForCart = useCallback(() => {
        try {
            setLoading(true);
            console.log("Processing payment for cart items:", cartItems);
        } catch (err) {
            console.error("Error during payment processing:", err);
            setError("An error occurred while processing the payment. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [cartItems]);



    return {
        loading,
        cartItems,
        error,
        total,
        handlePayForCart
    }

}