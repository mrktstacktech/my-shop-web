import React, { useState, useCallback } from "react";

// TODO: rename hook to useContactForm or similar
export function useForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const validation = useCallback(() => {
        if (!name || !email || !phone || !message) {
            setError("All fields are required.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid email format.");
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            setError("Phone number must be 10 digits.");
            return false;
        }
        setError("");
        return true;
    }, [name, email, phone, message]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validation()) {
            console.error("Form validation failed:", error);
            return;
        }
        console.log("Form submitted with values:", {
            name,
            email,
            phone,
            message
        });
    }, [email, message, name, phone, error, validation]);

    return {
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        message,
        setMessage,
        handleSubmit,
        error
    };
}