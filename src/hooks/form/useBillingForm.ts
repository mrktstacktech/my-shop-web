import { useState } from 'react';
import { useAuthContext } from '@/context/auth-hook';
import { usePayForCart } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export function useBillingForm() {
    const { user } = useAuthContext();
    const { loading, cartItems, error: payingError, handlePayForCart } = usePayForCart();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [companyName, setCompanyName] = useState(user?.company?.name || '');
    const [street, setStreet] = useState(user?.address?.street || '');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState(user?.address?.city || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [error, setError] = useState({
        firstName: '',
        companyName: '',
        street: '',
        apartment: '',
        city: '',
        phone: '',
        email: ''
    });

    const validateForm = () => {
        const newError = {
            firstName: '',
            companyName: '',
            street: '',
            apartment: '',
            city: '',
            phone: '',
            email: ''
        };
        if (!firstName.trim()) {
            newError.firstName = "Name is required.";
        } else if (firstName.length < 2 || firstName.length > 50) {
            newError.firstName = "Name must be between 2 and 50 characters.";
        } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
            newError.firstName = "Name only contains letters and spaces.";
        }

        if (!street.trim()) {
            newError.email = "Street is required.";
        }

        if (!city.trim()) {
            newError.city = "City is required.";
        }

        if (!phone.trim()) {
            newError.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(phone)) {
            newError.phone = "Phone number must be 10 digits.";
        }

        if (!email.trim()) {
            newError.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Email format is invalid.";
        }
        setError(newError);

    }

    const handleSubmit = () => {
        validateForm();
        handlePayForCart(); 
        if (!payingError) {
            const formData = {
                firstName,
                companyName,
                street,
                apartment,
                city,
                phone,
                email
            };
            console.log("Form submitted successfully with data:", formData);
            alert("Paying successfully!");
            navigate("/")
        }
    }

    return {
        firstName,
        setFirstName,
        companyName,
        setCompanyName,
        street,
        setStreet,
        apartment,
        setApartment,
        city,
        setCity,
        phone,
        setPhone,
        email,
        setEmail,
        error,
        payingError,
        loading,
        cartItems,
        handleSubmit

    }

}