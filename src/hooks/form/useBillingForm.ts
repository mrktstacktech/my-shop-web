import { useState } from 'react';
import { useAuthContext } from '@/context/auth-hook';
import { usePayForCart } from '@/hooks';
// import { useNavigate } from 'react-router-dom';
import { Options } from '@/constants';
export function useBillingForm() {
    const { user } = useAuthContext();
    const { loading, cartItems, error: payingError, handlePayForCart, total } = usePayForCart();
    // const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [companyName, setCompanyName] = useState(user?.company?.name || '');
    const [street, setStreet] = useState(user?.address?.street || '');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState(user?.address?.city || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [payingMethod, setPayingMethod] = useState<string>(Options[0].value); // Default payment method
    const[isSuccess, setIsSuccess] = useState<boolean>(false);
    const [voucher, setVoucher] = useState<string>('');
    const [error, setError] = useState({
        firstName: '',
        companyName: '',
        street: '',
        apartment: '',
        city: '',
        phone: '',
        email: '',
        payingMethod: ''
    });

    const validateForm = () => {
        const newError = {
            firstName: '',
            companyName: '',
            street: '',
            apartment: '',
            city: '',
            phone: '',
            email: '',
            payingMethod: ''
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

     
        if (!email.trim()) {
            newError.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Email format is invalid.";
        }
        setError(newError);
        if (Object.values(newError).some(err => err)) {
            console.error("Form validation failed:", newError);
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            console.log("Form is valid, proceeding with payment...");

            try {
                await handlePayForCart(); // Wait for payment logic to complete

                if (!payingError) {
                    const formData = {
                        payingMethod
                    };
                    console.log("Form submitted successfully with data:", formData);
                    setIsSuccess(true);
                    // navigate("/");
                } else {
                    alert("Payment failed. Please try again.");
                }
            } catch (err) {
                console.error("Error during payment:", err);
                alert("An unexpected error occurred.");
            }
        }
    };


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
        total,
        cartItems,
        handleSubmit,
        payingMethod,
        setPayingMethod,
        isSuccess,
        voucher,
        setVoucher
    }

}