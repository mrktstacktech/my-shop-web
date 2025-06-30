import { InputFormField } from "@components";
import "./style.scss";
import { useForm } from "@/hooks";
import { useState } from "react";
import Typo from "../Typo";

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
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
    } = useForm();

    //TODO: handle error for each field
    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form__personal-fields">
                <div className="contact-form__personal-fields__inline-fields">
                    <InputFormField
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        required
                        onChange={(value: string) => setName(value)}
                    />
                </div>
                <div className="contact-form__personal-fields__inline-fields">
                    <InputFormField
                        type="email"
                        id="email"
                        required
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(value: string) => setEmail(value)}
                    />
                </div>
                <div className="contact-form__personal-fields__inline-fields">
                    <InputFormField
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Your Phone"
                        value={phone}
                        onChange={(value: string) => setPhone(value)}
                    />
                </div>
            </div>
            <div className="contact-form__message-field">
                <InputFormField
                    type="textarea"
                    id="message"
                    name="message"
                    value={message}
                    placeholder="Your Message"
                    onChange={(value: string) => setMessage(value)}
                    isMultiline={true}
                />
            </div>
            <div className="contact-form__error-text">
                {isSubmitted ?
                    (error ? <p className="contact-form__error-text__error-message">{error}</p>
                        : <p className="contact-form__error-text__success-message">Successfully submitted.</p>
                    )
                    : <p></p>
                }
            </div>
            <div className="contact-form__submit-container">
                <button onClick={() => setIsSubmitted(true)} type="submit" className="contact-form__submit-container__submit-button">
                    Send Message
                </button>
            </div>

            <Typo as='p'>
                aaaaa
            </Typo>

            
            <Typo as='h1'>
                HEADIng
            </Typo>

        </form>
    );
}