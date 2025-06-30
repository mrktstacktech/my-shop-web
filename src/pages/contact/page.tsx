import { ContactForm } from "@/components";
import "./style.scss";
import { CallIcon, EnvelopIcon } from "@/constants";

export function ContactPage() {
    return (
        <div className="contact-page">
            <div className="contact-page__header">
                <div className="contact-page__header__phone">
                    <h4>
                        <span>{CallIcon}</span> Call To Us
                    </h4>
                    <p>We are available 24/7, 7 days a week.</p>
                    <p>Phone: +8801611112222</p>
                </div>

                <div className="contact-page__header__mail">
                    <h4>
                        <span>{EnvelopIcon}</span> Write To Us
                    </h4>
                    <p>Fill out our form and we will contact you within 24 hours.</p>
                    <p>Emails: customer@exclusive.com</p>
                    <p>Emails: support@exclusive.com</p>
                </div>
            </div>
            <ContactForm />
        </div>
    );
}