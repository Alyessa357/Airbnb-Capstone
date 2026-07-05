import { FaFacebook, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

import useLocale from "../../context/useLocale";

import "./CopyrightFooter.css";

// Available language options for the footer dropdown
const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
];

// Available currency options for the footer dropdown
const CURRENCIES = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
];

// Bottom footer — copyright, legal links, locale selectors, and social icons
const CopyrightFooter = () => {
    const { language, setLanguage, currency, setCurrency } = useLocale();

    return (
        <div className="copyright-footer">
            {/* Copyright and legal links */}
            <div className="copyright-left">
                <p>© 2026 Airbnb, Inc.</p>
                <span>·</span>
                <p>Privacy</p>
                <span>·</span>
                <p>Terms</p>
                <span>·</span>
                <p>Sitemap</p>
            </div>

            <div className="copyright-right">
                {/* Language selector — updates global locale context */}
                <div className="copyright-selector">
                    <FaGlobe aria-hidden="true" />
                    <select
                        className="copyright-selector__select"
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                        aria-label="Select language"
                    >
                        {LANGUAGES.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Currency selector — updates global locale context */}
                <select
                    className="copyright-selector__select copyright-selector__select--currency"
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                    aria-label="Select currency"
                >
                    {CURRENCIES.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
            </div>
        </div>
    );
};

export default CopyrightFooter;
