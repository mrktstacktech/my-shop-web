import { InputFormField } from "@/components";
import { useUpdateProfile } from "@/hooks";
import { ToastContainer } from "react-toastify";

import './style.scss';

export function MyProfileForm({ className = '' }: { className?: string }) {
    const {
        form,
        setForm,
        confirmPassword,
        setConfirmPassword,
        handleUpdateProfile,
        handleCancel,
        error,
        processing,
        setError
    } = useUpdateProfile();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
        }}
            method="POST"
            className={`my-profile-form ${className}`}
        >
            <h2 className={`my-profile-form__title ${className}__title`}>Edit My Profile</h2>
            <div className={`my-profile-form__personal-fields my-profile-form__form-fields ${className}__form-fields`}>
                <div className="my-profile-form__form-fields__input-container">
                    <InputFormField
                        label="First Name"
                        name="firstName"
                        value={form.firstName}
                        type="text"
                        placeholder="Enter your first name"
                        id={"firstName"}
                        onChange={(value: string) => {
                            setError({ ...error, firstName: '' }); // Clear error on change
                            setForm({ ...form, firstName: value })
                        }}
                        required
                        className="my-profile-form__form-fields__input-container__input-field"
                    />
                    {error.firstName && <p className="my-profile-form__form-fields__input-container__error-text  error-text">{error.firstName}</p>}
                </div>

                <div className="my-profile-form__form-fields__input-container">
                    <InputFormField
                        label="Last Name"
                        name="lastName"
                        value={form.lastName}
                        type="text"
                        placeholder="Enter your last name"
                        id={"lastName"}
                        onChange={(value: string) => {
                            setError({ ...error, lastName: '' }); // Clear error on change
                            setForm({ ...form, lastName: value })
                        }}
                        required
                        className="my-profile-form__form-fields__input-container__input-field"
                    />
                    {error.lastName && <p className="my-profile-form__form-fields__error-text  error-text">{error.lastName}</p>}
                </div>
            </div>
            <div className={`my-profile-form__personal-fields my-profile-form__form-fields ${className}__form-fields`}>
                <div className="my-profile-form__personal-fields__input-container my-profile-form__form-fields__input-container">
                    <InputFormField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        placeholder="Enter your email"
                        id={"email"}
                        onChange={(value: string) => {
                            setError({ ...error, email: '' }); // Clear error on change
                            setForm({ ...form, email: value })
                        }}
                        required
                        className="my-profile-form__form-fields__input-container__input-field"
                    />
                    {error.email && <p className="my-profile-form__form-fields__error-text error-text">{error.email}</p>}
                </div>
                <div className="my-profile-form__personal-fields__input-container my-profile-form__form-fields__input-container">
                    <InputFormField
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Enter your address"
                        id={"address"}
                        value={form.address?.street}
                        onChange={(value: string) => {
                            setError({ ...error, address: '' }); // Clear error on change
                            setForm({ ...form, address: { ...form.address, street: value } })
                        }}
                        required
                        className="my-profile-form__form-fields__input-container__input-field"
                    />
                    {error.address && <p className="my-profile-form__form-fields__error-text  error-text">{error.address}</p>}
                </div>
            </div>
            <div className={`my-profile-form__password-fields my-profile-form__password-fields ${className}__form-fields`}>
                <label>Password Change</label>
                <InputFormField
                    name="currentPassword"
                    type="password"
                    value={form.currentPassword}
                    placeholder="Current password"
                    id={"currentPassword"}
                    onChange={(value: string) => {
                        setError({ ...error, currentPassword: '' }); // Clear error on change
                        setForm({ ...form, currentPassword: value })
                    }}
                    required={false}
                    className="my-profile-form__password-fields__input-field my-profile-form__form-fields__input-field"
                />
                <InputFormField
                    name="newPassword"
                    type="password"
                    value={form.newPassword}
                    placeholder="New password"
                    id={"newPassword"}
                    onChange={(value: string) =>  {
                        setError({ ...error, newPassword: '' }); // Clear error on change
                        setForm({ ...form, newPassword: value })
                    }}
                    required={false}
                    className="my-profile-form__password-fields__input-field my-profile-form__form-fields__input-field"
                />
                <InputFormField
                    name="confirmNewPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm new password"
                    id={"confirmNewPassword"}
                    onChange={(value: string) => { 
                        setError({ ...error, confirmNewPassword: '' }); // Clear error on change
                        setConfirmPassword(value)
                    }}
                    required={false}
                    className="my-profile-form__password-fields__input-field my-profile-form__form-fields__input-field"
                />
                <div className="my-profile-form__password-fields__error-container">
                    {error.currentPassword && <p className="my-profile-form__form-fields__error-container__error-text error-text">{error.currentPassword}</p>}
                    {error.newPassword && <p className="my-profile-form__form-fields__error-container__error-text error-text">{error.newPassword}</p>}
                    {error.confirmNewPassword && <p className="my-profile-form__form-fields__error-container__error-text error-text">{error.confirmNewPassword}</p>}
                </div>

            </div>
            <div className="my-profile-form__buttons">
                <button type="button" onClick={handleCancel} className="my-profile-form__buttons__cancel-button">Cancel</button>
                <button disabled={processing} className="my-profile-form__buttons__save-button" type="submit">Save Changes</button>
                <ToastContainer />
            </div>
        </form>
    );
}