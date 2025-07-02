import { InputFormField } from "@components";
import "./style.scss";
import { useContactForm } from "@/hooks";
// import Typo from "../Typo";

export function ContactForm() {
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
    } = useContactForm();

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form__personal-fields">
                <div className="contact-form__personal-fields__title">
                    <div className={`contact-form__personal-fields__title__inline-fields ${error.name ? "error-field" : ""}`}>
                        <InputFormField
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name *"
                            value={name}
                            required
                            onChange={(value: string) => setName(value)}
                        />
                    </div>
                    {error.name && <span className="contact-form__personal-fields__title__error">{error.name}</span>}
                </div>
                <div className="contact-form__personal-fields__title">
                    <div className={`contact-form__personal-fields__title__inline-fields ${error.email ? "error-field" : ""}`}>
                        <InputFormField
                            type="email"
                            id="email"
                            required
                            name="email"
                            placeholder="Your Email *"
                            value={email}
                            onChange={(value: string) => setEmail(value)}
                        />
                    </div>
                    {error.email && <span className="contact-form__personal-fields__title__error">{error.email}</span>}
                </div>
                <div className="contact-form__personal-fields__title">
                    <div className={`contact-form__personal-fields__title__inline-fields ${error.phone ? "error-field" : ""}`}>
                        <InputFormField
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Your Phone *"
                            value={phone}
                            onChange={(value: string) => setPhone(value)}
                        />
                    </div>
                    {error.phone && <span className="contact-form__personal-fields__title__error">{error.phone}</span>}
                </div>
            </div>
            <div className="contact-form__message">
                <div className={`contact-form__message__message-field ${error.message ? "error-field" : ""}`}>
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
                {error.message && <span className="contact-form__message__error">{error.message}</span>}
            </div>
            <div className="contact-form__submit-container">
                <button type="submit" className="contact-form__submit-container__submit-button">
                    Send Message
                </button>
            </div>
        </form>
    );
}