import React, { useState, useCallback } from "react";

export function useContactForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const validation = useCallback(() => {
        const newError = { name: "", email: "", phone: "", message: "" };

        if (!name.trim()) {
            newError.name = "Name is required.";
        } else if (name.length < 2 || name.length > 50) {
            newError.name = "Name must be between 2 and 50 characters.";
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            newError.name = "Name only contains letters and spaces.";
        }
        if (!email.trim()) {
            newError.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Email format is invalid.";
        }
        if (phone && !/^\d{10}$/.test(phone)) {
            newError.phone = "Phone number must be 10 digits.";
        }
        if (!message.trim()) {
            newError.message = "Message cannot be empty.";
        }

        setError(newError);
        return;
    }, [name, email, phone, message]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validation();
        console.log("Form submitted with values:", {
            name,
            email,
            phone,
            message
        });
    }, [email, message, name, phone, validation]);

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