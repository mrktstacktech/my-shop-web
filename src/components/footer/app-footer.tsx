import "./style.scss";
import { QUICK_LINKS, ACCOUNT_LINKS, SOCIAL_LINKS } from "@/constants";
import { SendIcon } from "@/constants";
import { InputFormField, Button } from "@components";

export function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="app-footer__links">
                <div className="app-footer__links__subscribe">
                    <div className="app-footer__links__subscribe__title">
                        <img src="/public/white-logo.svg" alt="Logo" />
                    </div>
                    <ul className="app-footer__links__subscribe__list">
                        <li>Subscribe</li>
                        <li>Get 10% off your first order</li>
                        <li className="app-footer__links__subscribe__list__input">
                            <InputFormField
                                type="email"
                                id="subscribe-email"
                                name="subscribe-email"
                                placeholder="Enter your email"
                                className="app-footer__links__subscribe__list__input__subscribe-input"
                                required={false}
                                suffix={<Button onClick={() => console.log("Sent")} label={SendIcon} />}
                                onChange={() => {console.log("Subscribe input changed") }}
                            />
                        </li>
                    </ul>
                </div>
                <div className="app-footer__links__support">
                    <div className="app-footer__links__support__title">Support</div>
                    <ul className="app-footer__links__support__list">
                        <li>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</li>
                        <li>exclusive@gmail.com</li>
                        <li>+880 123 456 7890</li>
                    </ul>
                </div>
                <div className="app-footer__links__account">
                    <div className="app-footer__links__account__title">Account</div>
                    <ul className="app-footer__links__account__list">
                        {ACCOUNT_LINKS.map((link, index) => (
                            <li key={index} className="app-footer__links__item">
                                <a href={link.href} className="app-footer__links__link">{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="app-footer__links__quick">
                    <div className="app-footer__links__quick__title">Quick Links</div>
                    <ul className="app-footer__links__quick__list">
                        {QUICK_LINKS.map((link, index) => (
                            <li key={index} className="app-footer__links__item">
                                <a href={link.href} className="app-footer__links__link">{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="app-footer__links__download">
                    <div className="app-footer__links__download__title">Download App</div>
                    <div className="app-footer__links__download__description">
                        <p>Save $3 with App New User Only</p>
                        <div className="app-footer__links__download__description__content">
                            <div className="app-store__links__download__description__content__qr-code">
                                <img src="/public/qrcode.svg" alt="QR Code" className="app-footer__links__download__qrcode" />
                            </div>
                            <div className="app-store__links__download__description__content__buttons">
                                <div>
                                    <Button
                                        label={<img src="/public/download-play-store.svg" alt="Google Play" />}
                                        className="app-footer__links__download__button"
                                        onClick={() => window.open("https://play.google.com/store", "_blank")}
                                    />
                                </div>
                                <div>
                                    <Button
                                        label={<img src="/public/download-appstore.svg" alt="App Store" />}
                                        className="app-footer__links__download__button"
                                        onClick={() => window.open("https://www.apple.com/app-store/", "_blank")}
                                        style={{ marginBottom: "10px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="app-footer__links__download__list">
                        {SOCIAL_LINKS.map((link, index) => (
                            <li key={index} className="app-footer__links__item">
                                <a href={link.href} className="app-footer__links__link">
                                    {link.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="app-footer__copyright">
                <p>© Copyright Gimel 2022. All rights reserved.</p>
            </div>
        </footer>
    );
}