import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@/constants";

export function useShowPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('password');

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
        setType(prev => prev === 'password' ? 'text' : 'password');
    };

    const icon = showPassword ? EyeSlashIcon : EyeIcon;

    return {
        type,
        showPassword,
        toggleShowPassword,
        icon
    };
}
