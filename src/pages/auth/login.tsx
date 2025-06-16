import { InputFormField, Button } from "../../components";
import React, { useState } from "react";
import { useAuthContext } from "../../context/auth-hook";

const styles = {
    container: "grid grid-cols-5 bg-gray-100",
    formContainer: "col-span-2 flex items-center justify-center bg-white w-full max-w-sm",
    photoContainer: "col-span-3 mb-4 flex flex-row items-center justify-center",
    photo: "w-auto mx-auto mb-4",
    title: "text-2xl font-semibold mb-2",
    subtitle: "text-gray-600 mb-7",
    inputField: "w-60 mb-4 border-b-2 border-gray-400",
    button: "bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:border-none rounded-full"
};

export function Login() {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { login } = useAuthContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setName (name.trim());
        setPassword(password.trim());
        try {
            const response = await login({ username: name, password: password });
            if (!response) {
                setError("Login failed. Please check your credentials.");
                return;
            }
        }
        catch (error) {
            console.error("Login error:", error);
            setError("An error occurred while logging in. Please try again.");
        }
    }

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.photoContainer} `}>
                <img
                    src="/public/side-image.png"
                    alt="Logo"
                    className={styles.photo}
                />
            </div>

            <div className={`${styles.formContainer}`}>
                <div>
                    <h2 className={`${styles.title}`}>Log in to Exclusive</h2>
                    <h3 className={`${styles.subtitle}`}>Enter your details below</h3>

                    <form onSubmit={handleSubmit} method="POST">
                        <InputFormField
                            type="text"
                            id="username"
                            name="email"
                            placeholder="Email or Number Phone"
                            onChange={(value: string) => setName(value)}
                            value={name}
                            className={styles.inputField}
                            required={false}
                        />

                        <InputFormField
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={(value: string) => setPassword(value)}
                            value={password}
                            className={styles.inputField}
                        />
                        {error && <p className="text-red-500 text-xs mt-1 mb-2">{error}</p>}
                        <div className="pt-4 flex justify-between items-center">
                            <Button
                                label="Log in"
                                onClick={() => console.log("Login clicked")}
                                className={`${styles.button}`}
                                variant="primary"
                                type="submit"
                            />
                            <a className="text-sm text-red-500 hover:text-red-700" href="#">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}